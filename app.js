jQuery(document).ready(function($){
	var siteHeader   = $('.site-header'),
			body           = $('body'),
			html           = $('html'),
			cartContainer  = $('.cart-sidebar');

  // Fade page in
  body.addClass('show-page');

  // Open cart sidebar
	$('.cart-trigger').on('click', function(e) {
		e.preventDefault();
		body.addClass('cart-active');
		html.addClass('with-featherlight');
	});
  
  // Close cart sidebar
	$('.cart-sidebar-close').on('click', function(e) {
		body.removeClass('cart-active');
		html.removeClass('with-featherlight');
	});
  
  // Close cart sidebar
  $(document).mouseup(function(e) {
    if (!cartContainer.is(e.target) && cartContainer.has(e.target).length === 0) {
      body.removeClass('cart-active');
      html.removeClass('with-featherlight');
    }
	});
  
  //Lazy load for CTA
  $(".site-header:not(.mega-menu-header) .locations-menu-item").hover(function () {
  		$('.lazy-cta:not(.lazy-loaded)').Lazy({
        afterLoad: function(element) {
          element.addClass('lazy-loaded');
        }
      });
  });
  
  // Megamenu opener
  $(".mega-menu-header .main-nav > ul > li.has-child").hover(
    function () {
      if ($(window).width() >= 1000) {
        body.addClass("mega-menu-open");

        var menuEl = $(this).children('ul');

        function adjustMenuBg(menuEl) {
          var topBarHeight = 0,
              navOverlay = $('.mobile-nav-overlay'),
              menu = menuEl;

          if ( $('.top-bar').length ) {
            topBarHeight = $('.top-bar').outerHeight();
          } 
          if ( siteHeader.hasClass('header-sticky') ) {
            var menuheight =  menu.offset().top - $(document).scrollTop() + menu.outerHeight(true) + topBarHeight - siteHeader.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5];
            // Here I added at the end something to check if the header is slided up for sticky header and add the negative offset to the math
          } else {
            var menuheight =  menu.offset().top + menu.outerHeight(true);
          }
          navOverlay.height(menuheight);
          body.removeClass("category-dropdown-open");
        }
        adjustMenuBg(menuEl);
        adjustMenuHeight();

        $('.lazy-cta:not(.lazy-loaded), .lazy-cat-menu:not(.lazy-loaded)').Lazy({
          afterLoad: function(element) {
            adjustMenuHeight();
            element.addClass('lazy-loaded');
            adjustMenuBg(menuEl);
          }
        });
      }

    },
    function () {
      if ($(window).width() >= 1000) {
        var navOverlay = $('.mobile-nav-overlay');

        body.removeClass("mega-menu-open");
        navOverlay.height(0);
      }
    }
  );
  
  function adjustMobileMenu() {
    if ($(window).width() < 1000) {
      var menuheight = $('.main-nav-wrapper').length > 0 ? ( $('.main-nav-wrapper').offset().top + $('.main-nav-wrapper').outerHeight(true) + 30 ) : ( $('.main-nav').offset().top + $('.main-nav').outerHeight(true) + 30 );
      $('.mobile-nav-overlay').height(menuheight);
    }
  }
  
  function adjustMenuHeight() {
    $(".mega-menu-header .nav-style.main-nav > ul > li:not(.nav-category-dropdown) > ul:not(.size-loaded)").each(function() {
      // Check for the tallest child
      var thisULMax = Math.max.apply(Math, $(this).find("li").map(thisHeight));
      // Paddings are a total of 80px, so we need to add that
      if ( (thisULMax + 80) > 300) {
        $(this).css('max-height', (thisULMax + 80) + 'px').addClass('size-loaded');
      }
    });
  }
  
  // Megamenu height fix
  if ( siteHeader.hasClass('mega-menu-header') ) {
    // Because of flexbox, I need to set a height to the submenu block. Ff a child element of the submenu is taller than the height, it's content goes outside of the box, so we need to dynamically adjust the height of the block based on the child elements.
    function thisHeight(){
      return $(this).outerHeight();
  	}
    if ($(window).width() >= 1000) {
      adjustMenuHeight();
    }
  }
                       
  // Category Drowpdown opener
  $(".nav-category-dropdown > a").on('click', function (e) {
    e.preventDefault();
    body.toggleClass("category-dropdown-open");
    $('.lazy-dropdown').Lazy();
    adjustMobileMenu();
  });
  body.click(function(e) {
    if (body.hasClass("category-dropdown-open")) {
      if($(e.target).attr('class') == 'nav-category-dropdown' || $(e.target).closest('.nav-category-dropdown').length) {
        return;
      }
      body.removeClass("category-dropdown-open");
    }
	});
  
  // Mobile menu open sub menus on click
  $('.mobile-menu-subopen').on('click touchend', function(e) {
    e.preventDefault();
    if ( $(this).parent().hasClass('submenu-open') ) {
    	$(this).parent().removeClass('submenu-open');
    } else {
      $(this).parent().parent().find('.submenu-open').removeClass('submenu-open');
    	$(this).parent().toggleClass('submenu-open');
    }
    $('.lazy-cta:not(.lazy-loaded)').Lazy({
      afterLoad: function(element) {
        element.addClass('lazy-loaded');
      }
    });
    adjustMobileMenu();
  });
  
  // Masonry for the brand list
  if ( $('.brand-list-wrapper').length ) {
    var brandGrid = $('.brand-list-wrapper').masonry({
      isAnimated: false,
      transitionDuration: 0,
      itemSelector: '.brand-list-group',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  }
  
  // Sticky header
  if ( siteHeader.hasClass('header-sticky') ) {
    var mainHeader = siteHeader,
        mainHeaderPlaceholder = $('.header-sticky-placeholder'),
      	secondaryNavigation = $('.main-nav-wrapper'),
      	//this applies only if secondary nav is below intro section
      	topBarContent = $('.top-bar'),
        navOverlay = $('.mobile-nav-overlay'),
      	headerHeight = mainHeader.height();
    
    if ( secondaryNavigation.length ) {
    	headerHeight = headerHeight + secondaryNavigation.outerHeight();
    }

    //set scrolling variables
    var scrolling = false,
      	previousTop = 0,
      	currentTop = 0,
      	scrollDelta = 10,
      	scrollOffset = 250;
    
    resizeHeader();

    $( window ).on('scroll', function(){
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame)
          ? setTimeout(autoHideHeader, 250)
          : requestAnimationFrame(autoHideHeader);
      }
    });

    $( window ).resize(function() {
      resizeHeader();
    });
    
    function resizeHeader() {
      if ( mainHeader.hasClass('menu-bottom-layout') ) {
        if ( $(window).width() > 1000 ) {
          headerHeight = mainHeader.outerHeight() + secondaryNavigation.outerHeight();
        } else {
          headerHeight = mainHeader.outerHeight();
        }
      } else {
        headerHeight = mainHeader.outerHeight();
      }
      mainHeaderPlaceholder.height(headerHeight);
    }

    function autoHideHeader() {
      var currentTop = $(window).scrollTop();
      checkSimpleNavigation(currentTop);
      previousTop = currentTop;
      scrolling = false;
    }

    function checkSimpleNavigationOLD(currentTop) {
      //there's no secondary nav or secondary nav is below primary nav
      if (previousTop - currentTop > scrollDelta) {
        //if scrolling up...
        mainHeader.removeClass('is-hidden');
      } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        //if scrolling down...
        mainHeader.addClass('is-hidden');
      }
    }
    
    function checkSimpleNavigation(currentTop) {
      //secondary nav - sticky secondary nav
      if ( topBarContent.is(':visible') ) {
      	var secondaryNavOffsetTop = topBarContent.outerHeight();
      } else {
        var secondaryNavOffsetTop = 0;
      }

      if (previousTop >= currentTop ) {
        //if scrolling up... 
        if( currentTop < secondaryNavOffsetTop ) {
          //secondary nav is not fixed
          mainHeader.removeClass('fixed slide-up');
          navOverlay.removeClass('fixed').css('transform', 'translateY(0px)');
        } else if( previousTop - currentTop > scrollDelta ) {
          //secondary nav is fixed
          mainHeader.removeClass('slide-up').addClass('fixed');
          navOverlay.addClass('fixed').css('transform', 'translateY(0px)');
        }

      } else {
        //if scrolling down...	
        if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
          //hide primary nav
          mainHeader.addClass('fixed slide-up');
          navOverlay.addClass('fixed').css('transform', 'translateY(-' + mainHeader.height() + 'px)');
          
        } else if( currentTop > secondaryNavOffsetTop ) {
          //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
          mainHeader.addClass('fixed').removeClass('slide-up');
          navOverlay.addClass('fixed').css('transform', 'translateY(0px)');
        }
      }
    }
  }
  
	// Notidication bar
  if ( $('.notification-bar') ) {
    setTimeout( function() {
      $('.notification-bar').addClass('active');
    }, 1000);
  }
  
  // Youtube video popup trigger 
  $(".video-trigger-wrapper a").grtyoutube({ autoPlay:true });
  
  // Cart modules toggle
  $('.cart-block-toggle').each( function() {
  	$(this).find('.cart-block-header a').on('click', function(e) {
    	e.preventDefault();
      $(this).closest('.cart-block-toggle').toggleClass('cart-block-open').find('.cart-block-content').slideToggle();
    })
  });
  
  // Input change
  $('.input-wrap .change a').on('click', function(){
  	var cur = $(this);
    var way = $(this).attr('data-way');
    if ( way.length > 0 ) {
    	updateQuantity(way, cur);
    }
    
    if ( $(this).closest('.cart-sidebar-form').length > 0 ) {
    	$(this).closest('.cart-sidebar-form').submit();
    }
  });
  
  
  function updateQuantity(way, cur){
  	var quantity = parseInt(cur.closest('.input-wrap').find('input').val());
    if (way == 'up'){
      quantity++;
    } else {
      if (quantity > 1){
          quantity--;
      }
    }
    cur.closest('.input-wrap').find('input').val(quantity);
	}
  
  // Cart shipping
  $('#gui-form-shipping input[type="radio"]').live('change', function(){
  	$(this).closest('form').submit();
  });
  $('.submit-shipping, select[name="country"], #gui-form-zipcode, .cart-submit-shipping').on('click change', function() {
  	var cartUrl = shop_url + 'cart?format=json';
    var form = $(this).closest('form');
    var url = form.attr('action');
    var cur = $(this);
    
    $('.cart-submit-shipping').addClass('button-loading');
    
    $.ajax({
      type: "POST",
      data: form.serialize(),
      url: url,
    }).done(function(data){
      $.get(cartUrl, function(data){
        var cart = data.cart;
        //console.log(data);
        if (cart.shipping.methods) {
          cur.closest('.shipping-costs-block').find('.radio-block').empty();
          $.each(cart.shipping.methods, function(index, method){
            var html = '';
          	html+='<div class="radio-wrap ui checkbox radio">';
              html+='<input id="gui-form-shipping-'+method.id+'" type="radio" name="method" value="' + method.id + '" ' + ((method.id == cart.shipment.id) ? checked="checked" : '') + ' />';
              html+='<label for="gui-form-shipping-' + method.id + '">' + method.title + ' <span>(' + formatCurrency(method.price_incl) + ')</span></label>';
            html+='</div>';
            cur.closest('.shipping-costs-block').find('.radio-block').append(html);
          });
          cur.closest('.shipping-costs-block').find('.no-shipments').addClass('hidden');
          cur.closest('.shipping-costs-block').find('.methods-block').removeClass('hidden');
          cur.closest('.shipping-costs-block').find('.no-zipcode').addClass('hidden');
        } else {
          var selectedCountry = cart.shipping.country;
          if ( cart.shipping.countries[selectedCountry].has_region_based_shipping && !cart.shipping.zipcode ) {
            cur.closest('.shipping-costs-block').find('.no-zipcode').removeClass('hidden');
            cur.closest('.shipping-costs-block').find('.no-shipments').addClass('hidden');
            cur.closest('.shipping-costs-block').find('.methods-block').addClass('hidden');
          } else {
            cur.closest('.shipping-costs-block').find('.no-zipcode').addClass('hidden');
            cur.closest('.shipping-costs-block').find('.no-shipments').removeClass('hidden');
            cur.closest('.shipping-costs-block').find('.methods-block').addClass('hidden');
          }
        }
        $('.cart-submit-shipping').removeClass('button-loading');
      });
    });

  });
  
  // Format a price with the correct currency
  function formatCurrency(number) {
    if (number) {
      number = parseFloat(number).toFixed(2);
      number += '';
      var x = number.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      var x3 =  (x1 + x2).split('.');
      var x4 = x3[0].replace(',', '.') + ',' + x3[1]; 
    
      if ((priceStatus == 'login' && !loggedIn) || !priceStatus) {
        if (currency_format == 'C$') {
          var priceMoney = '--,--' + ' ' + currency_format;
        } else {
          var priceMoney = currency_format + '--,--';
        }
      } else {
        if (currency_format == 'C$') {
          var priceMoney = '' + x4 + ' ' + currency_format;
        } else {
        	var priceMoney = currency_format + '' + x4;
        }
      }
      if (currency_format == '$') {
        priceMoney = priceMoney.replace(',', '.');
      }
    } else {
      var priceMoney = '';
    }
    return priceMoney;
  }
  
  // Check if something in Viewport
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top - 200;
    var elementBottom = elementTop + $(this).outerHeight() + 200;
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  
  // Setup the product cards variants
  function producVariantSetup(product, wrapper) {
    var elVars = product.variants;
      // Get new variables
      if (elVars.length != 0 ) {
        var variantTypesCount = 0;
        $.each(elVars, function(index, elVar){
          var elVarList = elVar.title.split(",");
          variantTypesCount = elVarList.length;
        });

        var customVariantActive = false;
        if ( ( display_variant_picker_on == 'all' && product.data_03 != 'disabled' ) || ( display_variant_picker_on == 'specific' && product.data_03 != 'false' && product.data_03 ) ) {
          customVariantActive = true;
        }

        if ( variantTypesCount == 1 && show_variant_picker && customVariantActive ) {
          wrapper.parent().find('.product-variants-wrapper').prepend( '<div class="clearfix product-list-custom-variants">' + getCustomVariable(product) + '</div>' );
          wrapper.parent().addClass('variants-loaded');
          wrapper.parent().find('.product-custom-variants-options a').on('click', function(e) {
            if ( $(this).hasClass('unavailable') ) {
              //console.log('This product is unavailable');
            } else {
              wrapper.parent().find('.product-custom-variants-options li').removeClass('active');
              var urlCart = $(this).data('cart-url');

              $(this).parent().addClass("active");
              $(this).closest('.product-actions').find('.quickAddCart').attr('action', urlCart);      
              updateModalForm($(this));
            }
          })
        } else if ( variantTypesCount > 1 && show_variant_picker && customVariantActive ) {
          wrapper.parent().find('.product-variants-wrapper').prepend( '<div class="clearfix product-list-custom-variants"><a href="' + product.url + '" class="more-variants-link">' + product_multiple_variant_label + '</a></div>' );
          wrapper.parent().addClass('variants-loaded');
        }
      }
  }
  
  // Lazy load images
  function lazyProducts() {
  	$('.lazy-product').Lazy({
      threshold: $(window).width() > 767 ? 200 : 50,
      visibleOnly: true,
    	afterLoad: function(element) {
        element.addClass('lazy-loaded');
        // Load the second product image if needed
        if ( element.parent().find('img').length < 2 ) {
          var wrapper = element.parent(),
              url = wrapper.attr('href').replace('.html', '.ajax'),
              imgurl = element.attr('src').split('files/')[1].split('/')[0];
          //var url2 = wrapper.attr('href').replace('.html', '.html?format=json');
          
          if (location.protocol == 'https:') {
            url = url.replace('http:', 'https:');
            //URL 2 returns more info
            //url2 = url2.replace('http:', 'https:');
					}
          
          $.get(url, function(product){
            if (wrapper.parent().hasClass('product-alt-images-thumbnails') && product.images.length > 1) {
              var html = '<div class="product-element-thumbnails">';
              $.each(product.images, function(i, image) {
                html += '<img src="' + image.replace('50x50x2', product_image_size) + '" class="product-element-thumbnail' + (i == 0 ? ' active' : '') + '">';
                return i < 3;
              });
              html += '</div>';
              wrapper.append(html);
              wrapper.find('.product-element-thumbnail').on('click', function(e) {
                e.preventDefault();
                wrapper.find('.product-element-thumbnail').removeClass('active');
              	$(this).addClass('active');
                wrapper.parent().find('.product-image-wrapper > img').attr('src', $(this).attr('src')).attr('sizes', '').attr('srcset', '');
              })
            }
            if (product.images[1] && $(window).width() > 767) {
              
              // ADD START
              var altImg;
              $.each(product.images, function(index,image){
                if (image.indexOf(imgurl) < 0) {
                  altImg = image;
                  return false;
                }
              });
              //ADD END
              
              var imgUrl = altImg.replace('50x50x2', product_image_size);
              wrapper.append('<span class="secondary-image"><img src="'+imgUrl+'"></span>').addClass('second-image-loaded');
            }
            producVariantSetup(product, wrapper);
            
            //If custom label, we need to use the JSON format because tags aren't available in the .ajax call
            var url2 = wrapper.attr('href').replace('.html', '.html?format=json');
            if ( typeof custom_label !== 'undefined' ) {
              $.get(url2, function(productjson) {
                var producttags = custom_label.split(',');
                var elementtags = productjson.product.tags;

                for(var prop in elementtags) {
                  if ( producttags.includes( elementtags[prop]['title'] ) ) {
                    console.log(elementtags[prop]['title']);
                   	wrapper.parent().find('.product-labels').append('<div class="product-label">' + elementtags[prop]['title'] + '</div>');
                 	}
                }
                
              });
            }
          });
        }
      }
    });
  }
  
  //Load custom brands
  $('.brands-override .brand-item-wrapper').each( function() {
    var wrapper = $(this);
  	$.get(wrapper.data('fetch-brand-url') + '?format=json', function(brand){
      wrapper.find('a').attr('href', wrapper.data('fetch-brand-url'));
      wrapper.find('.brand-placeholder').replaceWith('<img src="' + brand.shop.domains.static + 'files/' + brand.collection.image + '/700x350x1/' + wrapper.data('fetch-brand-name') + '.jpg" alt="" title="" />')
    });
  })
  
  // Get Ajax product
  var spotlightWrapper = $('.products-spotlight-section');
  if ( spotlightWrapper.length ) {
    $(window).on('resize scroll', function() {
      if ( spotlightWrapper.isInViewport() && !spotlightWrapper.hasClass('loaded') ) {

        $('.product-element-wrapper').delay(500).each(function(){
          var placeholder = $(this).find('.product-element'),
              modal = $(this).find('.product-modal'),
              fetchURL = $(this).data('url').replace('.html', '.ajax'),
              wrapper = placeholder.find('.product-image-wrapper');

          $.get(fetchURL, function(product){
            //console.log(product);
            var fetchCartUrl = shop_url+'cart/add/'+product.vid+'/',
                wishlistUrl = shop_url+'account/wishlistAdd/'+product.id,
                itemUrl = product.url,
                imgStandard = product.images[0].replace('50x50x2', product_image_size),
                imgStandardRet = product.images[0].replace('50x50x2', product_image_size),
                imgLarge = product.images[0].replace('50x50x2', '250x410x2'),
                imgLargeRet = product.images[0].replace('50x50x2', '500x820x2'),
                imgSlider = product.images[0].replace('50x50x2', '160x270x2'),
                imgSliderRet = product.images[0].replace('50x50x2', '320x540x2'),
                brandTitle = product.brand.title,
                title = product.title,
                description = product.description,
                fetchPrice = product.price.price,
                fetchRatings = Math.round(product.score * 10) / 2,
                fullStars = fetchRatings.toString().split(".")[0],
                halfStars = fetchRatings.toString() - fullStars > 0.45 ? 1 : 0,
                emptyStars = 5 - fullStars - halfStars;

            if (product.price.price_old) {
              var fetchPriceOld = product.price.price_old;
            }
            if (fullStars > 0 || halfStars > 0) {
              placeholder.find('.stars').html('');
              modal.find('.stars').html('');
              for(var i = 0; i < fullStars; i++) {
                placeholder.find('.stars').append('<i class="nc-icon-mini ui-2_favourite-31"></i>');
                modal.find('.stars').append('<i class="nc-icon-mini ui-2_favourite-31"></i>');
              }
              for(var i = 0; i < halfStars; i++) {
                placeholder.find('.stars').append('<i class="nc-icon-mini ui-e_star-half"></i>');
                modal.find('.stars').append('<i class="nc-icon-mini ui-e_star-half"></i>');
              }
              for(var i = 0; i < emptyStars; i++) {
                placeholder.find('.stars').append('<i class="hint-text">•</i>');
                modal.find('.stars').append('<i class="hint-text">•</i>');
              }
            }
            placeholder.find('.favourites:not(.quickview-trigger)').attr("href", wishlistUrl);
            placeholder.find('.product-image-wrapper, .product-description-footer').attr("href", itemUrl);
            placeholder.find('.quickview-trigger').attr('data-product-url', itemUrl);
            placeholder.find('.product-image-wrapper img').attr("src", imgStandard).attr("srcset", imgStandard+', '+imgStandardRet+' 2x').addClass('lazy-loaded');
            placeholder.find('.product-image-wrapper img').attr("alt", title);
            modal.find('.favourites:not(.quickview-trigger)').attr("href", wishlistUrl);

            if (product.images[1] && $(window).width() > 767) {
              wrapper.append('<span class="secondary-image"><img src="' + product.images[1].replace('50x50x2', product_image_size) + '"></span>').addClass('second-image-loaded');
            }

            producVariantSetup(product, wrapper);

            if (product.stock.available == true && product.stock.level != 0) {
              if (modal.find('.stock').length && modal.find('.stock').hasClass('show-stock-level') ) {
                modal.find('.stock').html('<div>' + product.stock.level + ' ' +  product_in_stock_label + '</div>');
              } else {
                modal.find('.stock').html('<div>' +  product_in_stock_label + '</div>');
              }
              placeholder.find('.label-out-of-stock').remove();
            } else if (product.stock.available == true && product.stock.level == 0) {
              modal.find('.stock').html('<div class="error">' + product_backorder_label + '</div>');
            } else {
              modal.find('.stock').html('<div class="error">' + product_out_of_stock_label + '</div>');
            }

            if (brandTitle) {
              placeholder.find('.product-description-footer').prepend('<div class="product-brand">'+brandTitle+'</div>');
            }
            placeholder.find('.product-title').html(title);   
            placeholder.find('.new-price').html(formatCurrency(fetchPrice));
            placeholder.find('.quickview-trigger').attr('href', '#spotlight' + product.id);
            modal.find('.new-price').html(formatCurrency(fetchPrice));
            modal.find('.product-modal-content h4').html(title);
            modal.attr('id', 'spotlight' + product.id);
            modal.find('.cart .button').attr('href', fetchCartUrl);
            
            //placeholder.find('.old-price').html(formatCurrency(prdPriceOldFixed));
            if ( product.price.price_old ) {
              placeholder.find('.product-price-change').prepend('<span class="product-price-initial">'+formatCurrency(fetchPriceOld)+'</span>');
              placeholder.find('.product-labels').prepend('<div class="product-label label-sale">Sale</div>');
              modal.find('.price').prepend('<span class="product-price-initial">'+formatCurrency(fetchPriceOld)+'</span>');
              modal.find('.product-labels').prepend('<div class="product-label label-sale">Sale</div>');
            }
            
            if (description) {
              modal.find('.product-modal-content').append('<div class="product-description m-t-20 m-b-20 paragraph-small">' + description + '</div>');
              placeholder.find('.product-description').text(description);
            }

          });
        });
        spotlightWrapper.addClass('loaded');
      }
    });
  }
  
  // Initiate Lazy Lading
  $('.lazy').Lazy({
    threshold: $(window).width() > 767 ? 500 : 50,
    afterLoad: function(element) {
        element.addClass('lazy-loaded');
    },
  });
  lazyProducts();
  
  //After image load
  $('.lazy-product-image').Lazy({
    afterLoad: function(element) {
      element.addClass('lazy-loaded');
      initSticky($('.stick-it-in-product'), true);
    }
  });
  
  // Open mobile menu
  $('.burger').on('click', function(e) {
  	e.preventDefault();
  	if (body.hasClass('menu-visible')) {
      body.removeClass('menu-visible');
    } else {
    	body.addClass('menu-visible');
      adjustMobileMenu();
      
      var container = document.getElementsByClassName('mobile-nav-overlay')[0];
      var container2 = document.getElementsByClassName('site-header')[0];
      document.addEventListener('click', function( event ) {
        if (container !== event.target && !container.contains(event.target) && container2 !== event.target && !container2.contains(event.target)) {    
          body.removeClass('menu-visible');
        }
      });
    }
  })
	
  // Open search form
	$('.search-trigger').on('click', function(e) {
		e.preventDefault();
    if ( !body.hasClass('search-active') ) {
      body.addClass('search-active');
      setTimeout( function() {
        $('.search-header input').focus();
      }, 200);
    } else {
      body.removeClass('search-active');
    }
	});
  
  // Close search form
	$('.search-close').on('click', function(e) {
    e.preventDefault();
		body.removeClass('search-active');
	});
  
  // Make the big search work with categories
  if ( $('#searchForm select.main-search').length ) {
    $('#searchForm select.main-search').on('change', function() {
      $(this).closest('form').attr('action', '' + $(this).val() );
      if ( $(this).val() == search_url ) {
      	$(this).closest('form').find('input:first-child').attr("name", 'q');
      } else {
       	$(this).closest('form').find('input:first-child').attr("name", 'search');
      }
    });
  }
  
  // Trigger the ajax search
	$('.ajax-enabled input').keyup(function(e){
    if (e.keyCode != 27 && e.keyCode != 13) {
      ajaxLoadResults();
    } else if (e.keyCode == 13) {
      $(this).closest('form.ajax-enabled').submit();
    } 
  });
  
  // Ajax Search function
  function ajaxLoadResults(){
    var query = $('#searchForm input').val();
    query = encodeURIComponent(query.replace('/', '-slash-')).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
      replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+').replace(/\./g, '-dot-');
    
    if (query.length > 0) {
      $('#searchForm').attr("method", "get");
    } else {
      $('#searchForm').attr("method", "post");
    }
    if (query.length > 2) {
      $('#searchForm').find('.button-sm').addClass('button-loading');
      if (location.protocol == 'https:') {
        if ( $('#searchForm').attr("action") != search_url ) {
        	var url = $('#searchForm').attr("action") + 'page1.ajax?limit=4&search=' + query; 
        } else {
          var url = search_url + query + '/page1.ajax?limit=4'; 
        }
        url = url.replace('http:', 'https:');
      } else {
        if ( $('#searchForm').attr("action") != search_url ) {
        	var url = $('#searchForm').attr("action") + 'page1.ajax?limit=4&search=' + query; 
        } else {
          var url = search_url + query + '/page1.ajax?limit=4'; 
        }
      }
      $.getJSON(url, function(json) {
        if (json.count > 0) {        
          var resultsHtml = [];
          $.each(json.products, function(index, product){
            var resultItem = '<div class="search-result-item clearfix">' +
                '<a href="' + product.url + '" title="' + product.fulltitle + '"><img src="' + product.image.replace('50x50x2', product_image_thumb) + '" width="40" alt="' + product.fulltitle + '" /><div class="content">' +
                '<div class="title">' + product.title + '</div>' ;
                var resultItemPrice = formatCurrency(product.price.price);
              
                if (product.price.price_old) {                  
                  resultItem += '<span class="price"><span class="old-price">' + product.price.price_old_money_without_currency + '</span>' + currency_format + product.price.price_money_without_currency + '</span>';
                } else {
                  resultItem += '<span class="price">' + resultItemPrice + '</span>';
                }

                resultItem += '</div></a></div>';
                resultsHtml.push(resultItem);
          });
          resultsHtml = resultsHtml.join('');

          $('#searchForm .search-results').html(resultsHtml);
          $('#searchForm .search-results').append('<div class="view-all-results"><a class="button button-solid button-arrow" href="'+json.url+'">' + view_all_results + '<span class="results-count">' + json.count + '</span></a></div>');
          $('#searchForm .search-results').remove('li.search-empty');
        } else {
          $('#searchForm .search-results').html('<div class="search-empty">' + search_empty + '</div>');
        }
        $('#searchForm').addClass('search-ready');
        $('#searchForm').find('.button-sm').removeClass('button-loading');
      });
    } else {
      $('#searchForm').removeClass('search-ready');
      $('#searchForm').find('.button-sm').removeClass('button-loading');
    }
  }
  
  // Show and hide collection subcategories
  $('.toggle-sub-cats').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    recalcColumns();
  });
  
  // Check cookies to see if the user previously closed the sidebar
  var sidebarWrapper = $('.collection-products');
  if ( Cookies.get('show_filters' ) == 'false' ) {
    //sidebarWrapper.addClass('collection-sidebar-hidden');
  } else {
    //sidebarWrapper.removeClass('collection-sidebar-hidden');
  }

  // Check cookies to see if the user previously closed the sidebar filters blocks
  $('.filter-wrap').each(function(index) {
    var id = $(this).attr('id');
    if ( Cookies.get(id) == 'true' ) {
      $(this).addClass('active');
    } else if ( Cookies.get(id) == 'false' ) {
      $(this).removeClass('active');
    }
  });
  
  // Open product filters on mobile
  $('.show-filter-trigger').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    body.toggleClass('sidebar-filters-active');
  });
  
  // Close product filters by clicking anywhere else
  body.on('click', function(e){
    if(!$(e.target).is("collection-sidebar") && !$(".collection-sidebar").has(e.target).length) {
        body.removeClass('sidebar-filters-active');
    }
	});
  
  // Close product filters
  $('.filter-close-mobile').on('click', function(e) {
		e.preventDefault();
    body.removeClass('sidebar-filters-active');
	});
  
  // Enable Selectric plugin for dropdown menus (select)
  if ($.fn.selectric) {
    $('.single-product-content .product-configure-variants select, .single-product-content .product-configure-options select, .addon-product-select, .gui-selects select, .product-configure-custom-option select, .main-search, .sidebar-filters select, #filter_form_top select, .cart-block select').selectric();
  }

  // Simple tabs
	$('.tabs-nav > li a').on('click', function(e){
		e.preventDefault();
		var tab_id = $(this).attr('href'),
        isActive = $(this).parent().hasClass('active') ? 1 : 0;
		
    $('.tabs-nav li').removeClass('active');
    $('.tabs-element').removeClass('active');
    if ( $(this).closest('.tabs-nav').parent().hasClass('product-tabs-horizontal') ) {
      $('.tabs-element').slideUp(300);
    }
    
    if ( !isActive ) {
      $(this).parent().addClass('active');
      $(tab_id).addClass('active');
      if ( $(this).closest('.tabs-nav').parent().hasClass('product-tabs-horizontal') ) {
        $(tab_id).slideDown(300);
        setTimeout( function() {
          $(document.body).trigger("sticky_kit:recalc");
        }, 300);
      }
    }
    
    $(document.body).trigger("sticky_kit:recalc");
	})
	
  // Yotpo click
	$('.single-product-content .yotpo.bottomLine').on('click', function(e){
		e.preventDefault();
		$('.tabs-nav li').removeClass('active');
		$('.tabs-element').removeClass('active');
		//$(this).parent().addClass('active');
    $('.tabs-nav li a[href="#product-review"]').parent().addClass('active');
		$('#product-review').addClass('active');
	})
  
  // Mailchimp validator options
  validatorOptions = {
      // Set error HTML: <div class="mce_inline_error"></div>
      errorClass: "mce_inline_error", 
      errorElement: "div", 

      // Validate fields on keyup, focusout and blur. 
      onkeyup: false,
      onfocusout: function(element) { 
        if (!isTooEarly(element)) {
          $(element).valid();
        }
      },
      onblur: function(element) { 
        if (!isTooEarly(element)) {
          $(element).valid();
        }
      },
      // Place a field's inline error HTML just before the div.mc-field-group closing tag 
      errorPlacement: function(error, element) {
        element.closest('.mc-field-group').append(error);
      },
      // Submit the form via ajax (see: jQuery Form plugin)
      submitHandler: function(form) {
        currentForm = form;
        $(form).ajaxSubmit({ 
          url: getAjaxSubmitUrl(form), 
          type: 'GET', 
          dataType: 'json', 
          contentType: "application/json; charset=utf-8",
          success: function(resp){
                $(form).find('#mce-success-response').hide();
                $(form).find('#mce-error-response').hide();

                // On successful form submission, display a success message and reset the form
                if (resp.result == "success"){
                    $(form).find('#mce-'+resp.result+'-response').show();
                    $(form).find('#mce-'+resp.result+'-response').html(resp.msg);
                    $(form).each(function(){
                        this.reset();
                  });

                // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                } else {
                if (resp.msg === "captcha") {
                  var url = form.attr("action");
                  var parameters = $.param(resp.params);
                  url = url.split("?")[0];
                  url += "?";
                  url += parameters;
                  window.open(url);
                };
                // Example errors - Note: You only get one back at a time even if you submit several that are bad. 
                // Error structure - number indicates the index of the merge field that was invalid, then details
                // Object {result: "error", msg: "6 - Please enter the date"} 
                // Object {result: "error", msg: "4 - Please enter a value"} 
                // Object {result: "error", msg: "9 - Please enter a complete address"} 

                // Try to parse the error into a field index and a message.
                // On failure, just put the dump thing into in the msg variable.
                    var index = -1;
                    var msg;
                    try {
                        var parts = resp.msg.split(' - ',2);
                        if (parts[1]==undefined){
                            msg = resp.msg;
                        } else {
                            i = parseInt(parts[0]);
                            if (i.toString() == parts[0]){
                                index = parts[0];
                                msg = parts[1];
                            } else {
                                index = -1;
                                msg = resp.msg;
                            }
                        }
                    } catch(e){
                        index = -1;
                        msg = resp.msg;
                    }

                    try {
                      // If index is -1 if means we don't have data on specifically which field was invalid.
                      // Just lump the error message into the generic response div.
                        if (index == -1){
                            $(form).find('#mce-'+resp.result+'-response').show();
                            $(form).find('#mce-'+resp.result+'-response').html(msg);      

                        } else {
                            var fieldName = $("input[name*='"+fnames[index]+"']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
                            var data = {};
                            data[fieldName] = msg;
                            form.showErrors(data);
                        }
                    } catch(e){
                        $(form).find('#mce-'+resp.result+'-response').show();
                        $(form).find('#mce-'+resp.result+'-response').html(msg);
                    }
                }
            }
        });
      }
  }
  
  // Validate Mailchimp forms
  $(".mc-voila-subscribe-form").each(function() { 
      $(this).validate(validatorOptions);
  });
  
  function isTooEarly(element) {
    var fields = $('input:not(:hidden)' , $(element).closest(".mc-field-group"));
    return ($(fields).eq(-1).attr('id') != $(element).attr('id'));
  }
  
  function getAjaxSubmitUrl(form) {
    var url = $(form).attr("action");
    url = url.replace("/post?u=", "/post-json?u=");
    url += "&c=?";
    return url;
  }
  
  // Open promo modal signup
  if ( show_newsletter_promo_popup && !$('.main-content .gui.gui-challenge').length ) {   
    var hide_until = parseInt(newsletter_promo_hide_until);
    var show_delay = parseInt(newsletter_promo_delay);
    if ( !Cookies.get('promo_popup_filled') && !Cookies.get('promo_popup_closed') ) {
			var modalVariant = 'promo-modal-wrapper';
      if ( $('#promoModal').hasClass('promo-modal-no-image') ) {
        modalVariant = 'promo-modal-wrapper-no-image';
      }
      if ( $('#promoModal').hasClass('promo-modal-corner') ) {
        modalVariant += ' promo-modal-corner';
      }
      setTimeout( function() {
        $.featherlight($('#promoModal'), {
          variant: modalVariant,
          persist: true,
          afterOpen: function(event){
            $('.lazy-popup').Lazy({
              afterLoad: function(element) {
                element.addClass('lazy-loaded');
              }
            });
            if ( $('#promoModal').hasClass('promo-modal-corner') ) {
              $('html').removeClass('with-featherlight').addClass('promo-modal-open');
            }
            $(".featherlight-content #mc-embedded-subscribe-form-popup").validate(validatorOptions);
            $('.newsletter-promo-form a.button').on('click', function(e) {
            	Cookies.set('promo_popup_filled', true);
            });
            $('.newsletter-promo-form').on('submit', function(e) {
            	Cookies.set('promo_popup_filled', true);
            });
            $('.promo-modal-wrapper .close-promo, .promo-modal-wrapper-no-image .close-promo').on('click', function() {
            	$('.promo-modal-wrapper .featherlight-close, .promo-modal-wrapper-no-image .featherlight-close').click();
            });
          },
          afterClose: function(event){
            Cookies.set('promo_popup_closed', true, { expires: hide_until });
          }
        });
      }, show_delay);
    } 
  }
  
  if ( !Cookies.get('top_bar_closed') && $('.top-bar').hasClass('top-bar-closeable') ) {
    var top_bar_hide_until = parseInt(notification_bar_hide_until);
    setTimeout( function() {
    	$('.top-bar').slideDown();
    }, 300);
    $('.close-top-bar').on('click', function(e) {
      e.preventDefault();
      Cookies.set('top_bar_closed', true, { expires: top_bar_hide_until });
      $('.top-bar').slideUp();
    });
  }
  
  // Update product price with bundles/addons
  function updatePrice() {
    var initialPrice = $('.price-update').data('price');
    var total = initialPrice;
    $('.addon-product .checkbox input:checked').each( function() {
      total += $(this).closest('.addon-product').find('.addon-variant-price').data('price');
    });
    $('.price-update').html( formatCurrency( total ) ).addClass('emphasis');
    setTimeout(function() {
      $('.price-update').removeClass('emphasis');
    }, 150);
  }
  
  // Add product addon to subtotal
  $('.addon-product').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var checkbox = $(this).find('.checkbox input');
    if ( checkbox.attr('checked') ) {
      checkbox.removeAttr('checked');
    } else {
      checkbox.attr('checked','checked');
    }
    updatePrice();
  });
  
  // Change product addon variable on product page
  $('.addon-product-select').on('change', function() {
    var newPrice = $(this).find(':selected').data('variant-price'),
        newId = $(this).val(),
        newTarget = $(this).find(':selected').data('target');
    $(this).closest('.addon-product').find('.addon-variant-price').html( formatCurrency( newPrice ) );
    $(this).closest('.addon-product').find('.checkbox input').attr('value', newId ).attr('data-price', newPrice );
    $(this).closest('.addon-product').find('.addon-variant-price').data('price', newPrice);
    $('.bundle-hidden-form input[name="' + newTarget + '"]').val(newId);
    updatePrice();
  });
  
  // Add addon/bundle to cart
  $('.add-to-cart-trigger').on('click', function(e) {
  	e.preventDefault();
    if ( $('.addon-product .checkbox input:checked').length && $('.addon-product .checkbox input:checked').length != $('.addon-product .checkbox input').length ) {
      $('#product_configure_form').attr('action', $('#product_configure_form').data('cart-bulk-url') );
      $('#product_configure_form').submit();
      return false;
    } else if ( $('.addon-product .checkbox input:checked').length > 0 && $('.addon-product .checkbox input:checked').length == $('.addon-product .checkbox input').length) {
      e.stopPropagation();
      $('.add-bundle-btn').click();
      return false;
    } else {
      $('#product_configure_form').submit();
    }
  });
  
  // Validate popup forms to make sure they go through correctly
  $('.popup-validation').on('click', function(e){
    e.preventDefault();
    var form = $(this).closest('form');
    var isValid = true;
    var required = form.find('.required');
    required.each( function() {
    	if ( $(this).val() == "" || $(this).val() == " " ) {
        $(this).addClass('error');
        isValid = false;
      }
    });
    if ( !isValid ) {
      return false;
    }
    form.submit();
    return false;
  });
  
  // Enable product list carousel
  $('.product-list-carousel').each( function() {
  	if ( !$(this).find('.no-result-module').length ) {
    
      if ( $('.product-list-carousel > div').hasClass('col-lg-2') ) {
        var slidesCount = 6;
      } else if ( $('.product-list-carousel > div').hasClass('col-md-3') ) {
        var slidesCount = 4;
      } else if ( $('.product-list-carousel > div').hasClass('col-md-6') ) {
        var slidesCount = 2;
      } else if ( $('.product-list-carousel > div').hasClass('col-md-15') ) {
        var slidesCount = 5;
      } else {
        var slidesCount = 3;
      }
      $(this).slick({
        infinite: false,
        slidesToShow: slidesCount,
        slidesToScroll: slidesCount,
        arrows: true,
        dots: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: slidesCount == 6 ? 4 : slidesCount,
            slidesToScroll: slidesCount == 6 ? 4 : slidesCount,
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }]
      });
      $(this).on('afterChange', function(slick, slide){
        lazyProducts();
      });
    }
  })
  
  
  // Enable category list carousel
  if ( $('.featured-categories.featured-categories-circle > .row').length ) {
    if ( $('.featured-categories > .row > div').hasClass('col-md-2') ) {
      var catsColumns = 6;
    } else if ( $('.featured-categories > .row > div').hasClass('col-md-3') ) {
      var catsColumns = 4;
    } else if ( $('.featured-categories > .row > div').hasClass('col-md-15') ) {
      var catsColumns = 5;
    } else {
      var catsColumns = 3;
    }
    $('.featured-categories > .row').slick({
			infinite: false,
			slidesToShow: catsColumns,
			slidesToScroll: catsColumns,
      arrows: false,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: catsColumns == 6 ? 4 : catsColumns,
          slidesToScroll: catsColumns == 6 ? 4 : catsColumns,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
			}]
		});
  }
  
  
  // Enable brand list carousel
  if ( $('.brands-wrapper .brands > .row') ) {
    var brandsColumns = $('.brands-wrapper .brands').data('columns');
    $('.brands-wrapper .brands > .row').slick({
			infinite: false,
			slidesToShow: brandsColumns,
			slidesToScroll: brandsColumns,
      arrows: true,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: brandsColumns == 6 ? 4 : brandsColumns,
          slidesToScroll: brandsColumns == 6 ? 4 : brandsColumns,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
			}]
		});
  }
  
  // Enable carousel on mobile for blog
  if ( $('.featured-blog-carousel') ) {
		$('.featured-blog-carousel').slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 3,
      arrows: false,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
			}]
		});
	}
  
  // Enable carousel for Headlines
  if ( $('.headline-slider') ) {
    var headlineSlider = $('.headline-slider'),
        columnsLarge = 2,
        columnsMedium = 2,
        columnsMobile = 1;
    
    if ( headlineSlider.data('columns') == 2 ) {
      var columnsLarge = 2,
          columnsMedium = 2,
          columnsMobile = 1;
    } else if ( headlineSlider.data('columns') == 1 ) {
      var columnsLarge = 1,
          columnsMedium = 1,
          columnsMobile = 1;
    } else if ( headlineSlider.data('columns') == 3 ) {
      var columnsLarge = 3,
          columnsMedium = 2,
          columnsMobile = 1;
    } else if ( headlineSlider.data('columns') == 4 ) {
      var columnsLarge = 4,
          columnsMedium = 2,
          columnsMobile = 1;
    }
		headlineSlider.slick({
			infinite: false,
			slidesToShow: columnsLarge,
			slidesToScroll: 1,
      arrows: false,
			dots: true,
			responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: columnsMedium,
          slidesToScroll: 1,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: columnsMobile,
          slidesToScroll: 1
        }
			}]
		});
	}
  
  // Enable the zoom on images
  if ( $('.enable-zoom .product-image a').length ) {
    var eventFired = 0;
    if ($(window).width() > 1000) {
      $('.enable-zoom .product-image a').each( function () {
        $(this).zoom({
          url: $(this).attr('href'),
          magnify: 1.3
        });
      });
      eventFired = 1;
    }
    $(window).on('resize', function() {
        if (!eventFired && $(window).width() > 1000) {
            $('.enable-zoom .product-image a').each( function () {
              $(this).zoom({
                url: $(this).attr('href'),
                magnify: 1.3
              });
            });
            eventFired = 1;
        } else if (eventFired && $(window).width() <= 1000) {
            $('.enable-zoom .product-image a').each( function () {
              $(this).trigger('zoom.destroy');
            });
          	eventFired = 0;
        }
    });
  }
  
  
  // Enable carousel for product images
  if ( $('.product-images:not(.no-slider)').length > 0 ) { 
    var slider = $('.product-images');
    slider.on('init', function(){
      if ( slider.find('.slick-dots li').length > 5 ) {
        initDotsSlider();
      }
    });
    slider.not('.slick-initialized').slick({
        fade: true,
        dots: true,
        arrows: false,
        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).find('img').data('thumb');
            return '<a><img src="'+thumb+'"></a>';
        }
    });
    
    function initDotsSlider() {
    	window.setTimeout(function() {
        var dots = slider.find('.slick-dots');
        dots.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          $(nextSlide).click();
        });
        dots.not('.slick-initialized').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
          asNavFor: '.product-images',
          dots: false,
          focusOnSelect: true,
          centerMode: $('.site-width-large').length ? true : false,
          vertical: $('.site-width-large').length ? true : false,
          verticalSwiping: $('.site-width-large').length ? true : false,
          responsive: [{
            breakpoint: 1000,
            settings: {
              centerMode: false,
              focusOnSelect: true,
              vertical: false,
              verticalSwiping: false
            }
          }]
        });
      }, 100);
    }
	}
  

  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  // Enable carousel for Hero banner
	if ( $('.hero .hero-element').length > 1 ) {
		var slider = $('.hero-elements-wrapper');
    slider.on('init', function() {
      if ( !iOSSafari ) {
        $('.my-background-video').bgVideo({
          fadeIn: 300
        });
        if ( $('.jquery-background-video').length ) {
          $('.jquery-background-video').get(0).play();
        }
      } else {
        body.addClass('ios-safari');
      }
      if ( slider.find('.slick-active').hasClass('content-light') ) {
        setTimeout( function() {
          //slider.find('.slick-dots').addClass('content-light');
          if ( slider.parent('.hero').hasClass('hero-full') ) {
            //siteHeader.addClass('content-light');
          }
        }, 150);
      };
    });
	 	slider.slick({
	 		arrows: false
	 	});
	 	slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  	if ( $( slick.$slides.get(nextSlide) ).hasClass('content-light') ) {
		  		setTimeout( function() {
		  			//slider.find('.slick-dots').addClass('content-light');
			  		if ( slider.parent('.hero').hasClass('hero-full') ) {
			  			//siteHeader.addClass('content-light');
			  		}
		  		}, 150);
		  	} else {
		  		setTimeout( function() {
			  		//slider.find('.slick-dots').removeClass('content-light');
			  		//siteHeader.removeClass('content-light');
		  		}, 150);
		  	}
      $('.lazy').Lazy({
        threshold: 400,
      });
		});
	} else if ( $('.hero.hero-full .hero-element').length == 1 && $('.hero .hero-element').hasClass('content-light') ) {
  	siteHeader.addClass('content-light');
  	if ( !iOSSafari ) {
      $('.my-background-video').bgVideo({
        fadeIn: 300
      });
    } else {
      body.addClass('ios-safari');
    }
  } else if ( $('.my-background-video').length ) {
    if ( !iOSSafari ) {
      $('.my-background-video').bgVideo({
        fadeIn: 300
      });
    } else {
      body.addClass('ios-safari');
    }
  }
  
  // Make the collection sidebar filter sticky
  if ( $('.collection-sidebar-wrapper').length ) {
		$(".collection-sidebar-wrapper").stick_in_parent({
    	recalc_every: 3
    });
	}
  
   // Function to recalc product collections height
  var columnResize = $('.collection-content'),
      columnGuide  = $('.collection-sidebar-wrapper');
  function recalcColumns() {
  	$('.collection-content').css('min-height', columnGuide.height() + 60 + 'px');
  }
  
  // Calculate on load
  recalcColumns();
	
  // initiate sticky kit
  function initSticky(element, column) {
    function activeStickyKit() {
      element.stick_in_parent();
      
      if ( column == true ) {
        // bootstrap col position
        element.on('sticky_kit:bottom', function(e) {
            $(this).parent().css('position', 'static');
        }).on('sticky_kit:unbottom', function(e) {
            $(this).parent().css('position', 'relative');
        });
      }
      
    };

    // Remove sticky kit
    function detachStickyKit() {
        element.trigger("sticky_kit:detach");
    };

    var screen = 992;
    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    if ((windowWidth < screen)) {
        detachStickyKit();
    } else {
        setTimeout( function() {
          activeStickyKit();
        }, 300);
    }

    // windowSize
    // window resize
    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function(){
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }
    }, 250));
  }
  // Make the sticky work with bootstrap columns
  if ( $('.collection-sidebar-wrapper').length ) {
    initSticky($('.collection-sidebar-wrapper'), false)
	}
  
  // Open product filters and set cookie for user preferences
  $('.filter-open').on('click', function(e) {
		e.preventDefault();
    if ($(this).parents('.collection-products').hasClass('collection-sidebar-hidden')) {
      Cookies.set('show_filters', true, { expires: 7 });
    } else {
      Cookies.set('show_filters', false, { expires: 7 });
    }
    $('.collection-products').toggleClass('collection-sidebar-hidden');
	});

  // Open/close filter sections
	$('.filter-title').on('click', function() {
    if ( $(this).closest('.filter-wrap').hasClass('active') ) {
      $(this).closest('.filter-wrap').removeClass('active');
    	Cookies.set($(this).closest('.filter-wrap').attr('id'), false, { expires: 7 });
    } else {
      $(this).closest('.filter-wrap').addClass('active');
      Cookies.set($(this).closest('.filter-wrap').attr('id'), true, { expires: 7 });
    }
		setTimeout( function() {
      recalcColumns();
			$(document.body).trigger("sticky_kit:recalc");
		}, 50)	
	});
  
  // Open the add new review popup
  $('.review-trigger').on('click', function(e) {
    e.preventDefault();
    $.featherlight($('#reviewModal'), {
        afterOpen: function(event){
            this.$content.find('.form-row select').selectric();
        }
    });
  });
  
  // Open the size guide modal and fetch the content
  $('.size-guide-nav').on('click', function(e) {
    e.preventDefault();
    var guideUrl = 'size-guide';
    if ( $(this).data('custom-size-guide') ) {
    	guideUrl = $(this).data('custom-size-guide');
    }
    if (location.protocol == 'https:') {
      shop_url = shop_url.replace('http:', 'https:');
    }
    $.get(shop_url+'service/' + guideUrl + '?format=json', function(data) {
      //$('.side-guide-wrapper .size-guide-title').html(data.textpage.title);
      $('.size-guide-wrapper').html(data.textpage.content);
    });
  });
  
  $('.extra-product-tab').each( function() {
  	var tabUrl = $(this).find('a').data('fetch-product-tab'),
        titleWrapper = $(this).find('a'),
        el = $(this);
    
    if (location.protocol == 'https:') {
      shop_url = shop_url.replace('http:', 'https:');
    }
    $.get(shop_url + tabUrl + '?format=json', function(data) {
      titleWrapper.html(data.textpage.title);
      el.after('<div class="tabs-element single-product-details-tab text-formatting text-formatting-smaller" id="product-' + tabUrl.replace('service/','').replace('/','-') + '" style="display: none;">' + data.textpage.content + '</div>');
      el.addClass('loaded');
    });
  })
  
  function getCustomVariable(el) {
    var html = '<ul class="product-custom-variants-options">';
    
    var i = 0;
    var customEl = false;
    var customValues = false;
    if ( el.data_03 && el.data_03 != '' ) {
      customValues = el.data_03.split(",");
      if ( customValues.length > 1 ) {
        customEl = true;
      }
    }
    $.each(el.variants, function(index, elVar){
      
      if (elVar.title.indexOf(':') > -1) {
        //var elVarItemTitle = elVar.title.split(":")[0].trim();
      	var elVarItemValue = elVar.title.split(":")[1].trim();
      } else {
      	var elVarItemValue = elVar.title;
      }
      var elStyleType = 'other';
      var elStyles = '';
      if ( customValues.length > 1 ) {
        if ( customValues && customValues[i].trim().match("^#") ) {
          elStyleType = 'color';
          elStyles = 'background-color: ' + customValues[i].trim() + ';';
        } else if ( customValues && customValues[i].trim().match("^http") ) {
          elStyleType = 'image';
          elStyles = 'background-image: url(' + customValues[i].trim() + ');';
        } else if ( customValues && ( customValues[i].trim().indexOf(".jpg") >= 0 || customValues[i].trim().indexOf(".png") >= 0 || customValues[i].trim().indexOf(".jpeg") >= 0 ) ) {
          elStyleType = 'image';
          elStyles = 'background-image: url(' + static_url + 'files' + customValues[i].trim() + ');';
        }
      }
      if (elVar.stock.available) {
        var available = true;
      } else {
        var available = false;
      } 
      html += '<li class="product_configure_variant_' + elVar.id + (customEl ? ' custom-variant-picker custom-variant-picker-'+elStyleType  : '') + ( (elVar.title == el.variant || elVar.default) ? ' active' : '') + '" data-title="' + elVarItemValue + '"><a href="' + elVar.url + '" data-cart-url="' + shop_url + 'cart/add/' + elVar.id + '/" data-price="' + formatCurrency(elVar.price.price) + '" data-old-price="' + formatCurrency(elVar.price.price_old) + '" data-available="' + available + '" data-stock="' + elVar.stock.level + '" style="' + elStyles + '" data-variant-id="' + elVar.id + '" class="' + (elVar.stock.available == false ? 'unavailable' : '') + '">' +  elVarItemValue + '</a></li>'; 
      i ++;
    });
    html += '</ul>';
    
    return html;
	}
  
  function updateModalForm(option) {
    if (option.is('select') ) {
      var url = option.find('option:selected').attr('data-cart-url'),
          available = option.find('option:selected').attr('data-available'),
          priceNew = option.find('option:selected').attr('data-price'),
          priceOld = option.find('option:selected').attr('data-old-price'),
          variantStock = parseInt(option.find('option:selected').attr('data-stock'));
    } else {
      var url = option.attr('data-cart-url'),
          available = option.attr('data-available'),
          priceNew = option.attr('data-price'),
          priceOld = option.attr('data-old-price'),
          variantStock = parseInt(option.attr('data-stock'));
    }
    if ( option.closest('.product-element').length ) {
      var 	priceWrapper = option.closest('.product-element').find('.product-price-change');
      priceWrapper.html('<span class="product-price-initial">' + priceOld + '</span><span class="new-price">' + priceNew + '</span>').addClass('emphasis');
      setTimeout(function() {
        priceWrapper.removeClass('emphasis');
      }, 150);
      
    } else {
      var 	availabiltyWrapper = option.closest('.product-modal-content').find('.stock'),
          	priceWrapper = option.closest('.product-modal-content').find('.price');
      
      if (available == 'true' && variantStock != 0) {
        if (availabiltyWrapper.length && availabiltyWrapper.hasClass('show-stock-level') ) {
          availabiltyWrapper.html('<div>' + variantStock + ' ' +  product_in_stock_label + '</div>');
        } else {
          availabiltyWrapper.html('<div>' +  product_in_stock_label + '</div>');
        }
      } else if (available == 'true' && variantStock == 0) {
        availabiltyWrapper.html('<div>' + product_backorder_label + '</div>');
      } else {
        availabiltyWrapper.html('<div>' + product_out_of_stock_label + '</div>');
      }
      priceWrapper.html('<span class="old-price">' + priceOld + '</span><span class="new-price">' + priceNew + '</span>');
      priceWrapper.find('.new-price').addClass('emphasis');
      setTimeout(function() {
        priceWrapper.find('.new-price').removeClass('emphasis');
      }, 150);
      option.closest('form').attr('action', url);
    }
	}
  
  // Open quickview popop and fetch content
  $('.quickview-trigger').featherlight({
    variant: 'product-modal-wrapper',
    targetAttr: 'href',
    afterContent: function() {
      var url = this.$currentTarget.attr('data-product-url').replace('.html', '.ajax');
      if (location.protocol == 'https:') {
        url = url.replace('http:', 'https:');
      }
      var content = this.$content;
      $.get(url, function(el){
        //console.log(el);
        var elVars = el.variants,
        		elImgs = el.images;
				
        // Get new images
        if (elImgs.length != 0 ) {
          content.find('.product-modal-media').empty();
          $.each(elImgs, function(index, image){
            var image = image.replace('50x50x2', product_image_size);
            content.find('.product-modal-media').append('<div class="product-figure"><img src="'+image+'"></div>');
          });
        }
        // Get new variables
        if (elVars.length != 0 ) {
          
          content.find('.product-configure').removeClass('modal-variants-waiting');
          
          var variantTypesCount = 0;
          var elVarTitles = [];
          var items= [];
          
          $.each(elVars, function(index, elVar){
            var elVarList = elVar.title.split(",");
            variantTypesCount = elVarList.length;
          });
          
          var customVariantActive = false;
          if ( ( display_variant_picker_on == 'all' && el.data_03 != 'disabled' ) || ( display_variant_picker_on == 'specific' && el.data_03 != 'false' && el.data_03 ) ) {
            customVariantActive = true;
          }
          
          if ( variantTypesCount == 1 && show_variant_picker && customVariantActive ) {
            content.find('.product-configure-variants').remove();
            content.find('.product-configure').prepend( getCustomVariable(el) );
            content.find('.product-custom-variants-options a').on('click', function(e) {
              e.preventDefault();
              if ( $(this).hasClass('unavailable') ) {
                //console.log('This product is unavailable');
              } else {
                content.find('.product-custom-variants-options li').removeClass('active');
                var urlCart = $(this).data('cart-url');
            
                updateModalForm($(this));
                
                $(this).parent().addClass("active");
                $(this).closest('.product_configure_form').attr('action', urlCart);
                
              }
            })
          } else {
            $.each(elVars, function(index, elVar){
              /*var elVarList = elVar.title.split(",");
              variantTypesCount = elVarList.length;
              $.each(elVarList, function(index, elVarItem){
                elVarItem.split(":");
                var elVarItemTitle = elVarItem.split(":")[0].trim();
                var elVarItemValue = elVarItem.split(":")[1].trim();
                if ( items[elVarItemTitle] ) {
                  var found = $.inArray(elVarItemValue, items[elVarItemTitle]);
                  if (found == -1) {
                      items[elVarItemTitle].push(elVarItemValue);
                  }
                } else {
                  items[elVarItemTitle] = [];
                  items[elVarItemTitle].push(elVarItemValue);
                }
                console.log(items);
              })*/

              if (elVar.stock.available) {
                var available = 'true';
              } else {
                var available = 'false';
              } 
              content.find('.product-options-input').append('<option ' +
                ( (el.vid == elVar.id) ? 'selected="selected" ' : '') +
                'data-cart-url="'+shop_url+'cart/add/'+elVar.id+'/" ' +
                'data-available="'+available+'" ' +
                'data-price="'+formatCurrency(elVar.price.price)+'" ' +
                'data-old-price="'+formatCurrency(elVar.price.price_old)+'" ' +
                'data-stock="'+elVar.stock.level+'">'+ elVar.title +' - '+formatCurrency(elVar.price.price) + 
                '</option>');
            });
          }
          
          
        }
      }).done(function(){
        if ($.fn.selectric) {
          content.find('.product-configure-variants select').selectric();
        }
        content.find('.product-modal-media').slick({
          fade: true,
          dots: true,
          arrows: false
        });
        if (!content.find('.product-configure').hasClass('modal-variants-waiting')) {
          updateModalForm(content.find('select'));
        }
      });

      $('.product-modal-wrapper select').on('change', function(){
        updateModalForm($(this));
      });
    }
  });
  
  // PhotoSwipe
  // Peload the image to get the width and height
  $('.product-image').each( function() {
    var tmpImg = new Image(),
        tmpEl = $(this);
    tmpImg.src = $(this).find('a').attr('href');
    $(tmpImg).on('load', function() {
      orgWidth = tmpImg.width;
      orgHeight = tmpImg.height;
      tmpEl.find('a').attr('data-size', orgWidth + 'x' + orgHeight);
    });
  });
  
  var pswpElement = document.querySelectorAll('.pswp')[0];
  if (pswpElement) {
    var gallerySelector = '.product-images';

    var initPhotoSwipeFromDOM = function(gallerySelector) {

      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      var parseThumbnailElements = function(el) {
        var thumbElements = $(el).find('.product-image').toArray(),
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            imgEl,
            item;

        for (var i = 0; i < numNodes; i++) {

          figureEl = thumbElements[i]; // <figure> element

          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue;
          }

          linkEl = figureEl.children[0]; // <a> element
          imgEl = linkEl.children[0]; // <img>

          size = linkEl.getAttribute('data-size');
          size = size && size.split('x');

          // create slide object
          item = {
            src: linkEl.getAttribute('href'),
            w: size && parseInt(size[0], 10) || imgEl.width,
            h: size && parseInt(size[1], 10) || imgEl.height
          };

          if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML;
          }

          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src');
          }

          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
        }

        return items;
      };

      // find nearest parent element
      var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function(e) {
        e = e || window.event;
        
        e.preventDefault();

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
          return (el.tagName && el.tagName.toUpperCase() === 'DIV');
        });

        if (!clickedListItem) {
          return;
        }

        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        
        // Peload the image to get the width and height
        /*if (!$(clickedListItem).find('a').attr('data-size')) {
          var tmpImg = new Image();
          tmpImg.src = $(clickedListItem).find('a').attr('href');
          $(tmpImg).on('load', function() {
            orgWidth = tmpImg.width;
            orgHeight = tmpImg.height;
            $(clickedListItem).find('a').attr('data-size', orgWidth + 'x' + orgHeight);
          });
        }*/
          
        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = $(clickedListItem).closest(gallerySelector)[0],
            childNodes = $(clickedGallery).find('.product-image').toArray(),
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
          params = {};

        if (hash.length < 5) {
          return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          var pair = vars[i].split('=');
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }

        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }

        return params;
      };

      var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),

          getThumbBoundsFn: function(index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
              pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect();

            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width
            };
          }
        };

        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (var j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
          return;
        }

        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        gallery.listen('imageLoadComplete', function(index, item) {
          var linkEl = item.el.children[0];
          var img = item.container.children[0];
          if (!linkEl.getAttribute('data-size')) {
            linkEl.setAttribute('data-size', img.naturalWidth + 'x' + img.naturalHeight);
            item.w = img.naturalWidth;
            item.h = img.naturalHeight;
            gallery.invalidateCurrItems();
            gallery.updateSize(true);
          }
        });

        gallery.init();
      };

      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll(gallerySelector);

      for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
      }
    };

    // execute above function
    initPhotoSwipeFromDOM(gallerySelector);
  }
  
  // Add to cart with AJAX
  $('body.ajax-cart').on('submit', 'form.product_configure_form', function(e) {
    e.preventDefault();
    var form = $(this),
  			fields = form.serialize(),
        action = form.attr('action');
    
    if (location.protocol == 'http:' ) {
      action = action.replace('https:', 'http:');
    }

    $.ajax({
      url: action,
      data: fields,
      type:"POST",
      contentType:"application/x-www-form-urlencoded; charset=utf-8",
    }).fail( function(data) {
      if (navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1) {
        location.reload();
      } else {
        alert('An error occured, please confirm you have an SSL certificate enabled');
      }
    }).done( function(data) {       
      var messages = $(data).find('.messages ul');

      $('.cart-sidebar-body').html( $(data).find('.cart-sidebar-body').html() );
      if ( $('.cart-sidebar-footer').length < 1 && $(data).find('.cart-sidebar-footer').length > 0 ) {
      	$('.cart-sidebar').append('<div class="cart-sidebar-footer">' + $(data).find('.cart-sidebar-footer').html() + '</div>');
      } else if ( $('.cart-sidebar-footer').length > 0 && $(data).find('.cart-sidebar-footer').length > 0 ) {
        $('.cart-sidebar-footer').html( $(data).find('.cart-sidebar-footer').html() );
      }
      $('.cart-trigger sup').html( $(data).find('.cart-trigger sup').html() );
      $.featherlight.close()
      $('.cart-trigger').click();
      
      $('.cart-sidebar-body .input-wrap .change a').on('click', function(){
        var cur = $(this);
        var way = $(this).attr('data-way');
        updateQuantity(way, cur);
				$(this).closest('.cart-sidebar-form').submit();
      });

      if ( messages.hasClass('success') || messages.hasClass('gui-success') ) {
				var themeMessage = new flashMessage(data);
        themeMessage.render();
      } else {
        var themeMessage = new flashMessage(data);
        themeMessage.render();
      }
    });
  });
  
});

