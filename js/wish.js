$(document).ready(function() {
    februaryValidate();
    customInput();
});



var file = document.getElementById('wish-file');
var fileName;
var fileBody;
var fileBodyPath;
var fileBodyInverse;
var fileSize;

file.addEventListener('change', function() {
    fileName = document.getElementById('wish-file').files[0].name;
    fileBodyPath = document.getElementById('wish-file').value;
    fileBody = btoa(fileBodyPath);
    fileBodyInverse = atob(fileBody);
});












function wishSend() {


    var name = document.getElementById('wish-name').value;
    var email = document.getElementById('wish-email').value;
    var phone = document.getElementById('wish-phone').value;
    var dream = document.getElementById('wish-heading').value;
    var dream_details = document.getElementById('wish-text').value;


    var file = document.getElementById('wish-file');
    // перебираем все введенные файлы :
    Array.prototype.forEach.call(file.files, function(fileItem) {
        var y = document.getElementById('wish-file').files[0];
        var reader = new FileReader();
        // событие закачки файла:
        reader.addEventListener("load", function() {
            fileContent = reader.result;
            
            fileContent = new Uint8Array(fileContent);
            str = '';

            for (i = 0; i < fileContent.length; i++) {
                str += String.fromCharCode(fileContent[i]);
            }

            var url = "/ru/?ajax";

            var data = {
                typeData: 'addDream',
                phone: phone,
                email: email,
                name: name,
                dream: dream,
                dream_details: dream_details,
                fileName: fileName,
                fileBody: btoa(str)
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

                        console.log(js);
                        if (js.message == 'OK') {
                            // $("#button_sendMe").removeAttr("disabled");
                        }
                    };
                },

                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Сообщение об ошибке от сервера: ' + textStatus); // вывод JSON в консоль

                    $("#div_waiting").addClass("hidden");
                    // $("#button_sendCard").removeAttr("disabled");
                }
            });
        });
        //reader.readAsBinaryString(file);
        reader.readAsArrayBuffer(fileItem); // чтение из файла в буфер
    });

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

            // envelop animations
            $('.envelop-wrapper').addClass('active');
            setTimeout(function() {
                $('.envelop-wrapper').css({ 'overflow': 'hidden' });
            }, 1300);
            setTimeout(function() {
                $('.envelop-inverse').css('visibility', 'visible');
            }, 1400);
            setTimeout(function() {
                $('.envelop-letter').css({ 'overflow': 'hidden', 'height': '100px' });
            }, 300);
            setTimeout(function() {
                $('.envelop-wrapper:before').css({ 'z-index': '4' });
            }, 1000);
        }

        return validate($(this).parents('.envelop-wrapper').find(".js_validate"));
    });
}