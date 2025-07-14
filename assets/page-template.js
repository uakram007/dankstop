


/*
 * Shop By Page Image Switcher
 */
hsjs.shopByCollectionsPage = function(){
  if ($(".template-page#shop-by").length < 1){
    return;
  }
  var $colCat = $('.collection-category'),
      productImage,
      originalImage,
      revertImg,
      backgroundImages = false;

  $colCat.each( function() {
    var $colCatImageModule = $(this).find('.collection-category--left .imod');
    var $colCatImage = $colCatImageModule.find('img');
    var $catColAnchor = $(this).find('.collection-category--link-anchor');

    $catColAnchor.on({
      mouseenter: function() {
        $catColAnchor.removeClass('collection-cat--last-hovered');
        originalImage = $colCatImage.find('img').attr('data-original');
        if (backgroundImages) {
          $colCatImageModule.attr('src', $(this).attr('data-image'));
          $colCatImageModule.css({
            'opacity': '1',
            'background-image': 'url("' + $(this).attr('data-image') + '")'
          });
        } else {
          $colCatImage.attr('src', $(this).attr('data-image'));
        }
      },
      mouseleave: function() {
        $(this).addClass('collection-cat--last-hovered');
      }
    });
  });
};



/*
 * Wholesale funcs
 */
hsjs.wholesaleFuncs = function(){
  
  if ( ! $("#wholesale-online-headshop")[0] ) {
    return
  };

  hsjs.tools.downloadCSS('https://use.fontawesome.com/releases/v5.3.1/css/all.css');

  function addressHover() {
    var addressHovers = $('.address-input');
    addressHovers.on({
      mouseenter: function() {
        addressHovers.not(this).addClass('gray-border');
      },
      mouseleave: function() {
        addressHovers.removeClass('gray-border')
      }
    });
  }

  if ($('#customerEmail').length) {
    var formUrl = '/contact#contact_form';
  }
  else {
    var formUrl = '/account';
  }

  //var formUrl = $form.attr('action');
  var $form = $('#wholesale-registration-form');
  var $allFormFields = $('#all-form-fields');
  var $formButton = $('#wholesale-registration-form .btn');
  var $formResponse = $('#form-response');

//   "response": "You've just taken yet another big step towards great success, and for that we commend you.  You're all set up.  Feel free to shop around and make money with us.",
//   "response_pending_approval": "You've just taken yet another big step towards great success, and for that we commend you.  Please allow our staff up to 48 hours to process your application."
  //% if settings.wholesale_require_registration_approval %}
  //var successMsg = '<i class="fa fa-check-circle"></i><p>{{ 'wholesale.reg_form.response_pending_approval' | t }}</p>';
  //% else %}
  //var successMsg = '<i class="fa fa-check-circle"></i><p>{{ 'wholesale.reg_form.response' | t }}</p>';
  //% endif %}
  var successMsg = '<i class="fa fa-check-circle"></i><p>You\'ve just taken yet another big step towards great success, and for that we commend you.  You\'re all set up.  Feel free to shop around and make money with us.</p>';

  var $wholeFieldset = $('#wholesale-form-container fieldset');
  var $wholeLegend = $('#wholesale-form-container fieldset legend');

  $formButton.on('click', function(e) {
    e.preventDefault(); 
    formSubmitAction();
  });

  function formSubmitAction() {
    var emailAddressVal = $('#contact_email').val();
    if(emailAddressVal.indexOf('@') == -1 || emailAddressVal.indexOf('.') == -1) {
      alert('Please enter a valid email address, such as john@example.com.');
      $('#contact_email').focus();
      $('#contact_email').select();
      //$('#contact_email')[0].setCustomValidity('Enter a valid email address');
      return false;
    } 
    function addVal() {
      var companyAddress = $('#company_address');
      var afv1 = $('#address-line1').val();
      var afv2 = $('#address-line2').val();
      var afv3 = $('#address-city').val();
      var afv4 = $('#address-state').val();
      var afv5 = $('#address-zip').val();
      var afv6 = $('#address-country').val();
      var addrStr = '' + afv1 + '\n' + afv2 + '\n' + afv3 + ', ' + afv4 + '  ' + afv5 + 'n' + afv6;
      companyAddress.val(addrStr);
    }
    addVal();

    $.ajax({
      type: "POST",
      url: formUrl,
      data: $form.serialize()
    })

    .done( function( data, textStatus, jqXHR ) {
      var $response = $(data);
      var submitError = $response.find('.note.form-error').html();

      var submitSuccess = function() { 
        if ( ($response.find('.note.form-success').length  > 0) 
            || (data.indexOf('<link rel="canonical" href="https://dankstop.com/" />') != -1)
            || (data.indexOf('<link rel="canonical" href="https://dankstop.com/">') != -1)
            || ($response.find('#account.account.customer-logged-in.template-customers-account').length > 0) ) {
          return true;
        }
      }

      if (submitError) {
        var errorMsg = '<i class="fa fa-exclamation-triangle"></i> <span id="error-message">' + submitError + '</span>';
        $formResponse.css("visibility", "visible").addClass('submit-error').html(errorMsg).show("slide", { direction: "up" }, 1370);
      } 

      if (submitSuccess()) {
        $('html,body').animate( { scrollTop: $('#wholesale-form-container').offset().top }, 1370);
        $formButton.hide("slide", { direction: "up" }, 1370);
        $allFormFields.hide("slide", { direction: "up" }, 1370, function() {
          $formResponse.css("visibility", "visible").removeClass('submit-error').addClass('submit-success').html(successMsg).show("slide", { direction: "up" }, 1370);
        });
        var wholesaleMailerUrl = 'https://portal.dankstop.com/wholesale/form-receiver.php';
        $.post( wholesaleMailerUrl, $("#wholesale-registration-form").serialize(), function(data) {
        });
      } 

    })

    .fail( function( jqXHR, textStatus, errorThrown ) {
      var errorMsg = '<i class="fa fa-exclamation-triangle"></i> <span id="error-message"><p><b>Oops, something went wrong... What happened?</b></p>';
      var tooManyAttempts = '<span>Too many attempts: Please try again in 10 minutes</span></span>';
      var unknownError = jqXHR.statusText + '</span>';
      var unknownError = errorThrown + '</span>';
      if (jqXHR.status == '429') {
        errorMsg += tooManyAttempts;
        $formResponse.css("visibility", "visible").addClass('submit-error').html(errorMsg).show("slide", { direction: "up" }, 1370);
      } else {
        errorMsg += unknownError;
        $formResponse.css("visibility", "visible").addClass('submit-error').html(errorMsg).show("slide", { direction: "up" }, 1370);
      }
    })

    return false; 
  }

  var wholesaleScripts = ['https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
                          '//d79i1fxsrar4t.cloudfront.net/jquery.liveaddress/3.2/jquery.liveaddress.min.js'];
  hsjs.tools.downloadJS(wholesaleScripts);

  $(window).on('load', function(){
    addressHover();
    jQuery.LiveAddress(
      {
        key: "33538254780982992", 
        autocomplete: 7,
        target: "US",
        addresses: [
          {
            id: 'wholesale-registration-form',
            address1: '#address-line1',
            address2: '#address-line2',
            locality: '#address-city',
            administrative_area: '#address-state',
            postal_code: '#address-zip',
            country: '#address-country'
          }
        ]
      });    
  });

};



hsjs.page_template = {
  
  refresh: function(){

    // Shop By Collections page
    hsjs.shopByCollectionsPage();
    
    // Wholesale Page
    hsjs.wholesaleFuncs();

  },
  
  init: function(){

    // Set product page JS loaded to true so we don't load it again
    hsjs.cache.site_data.theme.page_template_js_loaded = true;
    
    // Shop By Collections page
    hsjs.shopByCollectionsPage();
    
    // Wholesale Page
    hsjs.wholesaleFuncs();
    
  }

};


hsjs.page_template.init();
