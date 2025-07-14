


/*
 * Collections - Show More Filters
 */
hsjs.collectionClickHandlers = {
  
  showMoreFiltersHandler: function(event){
    event.preventDefault();
    var $filtersCont = $(this).closest(".advanced-filters"); 
    var $hiddenFilters = $filtersCont.find(".past-fifth");
    var $showMore = $filtersCont.find(".more-f");
    var $showLess = $filtersCont.find(".less-f");
    $hiddenFilters.add($showMore).add($showLess).toggleClass("hidden-filter");
  },
  
//   attachFiltersHandler: function(){

//     function attachFilterHandlers(){
//       var no_products_html = "<p class='col-12 text-center'>Sorry, there are no products in this collection</p>";
//       var $products_grid = $(".product-collection.products-grid");
//       var $filters_container = $(".sidebar-inner");
//       var $filter_handle_els = $filters_container.find(".a-filter");
//       var $filter_tags = $filters_container.find(".a-filter a");
//       var $refined_container = $(".sidebar-filter .refined-widgets .refined");

//       $filter_tags.addClass("ajax-disabled").each(function(index, element){

//         //console.log("hello?!  ", this);
//         $(this).off("click.hsjsCollectionFilters")
//         .on("click.hsjsCollectionFilters", function(event){
//           event.preventDefault();
//           event.stopPropagation();

//           //console.log("hello?!  ", this);

//           var filter_handle = $filter_handle_els[i].dataset.handle;

//           console.log(filter_handle);

//           var active_handles = [];
//           $refined_container.each(function(index, elem){ 
//             console.log(index, elem);
//             active_handles.push(elem.getAttribute("href"));
//           });
//           active_handles = active_handles.join("+");

//           var href = this.href;
//           var ajaxURL = href + "+" + active_handles + "?view=products"

//           console.log(ajaxURL);
//           //return;

//           $products_grid.load(ajaxURL, function( response, status, xhr ){
//             //console.log(response);
//             if (response.trim() == ""){
//               $products_grid.html(no_products_html);
//             }

//             $filters_container.load(href + "+" + active_handles + "?view=filters", function(){
//               attachFilterHandlers();
//             });

//           });

//           //     var filter_handle = $(this).parent(".a-filter").attr("data-handle");
//           //     var refined_li_tag = document.createElement("li");
//           //     var refined_a_tag = document.createElement('a');
//           //     refined_a_tag.setAttribute('href',webpage);
//           //     refined_a_tag.className = "selected-tag";
//           //     refined_a_tag.innerHTML = "Type: bubbler";
//           //     refined_li_tag.appendChild(refined_a_tag);

//           $refined_container.load(href + "?view=refined-by", function(){

//             if ( $refined_container.find("li")[0] ){
//               $refined_container.parents(".refined-widgets").show();
//             }
//             else {
//               $refined_container.parents(".refined-widgets").hide();
//             }

//             var $selected_tags = $refined_container.find(".selected-tag");
//             $selected_tags.off("click.hsjsRefinedBy")
//             .on("click.hsjsRefinedBy", function(){

//             });

//           });

//         }); 
//       });
//     }
//     attachFilterHandlers();

//   },
  
  attachShowMoreFiltersHandler: function(){
    
    // See more filters button action
    $(document)
    .off(".hsjsFiltersMoreLess")
    .on(
      "click.hsjsFiltersMoreLess", 
      ".more-f, .less-f", 
      hsjs.collectionClickHandlers.showMoreFiltersHandler
    );
    
  },
  
  init: function(){
    
    this.attachShowMoreFiltersHandler();
    
  }
  
};



/*
 * Ella collection script
 */
