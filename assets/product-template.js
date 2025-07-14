

hsjs.tools.htmlEntities = function(str){
  return String(str).replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
}



/*
 * Fancybox
 */
hsjs.fancybox = {
  
  styleSrc: "//cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css",
  
  scriptSrc: "//cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js",
  
  jqueryZoomSrc: "//cdnjs.cloudflare.com/ajax/libs/jquery-zoom/1.7.21/jquery.zoom.min.js",
  
  fancybox_js_loaded: false,
  fancybox_css_loaded: false,
  jquery_zoom_loaded: false,
  
  // This src below maybe obsolete
  customSrc: hsjs.cache.site_data.theme.fancybox_src,
  
  toggleClass: "open-fancybox",

  attachFancyboxHandler: function(){

    $("." + hsjs.fancybox.toggleClass).on("click", function(){
      
      var product_images = $(".product-photo-container .thumb img:not(.zoomImg)").map(function(key, image){
        return ({ src: image.dataset.src || image.src, opts: { caption: image.alt } });
      });

      var slick_current_slide =  $(".slider-for").slick("slickCurrentSlide") || $(".slick-current.slick-active").index();
      
      $.fancybox.open(
        product_images
        , {
          "type"          :   "image",
          "index"         :    slick_current_slide,
          "loop"          :   "true"
//           ,
//           thumbs: {
//             autoStart: true
//           },
//           "openEffect"    :   "elastic",
//           "closeEffect"   :   "elastic",
//           "nextEffect"    :   "fade",
//           "openSpeed"     :   600, 
//           "closeSpeed"    :   200,
//           helpers: {
//             buttons: {}
//           }
        }
      );

    });

  },

  initZoom: function(){
    
    hsjs.tools.waitForElement(
      ".product-img-box [data-zoom]",
      
      function(){
        
        var t = $(".product-img-box [data-zoom]");
        1200 <= $(window).width() ? t.zoom() : t.trigger("zoom.destroy");
        
      },
      
      3700
    )
  },

  onloadCallback: function(){
    
    hsjs.tools.waitForJSObject(
      
      "$fancybox", 

      function(){
        
        // Set loaded flag to true
        hsjs.fancybox.fancybox_css_loaded = true;
        hsjs.fancybox.fancybox_js_loaded = true;
        
        // Turn off fancybox history has
        $.fancybox.defaults.hash = false;
        
        // Launch fancybox
        hsjs.fancybox.attachFancyboxHandler();

      },
      
      7000

    );

    hsjs.tools.waitForJSObject(
      
      "$zoom", 

      function(){

        // Set loaded flag to true
        hsjs.fancybox.jquery_zoom_loaded = true;
        
        // Launch jQuery Hover Zoom
        hsjs.fancybox.initZoom();

      },
      
      7000

    );
    
  },
  
  load: function(){

    // Download styles
    if ( ! hsjs.fancybox.fancybox_css_loaded ){
      hsjs.tools.downloadCSS(hsjs.fancybox.styleSrc);
    }
    
    // initiate jquery zoom
    if ( ! hsjs.fancybox.jquery_zoom_loaded ){
      hsjs.tools.downloadJS(hsjs.fancybox.jqueryZoomSrc);
    }
    
    // Download JS
    if ( ! hsjs.fancybox.fancybox_js_loaded ){
      hsjs.tools.downloadJS(
        //       this.customSrc,
        hsjs.fancybox.scriptSrc,
        hsjs.fancybox.onloadCallback
      );
    }
    
    // Launch widgets if JS already loaded
    else {

        // Launch fancybox
        hsjs.fancybox.attachFancyboxHandler();
      
        // Launch jQuery Hover Zoom
        hsjs.fancybox.initZoom();
      
    }
    
  },
  
  init: function(){
    
    hsjs.fancybox.load();
    
  }
  
};



/*
 * Norton customer trust  
 */
hsjs.norton = {
  validate: function(){
    if (window._GUARANTEE && _GUARANTEE.Loaded) {
      _GUARANTEE.Hash = "K%2B9EollA163nwr%2FWWNOur5k0iuJ3oEv0MowkI51QQWWmTrHm1HGfnCPgkjippiSGetep%2FTY0dzay1rWC9kFiAw%3D%3D";
      _GUARANTEE.WriteSeal("_GUARANTEE_SealSpan", "GuaranteedSeal");
//       if (document.location.href.match(/\/products\//i)) {
        _GUARANTEE.InsertKickers = [
          {"loc":"After","anchorTagName":"DIV","anchorID":"nortonPlacer","anchorClass":"","path":[],"kickerType":"Kicker Custom 3","kickerStyle":"margin:0 0 10px 0;","containerTagName":"","containerStyle":""}
        ];
        _GUARANTEE.WriteKickers();
//       }
      function nortonCartWidget() {
        if ( hsjs.tools.isMobile() ) {
          _GUARANTEE.InsertKickers = [
            {"loc":"After","anchorTagName":"DIV","anchorID":"","anchorClass":"cart-total-checkout","path":[],"kickerType":"Kicker Custom 3","kickerStyle":"","containerTagName":"DIV","containerStyle":"text-align:center;"}
          ];
        }
        else {
          _GUARANTEE.InsertKickers = [
            {"loc":"After","anchorTagName":"DIV","anchorID":"","anchorClass":"cart-total-checkout","path":[],"kickerType":"Kicker Custom 5","kickerStyle":"","containerTagName":"DIV","containerStyle":"text-align:center;"}
          ];
        }
        _GUARANTEE.WriteKickers();
      }
      if (hsjs.flags.cartAjaxOpened) {
        function cartOpenFirstNorton() {
          if ($(".cart-total-checkout").length) {
            nortonCartWidget();
          }
          else {
            setTimeout(function(){
              cartOpenFirstNorton();
            }, 173);
          }
        }
        if ($("form[action='/cart'] [id*='Kicker']").length === 0) {
          cartOpenFirstNorton();
        }
      }
      else {
        hsjs.cache.$document.one("cartAjaxOpened", function(){
          function nortonAjaxWidget() {
            if ($(".cart-total-checkout").length && $("form[action='/cart'] [id*='Kicker']").length === 0) {
              nortonCartWidget();
            }
            else {
              setTimeout(function(){
                nortonAjaxWidget();
              }, 173);
            }
          }
          nortonAjaxWidget();
        });
      }
    }
    else {
      setTimeout(function(){
        hsjs.norton.validate();
      }, 173);
    }
  },
  load: function(){
    var nortonImgSrc = [window.location.protocol + "//nsg.symantec.com/Web/Seal/AltSealInfo.aspx?S=Large&T=M&Elem=ImgTagSeal&HASH=K%2B9EollA163nwr%2FWWNOur5k0iuJ3oEv0MowkI51QQWWmTrHm1HGfnCPgkjippiSGetep%2FTY0dzay1rWC9kFiAw%3D%3D&CBF=AB&AB=1&DP=fn=;src=ImgTagSeal;grt=true"];
    var nortonImage = new Image();
    nortonImage.src = nortonImgSrc;
    nortonImage.className = "hidden";
    hsjs.cache.$body.append(nortonImage);
    var nortonScriptSrc = [window.location.protocol + "//nsg.symantec.com/Web/Seal/gjs.aspx?SN=960652208"];
    hsjs.tools.downloadJS(nortonScriptSrc);
    hsjs.norton.validate();
  },
  init: function(){
    if (
      hsjs.vars 
      && (hsjs.vars.norton && hsjs.vars.norton.enable == "true") 
      && (hsjs.vars.template && hsjs.vars.template.name == "product")
    ){
      hsjs.norton.load();
    }
  }
};



