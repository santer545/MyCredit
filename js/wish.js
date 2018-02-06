$(document).ready(function() {
    februaryValidate();
    customInput();
    setLike();
    $('.wish-text').jScrollPane({
        arrowScrollOnHover: true
    });
});



var file = document.getElementById('wish-file');
var fileName;
var fileBody;
var fileBodyPath;
var fileBodyInverse;
var fileSize;

if (file) {
    file.addEventListener('change', function() {
        fileName = document.getElementById('wish-file').files[0].name;
        fileBodyPath = document.getElementById('wish-file').value;
    });
}



/*function previewFile() {
    var filePath = document.getElementById('wish-file').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        var path = reader.result;
        document.getElementById('loadFile').value = path;
        
    }

    if (filePath) {
        var test = reader.readAsDataURL(filePath);
        console.log('readAsDataUrl:' + test);
    } else {
        console.log('Loh');
    }
}



file.addEventListener('change', function() {
    previewFile();
});*/





function wishSend() {


    var name = document.getElementById('wish-name').value;
    var email = document.getElementById('wish-email').value;
    var phone = document.getElementById('wish-phone').value;
    var dream = document.getElementById('wish-heading').value;
    var dream_details = document.getElementById('wish-text').value;










    /*File.prototype.convertToBase64 = function(callback) {

        var FR = new FileReader();
        FR.onload = function(e) {
            callback(e.target.result)
        };
        FR.readAsDataURL(this);

        

    }
    var selectedFile = this.files[0];
    var ttt = selectedFile.convertToBase64(function(base64));
    console.log(ttt);*/








    Array.prototype.forEach.call(file.files, function(fileItem) {
        var y = document.getElementById('wish-file').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function() {
            fileContent = reader.result;

            fileContent = new Uint8Array(fileContent);

            str = '';

            for (i = 0; i < fileContent.length; i++) {
                str += String.fromCharCode(fileContent[i]);
            }
            
            if (loadFile) {
                document.getElementById('loadFile').value = str;
            }

            function b64EncodeUnicode(str) {
                // first we use encodeURIComponent to get percent-encoded UTF-8,
                // then we convert the percent encodings into raw bytes which
                // can be fed into btoa.
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    }));
            }

            var finalStr = b64EncodeUnicode(str);
            console.log(finalStr);
            if (loadFile) {
                document.getElementById('loadFile').value = finalStr;
            }

        });

        reader.readAsArrayBuffer(fileItem);
    });







    var url = "/ru/?ajax";

    setTimeout(function() {




        var data = {
            typeData: 'addDream',
            phone: phone,
            email: email,
            name: name,
            dream: dream,
            dream_details: dream_details,
            fileName: fileName,
            fileBody: document.getElementById('loadFile').value
        };

        console.log(data);


        $.ajax({
            url: url,
            type: 'POST',
            data: { data: data },
            dataType: 'json',
            success: function(json) {
                if (json) {
                    var js = json;
                    var lang = document.getElementById('lang').innerText;
                    console.log(js);
                    if (js.message == 'OK') {
                        // envelop animations
                        $('.envelop-wrapper').addClass('active');

                        setTimeout(function() {
                            $('.envelop-inverse').css('visibility', 'visible');
                        }, 3000);
                        setTimeout(function() {
                            $('.envelop-typing').addClass('active');
                        }, 3500);
                        setTimeout(function() {
                            $('.envelop-wrapper').addClass('z-index');
                        }, 1000);
                        setTimeout(function() {
                            $('.envelop-wrapper').addClass('sended');
                            $('.mail-box-top').addClass('opened');
                            $('.mail-box').addClass('opened');
                        }, 4000);
                        setTimeout(function() {
                            $('.mail-box-top').removeClass('opened');
                            $('.mail-box').removeClass('opened');
                            $('.february-final').addClass('active');
                        }, 7000);
                        setTimeout(function() {
                            $('.envelop-letter').css({ 'overflow': 'hidden', 'height': '100px', 'opacity': '0' });
                        }, 300);
                    } else {
                        document.getElementById('ajaxServerError').classList.remove('hidden');
                        switch (js.errorType) {
                            case 'NoData':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Не хватает данных';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Не вистачає даних';
                                }
                                break;
                            case 'NoTemplateEmail':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Не правильный email';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Не вірний email';
                                }
                                break;
                            case 'existPhone':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Пользователь с таким телефоном уже существует';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Користувач с таким телефоном вже існує';
                                }
                                break;
                            case 'existEmail':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Пользователь с таким email уже существует';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Користувач с таким email вже існує';
                                }
                                break;
                            case 'maxFileSize':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Вы пытаетесь загрузить файл слишком большого размера (рекоммендуемы размер 100kb)';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Ви намагаетеся завантажити файл великого розміру (рекомендовано файл до 100kb)';
                                }
                                break;
                            case 'errorPutFile':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Ошибка загрузки файла';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Помилка завантаження файлу';
                                }
                                break;
                            case 'errorPutDream':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Ваша мечта не записалась';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Вашу мрію не зафіксовано';
                                }
                                break;
                            case 'existDream':
                                if (lang == 'ru') {
                                    document.getElementById('ajaxServerError').innerHTML = 'Такая мечта уже существует';
                                } else {
                                    document.getElementById('ajaxServerError').innerHTML = 'Така мрія вже існує';
                                }
                                break;
                            default:
                                document.getElementById('ajaxServerError').innerHTML = 'Системная ошибка. Повторите свой запрос еще раз!';
                                break;
                        }
                        /*document.getElementById('ajaxServerError').innerHTML = js.error;*/
                    }
                };
            },

            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Сообщение об ошибке от сервера: ' + textStatus); // вывод JSON в консоль


                $("#div_waiting").addClass("hidden");
                // $("#button_sendCard").removeAttr("disabled");
            }
        });
    }, 1000);
}