jQuery(window).on("load", function($) {
  // Recalc sticky kit once images are all loaded
	jQuery(document.body).trigger("sticky_kit:recalc");
});

function flashMessage(html) {
  // Default values
  this.messageType = 'info';
  this.idx = Math.floor((Math.random() * 1000) + 1);
  this.messageHolder = $(html).find('.messages ul');
  this.message = this.messageHolder.first('li').text();
  this.messageHtml = this.messageHolder.first('li').html();
    
  this.parseMessageType = function() {
    // Parse messagetype
    if ( this.messageHolder.hasClass('error') || this.messageHolder.hasClass('gui-error') ) {
      this.messageType = 'error';
    } else if( this.messageHolder.hasClass('info') || this.messageHolder.hasClass('gui-info') ) {
      this.messageType = 'info';
    } else if( (this.messageHolder.hasClass('success') || this.messageHolder.hasClass('gui-success') ) ) {
      this.messageType = 'success';
    }
  }
  
  if ( this.messageHolder.length ) {  
    this.parseMessageType();
    if ( $('.flash-messages').length < 1 ) {
      $('body').prepend('<div class="flash-messages"></div>');
    }
  } else {
    location.reload();
    this.render = function(){ return false ; }
    return false;
  }
  
  this.render = function() {
    var html = '<div class="message '+this.idx+' '+this.messageType+'" style="opacity:0; bottom:-30px;">\
      <div class="content messages">\
        <ul class="'+this.messageType+'">\
            <li>'+this.message+'</li>\
        </ul>\
      </div>\
    </div>';
    
    $('.flash-messages').prepend(html);
    
    $('.flash-messages').find('.'+this.idx).animate({'bottom':'0px', 'opacity': 1}, 500, function() {
    }).delay( 3500 ).animate({'bottom':'-30px', 'opacity': 0}, 500, function() {
    	$('.flash-messages').remove();
    });
     
  }
}