/*
 * Bold RO Recurring Orders Subscriptions Custom UI
 */
hsjs.boldRo = {
  
  commonScriptsLoaded: false,
  
  notProductPageTimeout: false,
  
  commonScripts: window.location.origin + "?view=bold-ro",
  
  productScripts: function(){
    return window.location.pathname + "?view=bold-ro"
  },
  
//   commonScripts: function(){
//     return window.location.pathname + "?view=bold-ro"
//   },
  
  customUi: function(){
    hsjs.tools.waitForElement(
      ".bold-ro__frequency-type.bold-ro__order-interval",
      function(){
        
        // Get general 
        var $inputs_container = $(".bold-ro__order-interval-container");        
        var activeSelClass = "custom-active-bold-selector";
        $inputs_container.find(".custom-bold-selectors").remove();
        
        
        // Setup and replace freq num selector
        var $freq_num_select = $(".bold-ro__frequency-num");
        $freq_num_select.hide();
        var $custom_freq_num_selectors = $("<div class='custom-bold-freq-num-selectors custom-bold-selectors'>");
        $inputs_container.append($custom_freq_num_selectors);        
        $freq_num_select.find("option").each(function(index, item){
          var $custom_freq_num_btn = $("<div class='custom-bold-freq-num-btn custom-bold-btn' data-freq-num='"+item.value+"'>");
          $custom_freq_num_btn.text(item.value);
          if ($freq_num_select.val() == item.dataset.frequencyNum){
            $custom_freq_num_btn.addClass(activeSelClass);
          }
          $custom_freq_num_selectors.append($custom_freq_num_btn);
        });
        
        // Attach handler to freq num selectors
        var $custom_freq_num_btns = $(".custom-bold-freq-num-btn");
        $custom_freq_num_btns.off("click.customBoldNumSelectors").on("click.customBoldNumSelectors", function(){
          var new_freq_num_val = this.dataset.freqNum;
          $freq_num_select.val(new_freq_num_val);
          $custom_freq_num_btns.removeClass(activeSelClass);
          $(this).addClass(activeSelClass);
        });
        
        
        // Setup and replace freq type selector
        var $freq_type_selector = $(".bold-ro__frequency-type.bold-ro__order-interval");
        $freq_type_selector.hide();
        var $custom_freq_type_selectors = $("<div class='custom-bold-freq-type-selectors custom-bold-selectors'>");
        $inputs_container.append($custom_freq_type_selectors);
        $freq_type_selector.find("option").each(function(index, item){
          var $custom_freq_type_btn = $("<div class='custom-bold-freq-type-btn custom-bold-btn' data-freq-type='"+item.value+"'>");
          $custom_freq_type_btn.text(item.dataset.frequencyTypeText);
          if ($freq_type_selector.val() == item.dataset.frequencyType){
            $custom_freq_type_btn.addClass(activeSelClass);
          }
          $custom_freq_type_selectors.append($custom_freq_type_btn);
        });
        
        // Attach handler to freq type selectors
        var $custom_freq_type_btns = $(".custom-bold-freq-type-btn");
        $custom_freq_type_btns.off("click.customBoldTypeSelectors").on("click.customBoldTypeSelectors", function(){
          var new_freq_type_val = this.dataset.freqType;
          $freq_type_selector.val(new_freq_type_val);
          $custom_freq_type_btns.removeClass(activeSelClass);
          $(this).addClass(activeSelClass);
        });
        
        
        var $prepaid_total_occurances = $(".bold-ro__prepaid-total-recurrences");
        var $prepaid_length_select = $(".bold-ro__prepaid-length-select");
        $prepaid_length_select.hide();
        var $custom_prepaid_length_selectors = $("<div class='custom-bold-prepaid-length-selectors custom-bold-selectors'>");
        $prepaid_length_select.find("option").each(function(index, item){
          var $custom_prepaid_length_btn = $("<div class='custom-bold-prepaid-length-btn custom-bold-btn' data-bold-value='"+item.value+"' data-prepaid-length='"+item.dataset.length+"'>");
          $custom_prepaid_length_btn.text(item.dataset.length);
          if ($prepaid_length_select.val() == item.value){
            $custom_prepaid_length_btn.addClass(activeSelClass);
          }
          $custom_prepaid_length_selectors.append($custom_prepaid_length_btn);
        });
        var $prepaid_select_container = $(".bold-ro__prepaid-length");
        $prepaid_select_container.remove(".custom-bold-selectors").append($custom_prepaid_length_selectors);

        // Attach handler to prepaid length selectors
        var $custom_prepaid_length_btns = $(".custom-bold-prepaid-length-btn");
        $custom_prepaid_length_btns.off("click.customBoldPrepaidLengthSelectors").on("click.customBoldPrepaidLengthSelectors", function(){
          var new_prepaid_length_val = this.dataset.boldValue;
          $prepaid_length_select.val(new_prepaid_length_val);
          $custom_prepaid_length_btns.removeClass(activeSelClass);
          $(this).addClass(activeSelClass);

          // Trigger custom event to make BOLD update total price
          if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            $prepaid_length_select[0].dispatchEvent(evt);
          }
          else {
            $prepaid_length_select[0].fireEvent("onchange");
          }
        });


        // Set initial BOLD Subscribe or Buy class
        if ($("[name=bold-ro__selector_radio_button]:checked").val() == "0"){
          $(".product .product-shop").removeClass("bold-subscribe").addClass("bold-buy");
        } 
        else if ($("[name=bold-ro__selector_radio_button]:checked").val() == "1") {
          $(".product .product-shop").removeClass("bold-buy").addClass("bold-subscribe");
        }
        // Set BOLD inputs radios handler for Buy or Subscribe
        $("[name=bold-ro__selector_radio_button]").on("click", function(){
          if ($(this).val() == "0"){
            $(".product .product-shop").removeClass("bold-subscribe").addClass("bold-buy");
          } 
          else if ($(this).val() == "1") {
            $(".product .product-shop").removeClass("bold-buy").addClass("bold-subscribe");
          }
        });
        
      },
      15000
    );
  },
  
  prepaidFix: function(){
    
    $(".bold-ro__prepaid-checkbox-lbl").off(".BoldPrepaidClick").on("click.BoldPrepaidClick", function(){
      $(".bold-ro__prepaid-checkbox").trigger("click");
    });
    
    $(".bold-ro__prepaid-gift-lbl").off(".BoldPrepaidClick").on("click.BoldPrepaidClick", function(){
      $(".bold-ro__prepaid-gift-checkbox").trigger("click");
    });
    
  },
  
  onWidgetLoaded: function(){
    
//     console.log("on widget loaded");

    BOLD.common.eventEmitter.off("BOLD_RECURRING_ORDERS_widget_loaded").on("BOLD_RECURRING_ORDERS_widget_loaded",function(e){
      hsjs.boldRo.prepaidFix();
    });
    
  },
  
  reboot: function(){

    // Download all bold scripts
    hsjs.tools.ajaxCall(
      
      hsjs.boldRo.productScripts(),

      // Once downloaded, append to body
      function(html_data){
        
        hsjs.tools.attachToBody(
          html_data, 
          
          // Once appended, run calback
          function(){

            // Wait for BOLD RO Common
            hsjs.tools.waitForJSObject(
              "BOLD.recurring_orders.app.reboot",
              
              function(){

                // Reboot BOLD RO
                try {

                  BOLD.recurring_orders.app.reboot();

                }
                catch(e) {
//                   console.log("Ugh, BOLD: " + e.message);
                }
                finally {
                  
                  // Re-adjust custom UI
                  hsjs.boldRo.customUi();
                  hsjs.boldRo.onWidgetLoaded();
                  
                }
                
              },
              
              5000
              
            );
            
          }
          
        );
        
      }
      
    );

  },

  reload: function(){

    // clear checker timeout
    clearTimeout(this.checkerTimeout);
    
    // clear timeout, in case it started but hasn't finished
    clearTimeout(this.notProductPageTimeout);

    if ( ! hsjs.boldRo.commonScriptsLoaded ){

      // Load Bold common
      hsjs.boldRo.load("all");

    }
    else {

      // Reboot Bold Product
      hsjs.boldRo.reboot();

    }

  },

  checker: function(){

    this.checkerTimeout = setTimeout(function(){
      
      if ( $(".product_top .ro_widget").length > 0 && $(".product_top .ro_widget:empty").length > 0 ){

        // Re-launch checker
        hsjs.boldRo.reload();

      }
      
    }, 5000);
    
  },
  
  load: function(type){

    // Download all bold scripts
    hsjs.tools.ajaxCall(
      
      hsjs.boldRo.commonScripts,

      // Once downloaded, append to body
      function(html_data){
        
        hsjs.tools.attachToBody(
          html_data, 
          
          // Once appended, run calback
          function(){
            
            // Set scripts loaded flag to true, to prevent double-loading
            hsjs.boldRo.commonScriptsLoaded = true;
            
            if (type == "product"){

              // reboot BOLD RO
              hsjs.boldRo.reboot();

              // Check if its populated, and re-init if not
              hsjs.boldRo.checker();

            }
            
          }
        )
      }
    );

  },
  
  init: function(){
    
    if (hsjs.urlTemplate(window.location.href) != "product"){
      
      this.notProductPageTimeout = setTimeout(function(){
      
        hsjs.boldRo.load("all");
        
      }, 1713);
      
      //return;
      
    }
    else {
      
      // clear timeout, in case it started but hasn't finished
      clearTimeout(this.notProductPageTimeout);
      
      // load all scripts
      this.load("product");
      
    }
    
  }

};



