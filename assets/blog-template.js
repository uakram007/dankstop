
hsjs.blogScripts = {

  scripts: function(){

    var $articlesContainer = $("#dankblog_all_articles");
    var $searchContainer = $("#search_container");
    var $searchBtn = $("#article_search_icon");
    var $searchField = $("#type_search_field");
    var $searchForm = $("#blog_search_form");
    var $paginationList = $("#paginationList");
    var $mobileNavBtn = $("#more_categories_mobile");
    var $blogNav = $("#secondary_ul");
    var $load_more_link = $("#load_more_page");

    var domain = window.location.origin;
    var link = domain + "/search?view=blog&page=1&type=article&q=";

    /*
   * Ajax Show/Hide Loading
   */
    function showLoading() {
      $(".loading-spinner").show();
    }
    function hideLoading() {
      $(".loading-spinner").hide();
    }


    function blog_pagination(pagination_link, query){

      var $paginationList = $("#paginationList");
      var $articlesContainer = $("#dankblog_all_articles");
      var nextPageIndex = 2;

      function attachPaginationCLick(){

        $paginationList.off("click").one("click", function(e) {
          e.preventDefault();  

          showLoading();

          //         if ( (query_type == "tag" || query_type == "") || ! query || query === undefined ){
          //           var search_query_string = "";
          //           var paginationUrl = window.location.href + "?page=" + nextPageIndex;
          //         }
          //         else {
          //           var search_query_string = "&q=" + query + "&type=article&cache=false";
          //           var paginationUrl = window.location.origin + "/search?view=blog&page=" + nextPageIndex + search_query_string;
          //         }
          
          
          if ( ! pagination_link || pagination_link == null ) {
//             var pagination_link = window.location.origin + "/blogs/blog?page=1";
            var pagination_link = $load_more_link.attr("href");
          }

//           var paginationUrl = window.location.origin + pagination_link.replace("page=1", "page=" + nextPageIndex);
          var paginationUrl = window.location.origin + pagination_link.split("page=")[0] + "page=" + nextPageIndex;
          
          $load_more_link.attr("href", paginationUrl.replace(window.location.origin, ""));

          $.ajax({
            url: paginationUrl, 
            type: "GET",
            success: function(data){
              var $categoryArticles = $(data).find(".individual_article");

              if ($categoryArticles.length > 11) {
                $articlesContainer.append($categoryArticles);
                attachPaginationCLick();
                $paginationList.show();
              }
              else {
                var no_results_html = "<div class=\"individual_article col-12 text-center\"><p>There are no more results for this topic.</p></div>";
                $articlesContainer.append(no_results_html);
                $paginationList.hide();
              }

              hideLoading();

              nextPageIndex++;
            }
          });
        });
      }

      $paginationList.show();
      attachPaginationCLick();

    }


    function load_article_results(query_type, query, $containerForContent){
      showLoading();
      if ( $containerForContent === undefined || ! $containerForContent){
        var $containerForContent = $("#dankblog_all_articles");
      }
      if (query_type == "search"){
        var pagination_link = window.location.origin + "/search?view=blog&page=1&q=" + query + "&type=article&cache=false";
        var search_query_link = pagination_link + " .search-page .articles-list > *";
      }
      else if (query_type == "tag"){
        var pagination_link = window.location.origin + "/blogs/blog/tagged/" + query + "?page=1";
        var search_query_link = pagination_link + " .articles-list .individual_article ";
      }

      $containerForContent.load(search_query_link, function(ajaxResp) {

        hideLoading();

        blog_pagination(pagination_link, query);

      });
    }


    $(document).off("click.blogHeaderTabs").on("click.blogHeaderTabs", "[data-supernav-query]", function() {
      var $thisItem = $(this);
      $("[data-supernav-query]").removeClass("active");
      $thisItem.addClass("active");
      var query_type = $thisItem.attr("data-supernav-query-type");
      var query = $thisItem.attr("data-supernav-query");
      
      if (query_type == "search"){
        var pagination_link = "/search?view=blog&page=1&q=" + query + "&type=article&cache=false";
      }
      else if (query_type == "tag"){
        var pagination_link = "/blogs/blog/tagged/" + query + "?page=1";
      }
      $load_more_link.attr("href", pagination_link);
      
      load_article_results(query_type, query);
    });


    // Displays/Open the SEARCH FIELD SECTION
    function hideSearchContainer(event){
      if (event.target !== $searchBtn[0] && event.target !== $searchField[0]) {
        $searchContainer.hide();
        $(window).off("click.blogHideSearchContainer", hideSearchContainer);
      }
      else {
      }
    };
    $searchBtn.on("click", function(event) {
      $searchContainer.show();

      $searchField.focus();

      event.stopPropagation();

      //To close the SEARCH FIELD SECTION
      $(window).on("click.blogHideSearchContainer", hideSearchContainer);
    });

    // This prevents form from reloading page
    $searchForm.submit(function(e) {
      e.preventDefault();

      // Gets the value of the input search field
      var category_search_query = encodeURIComponent($('#type_search_field').val().replace(/[^0-9a-z ]/gi, ""));

      // load article results
      load_article_results("search", category_search_query);

      // hide search container
      $searchContainer.hide();
      $searchField.blur();

      //clears the input field after submit
      $searchField.val(''); 
    });



    //Paginate/Load More Posts function
    function hideNavMenu(event){
      if (event.target !== $blogNav[0] && event.target !== $mobileNavBtn[0]) {
        $blogNav.hide();
        $(window).off("click.blogHideNavMenu", hideNavMenu);
      }
    };
    $mobileNavBtn.off("click.blogMobileNav").on("click.blogMobileNav", function(event) {
      $blogNav.show();
      event.stopPropagation();    
      $(window).on("click.blogHideNavMenu", hideNavMenu);
    });


    $(document).ready(function() {  
      // Enable initial pagination
      blog_pagination();
    });

  },

  init: function(){
    hsjs.blogScripts.scripts();
  }

};



hsjs.blog_template = {

  refresh: function(){

    // blog scripts
    hsjs.blogScripts.init();

  },

  init: function(){

    // Set product page JS loaded to true so we don't load it again
    hsjs.cache.site_data.theme.blog_template_js_loaded = true;

    // blog scripts
    hsjs.blogScripts.init();

  }

};

hsjs.blog_template.init();
