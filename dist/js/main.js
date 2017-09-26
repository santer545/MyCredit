$(document).ready(function() {

    $('.nav-tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });


    $('a[data-toggle="collapse"]').click(function(e) {
        e.preventDefault();
    })


    anchorLink();
    navbarClose();

    $('.owl-cpa').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        responsive: {
            0: {
                items: 1,
                margin: 55,
                nav: true,
                navText: ['', '']
            },
            900: {
                nav: false,
                items: 2,
                margin: 55
            }
        }
    });

    $(document).on('click', '.owl-cpa .owl-item', function() {
        n = $(this).index();
        console.log(n)
        $('.owl-wrapper').trigger('owl.goTo', n);
    });


    $('.js-programms').owlCarousel({
        margin: 40,
        items: 1,
        loop: true,
        nav: true,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        navText: ['', ''],
        responsive: {
            800: {
                items: 2
            },
            1300: {
                items: 3
            }
        }
    });






    /*
        $('#clock').countdown('2017/08/10', function(event) {
            var $this = $(this).html(event.strftime('' + '<div>%d<span>дней [*minSum*] [#67#] :-) </span></div> ' + '<div>%H<span>часов</span></div>' + '<div>%M<span> мин </span></div>' + '<div>%S<span>сек</span></div>'));
        });
    */



    $('.owl-carousel-banner').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        margin: 0,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        navText: ['', ''],
        responsive: {
            0: {
                dots: true,
                autoplay: false
            },
            480: {
                autoplay: true
            },
            1025: {
                dots: false,
                autoplay: true
            }
        }
    });

    $('.owl-carousel-text').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        margin: 20,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        navText: ['', ''],
        dotsContainer: '#custom-dots',
        responsive: {
            800: {
                items: 2
            },
            480: {
                autoplay: true
            }
        }
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        margin: 20,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        navText: ['', ''],
        dotsContainer: '#custom-dots',
        responsive: {
            0: {
                autoplay: false
            },
            480: {
                autoplay: true
            }
        }
    });

    if ($(window).width() < 820) {
        $('.js-advantages-slider').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['', '']
        });
    }


    choosePaymentMethod();

    function choosePaymentMethod() {
        $('.repayment-cases input:radio[name="repayment-choose"]').change(function() {
            $('.repayment-tab').fadeOut();
            if ($(this).is(':checked') && $(this).attr('id') == 'repayment-choose-1') {
                $('#repayment-tab-1').fadeIn();;
            } else if ($(this).is(':checked') && $(this).attr('id') == 'repayment-choose-2') {
                $('#repayment-tab-2').fadeIn();;
            }
        });
    }
    /*
    $(function() {
         jcf.replaceAll();
    });
    */


    // z-index for svg elements

    var svg = document.querySelector("svg");
    var rects = document.querySelectorAll(".terminal-marker");

    var i = rects.length;
    while (i--) {
        rects[i].addEventListener("mouseenter", function(e) {
            svg.appendChild(e.target);
        });
    }

    $('.pgwSlideshow').pgwSlideshow();

    $("[class^=nameSlider]").each(function(i, elem) {

        var prefixSl = $(elem).text();

        var sl = $("#js-money_" + prefixSl).slider();

        $("#money-value_" + prefixSl).change(function() {
            var value = $(this).val();
            sl.slider('setValue', parseInt(value));
        });
        $("#js-money_" + prefixSl).on("slide", function(slideEvt) {
            $("#money-value_" + prefixSl).val(slideEvt.value);
            // onClickFormSlider(prefixSl);
        });
        $("#js-money_" + prefixSl).on("change", function(slideEvt) {
            $("#money-value_" + prefixSl).val(slideEvt.value.newValue);
        });
        $("#js-money_" + prefixSl).on("slideStop", function(slideEvt) {
            // анализ переключений калькулятора:
            analysisSlider(globalMoney, globalDay, prefixSl, 'money');
        });

        var sl1 = $("#js-days_" + prefixSl).slider();
        $("#day-value_" + prefixSl).change(function() {
            var defaultDay = 14;
            var value = $(this).val();
            var maxDay = $('#maxDay_' + prefixSl).val();
            var minDay = $('#minDay_' + prefixSl).val();
            maxDay = parseInt(maxDay);
            minDay = parseInt(minDay);
            var inp = sl1.slider('setValue', parseInt(value));
            if (value > maxDay || value < minDay) {
                $(this).val(defaultDay);
                sl1.slider('setValue', defaultDay);
            }
        });
        $("#js-days_" + prefixSl).on("slide", function(slideEvt) {
            $("#day-value_" + prefixSl).val(slideEvt.value);
            // onClickFormSlider(prefixSl);
        });
        $("#js-days_" + prefixSl).on("change", function(slideEvt) {
            $("#day-value_" + prefixSl).val(slideEvt.value.newValue);
        });
        $("#js-days_" + prefixSl).on("slideStop", function(slideEvt) {
            // анализ переключений калькулятора:
            analysisSlider(globalMoney, globalDay, prefixSl, 'day');
        });

    });

    $('.change-button').click(function() {
        $(this).addClass('hidden');
        $('.hidden-slider').addClass('open-slider');
    });
    $('.carousel').carousel();
    $('.js-numbers').each(function() {
        $(this).appear(function() {
            $('.js-numbers-numeral').countTo({
                onUpdate: function() {
                    var val2 = document.querySelectorAll('.js-numbers-numeral');
                    for (var i = 0; i < val2.length; i++) {
                        var formatedNumber2 = accounting.formatNumber(val2[i].innerHTML);
                        val2[i].innerHTML = formatedNumber2;
                    }
                    if ($('#lang')) {
                        var lang = document.getElementById('lang').innerHTML;
                    }

                    $('#js-percent').append("<span> %</span>");
                    $('#js-number-money').append("<span> грн</span>");
                    if (lang == "ua") {
                        $('#js-number-time').append("<span> хв</span>");
                    } else if (lang == "ru") {
                        $('#js-number-time').append("<span> мин</span>");
                    }
                }
            });
        }, {
            accX: 0,
            accY: 0
        });
    });
    $.reject({
        reject: {
            msie7: true,
            msie8: true,
            firefox3: true,
            safari1: true,
            safari2: true,
            safari3: true,
            safari4: true,
            opera1: true,
            opera2: true,
            opera3: true,
            opera4: true,
            opera5: true,
            opera6: true,
            opera7: true,
            opera8: true,
            opera9: true,
            opera10: true,
            opera11: true,
            opera12: true,
            opera13: true,
            opera14: true,
            opera15: true,
            opera16: true,
            opera17: true,
            opera18: true,
            opera19: true,
            opera20: true,
            opera21: true
        }
    });
    $('#js-change').click(function() {
        $('.form-credit--result').css({
            'display': 'none'
        });
        $('.small-slider-holder').css({
            'display': 'block'
        });
    });
    $('.btn-save').click(function() {
        $('.small-slider-holder').css({
            'display': 'none'
        });
        $('.form-credit--result').css({
            'display': 'block'
        });
    });
    $(function($) {
        $("#card-number").mask("9999 9999 9999 9999", {
            autoclear: false
        });
        $("#card-number1").mask("9999 9999 9999 9999", {
            autoclear: false
        });
        $("#card-number2").mask("9999 9999 9999 9999", {
            autoclear: false
        });
        $("#card-number3").mask("9999 9999 9999 9999", {
            autoclear: false
        });
        $("#phone").mask("+38099 999 9999", {
            autoclear: false
        });
        $('#login').mask("+38099 999 9999", {
            autoclear: false
        });
        $("#tel1").mask("+38999 999 9999", {
            autoclear: false
        });
        $("#work_tell").mask("+38999 999 9999", {
            autoclear: false
        });
        $("#tel2").mask("+38999 999 9999", {
            autoclear: false
        });
        $("#second-phone").mask("+38 999 999 9999", {
            autoclear: false
        });
        $("#inn").mask("9999999999", {
            autoclear: false
        });
        $("#passport").mask("aa999999", {
            autoclear: false
        });
        $("#passportSeries").mask("aa", {
            autoclear: false
        });
        $("#passportNumber").mask("999999", {
            autoclear: false
        });
        $("#passportReestr").mask("99999999-99999", {
            autoclear: false
        });
        $("#passportNumberDoc").mask("999999999", {
            autoclear: false
        });
        $("#passportOld").mask("aa999999", {
            autoclear: false
        });
        $("#colleague-phone").mask("+38099 999 9999", {
            placeholder: " "
        });
        $("#js-number-card").mask("9999 9999 9999 9999", {
            placeholder: " "
        });
        $("#js-cvv").mask("999", {
            placeholder: " "
        });
        $("#sms-code").mask("999999");
        $("#GrossMonthlyIncome").mask("9?99999999", {
            placeholder: " "
        });
        $("#Apartment").mask("9?999", {
            placeholder: " "
        });
        $("#fact_Apartment").mask("9?999", {
            placeholder: " "
        });
        $('#wayforpay-card').mask("9999 9999 9999 9999");
        $('#wayforpay-date').mask("99");
        $('#wayforpay-date1').mask("99");
        $('#wayforpay-cvv').mask("999");
    });
    if ($.browser.mozilla) {
        if ($.browser.version < '34') {
            $('#old-browser').modal('show');
        }
    }
    $('input, textarea').placeholder();
    switch (document.getElementById("lang").innerHTML) {
        case "ru":
            titleSelect = 'Выберите';
            break;
        case "ua":
            titleSelect = 'Виберіть';
            break
        case "en":
            titleSelect = 'Select';
            break
        default:
            titleSelect = 'Выберите';
    }
    var title = document.querySelectorAll('.filter-option');
    for (i = 0; i < title.length; i++) {
        if (title[i] === 'Выберите' || title[i] === 'Виберіть') {
            $('.filter-option').addClass('filter-gray');
        }
    }
    $('.selectpicker').selectpicker({
        title: titleSelect,
        dropupAuto: false
    });
    // $('#language').selectpicker({});
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
    $('.selectpicker').selectpicker('refresh');
    $('#js-save').click(function() {
        $('.btn-wr').removeClass('btn-wr--save');
        $('.form-slider').fadeOut();
        $('.form-change').removeClass('hidden');
    });
    $('.form-text').on('keypress', function() {
        var that = this;
        setTimeout(function() {
            var res = /[^ІіЇїЄєЁёҐґа-яА-Я0-9 - ` , . " "]/g.exec(that.value);
            that.value = that.value.replace(res, '');
        }, 0);
    });
    $('.form-number').on('keypress', function() {
        var that = this;
        setTimeout(function() {
            var res = /\D+/g.exec(that.value);
            that.value = that.value.replace(/[^\d\.]/g, '');
            that.value = that.value.replace(/\..*\./g, '');
            that.value = that.value.replace(/(?:\...).+/g, '');
        }, 0);
    });



    // share-popup

    sharePopupShow();
    sharePopupClose();

});
$('#code-modal').on('shown.bs.modal', function() {
    $('#sms-code').focus()
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomId();


function randomId() {
    var randomMin = 1,
        randomMax = 19;
    var random1 = getRandomInt(randomMin, randomMax);

    var id_item1 = "item-" + random1;

    for (i = randomMin; i <= randomMax; i++) {
        if (i != random1) {
            $('#item-' + i).removeClass('active');
        } else {
            setTimeout(function() {
                $('#item-' + random1).addClass('active');
                setTimeout(function() {
                    randomId();
                }, 5000);
            }, 30000);
        }
    }
}


/*
$(document).ready(function() {

    $(document).mousemove(function(e) {

        if (e.pageY <= 2) {

            // Launch MODAL BOX
            $('#close-window').modal('show');
        }

    });

});*/

$(window).load(function() {
    setTimeout(function() {
        $('#close-window').modal('show');
    }, 50000);
});










$('.help-info').on('touchstart', function(e) {
    'use strict';
    var link = $(this);
    if (link.hasClass('hover')) {
        return true;
    } else {
        link.addClass('hover');
        $('a.taphover').not(this).removeClass('hover');
        e.preventDefault();
        return false;
    }
});
$('#js_edit-1').on("click", function(e) {
    e.preventDefault();
    var parent = $(this).closest('.personal-user--data');
    parent.find('.input-disabled').removeClass('input-disabled').removeAttr("readonly").removeClass("disabled").removeAttr("disabled");
    $('#personal-data .dropdown-toggle').removeClass("disabled");
    $(this).addClass('hidden');
    var sib = $('.personal-table-edit').siblings();
    $('#js_save-1').removeClass('hidden');
    $('#js_save-1').removeClass('hidden');
    $('#js_cancel-1').removeClass('hidden');
    var inp = parent.find('input').val();
});
$('#js_save-1').on("click", function(e) {
    var parent = $(this).closest('.personal-user--data');
    var inp = parent.find('input');
    jQuery.each(inp, function(i, val) {
        var newVal = $(this).val();
        $(this).attr('value', newVal);
    })
});
$('#js_edit-2').on("click", function(e) {
    e.preventDefault();
    var parent = $(this).closest('.personal-user--data');
    parent.find('.input-disabled').removeClass('input-disabled').removeAttr("readonly").removeClass("disabled").removeAttr("disabled");
    $('#employment .dropdown-toggle').removeClass("disabled");
    $(this).addClass('hidden');
    var sib = $('.personal-table-edit').siblings();
    $('#js_edit-2').addClass('hidden');
    $('#js_save-2').removeClass('hidden');
    $('#js_cancel-2').removeClass('hidden');
    var inp = parent.find('input').val();
});
$('#js_save-2').on("click", function(e) {
    var parent = $(this).closest('.personal-user--data');
    var inp = parent.find('input');
    jQuery.each(inp, function(i, val) {
        var newVal = $(this).val();
        $(this).attr('value', newVal);
    })
});
var val = document.querySelectorAll('.format-number');
for (var i = 0; i < val.length; i++) {
    var formatedNumber = accounting.formatNumber(val[i].innerHTML);
    val[i].innerHTML = formatedNumber;
}

function windowHeight() {
    var wh = document.documentElement;
    return self.innerHeight || (wh && wh.clientHeight) || document.body.clientHeight;
}

function scrollBarHeight() {
    var wHeight = windowHeight();
    var hHeight = $('.header').outerHeight();
    var sidebarHeight = wHeight - hHeight;
    $('.fixed-bar').css({
        'max-height': sidebarHeight + 'px',
    });
}
$(window).resize(function() {
    if ($(window).width() > 1025) {
        $(".fixed-bar").stick_in_parent({
            offset_top: 100
        })
    }

    menuOverflow();
    stickyCalcHeight();
    $('.btn-authorize--get').click(function() {

        $('.sticky-calc').addClass('active');

        stickyCalcHeight();

        $(this).attr('disabled', 'disabled');
    });


    $('.js-calc-popup').click(function() {
        $('.sticky-calc').removeClass('active');
        $('.header').css('top', '0px');
        $('.btn-authorize--get').removeAttr('disabled');
    });




    if ($(window).width() < 820) {
        $('.js-advantages-slider').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['', '']
        });
    }

});
$(document).ready(function() {
    var wHeight = windowHeight();
    var hHeight = $('.header').outerHeight();
    var sidebarHeight = wHeight - hHeight;
    var howHeight = $('.js-how').outerHeight();





    if ($(window).width() > 1025) {
        $('#myAffix').affix({
            offset: {
                top: 115
            }
        });
        var xxxx;
        $('#myAffix').on('affix-top.bs.affix', function() {
            setTimeout(function() {
                xxxx = $('.header').outerHeight();
                $('.header_h').animate({
                    height: xxxx
                }, 500);
            }, 1000);
        });;
    }

    if ($(window).width() > 1025) {
        $(".fixed-bar").stick_in_parent({
            offset_top: 100
        })
    }


    if ($(window).width() < 820) {
        $('.js-advantages-slider').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['', '']
        });
    }



});
$('.modal-info--close').on("click", function(e) {
    $('#js-top-credit').removeClass('in');
});
if ($('.js-back-to-top').length) {
    var scrollTrigger = 100,
        backToTop = function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('.js-back-to-top').addClass('show');
            } else {
                $('.js-back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function() {
        backToTop();
    });
    $('.js-back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
$(document).ready(function() {
    $('.numbers').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.terminal-wrapper').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.advantages').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.how-it-work').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.city-images').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.city-modes').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.banks').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });
    $('.container-security').viewportChecker({
        classToAdd: 'animated',
        offset: 100
    });




    // snap svg form map markers

});
$('input.form-capitalize').keyup(function() {
    var firstLetter = document.querySelectorAll('input.form-capitalize');
    for (i = 0; i < firstLetter.length; i++) {
        var val;
        if (firstLetter[i].value) {
            val = firstLetter[i].value.charAt(0).toUpperCase() + firstLetter[i].value.substr(1);
            firstLetter[i].value = val;
        }
    }
})
$('.fixed-bar').width($('.col-lg-3').width());
$(window).resize(function() {
    $('.fixed-bar').width($('.col-lg-3').width());
});
$('.side-bar a, .footer-menu-link').on('click', function() {
    var _this = this;
    var target = $(this).attr('href');
    $("a[href*='/faq/#']").removeClass('active');
    var a = $("a[href='" + target + "']").addClass('active');
    $("a[href*='/faq/#']").removeClass('active');
    var a = $("a[href='" + target + "']").addClass('active');
    var position = target.indexOf('#');
    var id_selector = target.substr(position);
    var top_pos = $('.header').outerHeight();
    var header_height;
    if (top_pos > 110) {
        header_height = $('.header').outerHeight();
    } else {
        header_height = $('.header').outerHeight();
    }
    $('html, body').animate({
        scrollTop: ($(id_selector).offset().top - header_height)
    }, 1200);
    return false;
});
$(document).ready(function() {
    $('.js-seo').jScrollPane({
        arrowScrollOnHover: true
    });
    new ScrollFlow();
});
$('#html5-videos').lightGallery({
    selector: '.item',
    width: '80%',
    pager: false,
    byline: 0,
    badge: 0
});

function header_h() {
    if ($(window).width() > 1025) {
        var header_h_height = $('.header').outerHeight();
    } else {
        var header_h_height = $('.header').outerHeight();
    }
    $('.header_h').css({
        'height': header_h_height
    });
}

function fHowHeight() {
    var howHeight = $('.js-how').outerHeight();
}
$(window).resize(function() {
    setTimeout(function() {
        header_h();
    }, 1000);
});
$(window).on("orientationchange", function() {
    setTimeout(function() {
        header_h();
    }, 1000);
});
$(document).ready(function() {
    setTimeout(function() {
        header_h();
    }, 1000);
});
$(document).ready(function() {
    /*var myHash = location.hash;
    var position1 = myHash.indexOf('#');
    var id_selector1 = myHash.substr(position1);
    if (id_selector1) {
        $('.panel-heading').children('a').addClass('collapsed').attr('aria-expanded', 'false');
        $('.panel-heading').closest('.panel-heading').siblings('.collapse').removeClass('in');
        $(id_selector1).children('.collapsed').removeClass('collapsed').attr('aria-expanded', 'true');
        $(id_selector1).closest('.panel-heading').siblings('.collapse').addClass('in');
    }
    var top_pos = $('.header').outerHeight();
    var header_height = top_pos;
    if (id_selector1) {
        $('html, body').animate({
            scrollTop: ($(id_selector1).offset().top - header_height)
        }, 1200);
    }
    return false;*/
});






$(document).ready(function() {


    // neangelu cities
    chooseFromSelect();

    // скрытие элемнтов
    overflowBlock();

    menuOverflow();
    $("#numbers-play").on({
        click: function() {
            $(this).hide();
            $(this).closest('.iframe-relative').children('.numbers-gif').hide();
            $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        }
    });
    $("#numbers-play-1").on({
        click: function() {
            $(this).hide();
            $(this).closest('.iframe-relative').children('.numbers-gif').hide();
            $('#promo1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        }
    });



    $(".issue-play--holder").on({
        click: function() {
            $(this).hide();
            $(this).closest('.issue-video').children('.numbers-gif').hide();
            $('.issue-step--holder').show();
            $('.issue-list').addClass('issue-hidden');
            $('.issue-step--holder').addClass('issue-visible');
            $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        }
    });
    $('.issue-step--holder').click(function() {
        $('.issue-list').removeClass('issue-hidden');
        $(this).hide();
        $(this).closest('.issue-video').children('.numbers-gif').show();
        $(".issue-play--holder").show();
        $('#promo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    });
    $(".issue-play--holder").on({
        click: function() {
            $(this).hide();
            $(this).closest('.iframe-relative').children('.numbers-gif').hide();
            $('#promo1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        }
    });

    $('.btn-user-close').click(function() {
        $('.info-user').removeClass('active');
    });

    $('.btn-authorize--get').click(function() {
        $('.sticky-calc').addClass('active');
        stickyCalcHeight();
        $(this).attr('disabled', 'disabled');
    });



    $('.js-calc-popup').click(function() {
        $('.sticky-calc').removeClass('active');
        $('.header').css('top', '0px');
        $('.btn-authorize--get').removeAttr('disabled');
    });

    $('.js_AnotherNumber').click(function() {
        onClickAnotherNumber(); // Click кнопки "Ввести другой номер"
    });

    $('#autocomplete').click(function() {
        $('.js-address').removeClass('hidden');
    });

    $('#buttonLogin').click(function() {
        onClickLogin(); // Click кнопки "Войти" в момент входа в ЛК
    });

    // запускаем onKeyUpPhone для получения фокуса и начальных значений телефона:
    if (($('#flagForm').val() == 0) && ($('#regCodereg').val() == '')) {
        onKeyUpPhone('phone');
    }

    // Событие Paste на Input:
    $("input").on("paste", function(event) {
        // console.log('paste');
        pageInputType.paste = true;
        pageInputType.lastTime = Date.now();
    })

    // Событие input на Input:
    $("input").on("input", function(event) {
        // console.log('input');
        pageInputType.input = true;
        pageInputType.lastTime = Date.now();
        return false;
    })

    // Событие show - открытие модального окна:
    $('#modal_auth').on('shown.bs.modal', function() {
        var dataSitekey = $("#buttonLogin1").attr("data-sitekey");
        var widgetId = grecaptcha.render("buttonLogin1", { "sitekey": dataSitekey, "callback": "onReCaptchaVerifyAuth" });
        grecaptcha.reset(widgetId);
    });

});



function stickyCalcHeight() {
    var stickyCalcHeight = $('.sticky-calc.active').outerHeight();
    $('.header').css('top', stickyCalcHeight);
}

/*function stickyCalcMargin() {
    var stickyCalcMargin = $('.sticky-calc').outerHeight();
    stickyCalcMargin = 0 - stickyCalcMargin;
    $('.sticky-calc').css('margin-top', stickyCalcMargin);
}
*/
function preloader(immune, background, color) {


    if (immune == true) {
        $("body > div.preloader").addClass('immune');
    }

    if (background == 'white') {
        $("body > div.preloader").addClass('white');
    } else if (background == 'black') {
        $("body > div.preloader").addClass('black');
    }

    if (color == 'red') {
        $("body > div.preloader span.loading-bar").addClass('red-colored');
        $("body > div.preloader i.radial-loader").addClass('red-colored');
    } else if (color == 'blue') {
        $("body > div.preloader span.loading-bar").addClass('blue-colored');
        $("body > div.preloader i.radial-loader").addClass('blue-colored');
    } else if (color == 'green') {
        $("body > div.preloader span.loading-bar").addClass('green-colored');
        $("body > div.preloader i.radial-loader").addClass('green-colored');
    } else if (color == 'yellow') {
        $("body > div.preloader span.loading-bar").addClass('yellow-colored');
        $("body > div.preloader i.radial-loader").addClass('yellow-colored');
    }

}

$(document).ready(function($) {
    $(window).load(function() {
        setTimeout(function() {
            $('.preloader').fadeOut();
        }, 0);
        setTimeout(function() {
            $('.js-tooltip').addClass('active');
            $('.js-tooltip .close').click(function() {
                $(this).closest('.js-tooltip').css('display', 'none');
            });
        }, 12000);
    });

});






function inWindow(s) {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var currentEls = $(s);
    var result = [];
    currentEls.each(function() {
        var el = $(this);
        var offset = el.offset();
        if (scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
            result.push(this);
    });
    return $(result);
}

$(document).scroll(function() {
    var boxesInWindow = inWindow(".user-data-table tr");

    boxesInWindow.addClass("visible");
});
$(document).ready(function() {
    var boxesInWindow = inWindow(".user-data-table tr");

    boxesInWindow.addClass("visible");
    elementToTop();
});

$('#reg-slider').on('shown.bs.collapse', function() {
    $('#slider_collapse').hide(500);
})
$('#reg-slider').on('hidden.bs.collapse', function() {
    $('#slider_collapse').show(500);
})

function elementToTop() {
    $('.registration-anchor').click(function() {
        var header_height = $('.header').outerHeight();
        $('html, body').animate({
            scrollTop: ($('.block-sum').offset().top - header_height)
        }, 1200);
    });
}

function sharePopupShow() {
    setTimeout(function() {
        $('.share-popup').addClass('active');
        setInterval(function() {
            $('.share-popup').toggleClass('active');
        }, 40000);
    }, 20000);
}



function sharePopupClose() {
    $('.btn-user-close').click(function() {
        $(this).closest('.share-popup').removeClass('active');
    });
}


function anchorLink() {
    $('a[href*="#"]').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $(this).closest('body').find(href);

        /*$('html, body').animate({
            scrollTop: ($(href).offset().top)
        }, 1200);*/
    });
}


function menuOverflow() {
    if ($(window).width() < 992 && $(window).width() > 699) {
        var l = $('.navbar-nav li').length;
        if (l > 3) {
            var el = $('.navbar-nav li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))');
            el.appendTo('.more-menu .dropdown-menu');
            $('.navbar-nav li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))').remove();
        }

        var l1 = $('.second-nav li').length;
        if (l1 > 3) {
            var el1 = $('.second-nav li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))');
            el1.appendTo('.js-second-more .dropdown-menu');
            $('.second-nav li:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))').remove();
        }
    }
}

function navbarClose() {
    $('.js-navbar-close').click(function() {
        $('.navbar-collapse').removeClass('in');
    });
}

function overflowBlock() {
    $('.js-neangelu-all-city').click(function() {
        $('.js-neangelu-city-list').addClass('full-height');
        $(this).addClass('hidden');
        $('.js-neangelu-part-city').removeClass('hidden');
        $('.neangelu-city-item').show(200);
    });
    $('.js-neangelu-part-city').click(function() {
        $('.js-neangelu-city-list').removeClass('full-height');
        $(this).addClass('hidden');
        $('.js-neangelu-all-city').removeClass('hidden');
        $('html, body').animate({
            scrollTop: ($('.neangelu-tickets').offset().top - 120)
        }, 1200);
    });
}



function chooseFromSelect() {
    $('#neangelu-ticket').on('hidden.bs.select', function(e) {
        var value = $('#neangelu-ticket').find('option:selected').val();
        console.log(value);
        var element = $('.js-neangelu-city-list').find('#' + value + '');
        console.log(element);
        $('.neangelu-city-item:not(#' + value + ')').hide(200);
        $('#' + value + '').show(200);
    });

    $('#neangelu-ticket').change(function(e) {
        var value = $('#neangelu-ticket').find('option:selected').val();
        $('.neangelu-city-item:not(#' + value + ')').hide(200);
        $('#' + value + '').show(200);
    });

    
}