/*
 * PushOwl
 */
hsjs.pushowl = {
  
  scriptSrc: "https:\/\/cdn.pushowl.com\/latest\/sdks\/pushowl-shopify.js?subdomain=dankstop-9\u0026environment=production\u0026guid=f68241ab-e5b2-4bee-ad4a-116324259924\u0026shop=dankstop-9.myshopify.com",

  showWidget: function(){
    $(".pushowl-widget-node").show();
  },

  hideWidget: function(){
    $(".pushowl-widget-node").hide();
  },

  reload: function(){
    
    if (
      typeof pushowl !== "undefined" 
      && window.pushowl 
      && typeof pushowl.render !== "undefined"
    ){
      
      setTimeout(function(){
        
        pushowl.render(true);
        hsjs.pushowl.showWidget();
        
      }, 1000);
      
    }
    
  },
  
  load: function(){
    
    hsjs.tools.downloadJS(this.scriptSrc);
    
  },
  
  init: function(){
    
    this.load();
    
  }
  
}



/*
 * Watch List for In Stock Notify
 */
hsjs.watchlist = {
  
  template: (product_type, product_handle, variant_id) => `
    <div id="inStockNotify" class="in-stock-notify">
      <div class="isn--inner grid">
        <div class="isn--title grid-item">
          <div class="not-in-watchlist-msg">
            <p class="h3">
              Want to be notified when this ${product_type} is restocked?
            </p>
            <p>Sign up for a spam-free, back in stock notification below.  We'll send you an email or a text when it's back in stock.</p>
          </div>
          <div class="in-watchlist-msg">
            <p class="h3">
              You will be notified when this ${product_type} is restocked
            </p>
            <p>You are already signed up for a spam-free, back in stock notification.  We'll send you an email or a text when it's back in stock.</p>
          </div>
        </div>
        <div class="settings-msg grid-item">
          <p><small>You can change your phone and email at <a href="https://dankstop.com/account?view=watchlist#settings" target="_blank" rel="noopener">Watchlist Settings</a>.</small></p>
        </div>
        <div class="isn--form grid-item" id="inStockNotifyForm">
          <div class="grid">
            <div class="grid-item large--one-whole">
			  <p>
                <span class="watchlist-toggle add-to-watchlist btn" data-producthandle="${product_handle}" data-variantid="${variant_id}">
                  <svg width="100%" height="100%"><use xlink:href="#watchlistEye" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg> 
                  <span class="btn-text">Add To Watchlist</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  
  contact_template: (customer_email) => `
    <div class="isn--contact email-sec grid-item large--three-sixths text-right medium-down--text-center">
      <p>
        <label for="isn-email">
          <span>By Email&nbsp;</span>
        </label>
        <input type="email" name="email" id="isn-email" value="${customer_email}" placeholder="your@email.com">
      </p>
    </div><div class="or-sec grid-item large--one-sixth">
      <p>- and /&nbsp;or -</p>
    </div><div class="isn--contact phone-sec grid-item large--two-sixths text-left medium-down--text-center">
      <p>
        <label for="isn-phone">
          <span>Via Text&nbsp;</span>
        </label>
        <input type="number" pattern="[0-9]" name="phone" id="isn-phone" value="" placeholder="Numbers only, ex. 1234567890">
      </p>
    </div><div class="promo-sec grid-item large--one-whole">
      <p><label><input type="checkbox" name="promo-signup">Also subscribe to the email mailing list for exclusive deals &amp; discounts</label></p>
    </div>
  `,
  
  login_template: (product_type) => `
    <div id="inStockNotify" class="in-stock-notify">
      <div class="isn--inner grid">
        <div class="isn--title grid-item">
          <div class="not-in-watchlist-msg">
            <p class="h3">
              Want to be notified when this ${product_type} is restocked?
            </p>
            <p>Sign up for a spam-free, back in stock notification below.  We'll send you an email or a text when it's back in stock.</p>
          </div>
          <div>
            <p>Please log in or create an account to use the watchlist</p>
            <a href="/account/login" class="btn" rel="nofollow">Sign in</a>
          </div>
       </div>
      </div>
    </div>
  `,
  
  validatePhoneNum: function(phone_num){
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = phone_num.replace(/\D/g, "");
    return phoneRe.test(digits);
  },
  
  validateEmail: function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);  
  },
  
  refreshCustomerWatchlist: function(){
    // Refresh customer.watchlist list of products
    if (hsjs.vars.customer.logged_in) {
      hsjs.tools.ajaxCall("https://dankstop.com/account?view=watchlist-json", function(data){
        
//         console.log(data);
        
        var customer_watchlist = JSON.parse(data).customer_watchlist;
        
//         console.log(customer_watchlist);
        
        hsjs.vars.customer.watchlist.products = customer_watchlist.products;
        hsjs.vars.customer.watchlist.email = customer_watchlist.email;
        hsjs.vars.customer.watchlist.phone = customer_watchlist.phone;
      });
    }
  },
  clickHandler: function(){
    var $this = $(this);
    //$this.off("click.wishlistAdd");
    var product_handle = $this.data("producthandle");
    var variant_id = $this.data("variantid");
    
    var $email_label = $(".isn-email-label");
    var $email_input = $("#isn-email");
    var customer_email = $email_input.val();
    if ( customer_email != "" && ! hsjs.watchlist.validateEmail(customer_email) ){
      $email_label.addClass("text-danger");
      $email_input.addClass("form-control is-invalid").focus();
      return;
    }
    else {
      $email_label.removeClass("text-danger");
      $email_input.removeClass("form-control is-invalid");
    }
    
    var $phone_label = $(".isn-phone-label");
    var $phone_input = $("#isn-phone");
    var customer_phone = $phone_input.val();
    if ( customer_phone != "" && ! hsjs.watchlist.validatePhoneNum(customer_phone) ){
      $phone_label.addClass("text-danger");
      $phone_input.addClass("form-control is-invalid").focus();
      return;
    }
    else {
      $phone_label.removeClass("text-danger");
      $phone_label.removeClass("form-control is-invalid");
    }
    
    var customer_id = (hsjs.vars && hsjs.vars.customer && hsjs.vars.customer.id && hsjs.vars.customer.id.length > 0 && hsjs.vars.customer.id !== "Not Logged In") ? hsjs.vars.customer.id : (customer_email ? customer_email : customer_phone);
	var customer_promo = $("input[name=promo-signup]").prop("checked");
    var $watchlist_text = $this.find(".btn-text");
    
    //$this.addClass("loading-spinner");
    var wishlist_action = "addToWatchlist";
    if ($this.hasClass("in-watchlist")) {
      wishlist_action = "removeFromWatchlist";
    }
    else {
      wishlist_action = "addToWatchlist";
    }
    var watchlistClickParams = {
      "watchlistAction": wishlist_action, 
      "customer_id": customer_id,
      "product_handle": product_handle,
      "variant_id": variant_id
    };

    // Set customer contact details
    if (customer_email && customer_email != ""){
      watchlistClickParams.email = customer_email;
    }
    if (customer_phone && customer_phone != ""){
      watchlistClickParams.phone = customer_phone;
    }
    if (customer_promo){
      watchlistClickParams.promo = customer_promo;
    }

//     console.log(watchlistClickParams);
    
    $.ajax({
      url: hsjs.watchlist.endpointUrl,
      type: "POST",
      dataType:"json",
      data: watchlistClickParams,
      success: function(data){
        if (customer_email && customer_email != ""
            && customer_phone && customer_phone != ""){
          $(".email-sec, .or-sec, .phone-sec").remove();
        }
        if (customer_promo){
          $(".promo-sec").remove();
        }
        if ($this.hasClass("in-watchlist")) {
          $this.removeClass("in-watchlist btn-danger");
          $this.parents("#inStockNotify").removeClass("in-watchlist");
          $watchlist_text.text(hsjs.watchlist.add_text);
        }
        else {
          $this.addClass("in-watchlist btn-danger");
          $this.parents("#inStockNotify").addClass("in-watchlist");
          $watchlist_text.text(hsjs.watchlist.remove_text);
        }
        //$this.removeClass("loading-spinner");
		hsjs.watchlist.refreshCustomerWatchlist();
      },
      error: function(e){
        console.log('ajax error', e);
      }
    });
  },
  updateSettingsHandler: function(){
    hsjs.cache.$document.on("click", "#updateWatchlist", function(){
      var email_val = ($("#isnEmail").val() != "") ? $("#isnEmail").val() : "false";
      var phone_val = ($("#isnPhone").val() != "") ? $("#isnPhone").val() : "false";
      var client_shop = $("#client_shop").val();
      var watchlist_update_params = {
        "watchlistAction": "true", 
        "customer_id": (hsjs.vars.customer.id.length > 0 && hsjs.vars.customer.id !== "Not Logged In") ? hsjs.vars.customer.id : null,
        "shop": client_shop,
        "email": email_val,
        "phone": phone_val
      };

      $.ajax({
        url: hsjs.watchlist.settingsUrl,
        type: "POST",
        dataType:"json",
        data: watchlist_update_params,
        success: function(data){
          console.log(data);
        },
        error: function(xhr, ajaxOptions, thrownError){
          console.log('ajax error ', xhr);
        }
      });
    });
  },
  attachHandler: function(){  
    hsjs.cache.$document.on("click."+this.$toggleSelector, this.$toggleSelector, this.clickHandler);
    hsjs.watchlist.updateSettingsHandler();
  },
  init: function() {
    this.endpointUrl = "//portal.dankstop.com/public/product-watchlist/watchlist.php";
    this.settingsUrl = "//portal.dankstop.com/public/product-watchlist/watchlist-actions.php";
    
//       "btn_add": "Add To Watchlist",
//       "btn_remove": "Remove From Watchlist"
//     this.add_text = "{{ 'products.watchlist.btn_add' | t }}";
//     this.remove_text = "{{ 'products.watchlist.btn_remove' | t }}";
    this.add_text = "Add To Watchlist";
    this.remove_text = "Remove From Watchlist";
    
    this.$toggleSelector = ".watchlist-toggle";
    this.attachHandler();
  }
};



/*
 * Product Warranty for eligible brands
 */
hsjs.productWarranty = {
  getProductVariantIdToWarranty: function() {
    return $("#product-selectors").val();
//     return Shopify.variantSelected.id;
  },
  getVariantToWarrantyPrice: function() {
    return true;
  },

  s4: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },

  guid: function() {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
  },

  submitProduct: function(){
    console.log("Warranty Plan added for " + this.getProductVariantIdToWarranty());
  },

    
  addWarranty: function(product_price, variant_id, product_handle, bundle_id, callback){
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: {
        quantity: Math.ceil(product_price * this.warrantyDecimalPercentage),
        id: this.warrantyMainVariantId,
        properties: {
          '_item_id'  : variant_id,
          '_item_name' : product_handle,
          '_policy_id' : this.guid(),
          '_bundle_addon' : bundle_id
        }
      },
      dataType: "json",
      success: function(line_item) { 
        hsjs.productWarranty.submitProduct();
        hsjs.tools.runCallback(callback);
      },
      error: function (request, status, error) {
        console.log(request.responseText);
        hsjs.tools.runCallback(callback);
      }
    });
  },
  
  attachClickEvent: function(product_variant_price, variant_id, product_handle) {
    $("#addWarranty").one( "click", function(event) {
      event.preventDefault();	
      this.addWarranty(this.getProductVariantIdToWarranty(), variant_id, product_handle);
    });
  },

  warrantyEligible: function(product_brand) {
    if (hsjs.tools.isThisInArray(product_brand, hsjs.productWarranty.warrantyEligibleBrands)) {
      hsjs.productWarranty.warrantyProductText = "<p class='warranty-eligible' title='Eligible for PieceProtect Protection Plan'><span class='product-warranty-icon'></span> <strong class='green'>PieceProtect</strong> Eligible</p>";
    }
    return true;
  },

  // TODO: this needs to be changed/moved
//   addToCartWarranty: function(product_variant_price, variant_id, product_handle) {
//     var addToCartClicked = false;
//     $("#AddToCart").click(function(event) {		  		
//       if(!$(this).hasClass("disabled") && addToCartClicked === false) {		  
//         addToCartClicked = true;
//         if($("#warrantyProgram").length > 0 || $(".warranty-program").length > 0) {
//           if($("#addWarrantyPlan").is(":checked")) {
//             this.addWarranty(this.getProductVariantIdToWarranty(), variant_id, product_handle);
//           }
//           else {
//             $("#warrantyProgram").show();
//             window.scrollTo(0,0);
//           }
//         }
//         else { 
//           $(this).prop("disabled", true);
//           hsjs.productWarranty.submitProduct(); 
//         }
//       }
//       event.preventDefault();
//     });
//   },
  
  cacheWarrantyVars: function(){
    this.warrantyEnabled = hsjs.cache.site_data.theme.warranty_enabled,
    this.warrantyProductHandle = hsjs.cache.site_data.theme.warranty_product_handle,
    this.warrantyProductId = hsjs.cache.site_data.theme.warranty_product_id,
    this.warrantyMainVariantId = hsjs.cache.site_data.theme.warranty_main_variant_id,
    this.warrantyDecimalPercentage = hsjs.cache.site_data.theme.warranty_decimal_percentage,
    this.warrantyEligibleBrands = hsjs.cache.site_data.theme.warranty_eligible_brands,
    this.warrantyProductText = hsjs.cache.site_data.theme.warranty_product_text;
  },
  
  init: function(){
    hsjs.productWarranty.cacheWarrantyVars();
    if (hsjs.vars.template.name == "product"){
      $.getJSON("/products/"+hsjs.vars.pageHandle+".js", function(product) {
        if (hsjs.productWarranty.warrantyEligible(product.vendor)) {
          hsjs.productWarranty.attachClickEvent();
        }
      });
    }
  }

};



/*============================================================================
  (c) Copyright 2015 Shopify Inc. Author: Carson Shold (@cshold). All Rights Reserved.

  Plugin Documentation - https://shopify.github.io/Timber/#ajax-cart

  Ajaxify the add to cart experience and flip the button for inline confirmation,
  show the cart in a modal, or a 3D drawer.

  This file includes:
    - Basic Shopify Ajax API calls
    - Ajaxify plugin

  This requires:
    - jQuery 1.8+
    - handlebars.min.js (for cart template)
    - modernizer.min.js
    - snippet/ajax-cart-template.liquid

  JQUERY API (c) Copyright 2009-2015 Shopify Inc. Author: Caroline Schnapp. All Rights Reserved.
  Includes slight modifications to addItemFromForm.
==============================================================================*/
if (typeof(hsjs.Shopify) === "undefined") { hsjs.Shopify = window.Shopify || {}; }

/*============================================================================
  AJAX error callback
==============================================================================*/
hsjs.Shopify.onError = function(XMLHttpRequest, textStatus) {
  var data = eval("(" + XMLHttpRequest.responseText + ")");
  if (!!data.message) {
    alert(data.message + "(" + data.status  + "): " + data.description);
  } else {
    alert("Error : " + hsjs.Shopify.fullMessagesFromErrors(data).join("; ") + ".");
  }
};

/*============================================================================
  POST JSON to cart/add.js returns the JSON of the line item associated with the added item
==============================================================================*/
hsjs.Shopify.addItemJSON = function(product_json, callback) {
  var quantity = quantity || 1;
  var params = {
    type: "POST",
    url: "/cart/add.js",
    data: product_json,
    dataType: "json",
    success: function(line_item) {
      if ((typeof callback) === "function") {
        callback(line_item);
      }
      else {
        hsjs.Shopify.onItemAdded(line_item);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      hsjs.Shopify.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

/*============================================================================
  POST to cart/add.js returns the JSON of the line item
    - Allow use of form element instead of id
    - Allow custom error callback
==============================================================================*/
hsjs.Shopify.addItemFromForm = function(form, callback, errorCallback) {
  if (form.indexOf("#") === -1){
    form = "#"+form;
  }
  var params = {
    type: "POST",
    url: "/cart/add.js",
    data: jQuery(form).serialize(),
    dataType: "json",
    success: function(line_item) {
      if ((typeof callback) === "function") {
        callback(line_item, form);
      }
      else {
        hsjs.Shopify.onItemAdded(line_item, form);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      if ((typeof errorCallback) === "function") {
        errorCallback(XMLHttpRequest, textStatus);
      }
      else {
        hsjs.Shopify.onError(XMLHttpRequest, textStatus);
      }
    }
  };
  jQuery.ajax(params);
};

/*
 * Shopify - remove item by line number
 */
hsjs.Shopify.removeItemByLineNumber = function(line, callback) {
  var params = {
    type: "POST",
    url: "/cart/change.js",
    data:  "quantity=0&line=" + line,
    dataType: "json",
    success: function(cart) {
      if ((typeof callback) === "function") {
        callback(cart);
      }
      else {
        hsjs.Shopify.onCartUpdate(cart);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      hsjs.Shopify.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};


/*
 * Shopify Cart Ajax
 */
// hsjs.shopifyCartAjax = {
  
//   scriptSrc: "shopify-ajax-cart.js",

//   getScriptSrc: function(){
//     return hsjs.cache.site_data.theme.shopify_cart_ajax;
//   },
  
//   load: function(){
    
//     hsjs.tools.downloadJS(
      
//       this.getScriptSrc(),
      
//       function(){

//         hsjs.tools.waitForJSObject(

//           "Shopify", 

//           function(){

//             if (typeof(hsjs.Shopify) === "undefined") { hsjs.Shopify = window.Shopify; }

//           },

//           7000

//         );

//       }
      
//     );
    
//   },
  
//   init: function(){
//     this.load();
//   }
  
// };



/*
 * Buy Now Button - One Click Checkout
 */
hsjs.buyNowBtn = {
  
  clickHandler: function(event){
    
    event.preventDefault();
    
    var ageChecktext = "You must be over 21 years of age or older to checkout.\n\nPress OK to confirm you are over the age of 21.\n\nWe probit sales to minors and orders may be subject to fraud check.";
    var ageCheck = confirm(ageChecktext); 
    if (ageCheck === true) {
      // Commented out because api.jquery library attached its own Shopify funcs library 
      // which prepends a "#" to all passed form selectors 
      // (eg, if passed "#addToCartForm", it'll try to find $("##addToCartForm") with two ##
//       hsjs.Shopify.addItemFromForm("#add-to-cart-form", function() {
//         $("#toCheckout").trigger("click");
//       });
      hsjs.Shopify.addItemFromForm("add-to-cart-form", function() {
        $("#toCheckout").trigger("click");
      });
    }

    return false;
    
  },
  
  attachClickHandler: function(){
    
    $("#buyNowBtn").off("click.buyNowBtn").on("click.buyNowBtn", function(event) {
      hsjs.buyNowBtn.clickHandler(event);
    });
    
  },

  init: function(){

    if (hsjs.vars.template.name == "product"){
      this.attachClickHandler();
    }
    
  }
  
};


/*
 * Masonry
 */
hsjs.masonry = { 

  delayedInit: function(){

    setTimeout(function(){

      hsjs.tools.waitForJSObject(
        'Masonry',
        function(){
          $('.masonry-section').masonry({
            // options
            itemSelector: '.masonry-item'
          });
//           console.log("MASONRY INIT");
        }
      );

    }, 1000);

  },

  init: function(){

    hsjs.tools.waitForJSObject(
      'Masonry',
      function(){
        $('.masonry-section').masonry({
          // options
          itemSelector: '.masonry-item'
        });
//         console.log("MASONRY INIT");
      }
    );

  }

}



/*
 * Accordion for Feature Terms
 */
hsjs.accordion = { 
  
  init: function(){

    if ( $(".feature-terms").length ){
      
      hsjs.tools.downloadJS("https://code.jquery.com/ui/1.10.4/jquery-ui.js");
      hsjs.tools.waitForJSObject(
        '$accordion',
        function(){
          $(".feature-terms").accordion({
            autoHeight: false,
            heightStyle: "content",
            header: "dt",
            create: function( event, ui ) {

//               hsjs.masonry.init();
              hsjs.masonry.delayedInit();

            }
          });
        }
      );
      
    }
    else {

      // Masonry
//       hsjs.masonry.init();
      hsjs.masonry.delayedInit();

    }

  }

}



/*
 * Ella Theme JS removed from template
 */
hsjs.ella_product_inline = {

  next_prev_product: function(){
    // Only run on product pages which were navigated to from collection pages
    if ( ! $(".next-prev-product").length ){
      return;
    }

    var nextPrevProduct = $(".next-prev-product"),
        iconNextPrev = nextPrevProduct.find("[data-next-prev-icon]"),
        contentNextPrev = nextPrevProduct.find("[data-next-prev-content]"),
        modal = nextPrevProduct.find("[data-next-prev-modal]");

    if(!("ontouchstart" in document)) {
      iconNextPrev.hover(function() {
        var curLink = $(this),
            curContent = $(curLink.data("target"));    

        if(!$(this).hasClass("active")) {
          iconNextPrev.removeClass("active");
          contentNextPrev.removeClass("active");

          curLink.addClass("active");
          curContent.addClass("active");
          modal.show();
        }

        nextPrevProduct.mouseleave(function() {
          if(modal.is(":visible")) {
            iconNextPrev.removeClass("active");
            contentNextPrev.removeClass("active");
            modal.hide();
          };
        });   
      });
    }

    else {
      iconNextPrev.off("click").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var curLink = $(this),
            curContent = $(curLink.data("target"));

        if(!$(this).hasClass("active")) {
          iconNextPrev.removeClass("active");
          contentNextPrev.removeClass("active");

          curLink.addClass("active");
          curContent.addClass("active");
          modal.show();
        }
        else {
          curLink.removeClass("active");
          curContent.removeClass("active");
          modal.hide();
        }
      });
    };

    $(document).off("click.nextPrevProduct").on("click.nextPrevProduct", function(e) {
      if(!$(e.target).closest("[data-next-prev-modal]").length && modal.is(":visible")) {
        iconNextPrev.removeClass("active");
        contentNextPrev.removeClass("active");
        modal.hide();
      };
    });

    // Preload next prev hover modal images 
    $(".next-prev-content .product-image .lazyload").addClass("lazypreload");
    
  },

  linked_options: function(){

    var Shopify = window.Shopify || {};
    
    // Required functionality from deprecated options_selection.js
    Shopify.arrayIncludes = function(e, t) {
      for (var n = 0; n < e.length; n++)
        if (e[n] == t) return !0;
      return !1
    };
    
    Shopify.uniq = function(e) {
      for (var t = [], n = 0; n < e.length; n++) Shopify.arrayIncludes(t, e[n]) || t.push(e[n]);
      return t
    };
    
    Shopify.productOptionsMap = {};
    Shopify.quickViewOptionsMap = {};

    Shopify.updateOptionsInSelector = function(selectorIndex, wrapperSlt) {
      Shopify.optionsMap = wrapperSlt === '.product-shop' ? Shopify.productOptionsMap : Shopify.quickViewOptionsMap;

      switch (selectorIndex) {
        case 0:
          var key = 'root';
          var selector = $(wrapperSlt + ' .single-option-selector:eq(0)');
          break;
        case 1:
          var key = $(wrapperSlt + ' .single-option-selector:eq(0)').val();
          var selector = $(wrapperSlt + ' .single-option-selector:eq(1)');
          break;
        case 2:
          var key = $(wrapperSlt + ' .single-option-selector:eq(0)').val();
          key += ' / ' + $(wrapperSlt + ' .single-option-selector:eq(1)').val();
          var selector = $(wrapperSlt + ' .single-option-selector:eq(2)');
      }

      var initialValue = selector.val();

      selector.empty();

      var availableOptions = Shopify.optionsMap[key];

      if (availableOptions && availableOptions.length) {
        for (var i = 0; i < availableOptions.length; i++) {
          var option = availableOptions[i];

          var newOption = $('<option></option>').val(option).html(option);

          selector.append(newOption);
        }

        $(wrapperSlt + ' .swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
          if ($.inArray($(this).attr('data-value'), availableOptions) !== -1) {
            $(this).removeClass('soldout').find(':radio').removeAttr('disabled', 'disabled').removeAttr('checked');
          }
          else {
            $(this).addClass('soldout').find(':radio').removeAttr('checked').attr('disabled', 'disabled');
          }
        });

        if ($.inArray(initialValue, availableOptions) !== -1) {
          selector.val(initialValue);
        }

        selector.trigger('change');
      };
    };

    Shopify.linkOptionSelectors = function(product, wrapperSlt) {
      // Building our mapping object.
      Shopify.optionsMap = wrapperSlt === '.product-shop' ? Shopify.productOptionsMap : Shopify.quickViewOptionsMap;

      for (var i = 0; i < product.variants.length; i++) {
        var variant = product.variants[i];

        if (variant.available) {
          // Gathering values for the 1st drop-down.
          Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];

          Shopify.optionsMap['root'].push(variant.option1);
          Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);

          // Gathering values for the 2nd drop-down.
          if (product.options.length > 1) {
            var key = variant.option1;
            Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
            Shopify.optionsMap[key].push(variant.option2);
            Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
          }

          // Gathering values for the 3rd drop-down.
          if (product.options.length === 3) {
            var key = variant.option1 + ' / ' + variant.option2;
            Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
            Shopify.optionsMap[key].push(variant.option3);
            Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
          }
        }
      };

      // Update options right away.
      Shopify.updateOptionsInSelector(0, wrapperSlt);

      if (product.options.length > 1) Shopify.updateOptionsInSelector(1, wrapperSlt);
      if (product.options.length === 3) Shopify.updateOptionsInSelector(2, wrapperSlt);

      // When there is an update in the first dropdown.
      $(wrapperSlt + " .single-option-selector:eq(0)").change(function() {
        Shopify.updateOptionsInSelector(1, wrapperSlt);
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2, wrapperSlt);
        return true;
      });

      // When there is an update in the second dropdown.
      $(wrapperSlt + " .single-option-selector:eq(1)").change(function() {
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2, wrapperSlt);
        return true;
      });
    };

  },
  
  updatePricing: function(){
    console.log("UPDATE PRICING");
    //try pattern one before pattern 2
    var regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;
    var unitPriceTextMatch = $('.product-shop .price').text().match(regex);

    if (!unitPriceTextMatch) {
      regex = /([0-9]+[.|,][0-9]+)/g;
      unitPriceTextMatch = $('.product-shop .price').text().match(regex);     
    }

    if (unitPriceTextMatch) {
      var unitPriceText = unitPriceTextMatch[0];     
      var unitPrice = unitPriceText.replace(/[.|,]/g,'');
      var quantity = parseInt($('[data-qtt-id]').val());
      var totalProductPrice = unitPrice * quantity;

      // Get total price of selected addons
      var $all_addons = $(".ao-line"); 
      var selected_addons_total = 0;
      $all_addons.each(function(){
        var $this_addon_checkbox = $(this).find(".attachment-checkbox");
        if ($this_addon_checkbox.prop("checked")){
          var this_addon_price = 0;
          if ( ! isNaN($(this).find(".ao-price > span").text())){
            this_addon_price = parseFloat($(this).find(".ao-price > span").text()) * 100;
          }
          selected_addons_total = selected_addons_total + this_addon_price;
        }
      });


      // Check if warranty is selected
      var $warranty_checkbox = $("#addWarrantyPlan");
      if ($warranty_checkbox.prop("checked")){
        var warranty_price = 0;
        var warranty_price_text = $(".warranty-program .warranty-price").text().replace("$", "");
        if ( ! isNaN(warranty_price_text)){
          warranty_price = parseFloat(warranty_price_text) * 100;
        }
        selected_addons_total = selected_addons_total + warranty_price;
      }


      // Calc cart subtotal
      var cart_subtotal = totalProductPrice + selected_addons_total; 

      var totalPriceText = Shopify.formatMoney(cart_subtotal, window.money_format);

      regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;     
      if ( ! totalPriceText.match(regex) ) {
        regex = /([0-9]+[.|,][0-9]+)/g;
      } 
      totalPriceText = totalPriceText.match(regex)[0];

      var regInput = new RegExp(unitPriceText, "g"); 
      var totalPriceHtml = $('.product-shop .price').html().replace(regInput ,totalPriceText);

      $('.product-shop .total-price span').html(totalPriceHtml); 
      
    };
    
  },

  selectCallback: function(variant, selector) {

    Shopify.variantSelected = variant;  
    hsjs.variantSelected = variant;  

    var addToCartBtn = $('#product-add-to-cart'),
        productPrice = $('.product-shop .price'),
        comparePrice = $('.product-shop .compare-price'),
        productInventory = $('.product-inventory'),
        productSku = $('.product-shop .sku-product'),
        $variantSku = $('#variantSku'),
        labelSave = $('.product-photos .sale-label');

    //       if ( ! variant) {
    //         $variantSku.text(variant.sku);
    //       }

    if (variant){

      // Set variant SKU
      $variantSku.text(variant.sku);

      // addToCartbtn
      if (variant.available) {
        addToCartBtn.removeClass('disabled').removeAttr('disabled').val(window.inventory_text.add_to_cart);
      }
      else {
        addToCartBtn.val(window.inventory_text.sold_out).addClass('disabled').attr('disabled', 'disabled');
      };


      // Set new variant price as dollar amount
      var new_variant_price_money = Shopify.formatMoney(variant.price, window.money_format);


      // Prices
      productPrice.html(new_variant_price_money);    

      if(variant.compare_at_price > variant.price) {
        productPrice.addClass("on-sale");
        comparePrice
        .html(Shopify.formatMoney(variant.compare_at_price, window.money_format))
        .show();
        labelSave.show();
      }                
      else {
        comparePrice.hide();
        productPrice.removeClass("on-sale");
        labelSave.hide();
      };

      if (hsjs.ajaxSiteNav.pageType.product.settings.displaySubtotal && hsjs.product.available){
        hsjs.ella_product_inline.updatePricing();
      }


      function paymentPlanPrice(newPrice){
        var ppp_el = $(".pay-plan-price");
        if (ppp_el.length < 1) {
          return;
        }
        // Set payment plan price data attribute
        ppp_el.attr("data-product-price", newPrice);
        // Set payment plan price display Price
        var variant_naked_price = newPrice.replace("$","").replace(",","").replace(" USD","").trim().split(" ")[0]; 
        var ppp_monthly_price = (variant_naked_price / 4).toFixed(2);
        var ppp_price_el = ppp_el.find(".vb-price");
        ppp_price_el.html(ppp_monthly_price);
      }
      paymentPlanPrice(new_variant_price_money);


      if (hsjs.ajaxSiteNav.pageType.product.settings.enableMultipleCurrencies === "true"){
        Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format");
      }


      if (hsjs.ajaxSiteNav.pageType.product.settings.displayAvailability){
        if (variant.available) {
          if (variant.inventory_management != null) {
            productInventory.find("span").text(window.inventory_text.in_stock);
          }
          else {
            productInventory.find("span").text(window.inventory_text.many_in_stock);
          }
        }
        else {
          productInventory.find("span").text(window.inventory_text.out_of_stock);
        }
      }     

      var form = $("#" + selector.domIdPrefix).closest("form");

      for (var i=0,length=variant.options.length; i<length; i++) {
        var radioToFind = ".swatch[data-option-index='" + i + "'] :radio[value='" + hsjs.tools.htmlEntities(variant.options[i]) +"']";

//         console.log(radioToFind);
//         console.log($(radioToFind));

        var radioButton = form.find(radioToFind);

        if (radioButton.length) {
          radioButton.get(0).checked = true;
        }
      };
    }
    else {
      addToCartBtn.val(window.inventory_text.sold_out).addClass("disabled").attr("disabled", "disabled");                   
    };

    if (variant) {
      productSku.find("span").text(variant.sku);
    }
    else {
      productSku.find("span").empty();
    }

    if ( hsjs.vars.userInteracted ){

      /*begin variant image*/
      if (variant && variant.featured_image) {

        var variant_title = variant.title;
        var $slideToSelect = $(".slider-for .slick-slide[data-variants*='"+variant_title+"']");
        var slide_to_select_index = $slideToSelect.attr("data-slick-index");
        if ($slideToSelect && slide_to_select_index){
          $(".slider-for").slick("slickGoTo", parseInt(slide_to_select_index) );
        }

//         var originalImage = $("img[id|='product-featured-image']");
//         var newImage = variant.featured_image;
//         var element = originalImage[0];

//         Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {

//           newImageSizedSrc = newImageSizedSrc.split("?")[0].replace("https:", "");
//           var period = newImageSizedSrc.lastIndexOf('.');
//           newImageSizedSrc = newImageSizedSrc.substring(0, period);

//           var slideToSelect = $($(".slider-nav img[data-src*='"+newImageSizedSrc+"']")[0]).closest('.item');
//           slideToSelect.trigger('click');

//         }); 

      };

    }

  },
  
  qty_selectors: function(e) {
    
    e.preventDefault();
    e.stopPropagation();

    var self = $(this),
        input = $('.quantity input[name="quantity"]'),
        oldVal = parseInt(input.val()),
        newVal = 1;

    switch (true) {
      case (self.hasClass('plus')): {
        newVal = oldVal + 1;
        break;
      }
      case (self.hasClass('minus') && oldVal > 1): {
        newVal = oldVal - 1;
        break;
      }            
    }

    input.val(newVal);

    hsjs.ella_product_inline.updatePricing();

  },
  
  product_page_main: function(){
    
    // Only run on product pages
    if ( ! $(".product-template").length ){
      return;
    }


    // Update pricing on qty change
    var $qty_selector = $('[data-qtt-id]');
    // Update subtotal on addons change 
    var $all_addons = $(".ao-line .attachment-checkbox"); 
    // Update on warranty 
    var $warranty_checkbox = $("#addWarrantyPlan");
    // Run subtotal price update on change
    $qty_selector
    .add($all_addons)
    .add($warranty_checkbox)
    .off("change.updatePricing")
    .on("change.updatePricing", hsjs.ella_product_inline.updatePricing);

    var buttonSlt = "[data-minus-qtt], [data-plus-qtt]",
        buttonElm = $(buttonSlt);
    $(document)
    .off("click.qttMinusPlus", buttonSlt)
    .on("click.qttMinusPlus", buttonSlt, hsjs.ella_product_inline.qty_selectors);


    $(function($) {
      if (hsjs.product.available){

//         console.log("hsjs.product", hsjs.product);
//         console.log("hsjs.ella_product_inline.selectCallback", hsjs.ella_product_inline.selectCallback);
        
        new Shopify.OptionSelectors('product-selectors', {
          product: hsjs.product,
          onVariantSelected: hsjs.ella_product_inline.selectCallback,
          enableHistoryState: false
        });

      }

      Shopify.linkOptionSelectors(hsjs.product, '.product-shop');

      if (hsjs.product.options.length == 1 && hsjs.product.options[0] != "Title"){
        $(".selector-wrapper:eq(0)").prepend("<label>"+hsjs.product.options[0]+"</label>");  
      }
      else if (hsjs.product.options.length > 1){
        $('.selector-wrapper').append('<span class="icon-dropdown"><i class="fa fa-angle-down"></i></span>');                                      
      }

      $('.product-shop .selector-wrapper label').append('<em>*</em>');    

      if (hsjs.product.variants.length == 1 && hsjs.product.variants[0] != "Title"){
        $('.selector-wrapper').hide();
      }

    });
    
  },

  init: function(){

    // Set product-template options
    hsjs.ajaxSiteNav.pageType.product.settings.displaySubtotal = hsjs.product_page_settings.display_subtotal;
    hsjs.ajaxSiteNav.pageType.product.settings.displayAvailability = hsjs.product_page_settings.display_availability;
    hsjs.ajaxSiteNav.pageType.product.settings.displayProductSku = hsjs.product_page_settings.display_product_sku;

    // Shopify linked option selectors
    hsjs.ella_product_inline.linked_options();
    
    // Next/Prev product in collection-linked products
    hsjs.ella_product_inline.next_prev_product();
    
    // Main product-template functions
    hsjs.ella_product_inline.product_page_main();
    
  }

};



hsjs.product_template = {
  
  refresh: function(){

    // Next/Prev product in collection-linked products
    hsjs.ella_product_inline.next_prev_product();
    // Main product-template functions
    hsjs.ella_product_inline.product_page_main();

    // reload BOLD Recurring Orders 
    hsjs.boldRo.reload();

    // Init zoom on main product images
    hsjs.fancybox.init();

    // But Now Btn
    hsjs.buyNowBtn.init();

    // Product Warranty add to cart
    hsjs.productWarranty.init();

    // Add to watchlist
    hsjs.watchlist.init();

    // Re-load reviews widgets
    hsjs.tools.waitForElement(
      hsjs.reviews.elementToWaitFor,
      hsjs.reviews.refreshWidgets,
      hsjs.ajaxSiteNav.settings.timeToWait
    );

    // Accordion
    hsjs.accordion.init();
    
    // masonry now initialized from within accordion
    // Masonry
    //hsjs.masonry.init();
    
    // Reload PushOwl
    hsjs.pushowl.reload();

    // Reset redirect_url
    hsjs.loginRedirect();

    // TODO
    // Replace history state destroyed by Shopify product's option selectors' ?variant= being appended to url
//     window.history.replaceState(
//     hsjs.ajaxSiteNav.lastClickedLink.href, 
//       hsjs.ajaxSiteNav.lastClickedLink.title != "" ? hsjs.ajaxSiteNav.lastClickedLink.title : hsjs.ajaxSiteNav.lastClickedLink.href, 
//       hsjs.ajaxSiteNav.lastClickedLink.href
//     );

  },
  
  init: function(){

    // Set product page JS loaded to true so we don't load it again
    hsjs.cache.site_data.theme.product_template_js_loaded = true;
    
    // Ella inline for product
    hsjs.ella_product_inline.init();

    // bold recurring orders subscriptions 
    hsjs.boldRo.init();

    // Product page main image fancy box
    hsjs.fancybox.init();

    // Buy Now Btn
    hsjs.buyNowBtn.init();

    // Product Warranty add to cart
    hsjs.productWarranty.init();

    // Add to watchlist
    hsjs.watchlist.init();

    // Enable if on product page
    hsjs.norton.init();

    // Accordion
    hsjs.accordion.init();
    
    // masonry now initialized from within accordion
    // Masonry
    //hsjs.masonry.init();
    
    // PushOwl notifications
    setTimeout(function(){
      hsjs.pushowl.init();
    }, 5000);
    
  }

};

hsjs.product_template.init();
