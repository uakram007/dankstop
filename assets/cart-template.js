
hsjs.cartScripts = {

  scripts: function(){
    
    if (hsjs.vars.template.name === "cart"){
      
      function setRouteWarning($route_check_el){
        if ($route_check_el.hasClass("rw-unchecked")){
          $(".route-warning").removeClass("hidden");
        }
        else {
          $(".route-warning").addClass("hidden");
        }
      }

      // Set initial visibility
      if (window.hsjs && hsjs.tools && hsjs.tools.waitForElement){
        hsjs.tools.waitForElement(
          ".rw-checkbox-span",
          function(){
            setRouteWarning($(".rw-checkbox-span"));
          },
          10000
        );
      }

      $(".route-div").on("click", ".rw-checkbox-span", function(){
        setTimeout(function(){
          //       console.log($(".rw-checkbox-span").hasClass("rw-unchecked"));
          setRouteWarning($(".rw-checkbox-span"));
        }, 500);
      });
      
    }
    
  },
  
  init: function(){
    hsjs.cartScripts.scripts();
  }

};



hsjs.cart_template = {
  
  refresh: function(){

    // Ella inline for cart
//     hsjs.ella_product_inline.next_prev_product();

    // Cart scripts
    hsjs.cartScripts.init();

  },
  
  init: function(){

    // Set product page JS loaded to true so we don't load it again
    hsjs.cache.site_data.theme.cart_template_js_loaded = true;
    
    // Ella inline for cart
//     hsjs.ella_product_inline.next_prev_product();

    // Cart scripts
    hsjs.cartScripts.init();
    
  }

};

hsjs.cart_template.init();
