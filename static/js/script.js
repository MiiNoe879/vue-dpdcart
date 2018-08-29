$(document).ready(function () {

  // UI selection
  $('.ui.selection.dropdown').dropdown();

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  $('.product-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-slider-nav'
  });
  $('.product-slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slider',
    centerMode: true,
    focusOnSelect: true,
  });


  // spinner js
  $('.spinner .btn:first-of-type').on('click', function () {
    var btn = $(this);
    var input = btn.closest('.spinner').find('input');
    if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
      input.val(parseInt(input.val(), 10) + 1);
    } else {
      btn.next("disabled", true);
    }
  });
  $('.spinner .btn:last-of-type').on('click', function () {
    var btn = $(this);
    var input = btn.closest('.spinner').find('input');
    if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
      input.val(parseInt(input.val(), 10) - 1);
    } else {
      btn.prev("disabled", true);
    }
  });


  // Card js
  new Card({
    form: document.querySelector('.card-form'),
    container: '.card-wrapper',

    placeholders: {
      number: '**** **** **** ****',

      name: 'Arya Stark',
      expiry: '**/****',
      cvc: '***'
    }
  });


  $('.des').slimScroll({
    height: '628px',
    color: 'rgb( 200, 201, 206 )',
    railVisible: true,
    railColor: 'rgb( 240, 241, 245 )',
    railOpacity: 1,
    alwaysVisible: true,
    distance: '0px',
  })

  $('.payment-item .label').on('click', function (event) {
    if ($(this).next().hasClass('show')) {
      $(this).next().collapse('show');
    } else {
      $(this).parents('.payment-block').find('.collapse').collapse('hide');
      $(this).next().collapse('show');
    }
  });

  $(".payment-item .label").click(function () {
    $(".payment-item .label").removeClass("active");
    $(this).addClass("active");
  });


  // input checked
  $("input:checked").parent().addClass('selected');
  $(":radio").live('change', function () {
    if ($(this).prop('checked')) {
      $(':radio[name="' + $(this).attr('name') + '"]').parent().removeClass('selected');
      $(this).parent().addClass('selected');
    }
  });
  // $(":checkbox").live('change', function () {
  //     if ($(this).prop('checked')) {
  //         $(this).parent().addClass('selected');
  //     } else {
  //         $(this).parent().removeClass('selected');
  //     }
  // });

});
