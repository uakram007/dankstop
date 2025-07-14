(function() {
    var t, e;
    t = this.jQuery || window.jQuery, e = t(window), t.fn.stick_in_parent = function(i) {
        var o, a, s, n, d, r, l, c, u, h, p;
        for (null == i && (i = {}), p = i.sticky_class, d = i.inner_scrolling, h = i.recalc_every, u = i.parent, c = i.offset_top, l = i.spacer, a = i.bottoming, null == c && (c = 0), null == u && (u = void 0), null == d && (d = !0), null == p && (p = "is_stuck"), o = t(document), null == a && (a = !0), s = function(i, s, n, r, f, g, m, w) {
                var v, k, b, x, y, S, T, C, j, _, P, A;
                if (!i.data("sticky_kit")) {
                    if (i.data("sticky_kit", !0), y = o.height(), T = i.parent(), null != u && (T = T.closest(u)), !T.length) throw "failed to find stick parent";
                    if (v = b = !1, (P = null != l ? l && i.closest(l) : t("<div />")) && P.css("position", i.css("position")), (C = function() {
                            var t, e, a;
                            if (!w && (y = o.height(), t = parseInt(T.css("border-top-width"), 10), e = parseInt(T.css("padding-top"), 10), s = parseInt(T.css("padding-bottom"), 10), n = T.offset().top + t + e, r = T.height(), b && (v = b = !1, null == l && (i.insertAfter(P), P.detach()), i.css({
                                    position: "",
                                    top: "",
                                    width: "",
                                    bottom: ""
                                }).removeClass(p), a = !0), f = i.offset().top - (parseInt(i.css("margin-top"), 10) || 0) - c, g = i.outerHeight(!0), m = i.css("float"), P && P.css({
                                    width: i.outerWidth(!0),
                                    height: g,
                                    display: i.css("display"),
                                    "vertical-align": i.css("vertical-align"),
                                    float: m
                                }), a)) return A()
                        })(), g !== r) return x = void 0, S = c, _ = h, A = function() {
                        var t, u, k, j;
                        if (!w && (k = !1, null != _ && (0 >= --_ && (_ = h, C(), k = !0)), k || o.height() === y || C(), k = e.scrollTop(), null != x && (u = k - x), x = k, b ? (a && (j = k + g + S > r + n, v && !j && (v = !1, i.css({
                                position: "fixed",
                                bottom: "",
                                top: S
                            }).trigger("sticky_kit:unbottom"))), k < f && (b = !1, S = c, null == l && ("left" !== m && "right" !== m || i.insertAfter(P), P.detach()), t = {
                                position: "",
                                width: "",
                                top: ""
                            }, i.css(t).removeClass(p).trigger("sticky_kit:unstick")), d && (t = e.height(), g + c > t && !v && (S -= u, S = Math.max(t - g, S), S = Math.min(c, S), b && i.css({
                                top: S + "px"
                            })))) : k > f && (b = !0, (t = {
                                position: "fixed",
                                top: S
                            }).width = "border-box" === i.css("box-sizing") ? i.outerWidth() + "px" : i.width() + "px", i.css(t).addClass(p), null == l && (i.after(P), "left" !== m && "right" !== m || P.append(i)), i.trigger("sticky_kit:stick")), b && a && (null == j && (j = k + g + S > r + n), !v && j))) return v = !0, "static" === T.css("position") && T.css({
                            position: "relative"
                        }), i.css({
                            position: "absolute",
                            bottom: s,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")
                    }, j = function() {
                        return C(), A()
                    }, k = function() {
                        if (w = !0, e.off("touchmove", A), e.off("scroll", A), e.off("resize", j), t(document.body).off("sticky_kit:recalc", j), i.off("sticky_kit:detach", k), i.removeData("sticky_kit"), i.css({
                                position: "",
                                bottom: "",
                                top: "",
                                width: ""
                            }), T.position("position", ""), b) return null == l && ("left" !== m && "right" !== m || i.insertAfter(P), P.remove()), i.removeClass(p)
                    }, e.on("touchmove", A), e.on("scroll", A), e.on("resize", j), t(document.body).on("sticky_kit:recalc", j), i.on("sticky_kit:detach", k), setTimeout(A, 0)
                }
            }, n = 0, r = this.length; n < r; n++) i = this[n], s(t(i));
        return this
    }
}).call(this), window.hsjs = window.hsjs || {}, void 0 === hsjs.Shopify && (hsjs.Shopify = window.Shopify || {}), hsjs.Shopify.removeItemByLineNumber = function(t, e) {
    var i = {
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=0&line=" + t,
        dataType: "json",
        success: function(t) {
            "function" == typeof e ? e(t) : hsjs.Shopify.onCartUpdate(t)
        },
        error: function(t, e) {
            hsjs.Shopify.onError(t, e)
        }
    };
    jQuery.ajax(i)
}, hsjs.ella = function(t) {
    var e, i, o = {
            ellaTimeout: null,
            isSidebarAjaxClick: !1,
            isAjaxLoading: !1,
            init: function() {
                this.showHideMenuMobile(), this.closeAllOnMobile(), this.initDropdownColFooter(), this.initScrollTop(), this.initNewsLetterPopup(), this.changeQuantityAddToCart(), this.initAddToCart(), this.initGroupedAddToCart(), this.initSliderFeaturedProducts(), this.addEventLookbookModal(), this.initPoliciesSlider(), this.initCountdown(), this.initCountdownNormal(), (a.hasClass("template-index") || a.hasClass("template-page") || hsjs.vars && hsjs.vars.template && hsjs.vars.template.name && ("index" == hsjs.vars.template.name || "page" == hsjs.vars.template.name)) && (this.initSlideshow(), this.initBrandsSlider()), (a.hasClass("template-index") || "index" == hsjs.vars.template.name) && (this.initInfiniteScrollingHomepage(), this.clickedActiveProductTabs(), this.initBlogPostSlider(), this.handleScrollDown()), this.initSoldOutProductShop(), this.initCustomerViewProductShop(), this.initChangeQuantityButtonEvent(), this.initQuantityInputChangeEvent(), this.removeCartItem(), this.initQuickView(), this.stickyFixedTopMenu(), this.openSearchForm(), (a.hasClass("template-product") || hsjs.vars && hsjs.vars.template && "product" == hsjs.vars.template.name) && (this.productPageInitProductTabs(), this.initStickyForProductFullWidth()), this.doAddOrRemoveWishlish(), a.hasClass("template-page") && t(".wishlist-page").length && this.initWishLists()
            },
            closeHeaderTop: function() {
                var e = t(".header-top"),
                    i = e.find("[data-close-header-top]");
                i.length && i.is(":visible") && ("closed" == t.cookie("headerTop") && e.remove(), i.off("click.closeHeaderTop").on("click.closeHeaderTop", function(i) {
                    i.preventDefault(), i.stopPropagation(), e.remove(), t.cookie("headerTop", "closed", {
                        expires: 1,
                        path: "/"
                    })
                }))
            },
            showHideMenuMobile: function() {
                e.length && e.is(":visible") && e.off("click.showMenuMobile").on("click.showMenuMobile", function(e) {
                    e.preventDefault(), e.stopPropagation(), n.toggleClass("translate-overlay"), t(".close-menu-mb").toggleClass("menu-open"), t(".main-menu.jas-mb-style").css({
                        overflow: ""
                    }), t(".site-nav").find("[data-toggle-menu-mb]").parent().next(".sub-menu-mobile").removeClass("sub-menu-open")
                })
            },
            closeAllOnMobile: function() {
                a.off("click.close", r).on("click.close", r, function(e) {
                    e.preventDefault(), e.stopPropagation(), n.removeClass("translate-overlay cart-show customer-show sidebar-open options-show"), t(".close-menu-mb").removeClass("menu-open"), t(".main-menu.jas-mb-style").css({
                        overflow: ""
                    }), t(".site-nav").find("[data-toggle-menu-mb]").parent().next(".sub-menu-mobile").removeClass("sub-menu-open")
                })
            },
            initSlideshow: function() {
                var e = t("[data-init-slideshow]");
                e.length && e.each(function() {
                    var e = t(this);
                    if (e.data("auto-video")) {
                        function i(t, e) {
                            null != t && null != e && t.contentWindow.postMessage(JSON.stringify(e), "*")
                        }

                        function o(t, e) {
                            var o, a, s;
                            if (a = (o = t.find(".slick-current")).find("iframe").get(0), o.hasClass("slide-youtube")) switch (e) {
                                case "play":
                                    i(a, {
                                        event: "command",
                                        func: "mute"
                                    }), i(a, {
                                        event: "command",
                                        func: "playVideo"
                                    });
                                    break;
                                case "pause":
                                    i(a, {
                                        event: "command",
                                        func: "pauseVideo"
                                    })
                            } else o.hasClass("slide-video") && null != (s = o.children("video").get(0)) && ("play" === e ? s.play() : s.pause())
                        }
                        e.on("init", function(e) {
                            e = t(e.currentTarget), setTimeout(function() {
                                o(e, "play")
                            }, 1e3)
                        }), e.on("beforeChange", function(e, i) {
                            o(i = t(i.$slider), "pause")
                        }), e.on("afterChange", function(e, i) {
                            o(i = t(i.$slider), "play")
                        })
                    }
                    e.not(".slick-initialized") && e.on("init", function(t, i, o) {
                        !e[0].offsetHeight === e.find(".item .slide-image img")[0].offsetHeight && (e[0].style = "height: " + e.find(".item .slide-image img")[0].offsetHeight + "px;")
                    }) && e.on("reinit", function(t, i, o) {
                        !e[0].offsetHeight === e.find(".item .slide-image img")[0].offsetHeight && (e[0].style = "height: " + e.find(".item .slide-image img")[0].offsetHeight + "px;")
                    }) && e.slick({
                        waitForAnimate: !1,
                        dots: e.data("dots"),
                        slidesToScroll: 1,
                        verticalSwiping: !1,
                        fade: e.data("fade"),
                        cssEase: "ease",
                        adaptiveHeight: !0,
                        autoplay: e.data("autoplay"),
                        autoplaySpeed: e.data("autoplaySpeed"),
                        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 17 33" xml:space="preserve"><g id="e4eb89a6-f885-43b8-9259-0d6b1516fab0"><g id="_x38_e584754-6657-46f1-a9d8-2cfd6623b552"><g><polygon points="14.9,14.5 0,0 0,3.7 11.1,14.5 13.2,16.5 11.1,18.5 0,29.3 0,33 14.9,18.5 17,16.5 "></polygon></g></g></g></svg></button>',
                        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 33"><g id="7f9a1925-e8c7-4614-8787-3c6095a9f6e1" data-name="Layer 2"><g id="c9b7920a-81fa-4bfe-ad13-4da717c6854b" data-name="Layer 1"><g id="c2d982ff-0cf6-4220-b365-47f30d708fea" data-name="e4eb89a6-f885-43b8-9259-0d6b1516fab0"><g id="f51d455e-6b9c-4c4e-96db-a5004582beda" data-name="8e584754-6657-46f1-a9d8-2cfd6623b552"><polygon points="0 16.5 2.1 18.5 17 33 17 29.3 5.9 18.5 3.8 16.5 5.9 14.5 17 3.7 17 0 2.1 14.5 0 16.5"></polygon></g></g></g></g></svg></button>',
                        responsive: [{
                            breakpoint: 1280,
                            settings: {
                                arrows: !1,
                                dots: e.data("dots")
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                arrows: !1,
                                autoplay: !1,
                                dots: !0
                            }
                        }]
                    })
                })
            },
            initInfiniteScrollingHomepage: function() {
                t("[data-new-arrivals-product]").each(function() {
                    var e = t(this),
                        i = e.find(".products-grid"),
                        o = i.data("products-to-show"),
                        a = e.find(".infinite-scrolling-homepage a"),
                        s = window.inventory_text.no_more_product;
                    i.find(".grid-item:hidden").length ? a.off("click.showMoreProduct").on("click.showMoreProduct", function(e) {
                        e.preventDefault(), 0 < i.find(".grid-item:hidden").length && (i.find(".grid-item:hidden:lt(" + o + ")").each(function() {
                            t(this).show()
                        }), d.scroll()), i.find(".grid-item:hidden").length || (window.multi_lang && translator.isLang2() && (s = window.lang2.collections.general.no_more_product), a.html(s).addClass("disabled"))
                    }) : (window.multi_lang && translator.isLang2() && (s = window.lang2.collections.general.no_more_product), a.html(s).addClass("disabled"))
                })
            },
            initSliderFeaturedProducts: function() {
                hsjs.tools.waitForJSObject("$.fn.slick", function() {
                    t("[data-featured-products]").each(function() {
                        var e = t(this),
                            i = e.find(".products-grid:not(.scroll-carousel)"),
                            o = i.data("row"),
                            a = t(".product-template [data-has-right-sidebar]");
                        i.not(".slick-initialized") && i.slick({
                            get slidesToShow() {
                                return a.length ? this.slidesToShow = 5 : this.slidesToShow = i.data("row")
                            },
                            get vertical() {
                                return i.hasClass("verticle") ? this.vertical = !0 : this.vertical = !1
                            },
                            get slidesToScroll() {
                                return i.hasClass("verticle") ? this.slidesToScroll = 1 : this.slidesToScroll = i.data("row")
                            },
                            waitForAnimate: !1,
                            speed: 1e3,
                            infinite: !1,
                            get dots() {
                                return e.hasClass("has-banner") ? this.dots = !0 : this.dots = !1
                            },
                            nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                            prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                            responsive: [{
                                breakpoint: 1400,
                                settings: {
                                    get slidesToShow() {
                                        return e.hasClass("has-banner") ? this.slidesToShow = 3 : this.slidesToShow = 5 < o ? 5 : i.data("row")
                                    },
                                    get slidesToScroll() {
                                        return e.hasClass("has-banner") ? this.slidesToScroll = 3 : i.hasClass("verticle") ? this.slidesToScroll = 1 : 4 <= o ? this.slidesToScroll = 4 : (o = 3) ? this.slidesToScroll = 3 : this.slidesToScroll = 2
                                    }
                                }
                            }, {
                                breakpoint: 1200,
                                settings: {
                                    dots: !0,
                                    arrows: !1,
                                    vertical: !1,
                                    get slidesToShow() {
                                        return e.hasClass("has-banner") ? this.slidesToShow = 2 : 4 <= o ? this.slidesToShow = 4 : (o = 3) ? this.slidesToShow = 3 : this.slidesToShow = 2
                                    },
                                    get slidesToScroll() {
                                        return e.hasClass("has-banner") ? this.slidesToScroll = 2 : 4 <= o ? this.slidesToScroll = 4 : (o = 3) ? this.slidesToScroll = 3 : this.slidesToScroll = 2
                                    }
                                }
                            }, {
                                breakpoint: 992,
                                settings: {
                                    dots: !0,
                                    arrows: !1,
                                    vertical: !1,
                                    get slidesToShow() {
                                        return this.slidesToShow = 3 <= o ? 3 : 2
                                    },
                                    get slidesToScroll() {
                                        return this.slidesToScroll = 3 <= o ? 3 : 2
                                    }
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    arrows: !1,
                                    vertical: !1,
                                    dots: !0
                                }
                            }]
                        })
                    })
                }, 7e3)
            },
            initBrandsSlider: function() {
                this.brandsStyle1(), this.brandsStyle2()
            },
            brandsStyle1: function() {
                t("[data-brands-slider]").each(function() {
                    var e = t(this);
                    e.not(".slick-initialized") && e.slick({
                        waitForAnimate: !1,
                        slidesToShow: e.data("rows"),
                        slidesToScroll: 1,
                        dots: !1,
                        infinite: !1,
                        speed: 800,
                        nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    })
                })
            },
            brandsStyle2: function() {
                t("[data-brands-slider-style2]").each(function() {
                    var e = t(this);
                    e.not(".slick-initialized") && e.slick({
                        waitForAnimate: !1,
                        rows: 2,
                        slidesPerRow: e.data("rows"),
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: !1,
                        speed: 800,
                        arrows: !1,
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesPerRow: 1,
                                slidesToShow: 4,
                                rows: 2
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesPerRow: 1,
                                slidesToShow: 3,
                                rows: 2
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesPerRow: 1,
                                slidesToShow: 2,
                                dots: !0,
                                rows: 2
                            }
                        }]
                    })
                })
            },
            initDropdownColFooter: function() {
                var e = t(".site-footer .dropdow-mb");
                window.innerWidth < 768 ? e.length && e.off("click.slideToggle").on("click.slideToggle", function() {
                    t(this).next().slideToggle(), t(this).toggleClass("open")
                }) : e.next().css({
                    display: ""
                })
            },
            initScrollTop: function() {
                var e = t("#back-top");
                d.scroll(function() {
                    220 < t(this).scrollTop() ? e.fadeIn(400) : e.fadeOut(400)
                }), e.off("click.scrollTop").on("click.scrollTop", function(e) {
                    return e.preventDefault(), e.stopPropagation(), t("html, body").animate({
                        scrollTop: 0
                    }, 400), !1
                })
            },
            closeTranslate: function(e, i) {
                t(e).length && a.off("click.closeCustomer", e).on("click.closeCustomer", e, function(t) {
                    t.preventDefault(), t.stopPropagation(), n.removeClass(i)
                })
            },
            updateDropdownCart: function() {
                Shopify.getCart(function(t) {
                    window.ella_dropdown_cart && ella_dropdown_cart.doUpdateDropdownCart ? ella_dropdown_cart.doUpdateDropdownCart(t) : o.doUpdateDropdownCart(t)
                })
            },
            showLoading: function() {
                t(".loading-spinner").show()
            },
            hideLoading: function() {
                t(".loading-spinner").hide()
            },
            showModal: function(e) {
                t(e).fadeIn(500), o.ellaTimeout = setTimeout(function() {
                    t(e).fadeOut(500)
                }, 5e3)
            },
            closeLookbookModal: function() {
                t(".ajax-lookbook-modal").fadeOut(500)
            },
            addEventLookbookModal: function() {
                a.off("click.addEvenLookbookModal touchstart.addEvenLookbookModal", "[data-lookbook-icon]").on("click.addEvenLookbookModal touchstart.addEvenLookbookModal", "[data-lookbook-icon]", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t(this).data("handle"),
                        a = t(this);
                    o.doAjaxAddLookbookModal(i, a), s.off("click.closeLookbookModal").on("click.closeLookbookModal", "[data-close-lookbook-modal], .ajax-lookbook-modal .overlay", function() {
                        return o.closeLookbookModal(), !1
                    })
                })
            },
            doAjaxAddLookbookModal: function(e, i) {
                var a, s, n = t(i).offset(),
                    d = n.top,
                    r = n.left,
                    l = i.innerWidth(),
                    c = t(".ajax-lookbook-modal").innerWidth(),
                    u = l + "px",
                    h = c + "px";
                a = 767 < window.innerWidth ? (s = c + 31 < r ? "calc(" + r + "px - " + h + " + 2px)" : "calc(" + r + "px + " + u + " - 2px)", d - c / 2 + "px") : (s = 0, d - 30 + "px"), o.isAjaxLoading || t.ajax({
                    type: "get",
                    url: "/products/" + e + "?view=json",
                    success: function(e) {
                        t(".ajax-lookbook-modal").css({
                            left: s,
                            top: a
                        }), t(".ajax-lookbook-modal .lookbook-content").html(e), t(".ajax-lookbook-modal").fadeIn(500)
                    },
                    error: function(e, i) {
                        t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.showModal(".ajax-error-modal")
                    }
                })
            },
            clickedActiveProductTabs: function() {
                t("[data-home-product-tabs]").each(function() {
                    var e = t(this),
                        i = e.find(".list-product-tabs").find("[data-product-tabTop]"),
                        a = e.find("[data-product-TabContent]"),
                        s = e.find(".list-product-tabs .tab-links.active"),
                        n = e.find(".product-tabs-content .tab-content.active");
                    o.doAjaxProductTabs(s.data("href"), n.find(".loading"), n.find(".products-grid")), i.off("click").on("click", function(e) {
                        if (e.preventDefault(), e.stopPropagation(), !t(this).hasClass("active") && !t(this).hasClass("active")) {
                            var s = t(this),
                                n = t(s.data("target"));
                            i.removeClass("active"), a.removeClass("active"), n.find(".products-grid").hasClass("slick-initialized") || o.doAjaxProductTabs(s.data("href"), n.find(".loading"), n.find(".products-grid")), s.addClass("active"), n.addClass("active")
                        }
                    })
                })
            },
            doAjaxProductTabs: function(e, i, a) {
                t.ajax({
                    type: "get",
                    url: e,
                    beforeSend: function() {
                        i.text("Loading ... please wait ...")
                    },
                    success: function(s) {
                        i.hide(), "/collections/?view=json" == e ? i.text("Please link to collections").show() : (a.html(t(s).find(".grid-items").html()), a.hasClass("slick-initialized") || o.initProductTabsSlider(a.parent()), o.ellaTimeout = setTimeout(function() {
                            if (t(".shopify-product-reviews-badge").length && t(".spr-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
                        }, 1e3))
                    },
                    error: function(t, e) {
                        i.text("Sorry, there are no products in this collection").show()
                    }
                })
            },
            initProductTabsSlider: function(e) {
                e.each(function() {
                    var e = t(this),
                        i = e.find(".products-grid:not(.scroll-carousel)"),
                        o = i.data("row");
                    i.not(".slick-initialized") && i.find(".grid-item").length && i.slick({
                        waitForAnimate: !1,
                        slidesToShow: i.data("row"),
                        slidesToScroll: i.data("row"),
                        dots: !1,
                        infinite: !1,
                        speed: 1e3,
                        nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                dots: !0,
                                arrows: !1,
                                get slidesToShow() {
                                    return e.hasClass("sections-has-banner") ? this.slidesToShow = 2 : 4 <= o ? this.slidesToShow = 4 : (o = 3) ? this.slidesToShow = 3 : this.slidesToShow = 2
                                },
                                get slidesToScroll() {
                                    return e.hasClass("sections-has-banner") ? this.slidesToScroll = 2 : 4 <= o ? this.slidesToScroll = 4 : (o = 3) ? this.slidesToScroll = 3 : this.slidesToScroll = 2
                                }
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                dots: !0,
                                arrows: !1,
                                get slidesToShow() {
                                    return e.hasClass("sections-has-banner") ? this.slidesToShow = 2 : 3 <= o ? this.slidesToShow = 3 : void(this.slidesToShow = 2)
                                },
                                get slidesToScroll() {
                                    return e.hasClass("sections-has-banner") ? this.slidesToScroll = 2 : this.slidesToScroll = 3 <= o ? 3 : 2
                                }
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows: !1,
                                dots: !0
                            }
                        }]
                    })
                })
            },
            initBlogPostSlider: function() {
                t("[data-blogs-slider]").each(function() {
                    var e = t(this),
                        i = e.data("rows");
                    e.not(".slick-initialized") && e.slick({
                        waitForAnimate: !1,
                        slidesToShow: i,
                        slidesToScroll: 1,
                        dots: !0,
                        speed: 800,
                        autoplay: !0,
                        arrows: !1,
                        responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToScroll: 2,
                                slidesToShow: 2
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 1
                            }
                        }]
                    })
                })
            },
            initPoliciesSlider: function() {
                t("[data-policies-slider]").each(function() {
                    var e = t(this),
                        i = e.data("row");
                    e.not(".slick-initialized") && e.slick({
                        waitForAnimate: !1,
                        slidesToShow: i,
                        slidesToScroll: 1,
                        autoplay: !0,
                        dots: !1,
                        speed: 800,
                        nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToScroll: 1,
                                get slidesToShow() {
                                    if (3 <= i) return this.slidesToShow = 3;
                                    this.slidesToShow = 2 == i ? 2 : 1
                                }
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToScroll: 1,
                                get slidesToShow() {
                                    if (2 <= i) return this.slidesToShow = 2;
                                    this.slidesToShow = 1
                                }
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 1
                            }
                        }]
                    })
                })
            },
            initCollectionBannerSlider: function() {
                var e = t("[data-home-collections-slider]");
                1200 <= window.innerWidth && e.each(function() {
                    var e = t(this),
                        i = e.data("rows");
                    e.not(".slick-initialized") && e.slick({
                        waitForAnimate: !1,
                        slidesToShow: i,
                        slidesToScroll: i,
                        infinite: !1,
                        speed: 1e3,
                        nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
                        responsive: [{
                            breakpoint: 1200,
                            settings: "unslick"
                        }]
                    })
                })
            },
            initCountdown: function() {
                t("[data-countdown]").each(function() {
                    var e = t(this),
                        i = e.data("countdown-value"),
                        o = e.find(".clock-item:eq(0) .num"),
                        a = e.find(".clock-item:eq(1) .num"),
                        s = e.find(".clock-item:eq(2) .num"),
                        n = e.find(".clock-item:eq(3) .num");
                    e.countdown(i, function(t) {
                        o.text(t.strftime("%D")), a.text(t.strftime("%H")), s.text(t.strftime("%M")), n.text(t.strftime("%S"))
                    })
                })
            },
            initCountdownNormal: function() {
                t("[data-countdown-normal]").each(function() {
                    var e = t(this),
                        i = e.data("countdown-value"),
                        o = e.find(".clock-item:eq(0) .num"),
                        a = e.find(".clock-item:eq(1) .num"),
                        s = e.find(".clock-item:eq(2) .num"),
                        n = e.find(".clock-item:eq(3) .num");
                    e.hasClass("countdown-suppermarket"), e.countdown(i, function(t) {
                        o.text(t.strftime("%D")), a.text(t.strftime("%H")), s.text(t.strftime("%M")), n.text(t.strftime("%S"))
                    })
                })
            },
            openEmailModalWindow: function(t) {
                t.fadeIn(1e3)
            },
            closeEmailModalWindow: function(e) {
                e.fadeOut(1e3), !e.find('input[name="dismiss"]').prop("checked") && e.find('input[name="dismiss"]').length || t.cookie("emailSubcribeModal", "closed", {
                    expires: 1,
                    path: "/"
                })
            },
            initNewsLetterPopup: function() {
                if (window.newsletter_popup) {
                    var e = t("[data-newsletter]"),
                        i = e.find(".close-window"),
                        a = e.find(".halo-modal-content");
                    "closed" != t.cookie("emailSubcribeModal") && (o.ellaTimeout = setTimeout(function() {
                        o.openEmailModalWindow(e)
                    }, 5e3)), i.click(function(t) {
                        t.preventDefault(), o.closeEmailModalWindow(e)
                    }), e.on("click", function(t) {
                        a.is(t.target) || a.has(t.target).length || o.closeEmailModalWindow(e)
                    }), t("#mc_embed_signup form").submit(function() {
                        "" != t("#mc_embed_signup .email").val() && o.closeEmailModalWindow(e)
                    })
                }
            },
            changeQuantityAddToCart: function() {
                var e = "[data-minus-quantity], [data-plus-quantity]";
                t(e), s.on("click", e, function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t(this),
                        o = i.siblings('input[name="quantity"]');
                    o.length < 1 && (o = i.siblings('input[name="updates[]"]'));
                    var a = parseInt(o.val());
                    switch (!0) {
                        case i.hasClass("plus"):
                            a += 1;
                            break;
                        case i.hasClass("minus") && 0 < a:
                            a -= 1
                    }
                    o.val(a)
                })
            },
            expressAjaxAddToCart: function(e, i, a, s) {
                t.ajax({
                    type: "post",
                    url: "/cart/add.js",
                    data: "quantity=" + i + "&id=" + e,
                    dataType: "json",
                    beforeSend: function() {
                        window.setTimeout(function() {
                            a.text(window.inventory_text.adding + "...")
                        }, 100)
                    },
                    success: function(t) {
                        window.setTimeout(function() {
                            a.text(window.inventory_text.thank_you)
                        }, 600), window.setTimeout(function() {
                            a.text(window.inventory_text.add_more + "...")
                        }, 1e3), o.updateDropdownCart(), a.addClass("add_more"), s.next(".feedback-text").text(window.inventory_text.cart_feedback)
                    },
                    error: function(e, i) {
                        t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.showModal(".ajax-error-modal"), window.setTimeout(function() {
                            a.text(window.inventory_text.add_to_cart)
                        }, 400)
                    }
                })
            },
            initAddToCart: function() {
                console.log("initAddToCart loadeddd... hhhhh");
                var e = "[data-btn-addToCart]";
                s.off("click.addToCart", e).on("click.addToCart", e, function(e) {
                    console.log("initAddToCart clicked..."), e.preventDefault(), e.stopPropagation();
                    var i = t(this);
                    if ("disabled" !== i.attr("disabled")) {
                        var a = i.closest(".product-item");
                        if (a.length < 1) {
                            var s = i.closest('[data-section-type="product"]');
                            s.length || (s = i.closest(".quickview-tpl")), a = s.find(".product-shop")
                        }
                        var n = a.find("form"),
                            d = a.find(".product-grid-image").data("collections-related") || s.data("collections-related"),
                            r = n.find("select[name=id]").val();
                        r || (r = n.find("input[name=id]").val());
                        var l = n.find("input[name=quantity]").val();
                        switch (l || (l = 1), window.ajax_cart) {
                            case "none":
                                n.submit();
                                break;
                            case "normal":
                                var c = a.find(".product-title").html(),
                                    u = a.find(".product-grid-image img").attr("src");
                                u || (u = a.siblings(".product-photos").find('.slick-current img[id|="product-featured-image"]').attr("src") || a.siblings(".product-photos").find('.slick-current img[id|="qv-product-featured-image"]').attr("src")), o.doAjaxAddToCartNormal(r, l, c, u);
                                break;
                            case "upsell":
                                o.doAjaxAddToCart(r, l, d)
                        }
                    }
                    return !1
                }), o.closeSuccessModal()

                
                    const getAllEliteProducts = document.querySelectorAll(
                        ".cc-elite-product-api"
                    );
                
                    getAllEliteProducts.forEach((item) => {
                        item.addEventListener("click", async (e) => {
                            console.log('upgrade clicked')
                            e.preventDefault();
                            e.target.textContent = "Loading...";
                
                            // if (typeof Shopify.customer === "undefined") {
                            //     alert("Please login or Signup to add  Elite product to your cart.");
                            //     return;
                            // }
                
                            const id = e.target.dataset.id;
                
                            const get_cart = await getCart();
                            const matched_item = get_cart.items.find((item) => item.variant_id == id);
                
                            if (matched_item) {
                                const updates = { [id]: 1 };
                
                                try {
                                    const response = await fetch(
                                        window.Shopify.routes.root + "cart/update.js",
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ updates }),
                                        }
                                    );
                
                                    if (!response.ok) throw new Error("Failed to remove item from cart");
                
                                    const data = await response.json();
                                    console.log("Item removed from cart:", data);
                                    alert("Elite Membership Product is already in the cart");
                                    window.location.href = "/cart";
                                } catch (error) {
                                    console.error("Error removing item from cart:", error);
                                }
                            } else {
                                const formData = {
                                    items: [
                                        {
                                            id: +id, // Ensure `id` is a number
                                            quantity: 1,
                                            properties: { _type: "hide" },
                                        },
                                    ],
                                };
                
                                try {
                                    const response = await fetch(
                                        `${window.Shopify.routes.root}cart/add.js`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(formData),
                                        }
                                    );
                
                                    if (!response.ok) throw new Error("Failed to add item to cart");
                
                                    const data = await response.json();
                                    window.location.href = "/cart";
                                } catch (error) {
                                    console.error("Error adding item to cart:", error);
                                    e.target.textContent = "Error, try again";
                                }
                            }
                        });
                    }); 
            },
            initGroupedAddToCart: function() {
                var e = "[data-grouped-addToCart]";
                o.changeVariantSelectOption(), s.off("click.GroupedAddToCart", e).on("click.GroupedAddToCart", e, function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t(this);
                    if ("disabled" !== i.attr("disabled")) {
                        var a = i.closest('[data-section-type="product"]'),
                            s = a.find(".product-shop"),
                            n = s.find("form"),
                            d = a.data("collections-related"),
                            r = n.find(".grouped-product");
                        Shopify.queue = [], r.each(function() {
                            variantId = t(this).find("input[type=hidden]").attr("value"), quantity = parseInt(t(this).find("input[name=quantity]").val()), 0 < quantity && "" !== variantId && Shopify.queue.push({
                                variantId: variantId,
                                quantity: parseInt(quantity, 10) || 0
                            })
                        }), Shopify.moveAlong = function() {
                            if (!Shopify.queue.length) {
                                var t = n.find("select[name=id]").val();
                                t || (t = n.find("input[name=id]").val());
                                var e = n.find("input[name=quantity]").val();
                                switch (e || (e = 1), window.ajax_cart) {
                                    case "none":
                                        n.submit();
                                        break;
                                    case "normal":
                                        var i = s.find(".product-title").html(),
                                            a = s.find(".product-grid-image img").attr("src");
                                        a || (a = s.siblings(".product-photos").find('.slick-current img[id|="product-featured-image"]').attr("src") || s.siblings(".product-photos").find('.slick-current img[id|="qv-product-featured-image"]').attr("src")), o.doAjaxAddToCartNormal(t, e, i, a);
                                        break;
                                    case "upsell":
                                        o.doAjaxAddToCart(t, e, d)
                                }
                                return !1
                            }
                            var r = Shopify.queue.shift();
                            Shopify.addItem(r.variantId, r.quantity, Shopify.moveAlong)
                        }, Shopify.moveAlong()
                    }
                }), o.closeSuccessModal()
            },
            changeVariantSelectOption: function() {
                s.on("change", "[data-select-change-variant]", function() {
                    var e = t(this).val(),
                        i = t(this).find("option:selected").data("img"),
                        o = t(this).find("option:selected").data("price"),
                        a = t(this).closest(".grouped-product");
                    a.find("input[type=hidden]").val(e), a.find(".product-img img").attr({
                        src: i
                    }), a.find("[data-price-change]").html(Shopify.formatMoney(o, window.money_format))
                })
            },
            closeSuccessModal: function() {
                var e = t("[data-ajax-cart-success], [data-quickview-modal]"),
                    i = e.find(".close-modal, .continue-shopping"),
                    o = e.find(".halo-modal-content");
                i.click(function(t) {
                    t.preventDefault(), e.fadeOut(500, function() {
                        n.removeClass("halo-modal-open"), n.css({
                            overflow: ""
                        }), a.hasClass("template-cart") && window.location.reload()
                    })
                }), e.on("click", function(t) {
                    o.is(t.target) || o.has(t.target).length || e.fadeOut(500, function() {
                        n.removeClass("halo-modal-open"), n.css({
                            overflow: ""
                        }), a.hasClass("template-cart") && window.location.reload()
                    })
                })
            },
            doAjaxAddToCartNormal: function(e, i, a, s) {
                t.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    data: "quantity=" + i + "&id=" + e,
                    dataType: "json",
                    beforeSend: function() {
                        o.showLoading()
                    },
                    success: function() {
                        var e = t("[data-ajax-cart-success]"),
                            i = e.find(".cart-modal-content");
                        i.find(".ajax-product-image").attr("src", s), i.find(".message-added-cart").show(), e.fadeIn(600, function() {
                            n.addClass("halo-modal-open"), t("[data-quickview-modal]").is(":visible") && t("[data-quickview-modal]").hide(), o.closeLookbookModal()
                        }), o.updateDropdownCart()
                    },
                    error: function(e) {
                        t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.showModal(".ajax-error-modal")
                    },
                    complete: function() {
                        var t = "https://dankstop.com/cart";
                        hsjs.ajaxSiteNav.deleteCache(t), hsjs.ajaxSiteNav.fetch(t), o.hideLoading()
                    }
                })
            },
            doAjaxAddToCart: function(e, i, a) {
                var s = $(".attachment-checkbox:checked[data-attachmentid]"),
                    n = $("#attachmentBundleId"),
                    d = {
                        quantity: i,
                        id: e
                    };
                if ($("#productBundleId").length > 0) {
                    var r = $("#productBundleId").val();
                    d.properties = {}, d.properties._bundle_id = r
                }
                if (s.length > 0) {
                    if (o.showLoading(), n.length > 0) {
                        var l = $(".addon-options");
                        n.prop("disabled", !1);
                        var c = l.attr("data-bundle-string"),
                            u = (l.attr("data-bundle-parent-string"), l.attr("data-addon-bundle-id"), l.attr("data-addon-for-product-id"))
                    }
                    hsjs.Shopify.productQueue = [], s.each(function(t, e) {
                        $(e).prop("checked", !1);
                        var i = {
                            id: $(e).data("attachmentid"),
                            quantity: 1
                        };
                        n.length > 0 && (i.properties = {}, i.properties[c] = r, i.properties._item_id = u, i.properties._bundle_addon = r), hsjs.Shopify.productQueue.push(i), t == s.length - 1 && (hsjs.Shopify.processProductQueue = function() {
                            if (hsjs.Shopify.productQueue.length) {
                                var t = hsjs.Shopify.productQueue.shift();
                                hsjs.Shopify.addItemJSON(t, hsjs.Shopify.processProductQueue)
                            } else p()
                        }, hsjs.Shopify.processProductQueue())
                    })
                } else n.prop("disabled", !0), p();

                function h() {
                    o.hideLoading(), t.ajax({
                        type: "POST",
                        url: "/cart/add.js",
                        data: d,
                        dataType: "json",
                        beforeSend: function() {
                            o.showLoading()
                        },
                        success: function(t) {
                            ! function() {
                                if ($("#productBundleId").length > 0) {
                                    var t = $("#productBundleId"),
                                        e = t.val(),
                                        i = (new Date).getTime(),
                                        o = e.split("-")[0] + "-" + i;
                                    t.val(o)
                                }
                            }(), o.getPopupShoppingCart(!0, a)
                        },
                        error: function(e) {
                            t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.showModal(".ajax-error-modal")
                        },
                        complete: function() {
                            var t = "https://dankstop.com/cart";
                            hsjs.ajaxSiteNav.deleteCache(t), hsjs.ajaxSiteNav.fetch(t), console.log("cart JSON cache reloaded..."), o.hideLoading()
                        }
                    })
                }

                function p() {
                    $("#addWarrantyPlan").length > 0 && $("#addWarrantyPlan").is(":checked") ? ($("#addWarrantyPlan").prop("checked", !1), hsjs.productWarranty.addWarranty(Shopify.variantSelected.price, Shopify.variantSelected.id, $("#addWarrantyPlan").data("handle"), r, h)) : h()
                }
            },
            getPopupShoppingCart: function(e, i) {
                var a = t("[data-ajax-cart-success]"),
                    s = a.find(".cart-popup-content"),
                    d = a.find(".cart-popup-coll-related");
                t.get("/cart?view=json", function(t) {
                    s.html(t), e && ("/collections/?view=related" != i ? d.load("" + i) : d.load("/collections/all?view=related"))
                }).always(function() {
                    o.updateDropdownCart(), e && a.fadeIn(600, function() {
                        n.addClass("halo-modal-open"), t("[data-quickview-modal]").is(":visible") && t("[data-quickview-modal]").hide(), o.closeLookbookModal()
                    })
                })
            },
            doAjaxUpdatePopupCart: function(e, i) {
                t.ajax({
                    type: "POST",
                    url: "/cart/change.js",
                    data: {
                        id: i,
                        quantity: e
                    },
                    dataType: "json",
                    beforeSend: function() {
                        o.showLoading()
                    },
                    success: function(t) {
                        o.getPopupShoppingCart(!1)
                    },
                    error: function(e) {
                        t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.showModal(".ajax-error-modal")
                    },
                    complete: function() {
                        o.hideLoading()
                    }
                })
            },
            doAjaxUpdatePopupCartByLineItem: function(e, i) {
                t.ajax({
                    type: "POST",
                    url: "/cart/change.js",
                    data: {
                        line: i,
                        quantity: e
                    },
                    dataType: "json",
                    beforeSend: function() {
                        o.showLoading()
                    },
                    success: function(t) {
                        o.getPopupShoppingCart(!1)
                    },
                    error: function(e) {
                        t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.showModal(".ajax-error-modal")
                    },
                    complete: function() {
                        o.hideLoading()
                    }
                })
            },
            initChangeQuantityButtonEvent: function() {
                var e = "[data-minus-quantity-cart], [data-plus-quantity-cart]";
                t(e), s.off("click.updateCart").on("click.updateCart", e, function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t(this),
                        a = (i.closest("[data-product-id]").data("product-id"), parseInt(i.siblings('input[name="quantity"]').val())),
                        s = t(this).closest("[data-product-id]").index() + 1;
                    i.hasClass("plus") ? a += 1 : a -= 1, o.doAjaxUpdatePopupCartByLineItem(a, s)
                })
            },
            initQuantityInputChangeEvent: function() {
                s.on("change", "[data-quantity-input]", function() {
                    t(this).closest("[data-product-id]").data("product-id");
                    var e = parseInt(t(this).val()),
                        a = t(this).closest("[data-product-id]").index() + 1;
                    e.hasClass("plus") ? i += 1 : i -= 1, o.doAjaxUpdatePopupCartByLineItem(i, a)
                })
            },
            removeCartItem: function() {
                s.on("click", ".cart-remove", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t(this);
                    i.closest("[data-product-id]").data("product-id");
                    ! function(t) {
                        var e = t.closest("[data-product-id]"),
                            i = e.attr("data-bundle-id"),
                            a = e.index() + 1;
                        if (null != i && "" != i) {
                            o.showLoading();
                            var s = i,
                                n = t.closest(".cart-list").find("[data-bundle-addon='" + s + "']");
                            n.length > 0 ? (hsjs.Shopify.productQueue = [], n.each(function(t, e) {
                                var i = $(this).index() + 1;
                                hsjs.Shopify.productQueue.unshift(i), t == n.length - 1 && (hsjs.Shopify.processProductQueue = function() {
                                    if (hsjs.Shopify.productQueue.length) {
                                        var t = hsjs.Shopify.productQueue.shift();
                                        hsjs.Shopify.removeItemByLineNumber(t, function(t) {
                                            hsjs.Shopify.processProductQueue()
                                        })
                                    } else ! function(t, e) {
                                        o.hideLoading(), o.doAjaxUpdatePopupCartByLineItem(t, e)
                                    }(0, a)
                                }, hsjs.Shopify.processProductQueue())
                            })) : o.doAjaxUpdatePopupCartByLineItem(0, a)
                        } else o.doAjaxUpdatePopupCartByLineItem(0, a)
                    }(i)
                })
            },
            initSoldOutProductShop: function() {
                var e = t(".product-shop [data-soldOut-product]");
                e.length && e.each(function() {
                    var e = t(this),
                        i = e.data("items").split(","),
                        o = e.data("hours").split(","),
                        a = Math.floor(Math.random() * i.length),
                        s = Math.floor(Math.random() * o.length);
                    e.find(".items-count").text(i[a]), e.find(".hours-num").text(o[s])
                })
            },
            initCustomerViewProductShop: function() {
                var e = t(".product-shop [data-customer-view]");
                e.length && e.each(function() {
                    var e = t(this);
                    setInterval(function() {
                        var t = e.data("customer-view").split(","),
                            i = Math.floor(Math.random() * t.length);
                        e.find("label").text(t[i])
                    }, 5e3)
                })
            },
            productPageInitProductTabs: function() {
                hsjs.tools.waitForElement(".tabs__product-page", function() {
                    var e = t(".tabs__product-page"),
                        i = e.find("[data-tapTop]"),
                        o = e.find("[data-TabContent]");
                    i.off("click.productPageTabs").on("click.productPageTabs", function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var a = t(this),
                            s = t(a.data("target")),
                            n = a.closest(".list-tabs");
                        n.length ? t(this).hasClass("active") || (i.removeClass("active"), o.removeClass("active"), a.addClass("active"), n.next().find(a.data("target")).addClass("active")) : t(".product-template-full-width").length ? t(this).hasClass("active") ? (a.removeClass("active"), s.hide(0, function() {
                            t(document.body).trigger("sticky_kit:recalc")
                        })) : (a.addClass("active"), s.show(0, function() {
                            t(document.body).trigger("sticky_kit:recalc")
                        })) : t(".has-sticky-product-img").length ? t(this).hasClass("active") ? (a.removeClass("active"), s.hide()) : (a.addClass("active"), s.show()) : t(this).hasClass("active") ? (a.removeClass("active"), s.slideUp()) : (a.addClass("active"), s.slideDown())
                    }), s.off("click.triggerTabsReviews").on("click.triggerTabsReviews", ".product-shop .spr-badge", function() {
                        if (e.length) {
                            t("html,body").animate({
                                scrollTop: e.offset().top
                            }, 400);
                            var i = e.find('[data-target="#collapse-tab2"]');
                            i.hasClass("active") || i.trigger("click")
                        }
                    }), t(".product-template-full-width").length && s.off("click.sprActionsNewReview").on("click.sprActionsNewReview", ".product-template-full-width .spr-summary-actions-newreview", function() {
                        t(document.body).trigger("sticky_kit:recalc")
                    })
                })
            },
            initStickyForProductFullWidth: function() {
                var e, i = t(".product-template-full-width"),
                    o = d.innerWidth(),
                    a = i.find("[data-sticky-1]"),
                    s = i.find("[data-sticky-2]"),
                    n = i.find("[data-sticky-3]"),
                    r = function() {
                        a.stick_in_parent({
                            offset_top: 70,
                            inner_scrolling: !1
                        }), n.stick_in_parent({
                            offset_top: 68
                        }), s.stick_in_parent({
                            offset_top: 50
                        }).on("sticky_kit:bottom", function() {
                            s.addClass("sticky-on-bottom")
                        }).on("sticky_kit:unbottom", function() {
                            s.removeClass("sticky-on-bottom")
                        })
                    };
                i.length && (1200 <= o && r(), d.off("resize.sticky").on("resize.sticky", function() {
                    clearTimeout(e), e = setTimeout(function() {
                        var t = d.innerWidth();
                        t < 1200 && 1200 <= o ? (a.trigger("sticky_kit:detach"), n.trigger("sticky_kit:detach"), s.trigger("sticky_kit:detach")) : 1200 <= t && o < 1200 && r(), o = t
                    }, 0)
                }))
            },
            initQuickView: function() {
                a.off("click.initQuickView", ".quickview-button").on("click.initQuickView", ".quickview-button", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = t(this).attr("data-product-handle");
                    o.doAjaxShowQuickView(i), o.closeSuccessModal()
                })
            },
            doAjaxShowQuickView: function(e) {
                o.isAjaxLoading || t.ajax({
                    type: "get",
                    url: "/products/" + e + "?view=quickview",
                    beforeSend: function() {
                        o.showLoading(), n.css({
                            overflow: "hidden"
                        })
                    },
                    success: function(i) {
                        var a = t("[data-quickview-modal]");
                        a.find(".halo-modal-body").html(i), setTimeout(function() {
                            if (o.initSoldOutProductShop(), o.initCustomerViewProductShop(), o.initCountdownNormal(), o.setAddedForWishlistIcon(e), t.getScript("https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-595b0ea2fb9c5869").done(function() {
                                    "undefined" != typeof addthis && (addthis.init(), addthis.layers.refresh())
                                }), t(".shopify-product-reviews-badge").length && t(".spr-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
                        }, 500), o.hideLoading(), a.fadeIn(600, function() {
                            n.addClass("halo-modal-open"), t("[data-ajax-cart-success]").is(":visible") && t("[data-ajax-cart-success]").hide()
                        })
                    },
                    error: function(e, i) {
                        t(".ajax-error-message").text(t.parseJSON(e.responseText).description), o.hideLoading(), o.showModal(".ajax-error-modal")
                    }
                })
            },
            initZoom: function() {
                var e = t(".product-img-box [data-zoom]");
                1200 <= d.width() ? e.zoom() : e.trigger("zoom.destroy")
            },
            openSearchForm: function() {
                var e = "[data-search-mobile-toggle]";
                t(".site-header").find(".search-form"), s.off("click.toggleSearch", e).on("click.toggleSearch", e, function(t) {
                    t.preventDefault(), t.stopPropagation(), n.addClass("search-open"), $(".input-group-field.header-search__input").val("").focus().show()
                }), s.off("click.hideSearch").on("click.hideSearch", function(e) {
                    var i = t(".site-header .search-form");
                    i.is(e.target) || i.has(e.target).length || (n.removeClass("search-open"), t(".quickSearchResultsWrap").hide())
                })
            },
            stickyFixedTopMenu: function() {
                $.fn.unstick && window.fixtop_menu && (!(1200 <= window.innerWidth) || (t("[data-sticky-mb]").unstick(), setTimeout(function() {
                    t(".site-header").css("height", ""), t("[data-sticky-pc]").sticky({
                        zIndex: 3
                    }), t("[data-sticky-pc]").on("sticky-start", function() {
                        a.addClass("has_sticky")
                    }), t("[data-sticky-pc]").on("sticky-end", function() {
                        a.removeClass("has_sticky")
                    })
                }, 100)))
            },
            handleScrollDown: function() {
                var e = "[data-scroll-down]";
                t(e).each(function() {
                    var i = t(this),
                        o = i.closest(".shopify-section").next(".shopify-section").attr("id");
                    i.attr("href", "#" + o), s.off("click.handleScrollDown", e).on("click.handleScrollDown", e, function(e) {
                        e.preventDefault();
                        var i = t(this.getAttribute("href"));
                        i.length && t("html, body").stop().animate({
                            scrollTop: i.offset().top
                        }, 500)
                    })
                })
            },
            createWishListTplItem: function(e) {
                var i = t("[data-wishlist-container]");
                jQuery.getJSON("/products/" + e + ".js", function(t) {
                    var e = "",
                        o = Shopify.formatMoney(t.price_min, window.money_format);
                    e += '<div class="grid-item" data-wishlist-added="wishlist-' + t.id + '">', e += '<div class="inner product-item" data-product-id="product-' + t.handle + '">', e += '<div class="column col-img"><div class="product-image">', e += '<a href="' + t.url + '" class="product-grid-image" data-collections-related="/collections/all?view=related">', e += '<img src="' + t.featured_image + '" alt="' + t.featured_image.alt + '">', e += "</a></div></div>", e += '<div class="column col-prod">', e += '<a class="product-title" href="' + t.url + '" title="' + t.title + '">' + t.title + "</a>", e += '<div class="product-vendor">', e += '<a href="/collections/vendors?q=' + t.vendor + '" title="' + t.vendor + '">' + t.vendor + "</a></div></div>", e += '<div class="column col-price text-center"><div class="price-box">' + o + "</div></div>", e += '<div class="column col-options text-center">', e += '<form action="/cart/add" method="post" class="variants" data-id="product-actions-' + t.id + '" enctype="multipart/form-data">', t.available ? (1 == t.variants.length && (e += '<button data-btn-addToCart class="btn add-to-cart-btn" type="submit">' + window.inventory_text.add_to_cart + '</button><input type="hidden" name="id" value="' + t.variants[0].id + '" />'), 1 < t.variants.length && (e += '<a class="btn" title="' + t.title + '" href="' + t.url + '">' + window.inventory_text.select_options + "</a>")) : e += '<button class="btn add-to-cart-btn" type="submit" disabled="disabled">' + window.inventory_text.unavailable + "</button>", e += "</form></div>", e += '<div class="column col-remove text-center"><a class="whislist-added" href="#" data-product-handle="' + t.handle + '" data-icon-wishlist data-id="' + t.id + '"><svg class="closemnu" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 357 357" xml:space="preserve"><g><g><polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"></polygon></g></g></svg></a></div>', e += "</div></div>", i.append(e)
                })
            },
            initWishListPagging: function() {
                var e = JSON.parse(localStorage.getItem("items")),
                    i = t("#wishlist-paginate"),
                    o = '<li class="text disabled prev"><a href="#" title="' + window.inventory_text.previous + '"><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg><span>' + window.inventory_text.previous + "</span></a></li>",
                    a = t("[data-wishlist-container]");
                i.children().remove();
                var s = Math.ceil(e.length / 3);
                if (s <= 1) a.children().show();
                else {
                    for (var n = 0; n < s; n++) {
                        var d = n + 1;
                        o += 0 === n ? '<li class="active"><a data-page="' + d + '" href="' + d + '" title="' + d + '">' + d + "</a></li>" : '<li><a data-page="' + d + '" href="' + d + '" title="' + d + '">' + d + "</a></li>"
                    }
                    o += '<li class="text next"><a href="#" title="' + window.inventory_text.next + '"><span>' + window.inventory_text.next + '</span><svg aria-hidden="true" focusable="false" role="img"><use xlink:href="#faChevronRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></a></li>', i.append(o), a.children().each(function(e, i) {
                        0 <= e && e < 3 ? t(i).show() : t(i).hide()
                    }), i.off("click.wl-pagging").on("click.wl-pagging", "li a", function(e) {
                        e.preventDefault();
                        var o = t(this).parent().hasClass("prev"),
                            n = t(this).parent().hasClass("next"),
                            d = t(this).data("page");
                        if (o) {
                            var r = parseInt(t(this).parent().siblings(".active").children().data("page"));
                            d = r - 1
                        }
                        n && (r = parseInt(t(this).parent().siblings(".active").children().data("page")), d = r + 1), a.children().each(function(e, i) {
                            3 * (d - 1) <= e && e < 3 * d ? t(i).show() : t(i).hide()
                        }), 1 === d ? (i.find(".prev").addClass("disabled"), i.find(".next").removeClass("disabled")) : d === s ? (i.find(".next").addClass("disabled"), i.find(".prev").removeClass("disabled")) : (i.find(".prev").removeClass("disabled"), i.find(".next").removeClass("disabled")), t(this).parent().siblings(".active").removeClass("active"), i.find('[data-page="' + d + '"]').parent().addClass("active")
                    })
                }
            },
            initWishLists: function() {
                if ("undefined" != typeof Storage) {
                    var t = JSON.parse(localStorage.getItem("items"));
                    if (t.length <= 0) return;
                    t.forEach(function(t) {
                        o.createWishListTplItem(t)
                    }), this.initWishListPagging()
                } else alert("Sorry! No web storage support..")
            },
            setAddedForWishlistIcon: function(e) {
                var i = t('[data-product-handle="' + e + '"]');
                0 <= l.indexOf(e) ? (i.addClass("whislist-added"), i.find(".wishlist-text").text(window.inventory_text.remove_wishlist)) : (i.removeClass("whislist-added"), i.find(".wishlist-text").text(window.inventory_text.add_wishlist))
            },
            doAddOrRemoveWishlish: function() {
                var e = "[data-icon-wishlist]";
                s.off("click.addOrRemoveWishlist", e).on("click.addOrRemoveWishlist", e, function(e) {
                    e.preventDefault();
                    var i = t(this),
                        a = i.data("id"),
                        s = i.data("product-handle"),
                        n = l.indexOf(s);
                    i.hasClass("whislist-added") ? (i.removeClass("whislist-added"), i.find(".wishlist-text").text(window.inventory_text.add_wishlist), t('[data-wishlist-added="wishlist-' + a + '"]').length && t('[data-wishlist-added="wishlist-' + a + '"]').remove(), l.splice(n, 1), localStorage.setItem("items", JSON.stringify(l)), t("[data-wishlist-container]").length && o.initWishListPagging()) : (i.addClass("whislist-added"), i.find(".wishlist-text").text(window.inventory_text.remove_wishlist), t("[data-wishlist-container]").length && o.createWishListTplItem(s), l.push(s), localStorage.setItem("items", JSON.stringify(l))), o.setAddedForWishlistIcon(s)
                })
            }
        },
        a = t("body"),
        s = t(document),
        n = t("html"),
        d = t(window),
        r = ".wrapper-overlay",
        l = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    localStorage.setItem("items", JSON.stringify(l)), l.length && (l = JSON.parse(localStorage.getItem("items"))), s.ready(function() {
        e = t("[data-menu-mb-toogle]"), s.ajaxStart(function() {
            o.isAjaxLoading = !0
        }), s.ajaxStop(function() {
            o.isAjaxLoading = !1
        }), o.init(), s.on("shopify:section:load", o.initSlideshow).on("shopify:section:unload", o.initSlideshow).on("shopify:section:load", o.initSliderFeaturedProducts).on("shopify:section:unload", o.initSliderFeaturedProducts).on("shopify:section:load", o.initBrandsSlider).on("shopify:section:unload", o.initBrandsSlider)
    });
    var c = d.innerWidth();
    d.off("resize.initMenuMobile").on("resize.initMenuMobile", function() {
        var t;
        clearTimeout(t), t = setTimeout(function() {
            var t = d.innerWidth();
            (t < 1200 && 1200 <= c || 1200 <= t && c < 1200) && (o.showHideMenuMobile(), o.initDropdownColFooter(), o.stickyFixedTopMenu()), c = t
        }, 0)
    })
}, hsjs.ella(jQuery);