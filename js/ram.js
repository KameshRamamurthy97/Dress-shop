
jQuery(document).ready(function($){

	var resizeTimer;
	$(window).on('resize', function(e) {
		var width = window.innerWidth;
  		clearTimeout(resizeTimer);
  		resizeTimer = setTimeout(function() {
  			console.log(width);
  			//location.reload();
  	}, 400);

	});

	// Opens/collapses mega menu based on viewport width
    var viewportWidth = $(window).width();

	if (viewportWidth < 1225) {
        $('.cd-dropdown').removeClass('dropdown-is-active'); 
        $('.cd-dropdown').mouseenter(
            function(){$(this).addClass('dropdown-is-active'); }
    	); 
    	$('.cd-dropdown').mouseleave(
            function(){$(this).removeClass('dropdown-is-active'); }
    	); 
    }

	// Shows Mobile Search
    $('#toggle-search').on('click', function(){
        $('.global-search').toggle();
        $(this).find('i').toggleClass('icon-magnifier-fl-1 icon-delete-ln-3');
    });

    // Show accounts menu
    $('#toggle-account').on('click', function(){
        $('.my-account').toggleClass('active');
        $('body').toggleClass('stop-scroll');
    }); 

	//open/close mega-navigation
	$('.cd-dropdown-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	//close meganavigation
	$('.cd-dropdown .cd-close').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	//on mobile - open submenu
	$('.has-children').children('a').on('click', function(event){
		//prevent default clicking on direct children of .has-children 
		var viewportWidth = $(window).width();
		if (viewportWidth < 999) {
			event.preventDefault();
		}
		var selected = $(this);
		selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
	});

	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
	$('.cd-dropdown-content').menuAim({
        activate: function(row) {
        	$(row).children().addClass('is-active').removeClass('fade-out');
        	if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
        	$(row).children().removeClass('is-active');
        	if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
        		$(row).children('ul').addClass('fade-out')
        	}
        },
        exitMenu: function() {
        	$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
        	return true;
        },
        submenuDirection: submenuDirection,
    });

	//submenu items - go back link
	$('.go-back').on('click', function(){
		var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
	}); 

	function toggleNav(){
		var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
		if( !navIsVisible ) {
			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.has-children ul').addClass('is-hidden');
				$('.move-out').removeClass('move-out');
				$('.is-active').removeClass('is-active');
			});	
		}
	}
});

        var script = document.createElement('script');
        script.setAttribute('src', 'js/main.js');
        script.setAttribute('type', 'text/javascript');
        document.getElementsByTagName('head')[0].appendChild(script);

        // Consumptions
        var consumptions = {
            'consumption1' : ['House Special', 100, 88.00, 1, '', ''],
            'consumption2' : ['Fitness Pack', 50, 23.00, 1, 'red', 'list-red'],
            'consumption3' : ['Saturday Special', 50, 200, 1, 'green', 'list-green'],
            'consumption4' : ['Weight Loss Shake', 10, 1.05, 1, '', ''],
            'consumption5' : ['Pure Protein', 10, 1.35, 1, 'white', 'list-white'],
            'consumption6' : ['Health Shake', 10, 1.05, 1, 'darkgreen', 'list-darkgreen'],
            'consumption7' : ['Clear &amp; Refreshing', 10, 1.05, 1, '', ''],
            'consumption8' : ['Shot of Health', 10, 1.05, 1, 'blue', 'list-blue'],
            'consumption9' : ['Chocolate Delight', 10, 1.05, 1, '', ''],
            'consumption10' : ['Strawberry Shortcake', 10, 1.05, 1, 'red', 'list-red'],
            'consumption11' : ['Berry Mix', 10, 1.05, 1, 'white', 'list-white'],
            'consumption12' : ['Crazy Shake', 10, 1.05, 1, '', ''],
            'consumption18' : ['6 Pack', 25, 20.11, 1, 'blue', 'list-blue'],
            'consumption19' : ['12 Pack', 100, 37.15, 1, '', ''],
            'consumption20' : ['24 Pack', 250, 100.25, 1, '', ''],
        };
        
        // First consumption
        var hold = '<div><a class="card consumption" data-animation=fade data-reveal-id=tax-combination><div class="cons-name color"><div class="added-message"><div class="message-holder"><p>Added</p><i class="icon-check-box-ln-1"></i></div></div><div class=title>Non-Taxed Special</div></div><div class=cons-info><div class=cost>$100.00</div><div class=v-points>100VP</div><div class=clear></div></div></a>';
        // Loop through consumptions{} object
        for (var cons in consumptions) {
            hold += '<a class="consumption card '+consumptions[cons][5]+'"><div class="cons-name color '+consumptions[cons][4]+'"><div class="added-message"><div class="message-holder"><p>Added</p><i class="icon-check-box-ln-1"></i></div></div><div class=title>'+consumptions[cons][0]+'</div></div><div class=cons-info><div class=cost>$'+consumptions[cons][1]+'</div><div class=v-points>'+consumptions[cons][2]+'VP</div><div class=clear></div></div></a>'
        }
        // Close holder and add edit consumption
        hold += '<a class="card consumption edit-cons"href=addedit-consumption.html><div class=cons-name><div class=title>Add New Consumption <i class=icon-add-ln-3></i></div></div></a></div>';
        document.getElementById("card-holder").innerHTML = hold;

        // Customer vs Consumption Tabs
        $('#customer-toggle-tab').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('#consumption-tab').hide();
            $('#customer-tab').show();
        });

        $('#consumption-toggle-tab').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('#customer-tab').hide();
            $('#consumption-tab').show();
        });

        // Checkout add customer
        $('#checkoutAddCust').click(function(){
            $('#customer-toggle-tab').siblings().removeClass('active');
            $('#customer-toggle-tab').addClass('active');
            $('#consumption-tab').hide();
            $('#customer-tab').show();
        });

            // mobile version
            $('#mobileCheckoutAddCust').click(function(){
                $('#customer-toggle-tab').siblings().removeClass('active');
                $('#customer-toggle-tab').addClass('active');
                $('#consumption-tab').hide();
                $('#customer-tab').show();

                $('.mobile-footer').show();
                $('#start-section').show();

                $('#consumption-section .container-left').show();
                $('#consumption-section').removeClass('full-height');

                $('.checkout-box').hide();
            });

        // Checkout add consumption
        $('#checkoutAddCons').click(function(){
            $('#consumption-toggle-tab').siblings().removeClass('active');
            $('#consumption-toggle-tab').addClass('active');
            $('#customer-tab').hide();
            $('#consumption-tab').show();
        });

            // mobile version
            $('#mobileCheckoutAddCons').click(function(){
                $('#consumption-toggle-tab').siblings().removeClass('active');
                $('#consumption-toggle-tab').addClass('active');
                $('#customer-tab').hide();
                $('#consumption-tab').show();

                $('.mobile-footer').show();
                $('#start-section').show();

                $('#consumption-section .container-left').show();
                $('#consumption-section').removeClass('full-height');

                $('.checkout-box').hide();
            });


        // Grid view vs list view
        $('#listView').click(function(){
            $(this).removeClass('icon-list-ln-2');
            $(this).addClass('icon-list-fl-2');
            $('#gridView').removeClass('icon-thumbnails-fl-1');
            $('#gridView').addClass('icon-thumbnails-ln-1');

            $('#consumptionList .consumption').removeClass('card');
            $('#consumptionList .consumption').addClass('list');
            //$('.cons-name').removeClass('color');

        });

        $('#gridView').click(function(){
            $(this).removeClass('icon-thumbnails-ln-1');
            $(this).addClass('icon-thumbnails-fl-1');
            $('#listView').removeClass('icon-list-fl-2');
            $('#listView').addClass('icon-list-ln-2');

            $('#consumptionList .consumption').removeClass('list');
            $('#consumptionList .consumption').addClass('card');
            //$('.cons-name').addClass('color');
        });

        // Set consumption to list view on mobile
        if($(window).width() < 940){
            $('.consumption').removeClass('card');
            $('.consumption').addClass('list');
            $('.cons-name').removeClass('color');
        }

        // Show checkout
        $('#consumptionContinue').click(function(){
            $('.mobile-footer').hide();
            $('#start-section').hide();

            $('#consumption-section .container-left').hide();
            $('#consumption-section').addClass('full-height');

            $('.checkout-box').show();
        });

        $('#consumption-return').click(function(){
            $('.mobile-footer').show();
            $('#start-section').show();

            $('#consumption-section .container-left').show();
            $('#consumption-section').removeClass('full-height');

            $('.checkout-box').hide();
        });

        // Consumption vs Full Product Toggle
        $('.toggle-menu li').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('#consumption-toggle').click(function(){
            $(this).siblings().removeClass('active');
            $('#productList').hide();
            $('#consumptionList').fadeIn();

            if($(window).width() > 940){$('.view-select').show();}
        });

        $('#product-toggle').click(function(){
            $(this).siblings().removeClass('active');
            $('#consumptionList').hide();
            $('#productList').fadeIn();
            $('.view-select').hide();
        });

        // Add consumption to checkout side

        var counter = 0;

        $('.consumption').click(function(){
            var name = $(this).find('.title').text();
            var cost = $(this).find('.cost').text();
            var vpoints = $(this).find('.v-points').text();

            counter ++;
            $('#cons-counter').text('('+counter+')');

            var item = '<div class=item><div class="remove-item consRemove"><i class="icon-minus-ln-3"></i></div><div class=name><a href=item-detail.html><div class=title>'+name+'</div></a><p class=note>'+vpoints+'</p></div><div class=quantity>x1</div><div class=price>'+cost+'</div><div class=clear></div></div>';

            $('.selected-cons').append(item);

            $(this).find('.added-message').show().delay('350').fadeOut();
            $('#consPlaceholder').hide();

            $('.consRemove').click(function(){
                 $(this).parent().remove();
            });
        });

        // Add customer to checkout side
        $('.contact').click(function(){
            var name = $(this).find('.contact-name .name').text();
            var cell = '<div class="cell"><div class="cell-info"><div class="remove-item itemRemove"><i class="icon-minus-ln-3"></i></div><div class="checkout-cust-name">'+name+'</div></div><div class="clear"></div></div>'

            $('.mobile-cell').append(cell);
            $('.itemRemove').click(function(){
                $(this).parent().parent().remove();
            });
            $(this).find('.added-message').show().delay('350').fadeOut();
            $('#custPlaceholder').hide();
        });

        // Remove non-taxed consumption
        $('#tax-combination').click(function(){
            $('.selected-cons').children().last().remove();
        });

        //toggle checkout info
        $('.info-toggle-collapse').click(function(){
            $('.info-data').hide();
            $('.info-toggle-collapse').hide();
            $('.info-toggle-expand').show();
            
            $('.selected-cons').removeClass('is-expanded');
            $('.bottom-section').removeClass('is-expanded');
            $('.money').removeClass('is-expanded');
            $('.info').removeClass('is-expanded');
            $('.toggle-holder').removeClass('is-expanded');

            $('.selected-cons').addClass('is-collapsed');
            $('.bottom-section').addClass('is-collapsed');
            $('.money').addClass('is-collapsed');
            $('.info').addClass('is-collapsed');
            $('.toggle-holder').addClass('is-collapsed');
        });

        $('.info-toggle-expand').click(function(){
            $('.info-data').show();
            $('.info-toggle-collapse').show();
            $('.info-toggle-expand').hide();

            $('.selected-cons').removeClass('is-collapsed');
            $('.bottom-section').removeClass('is-collapsed');
            $('.money').removeClass('is-collapsed');
            $('.info').removeClass('is-collapsed');
            $('.toggle-holder').removeClass('is-collapsed');

            $('.selected-cons').addClass('is-expanded');
            $('.bottom-section').addClass('is-expanded');
            $('.money').addClass('is-expanded');
            $('.info').addClass('is-expanded');
            $('.toggle-holder').addClass('is-expanded');
        });

        if($(window).height() < 1080){
            $('.info-data').hide();
            $('.info-toggle-collapse').hide();
            $('.info-toggle-expand').show();

            $('.selected-cons').removeClass('is-expanded');
            $('.bottom-section').removeClass('is-expanded');
            $('.money').removeClass('is-expanded');
            $('.info').removeClass('is-expanded');
            $('.toggle-holder').removeClass('is-expanded');

            $('.selected-cons').addClass('is-collapsed');
            $('.bottom-section').addClass('is-collapsed');
            $('.money').addClass('is-collapsed');
            $('.info').addClass('is-collapsed');
            $('.toggle-holder').addClass('is-collapsed');
        }

        //New Customer
        $('#add-customer-link').click(function() {
            $(this).hide();
            $('#customer-select').hide();
            $('.horz-highlight-menu').hide();
            $('.cust-con-menu').hide();

            $('.add-customer').fadeIn();
            $('#customer-tab, #allCustomers, .chosen-customer').addClass('full-height');
            // if (viewportWidth < 640) {
            //     setTimeout(function() {
            //         $('html,body').animate({ scrollTop: $('.chosen-customer').offset().top - 50 });
            //     }, 500);
            // }
        });

        // New Customer Foreign
        $('#resident-type').on('change', function(){
            $('.us-address').toggle();
            $('.non-us-address').toggle();
        });

        // Country Code Change
        $('#country-select').change(function(){
            var val = $(this).val();
            if(val === "item1"){
                $('#country-code').val('code1');
            } else if(val == "item2"){
                $('#country-code').val('code2');
            } else if(val == "item3"){
                $('#country-code').val('code3');
            }
        });

        // Add Address
        $('.address-toggle').click(function(){
            $(this).parent().hide();
            $('#address-fields').show();
        });

        //New Customer Cancel
        $('.btn-cancel-addnew').click(function() {
            $('.add-customer').hide();

            $('#add-customer-link').show();
            $('#customer-select').show();
            $('.horz-highlight-menu').show();
            $('.cust-con-menu').show();
            $('#customer-tab, #allCustomers, .chosen-customer').removeClass('full-height');

            if (viewportWidth < 640) {
                setTimeout(function() {
                    $('html,body').animate({ scrollTop: $('.chosen-customer').offset().top - 50 });
                }, 500);
            }
        });

        // New Customer Save
        $('.btn-save-addnew').click(function(){
            $('.add-customer').hide();
            $('#add-customer-link').show();
            $('#customer-select').show();
            $('.horz-highlight-menu').show();
            $('.cust-con-menu').show();
            $('#customer-tab, #allCustomers, .chosen-customer').removeClass('full-height');

            //add new customer to checkout
            var firstname = $('#firstname').val();
            var lastname = $('#lastname').val();
            var cell = '<div class="cell"><div class="cell-info"><div class="remove-item itemRemove"><i class="icon-minus-ln-3"></i></div><div class="checkout-cust-name">'+firstname+' '+lastname+'</div></div><div class="clear"></div></div>'

            $('.mobile-cell').append(cell);
            $('.itemRemove').click(function(){
                $(this).parent().parent().remove();
            });
            $(this).find('.added-message').show().delay('350').fadeOut();
            $('#custPlaceholder').hide();
        });

        $('.btn-cancel-add').click(function() {
            $('.address-verified').siblings().hide();
            $('.address-verified').fadeIn();
            if (viewportWidth < 640) {
                setTimeout(function() {
                    $('html,body').animate({ scrollTop: $('.chosen-customer').offset().top - 50 });
                }, 500); // ensure the collapse animation is done
            }
        });

        $('.btn-cancel-edit').click(function() {
            $('.address-verified').siblings().hide();
            $('.address-verified').fadeIn();
            if (viewportWidth < 640) {
                setTimeout(function() {
                    $('html,body').animate({ scrollTop: $('.chosen-customer').offset().top - 50 });
                }, 500); // ensure the collapse animation is done
            }
        });

        $('.btn-save').click(function() { 
            $('.address-verified').siblings().hide();
            $('.address-verified').fadeIn();
            if (viewportWidth < 640) {
                setTimeout(function() {
                    $('html,body').animate({ scrollTop: $('.chosen-customer').offset().top - 50 });
                }, 500); // ensure the collapse animation is done
            }
        });

        $('.toggle-menu li').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('.horz-highlight-menu li').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('#customer-toggle').click(function(){
            $('#waitList').hide();
            $('#allCustomers').fadeIn();
        });

        $('#waitlist-toggle').click(function(){
            $('#allCustomers').hide();
            $('#waitList').fadeIn();
        });