hsjs.ella_collection = {

  closeTranslate: function(t, e) {
    $(t).length && $("body").off("click.closeCustomer", t).on("click.closeCustomer", t, function(t) {
      t.preventDefault(), t.stopPropagation(), $("html").removeClass(e)
    })
  },

  initSidebarProductSlider: function() {
    
//     console.log("Collection -initSidebarProductSlider- loaded...", $("[data-sidebar-product]").length);
    
    function collectionSidebarSlider(){
      $("[data-sidebar-product]").each(function() {
        var t = $(this).find(".products-grid");

        function initSidebarSlider(){
          
//           console.log("Slick init func.");
          
          t.not(".slick-initialized") && t.slick({
            waitForAnimate: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: !1,
            dots: !1,
            speed: 800,
            nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
            prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>'
          })
        };

        if ($.fn.slick){
          
//           console.log("Slick loaded...");
          
          initSidebarSlider();
        }
        else {
          
//           console.log("Slick NOT loaded; waiting...");
          
          hsjs.tools.waitForJSObject(
            '$.fn.slick',
            function(){
              
//               console.log("Slick loaded...");
              
              initSidebarSlider();
            }
          );
        }

      })
    };

    hsjs.tools.waitForElement(
      "[data-sidebar-product]",
      function(){
        collectionSidebarSlider();
      },
      3000
    );
    
  },

  initOpenSidebar: function() {
    var t = ".sidebar-show";
    $(t).length && $("body").off("click.openSidebar").on("click.openSidebar", t, function() {
      $("html").addClass("sidebar-open")
    })
  },

  closeSidebar: function() {
    hsjs.ella_collection.closeTranslate(".sidebar .close-sidebar", "sidebar-open")

  },

  initDropdownSubCategoriesAtSidebar: function() {
    $("body").off("click.toggleSubCategories").on("click.toggleSubCategories", ".sidebar-links .icon-dropdown", function(t) {
      t.preventDefault(), t.stopPropagation();
      var e = $(this),
          i = e.parent();
      i.hasClass("open") ? (i.removeClass("open"), e.next().slideUp()) : (i.addClass("open"), e.next().slideDown())
    })
  },

  initToggleWidgetTitleSidebarFilter: function() {
    $("body").off("click.toggleWidgetContent").on("click.toggleWidgetContent", "[data-has-collapse] .widget-title", function() {
      $(this).toggleClass("open"), $(this).next().slideToggle()
    });
    $(window).innerWidth() < 1200 && $("body").off("click.toggleWidgetContent2").on("click.toggleWidgetContent2", "[data-has-collapse-no-sidebar] .widget-title", function() {
      $(this).toggleClass("open"), $(this).next().slideToggle()
    })
  },

  initSidebar: function() {
    
//         console.log("Collection Sidebar loaded...");
    
    hsjs.ella_collection.initSidebarProductSlider()
    , hsjs.ella_collection.initOpenSidebar()
    , hsjs.ella_collection.closeSidebar()
    , hsjs.ella_collection.initDropdownSubCategoriesAtSidebar()
    , hsjs.ella_collection.initToggleWidgetTitleSidebarFilter()
  },





  //     historyAdapter: function() {
  //       $('[data-section-type="collection-template"]').length && History.Adapter.bind(window, "statechange", function() {
  //         History.getState();
  //         if (!hsjs.ella_collection.isSidebarAjaxClick) {
  //           hsjs.ella_collection.queryParams();
  //           var t = hsjs.ella_collection.ajaxCreateUrl();
  //           hsjs.ella_collection.doAjaxToolbarGetContent(t), hsjs.ella_collection.doAjaxSidebarGetContent(t)
  //         }
  //         hsjs.ella_collection.isSidebarAjaxClick = !1
  //       })
  //     },

  queryParams: function() {
    if (Shopify.queryParams = {}, location.search.length)
      for (var t, e = 0, i = location.search.substr(1).split("&"); e < i.length; e++) 1 < (t = i[e].split("=")).length && (Shopify.queryParams[decodeURIComponent(t[0])] = decodeURIComponent(t[1]))
        },

  filterAjaxClick: function(t) {
    delete Shopify.queryParams.page;
    var e = hsjs.ella_collection.ajaxCreateUrl(t);
    hsjs.ella_collection.isSidebarAjaxClick = !0

    //             , History.pushState({
    //                 param: Shopify.queryParams
    //             }, e, e)

  },
  
  ajaxCreateUrl: function(t) {
    var e = $.param(Shopify.queryParams).replace(/%2B/g, "+"); 
    return t ? "" != e ? t + "?" + e : t : location.pathname + "?" + e
  },

  filterToolbar: function() {
    hsjs.ella_collection.queryParams()

    , hsjs.ella_collection.setTextForSortbyFilter()

    //             , hsjs.ella_collection.setTextForLimitedFilter()

    , hsjs.ella_collection.ajaxFilterSortby()

    //             , hsjs.ella_collection.ajaxFilterLimit()

    , hsjs.ella_collection.addEventViewModeLayout()

  },

  setTextForSortbyFilter: function() {
    var t = $("[data-sortby]"),
        e = t.find(".label-tab"),
        i = e.find(".label-text"),
        a = e.next().find("li.active").text();
    if (i.text(a), Shopify.queryParams.sort_by) {
      var o = Shopify.queryParams.sort_by,
          n = t.find('span[data-href="' + o + '"]'),
          s = n.length > 0 ? n.text() : "manual";
      i.text(s), e.next().find("li").removeClass("active"), n.parent().addClass("active")
    }
  },

  //         setTextForLimitedFilter: function() {
  //             var t = $("[data-limited-view]"),
  //                 e = t.find(".label-tab"),
  //                 i = e.find(".label-text"),
  //                 a = e.next().find("li.active").text();
  //             if (i.text(a), t.length) {
  //                 var o = t.find("li.active span").data("value"),
  //                     n = t.find('span[data-value="' + o + '"]'),
  //                     s = n.text();
  //                 i.text(s), e.next().find("li").removeClass("active"), n.parent().addClass("active")
  //             }
  //         },

  ajaxFilterSortby: function() {
    var t = "[data-sortby] li span",
        i = $(t);
    $("body").off("click.sortBy", t).on("click.sortBy", t, function(t) {
      if (t.preventDefault(), t.stopPropagation(), !$(this).parent().hasClass("active")) {
        Shopify.queryParams.sort_by = $(this).attr("data-href"), hsjs.ella_collection.filterAjaxClick();
        var e = hsjs.ella_collection.ajaxCreateUrl();
        hsjs.ella_collection.doAjaxToolbarGetContent(e)
      }
      i.closest(".dropdown-menu").prev().trigger("click")
    })
  },

  //         ajaxFilterLimit: function() {
  //             var t = "[data-limited-view] li span",
  //                 a = $(t);
  //             $("body").off("click.sortBy", t).on("click.sortBy", t, function(t) {
  //                 t.preventDefault(), t.stopPropagation();
  //                 var e = $(this);
  //                 if (!e.parent().hasClass("active")) {
  //                     var i = "" + e.data("value");
  //                     $("[data-limited-view] .label-tab .label-text").text(i), hsjs.ella_collection.doAjaxLimitGetContent(i)
  //                 }
  //                 a.closest(".dropdown-menu").prev().trigger("click")
  //             })
  //         },
  //         doAjaxLimitGetContent: function(t) {
  //             hsjs.ella_collection.isAjaxLoading || $.ajax({
  //                 type: "Post",
  //                 url: "/cart.js",
  //                 data: {
  //                     "attributes[pagination]": t
  //                 },
  //                 success: function(t) {
  //                     window.location.reload()
  //                 },
  //                 error: function(t, e) {
  //                     $(".ajax-error-message").text(h.parseJSON(t.responseText).description), hsjs.ella_collection.showModal(".ajax-error-modal")
  //                 },
  //                 dataType: "json"
  //             })
  //         },

  doAjaxToolbarGetContent: function(t) {
    hsjs.ella_collection.isAjaxLoading || $.ajax({
      type: "get",
      url: t,
      beforeSend: function() {
        hsjs.ajax.showLoading()
      },
      success: function(t) {
        
        hsjs.ella_collection.ajaxMapData(t)
        
        , hsjs.lazybits.init()
        
//         , hsjs.ella_collection.initColorSwatchGrid()
        
        , hsjs.ella_collection.setTextForSortbyFilter()
        
        , hsjs.ella_collection.initSidebarProductSlider()
        
//         , hsjs.ella_collection.initCountdownNormal()
        
      },
      error: function(t, e) {
        $(".ajax-error-message").text(h.parseJSON(t.responseText).description), hsjs.ella_collection.showModal(".ajax-error-modal")
      },
      complete: function() {
        hsjs.ajax.hideLoading()
      }
    })
  },

  filterSidebar: function() {
    hsjs.ella_collection.queryParams(), hsjs.ella_collection.ajaxFilterTags(), hsjs.ella_collection.ajaxFilterClearTags(), hsjs.ella_collection.ajaxFilterClearAll()
  },

  ajaxFilterTags: function() {
    $("body").off("click.filterTags").on("click.filterTags", ".sidebar-tags .list-tags a, .sidebar-tags .list-tags label, .refined .selected-tag", function(t) {
      t.preventDefault(), t.stopPropagation();
      var e = [];
      if (Shopify.queryParams.constraint && (e = Shopify.queryParams.constraint.split("+")), !window.enable_sidebar_multiple_choice && !$(this).prev().is(":checked")) {
        var i, a, o = $(this).closest(".sidebar-tags, .refined-widgets").find("input:checked");
        if (o.length)
          if (i = o.val()) 0 <= (a = e.indexOf(i)) && e.splice(a, 1)
            }(i = $(this).prev().val()) && (0 <= (a = e.indexOf(i)) ? e.splice(a, 1) : e.push(i));
      e.length ? Shopify.queryParams.constraint = e.join("+") : delete Shopify.queryParams.constraint, hsjs.ella_collection.filterAjaxClick();
      var n = hsjs.ella_collection.ajaxCreateUrl();
      hsjs.ella_collection.doAjaxSidebarGetContent(n)
    })
  },

  ajaxFilterClearTags: function() {
    $(".sidebar-tags").each(function() {
      var a = $(this);
      a.find("input:checked").length && a.find(".clear").show().click(function(t) {
        t.preventDefault(), t.stopPropagation();
        var i = [];
        Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")), a.find("input:checked").each(function() {
          var t = $(this).val();
          if (t) {
            var e = i.indexOf(t);
            0 <= e && i.splice(e, 1)
          }
        }), i.length ? Shopify.queryParams.constraint = i.join("+") : delete Shopify.queryParams.constraint, hsjs.ella_collection.filterAjaxClick();
        var e = hsjs.ella_collection.ajaxCreateUrl();
        hsjs.ella_collection.doAjaxSidebarGetContent(e)
      })
    })
  },

  ajaxFilterClearAll: function() {
    var t = ".refined-widgets a.clear-all";
    $(t);
    $("body").off("click.clearAllTags", t).on("click.clearAllTags", t, function(t) {
      t.preventDefault(), t.stopPropagation(), delete Shopify.queryParams.constraint, hsjs.ella_collection.filterAjaxClick();
      var e = hsjs.ella_collection.ajaxCreateUrl();
      hsjs.ella_collection.doAjaxSidebarGetContent(e)
    })
  },

  doAjaxSidebarGetContent: function(t) {
    hsjs.ella_collection.isAjaxLoading || $.ajax({
      type: "get",
      url: t,
      beforeSend: function() {
        hsjs.ajax.showLoading()
      },
      success: function(t) {
        
        hsjs.ella_collection.ajaxMapData(t)
        
        , hsjs.lazybits.init()
        
//         , hsjs.ella_collection.initColorSwatchGrid()
        
        , hsjs.ella_collection.ajaxFilterClearTags()
        
        , hsjs.ella_collection.initSidebarProductSlider()
        
//         , hsjs.ella_collection.initCountdownNormal()
        
      },
      error: function(t, e) {
        $(".ajax-error-message").text(h.parseJSON(t.responseText).description), hsjs.ella_collection.showModal(".ajax-error-modal")
      },
      complete: function() {
        hsjs.ajax.hideLoading()
      }
    })
  },

  ajaxMapData: function(t) {
    var e = $(".collection-template"),
        i = e.find(".breadcrumb"),
        a = e.find(".sidebar"),
        o = e.find(".collection-header"),
        n = e.find(".product-collection"),
        s = e.find(".padding"),
        r = $(t).find(".collection-template"),
        l = r.find(".breadcrumb"),
        d = r.find(".sidebar"),
        c = r.find(".collection-header"),
        u = r.find(".product-collection"),
        p = r.find(".padding");
    if (i.replaceWith(l)
        , a.replaceWith(d)
        , $(".col-sidebar.lazybit").removeClass("lazybit-loaded").addClass("lazybit-load")
        , o.replaceWith(c)
        , n.replaceWith(u)
        , 0 < s.length ? s.replaceWith(p) : e.find(".col-main").length ? e.find(".col-main").append(p) : e.find(".col-no-sidebar").append(p)
        
//         , hsjs.ella_collection.translateBlock(".collection-template")
        
//         , hsjs.ella_collection.initWishListIcons()
        
        , $("[data-view-as]").length && hsjs.ella_collection.viewModeLayout()

        //                 , 

        //                 hsjs.ella_collection.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), 

        //                 $(".shopify-product-reviews-badge").length && $(".spr-badge").length

       ) 

      //               return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
      return true;

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
              hsjs.ella_collection.doAjaxInfiniteScrollingGetContent(e)
            }
          })
          , window.infinity_scroll_feature && ($('[data-section-type="collection-template"]').length || $("[data-search-page]").length) && $(window).off("scroll.infiniteScrolling").on("scroll.infiniteScrolling", function() {

            var $infiniteScrollMoreBtn = $(o);
            var infiniteScrollNextUrl = $infiniteScrollMoreBtn.attr("href");
            var nextPageIndex = ("?page=" + infiniteScrollNextUrl.split("?page=")[1]).split("&")[0];
            var nextUrlQueryString = "?page=" + nextPageIndex; 
//             console.log("$infiniteScrollMoreBtn: ", $infiniteScrollMoreBtn);
//             console.log("infiniteScrollNextUrl: ", infiniteScrollNextUrl);
//             console.log("nextPageIndex: ", nextPageIndex);
//             console.log("nextUrlQueryString: ", nextUrlQueryString);
            
            // disable infinite scrolling after page 3
//             if ( nextPageIndex > 3 ){
//               $(window).off("scroll.infiniteScrolling");
//             }
            
            // disable after 2 loads 
            if ($(".page-divider").length > 1){
              $(window).off("scroll.infiniteScrolling");
            }
            
            if ( ! hsjs.ella_collection.isAjaxLoading ) {
              var t = $('[data-section-type="collection-template"]');
              t.length || (t = $("[data-search-page]"));
              var e = t.offset().top + t.outerHeight() - $(window).height();
              if (
                $(this).scrollTop() > e 
                //                       && $(this).scrollTop() < 200 + e
              ){
                if ($infiniteScrollMoreBtn.length && !$infiniteScrollMoreBtn.hasClass("disabled")) {
                  //                         var infiniteScrollNextUrl = i.attr("href") + "&view=products";
                  hsjs.ella_collection.doAjaxInfiniteScrollingGetContent(infiniteScrollNextUrl);
//                   window.history.pushState('', '', nextUrlQueryString);
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
    var loading_text = "Loading more products"; 
    var next_page_url = t; 
    hsjs.ella_collection.isAjaxLoading || $.ajax({
      type: "get",
      url: t,
      beforeSend: function() {
        $inf_scr_btn.attr("disabled", true).addClass("disabled").text(loading_text);
        hsjs.ajax.showLoading();
      },
      success: function(t) {
        
        hsjs.ella_collection.ajaxInfiniteScrollingMapData(t, next_page_url)
        
        , hsjs.lazybits.init()
        
//         , hsjs.ella_collection.initColorSwatchGrid()
        
        , $("[data-view-as]").length && hsjs.ella_collection.viewModeLayout()
        
//         , hsjs.ella_collection.initCountdownNormal()
        
      },
      error: function(t, e) {
        $(".ajax-error-message").text(h.parseJSON(t.responseText).description), hsjs.ella_collection.showModal(".ajax-error-modal")
      },
      complete: function() {
//         hsjs.ella_collection.refreshYotpo();
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
        
        if ("product_auction" in hsjs && "init" in hsjs.product_auction){
          var auctions_to_clear = document.querySelectorAll(".wk-category-auction:empty");
          if (auctions_to_clear){
            for (var i = auctions_to_clear.length-1; i >= 0; i--) {
              auctions_to_clear[i].innerHTML = "";
            }
            hsjs.product_auction.init();
          }
        }
        
      }
    })
  },

  ajaxInfiniteScrollingMapData: function(t, nextPageUrl) {
    var e = $(".collection-template").find(".product-collection"),
        i = $(t).hasClass("collection-template") ? $(t) : $(t).find(".collection-template"),
        a = i.find(".product-collection"),
        o = a.children(".grid-item").not(".banner-img");

    var nextPageIndex = (nextPageUrl.split("?page=")[1]).split("&")[0]; 

    let collection_view_event_elements = []
    let collection_id = ''
    let collection_name = ''

    o.each(function(index, element) { 
      var scriptTag = $(element).find('.view_item_list_event');
       
      if (scriptTag.length > 0) { 
        collection_id = scriptTag.data('colletion_id') || ''; 
        collection_name = scriptTag.data('collection-name') || '';
        var scriptContent = JSON.parse(scriptTag.html()); 
        collection_view_event_elements.push({...scriptContent,index:index+1});
      }
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: collection_id,
        item_list_name: collection_name, 
        items: collection_view_event_elements
      }
    });
    
    // var collectionTitle = $(".collection-title").text().length > 0 ? $(".collection-title").text() + " - " : "";
    // var page_divider = '<div class="page-divider w-100 simple"><hr data-page-divider=""><h3 class="text-center">' + collectionTitle + 'Page ' + nextPageIndex + '</h3></div>';

//           console.log("PREPEND hello");
//     o.prepend("<div hidden data-page-divider></div>");

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
      if (
        // e.append(page_divider)
        //   , 
          e.append(o)
          , $(".collection-template .product-collection[data-layout]").length 
          && (
        hsjs.ella_collection.ellaTimeout = setTimeout(function() {
          e.isotope("appended", o).isotope("layout")
        }, 700))

//           , hsjs.ella_collection.translateBlock(".product-collection")

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

      //                 if (hsjs.ella_collection.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length && $(".spr-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()

    }
  },

  addEventViewModeLayout: function() {
    hsjs.ella_collection.setActiveViewModeMediaQuery(), $("body").on("click", ".view-mode .icon-mode", function(t) {
      t.preventDefault();
      var e = $(this),
          i = (e.data("col"), e.closest("[data-view-as]"));
      e.hasClass("active") || (i.find(".icon-mode").removeClass("active"), e.addClass("active"), hsjs.ella_collection.viewModeLayout())
    })
  },

  viewModeLayout: function() {
    var t = $("[data-view-as]").find(".icon-mode.active").data("col"),
        e = $(".collection-template .product-collection"),
        i = e.find(".grid-item"),
        a = "col-12 col-6 col-md-4 col-lg-3 col5",
        o = "grid-2 grid-3 grid-4 grid-5 products-grid products-list";
    switch (t) {
      case 1:
        i.hasClass("grid-item-mansory") ? e.removeClass(o).addClass("products-list") : e.removeClass("products-grid").addClass("products-list"), i.removeClass(a).addClass("col-12");
        i.addClass("row").find(".product-image, .product-bottom").addClass("col-6");
        break;
      default:
        switch (t) {
          case 2:
            i.hasClass("grid-item-mansory") ? e.removeClass(o).addClass("products-grid grid-2") : e.removeClass("products-list").addClass("products-grid"), i.removeClass(a).addClass("col-6");
            i.removeClass("row").find(".product-image, .product-bottom").removeClass("col-6");
            break;
          case 3:
            i.hasClass("grid-item-mansory") ? e.removeClass(o).addClass("products-grid grid-3") : e.removeClass("products-list").addClass("products-grid"), i.removeClass(a).addClass("col-6 col-md-4");
            i.removeClass("row").find(".product-image, .product-bottom").removeClass("col-6");
            break;
          case 4:
            i.hasClass("grid-item-mansory") ? e.removeClass(o).addClass("products-grid grid-4") : e.removeClass("products-list").addClass("products-grid"), i.removeClass(a).addClass("col-6 col-md-4 col-lg-3");
            i.removeClass("row").find(".product-image, .product-bottom").removeClass("col-6");
            break;
          case 5:
            i.hasClass("grid-item-mansory") ? e.removeClass(o).addClass("products-grid grid-5") : e.removeClass("products-list").addClass("products-grid"), i.removeClass(a).addClass("col-6 col-md-4 col-lg-3 col5");
            i.removeClass("row").find(".product-image, .product-bottom").removeClass("col-6");
        }
    }
  },

  setActiveViewModeMediaQuery: function() {
    var t = $("[data-view-as]"),
        e = t.find(".icon-mode.active"),
        i = e.data("col"),
        a = window.innerWidth;
    a < 768 ? 3 !== i && 4 != i && 5 != i || (e.removeClass("active"), $('[data-col="2"]').addClass("active")) : a < 992 && 768 <= a ? 4 != i && 5 != i || (e.removeClass("active"), $('[data-col="3"]').addClass("active")) : a < 1200 && 992 <= a && 5 == i && (e.removeClass("active"), $('[data-col="4"]').addClass("active")), t.length && hsjs.ella_collection.viewModeLayout()
  },
  
  initPaginationPage: function() {
    var t = ".pagination-page a";
    $("body").off("click", t).on("click", t, function(t) {
      t.preventDefault();
      var e = $(this).attr("href").match(/page=\d+/g);
      if (e && (Shopify.queryParams.page = parseInt(e[0].match(/\d+/g)), Shopify.queryParams.page)) {
        
        var i = hsjs.ella_collection.ajaxCreateUrl();
        
        hsjs.ella_collection.isSidebarAjaxClick = !0;
        
//         History.pushState({
//           param: Shopify.queryParams
//         }, i, i);
        
        hsjs.ella_collection.doAjaxToolbarGetContent(i);
        
        var a = $('[data-section-type="collection-template"] .toolbar');
        
        a.length || (a = $("[data-search-page]"));
        
        var o = a.offset().top;
        
        $("body,html").animate({
          scrollTop: o
        }, 600)
        
      }
    })
  },

  toggleVariantsForExpressOrder: function() {
    $(document).on("click", "[data-toggle-variant]", function(t) {
      t.preventDefault(), t.stopPropagation();
      var e = $(this),
          i = e.data("target");
      e.hasClass("show-options-btn") ? (e.text(window.inventory_text.hide_options), $(i).slideDown(700, function() {
        e.addClass("hide-options-btn").removeClass("show-options-btn")
      })) : (e.text(window.inventory_text.show_options), $(i).slideUp(700, function() {
        e.addClass("show-options-btn").removeClass("hide-options-btn")
      }))
    })
  },

  initExpressOrderAddToCart: function() {
    var t = "[data-express-addtocart]";
    $(document).off("click.addToCartExpress", t).on("click.addToCartExpress", t, function(t) {
      t.preventDefault();
      var e = $(this);
      if ("disabled" != e.attr("disabled")) {
        var i = e.closest(".product-item");
        0 == i.length && (i = e.closest(".col-options"));
        var a = i.find("form"),
            o = a.find("select[name=id]").val();
        o || (o = a.find("input[name=id]").val());
        var n = i.find("input[name=quantity]");
        0 == n.length && (n = i.siblings(".col-qtt").find("input[name=quantity]"));
        var s = n.val();
        s || (s = 1), 0 !== parseInt(s) ? "none" == window.ajax_cart ? a.submit() : (hsjs.ella_collection.expressAjaxAddToCart(o, s, e, a), a.next(".feedback-text").show()) : a.next(".feedback-text").text("Quantity cannot be blank").show()
      }
      return !1
    })
  },

  init: function(){
    
    // Collection and search templates
    ($("body").hasClass("template-collection") || $("body").hasClass("template-search") || (hsjs.vars && hsjs.vars.template && (hsjs.vars.template.name == "collection" || hsjs.vars.template.name == "search"))) 
    && (
      //         hsjs.ella_collection.historyAdapter(), 
      hsjs.ella_collection.initInfiniteScrolling()
      , hsjs.ella_collection.initPaginationPage()
    );

    // Collection templates
    ($("body").hasClass("template-collection") || (hsjs.vars && hsjs.vars.template && hsjs.vars.template.name == "collection")) 
    && (
      hsjs.ella_collection.filterToolbar()
      , hsjs.ella_collection.filterSidebar()
//       , hsjs.ella_collection.toggleVariantsForExpressOrder()
//       , hsjs.ella_collection.initExpressOrderAddToCart()
    );

    hsjs.ella_collection.initSidebar();

    $(window).on("resize", function() {
      hsjs.ella_collection.setActiveViewModeMediaQuery()
    });
    
  }

};


hsjs.collection_template = {
  
  refresh: function(){

    // Collection sidebar filters show more / less
    hsjs.collectionClickHandlers.init();

    // Ella init
    hsjs.ella_collection.init();
    
  },
  
  init: function(){

    // Set product page JS loaded to true so we don't load it again
    hsjs.cache.site_data.theme.collection_template_js_loaded = true;
    
    // Collection sidebar filters show more / less
    hsjs.collectionClickHandlers.init();
    
    // Ella init
    hsjs.ella_collection.init();
    
  }

};


hsjs.collection_template.init();
