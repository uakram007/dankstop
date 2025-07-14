/*
 * Ella search script
 */
hsjs.ella_search = {

  closeTranslate: function(t, e) {
    $(t).length && $("body").off("click.closeCustomer", t).on("click.closeCustomer", t, function(t) {
      t.preventDefault(), t.stopPropagation(), $("html").removeClass(e)
    })
  },

  queryParams: function() {
    if (Shopify.queryParams = {}, location.search.length)
      for (var t, e = 0, i = location.search.substr(1).split("&"); e < i.length; e++) 1 < (t = i[e].split("=")).length && (Shopify.queryParams[decodeURIComponent(t[0])] = decodeURIComponent(t[1]))
        },

  ajaxCreateUrl: function(t) {
    var e = $.param(Shopify.queryParams).replace(/%2B/g, "+");
    return t ? "" != e ? t + "?" + e : t : location.pathname + "?" + e
  },

  initInfiniteScrolling: function() {
    
    hsjs.tools.waitForElement(
      ".infinite-scrolling",
      function(){
        var t = $(".infinite-scrolling"),
            o = ".infinite-scrolling a";
        t.length && (
          $("body").off("click.initInfiniteScrolling", o).on("click.initInfiniteScrolling", o, function(t) {
            if (t.preventDefault(), t.stopPropagation(), !$(this).hasClass("disabled")) {
              var e = $(this).attr("href");
              hsjs.ella_search.doAjaxInfiniteScrollingGetContent(e)
            }
          })
          , window.infinity_scroll_feature && ($('[data-section-type="collection-template"]').length || $("[data-search-page]").length) && $(window).off("scroll.infiniteScrolling").on("scroll.infiniteScrolling", function() {
            if ( ! hsjs.ella_search.isAjaxLoading) {
              var t = $('[data-section-type="collection-template"]');
              t.length || (t = $("[data-search-page]"));
              var e = t.offset().top + t.outerHeight() - $(window).height();
              if (
                $(this).scrollTop() > e 
                //                       && $(this).scrollTop() < 200 + e
              ){
                var i = $(o);
                if (i.length && !i.hasClass("disabled")) {
                  var a = i.attr("href");
                  //                         var a = i.attr("href") + "&view=products";
                  hsjs.ella_search.doAjaxInfiniteScrollingGetContent(a)
                }
              }
            }
          })
        )
      },
      3000
    );
    
  },

  doAjaxInfiniteScrollingGetContent: function(t) {
    var $inf_scr_btn = $(".infinite-scrolling .btn");
    var original_btn_text = $inf_scr_btn.text();
    var loading_text = "Loading more products"
    hsjs.ella_search.isAjaxLoading || $.ajax({
      type: "get",
      url: t,
      beforeSend: function() {
        $inf_scr_btn.attr("disabled", true).addClass("disabled").text(loading_text);
        hsjs.ajax.showLoading();
      },
      success: function(t) {
        
        hsjs.ella_search.ajaxInfiniteScrollingMapData(t)
        
        , hsjs.lazybits.init()
        
//         , hsjs.ella_search.initColorSwatchGrid()
        
        , $("[data-view-as]").length && hsjs.ella_search.viewModeLayout()
        
//         , hsjs.ella_search.initCountdownNormal()
        
      },
      error: function(t, e) {
        $(".ajax-error-message").text(h.parseJSON(t.responseText).description), hsjs.ella_search.showModal(".ajax-error-modal")
      },
      complete: function() {
//         hsjs.ella_search.refreshYotpo();
        hsjs.ajax.hideLoading();
        var no_more_product_text = window.inventory_text.no_more_product;
        if (window.multi_lang && translator.isLang2() && window.lang2.collections.genera$("body").no_more_product){
          no_more_product_text = window.lang2.collections.genera$("body").no_more_product;
        }
        if ($inf_scr_btn.text() !== no_more_product_text){
          $inf_scr_btn.attr("disabled", false).removeClass("disabled").text(original_btn_text);
        }
        else {
          $inf_scr_btn.attr("disabled", false);
        }
      }
    })
  },

  ajaxInfiniteScrollingMapData: function(t) {
    var e = $(".collection-template").find(".product-collection"),
        i = $(t).hasClass("collection-template") ? $(t) : $(t).find(".collection-template"),
        a = i.find(".product-collection"),
        o = a.children(".grid-item").not(".banner-img");

    //                   console.log("hello e ", e);
    //                   console.log("hello t ", t);
    //             var e = $(".collection-template").find(".product-collection"),
    //                 i = $(t).hasClass("collection-template") ? $(t) : ($(t).find(".collection-template")[0] ? $(t).find(".collection-template") : 1),
    //                 a = i === 1 ? 1 : i.find(".product-collection"),
    //                 o = a === 1 ? $("<div>"+t+"</div>").children(".grid-item").not(".banner-img") : a.children(".grid-item").not(".banner-img");


    var $collection_template = $('[data-section-type="collection-template"]');
    $collection_template.length || ($collection_template = $("[data-search-page]"));

    var $header_visible = $(document.getElementById("sticky-wrapper") || document.querySelector (".header-bottom"));

    var collection_bottom_pffset = $collection_template.offset().top + $collection_template.outerHeight() - ($header_visible.height() * 2);

    //           		  console.log("$collection_template",$collection_template);
    //                   console.log("$collection_template.offset().top",$collection_template.offset().top);
    //                   console.log("$collection_template.outerHeight()",$collection_template.outerHeight());
    //                   console.log('$("#sticky-wrapper").height() * 2',$("#sticky-wrapper").height() * 2);
    //                   console.log('$header_visible',$header_visible);

    //                   console.log("TODO Fix infinite scrolling window scroll on complete");
    //                   console.log("TODO Fix infinite scrolling window scroll on complete");
    //                   console.log("TODO Fix infinite scrolling window scroll on complete");
    //                   console.log("hello i ", i);
    //                   console.log("hello a ", a);
    //                   console.log("hello o ", o);
    //                   console.log("hello showMoreButton ", $(".infinite-scrolling a"));

    if (showMoreButton = $(".infinite-scrolling a"), a.length) {
      if (e.append(o)
          , $(".collection-template .product-collection[data-layout]").length 
          && (
        hsjs.ella_search.ellaTimeout = setTimeout(function() {
          e.isotope("appended", o).isotope("layout")
        }, 700))

//           , hsjs.ella_search.translateBlock(".product-collection")

          , 0 < $(t).find(".infinite-scrolling").length

         ){

//         console.log("Infinite scrolling...",collection_bottom_pffset);
        
        //                   console.log("FIXED infinite scrolling window scroll");
        //                   console.log("FIXED infinite scrolling window scroll");
        //                   console.log("FIXED infinite scrolling window scroll");
        //                   console.log("hello", o);

        $(document).scrollTop(collection_bottom_pffset);
        showMoreButton.attr("href", i.find(".infinite-scrolling a").attr("href"));

      }
      else {
        var n = window.inventory_text.no_more_product;
        window.multi_lang && translator.isLang2() && (n = window.lang2.collections.genera$("body").no_more_product), showMoreButton.html(n).addClass("disabled")
      }

      //                 if (hsjs.ella_search.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length && $(".spr-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()

    }
  },
  
  initPaginationPage: function() {
    var t = ".pagination-page a";
    $("body").off("click", t).on("click", t, function(t) {
      t.preventDefault();
      var e = $(this).attr("href").match(/page=\d+/g);
      if (e && (Shopify.queryParams.page = parseInt(e[0].match(/\d+/g)), Shopify.queryParams.page)) {
        
        var i = hsjs.ella_search.ajaxCreateUrl();
        
        hsjs.ella_search.isSidebarAjaxClick = !0;
        
//         History.pushState({
//           param: Shopify.queryParams
//         }, i, i);
        
        hsjs.ella_search.doAjaxToolbarGetContent(i);
        
        var a = $('[data-section-type="collection-template"] .toolbar');
        
        a.length || (a = $("[data-search-page]"));
        
        var o = a.offset().top;
        
        $("body,html").animate({
          scrollTop: o
        }, 600)
        
      }
    })
  },

  init: function(){
    
    ($("body").hasClass("template-search") || (hsjs.vars && hsjs.vars.template && hsjs.vars.template.name == "search")) 
    && (
      hsjs.ella_search.initInfiniteScrolling()
      , hsjs.ella_search.initPaginationPage()
    );

  }

};


hsjs.search_template = {
  
  refresh: function(){

    // Ella init
    hsjs.ella_search.init();
    
  },
  
  init: function(){

    // Set product page JS loaded to true so we don't load it again
    hsjs.cache.site_data.theme.search_template_js_loaded = true;
    
    // Ella init
    hsjs.ella_search.init();
    
  }

};


hsjs.search_template.init();