function customInput() {
    document.querySelector("html").classList.add('js');

    var fileInput = document.getElementById("wish-file"),
        button = document.querySelector(".input-file-trigger"),
        the_return = document.querySelector(".file-return");
    if (button && fileInput) {
        button.addEventListener("keydown", function(event) {
            if (event.keyCode == 13 || event.keyCode == 32) {
                fileInput.focus();
            }
        });
        button.addEventListener("click", function(event) {
            fileInput.focus();
            return false;
        });
        fileInput.addEventListener("change", function(event) {
            if (document.getElementById('wish-file').files[0].size > 100000) {
                console.log('to much!');
                the_return.classList.remove('file-return');
                the_return.classList.add('error-text');
                the_return.innerHTML = 'Ваш файл весит слишком много(рекомендуемый размер не больше 100 килобайт!)';
                document.getElementById('wish-file').value = '';
            } else {
                the_return.classList.add('file-return');
                the_return.classList.remove('error-text');
                the_return.innerHTML = this.files[0].name;
            }
        });
    }
}




function februaryValidate() {
    // validate
    $('.js-wish').on("click", function() {

        if (validate($(this).parents('.envelop-wrapper').find(".js_validate"))) {

            // Ajax send
            wishSend();



        }

        return validate($(this).parents('.envelop-wrapper').find(".js_validate"));
    });
}



function setLike() {
    var like = document.getElementsByClassName('wish-like');
    for (i = 0; i < like.length; i++) {
        like[i].addEventListener('click', function(e) {

            if (!this.classList.contains("active")) {
                this.classList.add("active");

                var dreamId = $(this).closest('form').find('.js-dream').val();
                var url = "/ru/?ajax";
                var data = {
                    typeData: 'addDreamLike',
                    dreamId: dreamId
                };

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: { data: data },
                    dataType: 'json',
                    success: function(json) {
                        if (json) {
                            var js = json;
                            // console.log(js);
                            if (js.message == 'OK') {
                                $("#dreams-rating-" + dreamId).val(js.rating);
                                $("#span-rating-" + dreamId).text(js.rating);
                            }
                        };
                    },

                    error: function(jqXHR, textStatus, errorThrown) {
                        // console.log(jqXHR); // вывод JSON в консоль
                        console.log('Сообщение об ошибке от сервера: ' + textStatus); // вывод JSON в консоль
                        // console.log(errorThrown); // вывод JSON в консоль
                    }
                });
            }
        });
    }
}