function pad(str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

// Update cart quantities
function changeQuantity(way, el){
  	var qty = parseInt(el.closest('.input-wrap').find('input').val());
    if (way == 'add'){
    	qty++;
    } else {
    	if (qty > 1){
        	qty--;
    	}
    }
    el.closest('.input-wrap').find('input').val(qty);
}

// Initiate blog laod more
var moreContent = false,
		pageManual = false,
		blogPage = 1,
		loading = false;

function initBlog(url, page, mode){
	moreContent = true;
  if ( $('.article-list').length ) {
    $('.article-list').imagesLoaded( function() {
      var grid = $('.article-list').masonry({
        isAnimated: false,
        transitionDuration: 0,
        itemSelector: '.blog-element-wrapper',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
      $('.article-list').addClass('active');
    });
	}
	$('.load-more-blog').click(function(){
		blogLoader(url, mode);
		return false;
	});
	if ( $('.load-more-blog').length > 0 ) {
    blogLoader(url, mode);
  }
}

// Load blog articles
function blogLoader(url, mode){
	if ( !loading ) {
    blogPage++;
    if ( blogPage > 1 ) {
      $('.load-more-blog').addClass('button-loading');
      loading = true;
      url = url.replace('page1.ajax', 'page' + blogPage + '.html?format=json');
      $.getJSON(url, function(json){
        if ( json.blog.articles ) {
          if ( json.blog.pagination.pages <= blogPage ) {
            moreContent = false;
            $('.blog-footer').remove();
          }
          if ( blogPage > 100) {
            blogRemaining = true;
            $('.blog-footer').addClass('manual');
          }
          var counter = 1,
              sortArticles = {},
              count = 1;

          $.each(json.blog.articles, function(index, article) {
            var thisDate = article.date.replace(' ', '-').replace(':', '-') + count++;
            sortArticles[thisDate] = article;
          });
          
          var articles = {},
              number = 5;
          $.each(sortArticles, function(index, article) {
            articles[number--] = article;
          });
          $.each(articles, function(index, article) {
            var container = $('.article-list'),
              	postTitle = article.title,
              	postUrl = article.url,
              	postSummary = article.summary,
              	postThumbnailId = article.image,
              	publishDate = article.date;
            
            var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' },
                articleDate  = new Date(article.date);
            
            publishDate = articleDate.toLocaleDateString(undefined, dateOptions);
            
            //console.log(article);
            //var articleObject  = $('<div class="col-xs-12 col-sm-4 col-md-4 col-xs-12 blog-col">').appendTo(container);
            var article = $('<div class="blog-element-wrapper">').appendTo(container);
            var articleContent = $('<article class="blog-element">').appendTo(article);
            if ( !postThumbnailId ) {
            	articleContent.addClass('blog-element-no-image');
              articleContent = $('<div class="blog-elem-wrapper">').appendTo(articleContent);
            };
            var imageLink = $('<a href="'+ shop_url + postUrl +'">').appendTo(articleContent);

            if ( postThumbnailId ) {
              postThumbnailId = pad(postThumbnailId, 9);
              var imgstring = '<img src="'+staticUrl+'files/000000000/1000x850x3/image.jpg" width="100%" height="auto" />';
              img = imgstring.replace("000000000", postThumbnailId);
              var artimg = $(img).appendTo(imageLink);
            } else {
              //var artimg = $('<img src="'+assetsUrl+'no-article.jpg" width="100%">').appendTo(imageLink);
            };

            var title = $('<a href="'+ basicShopUrl + postUrl +'"><h3>'+ postTitle +'</h3></a>').appendTo(articleContent);
            var publishDate = $('<div class="hint-text entry-date">'+ publishDate +'</div>').appendTo(articleContent);

            if (showDesc) {
              var points = '';
              if( postSummary.length > 160 ) {
                var points = '...';
              }
              var description = $('<div class="entry-content">'+ postSummary.substring(0,160) + ' ' + points +'</div>').appendTo(articleContent);
            }
            //var readMore = $('<div class="entry-footer"><a href="'+ basicShopUrl + postUrl +'" class="button">Read more</a></div>').appendTo(articleContent);

            counter++;       
          });
        }
        loading = false;
      }).done(function(){
        $('.article-list').imagesLoaded( function() {
          $('.article-list').masonry('reloadItems');
          $('.article-list').masonry('layout');
    		});
        $('.load-more-blog').removeClass('button-loading');
        $(document).scroll();
      });
    }
	}
}