$(function() {

    randomModalId();

    easterMusic();


    $('#easter-start').modal('show');

    var list = $('.crack');

    for (i = 0; i < list.length; i++) {
        $(list[i]).attr('id', 'crack-' + i + '');


    }

    var tryCount = +$('#tryCount').val();
    $('.easter-try-count span').text(tryCount);

    if (tryCount == 0) {
        $('#easter-start').modal('hide');
        $('#easter-final').modal('show');
    }

    var counterEgs = $('.easter-try-img img');

    for (i = 0; i < counterEgs.length; i++) {
        
        switch (tryCount) {
            case 2:
                $(counterEgs[0]).addClass('active');
                break;
            case 1:
                $(counterEgs[0]).addClass('active');
                $(counterEgs[1]).addClass('active');
                break;
            case 0:
                $(counterEgs[0]).addClass('active');
                $(counterEgs[1]).addClass('active');
                $(counterEgs[2]).addClass('active');

                $('[id^="modal-discount-"]').on('hidden.bs.modal', function(e) {
                    $('#easter-final').modal('show');
                });
                break;
            default:
                
        }
    }



    $('.egg').one('click', function() {

    	// звук битого яйца

    	var crackAudio = $("#crack-music")[0];
    	crackAudio.play();

        // кол-во попыток на табло
        tryCount--;

        $('.easter-try-count span').text(tryCount);

        var counterEgs = $('.easter-try-img img');

        for (i = 0; i < counterEgs.length; i++) {
            switch (tryCount) {
                case 2:
                    $(counterEgs[0]).addClass('active');
                    break;
                case 1:
                    $(counterEgs[0]).addClass('active');
                    $(counterEgs[1]).addClass('active');
                    break;
                case 0:
                    $(counterEgs[0]).addClass('active');
                    $(counterEgs[1]).addClass('active');
                    $(counterEgs[2]).addClass('active');
                    break;
                default:
                    
            }
        }







        // if(tryCount == -1) {
        // 	$('.easter-try-count span').text('0');
        // 	$('.modal').modal('hide');
        // 	$('#easter-final').modal('show');
        // }

        // Отрисовка трещины в яйце
        $(this).addClass('active');

        var currentId = $(this).find('.crack').attr('id');


        if ($('.crack').length > 0) {

            var els = document.querySelectorAll('.crack-path');
            Array.prototype.slice.call(els).forEach(function(el) {
                el.setAttribute('stroke', 'white');
                el.setAttribute('fill', 'transparent');
            })

            var SVGcrown = new Vivus(currentId, {
                    duration: 100,
                    start: 'autostart'
                },
                function(myVivus) {
                    if (myVivus.getStatus() === 'end') {
                        $('.crack-path').attr('fill', 'white');

                        myVivus.stop();
                        myVivus.destroy();
                    }

                })
        }

        // Запуск нужной модалки
        var data_target = $(this).attr('data-target');
        setTimeout(function() {
            $('#' + data_target).modal('show').on('hide.bs.modal', function(e) {
                if (tryCount == 0) {
                    $('#easter-final').modal('show');
                }
            });
        }, 2000);


        $('#easter-empty').on('hidden.bs.modal', function(e) {
            if (tryCount == 0) {
                $('#easter-final').modal('show');
            }
        });





        var attr = $(this)[0].hasAttribute("data-target");
        if (typeof attr === typeof undefined || attr == false) {

            setTimeout(function() {
                $('#easter-empty').modal('show').on('hide.bs.modal', function(e) {
                    if (tryCount == 0) {
                        $('#easter-final').modal('show');
                    }
                });
            }, 2000);
        }

        var url = "/ru/?ajax";

        var data = {
            typeData: 'flagTryEgg',
            tryCount: tryCount
        };

        $.ajax({
            url: url,
            type: 'POST',
            data: { data: data },
            dataType: 'json',
            success: function(json) {
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR); // вывод JSON в консоль
                console.log('Сообщение об ошибке от сервера: ' + textStatus); // вывод JSON в консоль
                // console.log(errorThrown); // вывод JSON в консоль
            }
        });
    });



});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function randomModalId() {
    var randomMin = 1,
        randomMax = 5;

    var eggs = $('.egg');

    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    eggs.sort(compareRandom);

    for (i = 0; i < 5; i++) {
        var random1 = getRandomInt(randomMin, randomMax);
        var id_item1 = "modal-discount-" + random1;
        $(eggs[i]).attr('data-target', id_item1);
    }

}


function easterMusic() {
    var audio = $("#easter-music")[0];
    if (audio) {
        audio.volume = 0.2;

        $('.paused').click(function() {
            audio.muted = true;
            $(this).addClass('hidden');
            $('.played').removeClass('hidden');
        });
        $('.played').click(function() {
            $(this).addClass('hidden');
            $('.paused').removeClass('hidden');
            audio.muted = false;
        });
    }



}