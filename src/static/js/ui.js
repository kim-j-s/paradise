$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	
	selectMake();
	selectMakeUI();

	//datepicker
	if($('.datepicker').size() > 0){
		$( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전 달',
			nextText: '다음 달',
			currentText: '오늘',			
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			changeMonth: true,
      		changeYear: true,
      		yearSuffix: '년',
			showOn: 'button',
			buttonText: '기간조회'
		});
	}

	//swiper
	if($('.swiper').size() != 0){
		 $('.swiper').slick({
		  dots: true,
		  arrows:true,
		  roof:false,
		  infinite: false,
		  speed: 1300
		});
	}

	if($('.loding-act').size() > 0){
		//http://kottenator.github.io/jquery-circle-progress/
		var lodingActVal = parseInt($('.loding-act .loding-txt span').text());
		$('.loding-act').circleProgress({
		  value: lodingActVal/100, //변수값
		  startAngle:-Math.PI / 2, //스타트 지점설정
		  fill : { color:"red"}, //색상값
		  emptyFill:'silver', //뒷 색상값
		  size:120 // 전체 사이즈 
		}).on('circle-animation-progress', function(event, progress) {
		  $(this).find('.loding-txt').html('진도율 <br /><span>' + parseInt(lodingActVal * progress) + '%</span>');
		});
	}
	
	/* ==============================
	 * gnb 
	 * ============================== */


	/* ==============================
	 * main 
	 * ============================== */


	/* ==============================
	 * content 
	 * ============================== */
	 
});

/* parallax scrolling motion */
scrollAnimation();
function scrollAnimation(){
	$(window).load(function(){
		var $elements = $( '*[data-animation]' );
		var h = $(window).height()
		$elements.each( function( i, el ) {
			var $el = $( el ),
			    animationClass = $el.data('animation'),
			    $delay = $el.data('delay'),
			    $duration = $el.data('duration');
			
			if($delay>0){
				$el.css({
					'-webkit-animation-delay':$delay+'s',
					'animation-delay':$delay+'s'
				})
			}
			if($duration>0){
				$el.css({
					'-webkit-animation-duration':$duration+'s',
					'animation-duration':$duration+'s'
				})
			}

			var t = $el.offset().top;
			if(t > h){
				$el.addClass('wait-animation');
			}
			$el.addClass('animated '+animationClass);

			$el.waypoint(function(){
				$el.removeClass('wait-animation');
			}, { offset: '100%', triggerOnce: true });
		});
	});
}


/* form select */
function selectMake(){
	$("select.selectBox").each(function(){
		if($(this).parents('pre').length < 1){
			var classes = $(this).attr("class"),
				id      = $(this).attr("id"),
				name    = $(this).attr("name");
				style	= $(this).attr('style');
				
			if($(this).is(':visible')){
				var template  = '<div class="' + classes + '" style="' +  style + '">';
					template += '<a href="#" class="ui-select-trigger">' + $(this).find(':selected').text() + '</a>';
					template += '<ul class="ui-select-options">';
					$(this).find("option").each(function(){
						template += '<li><a href="#" class="ui-select-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</a></li>';
					});
					template += '</ul></div>';
			  
				$(this).wrap('<div class="ui-select-wrapper"></div>');
				$(this).hide().after(template);
			}
		}
	});
}


function selectMakeUI(){
	$(document).on("hover",".ui-select-option:first-of-type",function(){
	  $(this).closest(".ui-select-options").addClass("ui-select-option-hover");
	}, function(){
	  $(this).closest(".ui-select-options").removeClass("ui-select-option-hover");
	});
	$(document).on("click",".ui-select-trigger", function(e){
		$('.ui-select-options').not($(this).next()).hide();
		$(this).next().show();
		return false;
	});
	$(document).click(function(e){
		$('.ui-select-options').hide();
	});
	$(document).on("click",".ui-select-option", function(e){
	  var $val= $(this).data("value"),
		  $select = $(this).closest(".ui-select-wrapper").find("select");
	  
	  $select.val($val);
	  $(this).addClass("selection").parent().siblings().find(".ui-select-option").removeClass("selection");
	  $(this).closest('.ui-select-options').hide().siblings(".ui-select-trigger").text($(this).text());;
	  return false;
	});
}


// 탭
$(function(){
	var tabList = $('.tabList > li').children('.tit');
	$(tabList).each(function(tab){
		$(this).click(function(){
			$(tabList).removeClass('on');
			$(this).addClass('on');
			$('.tabWrap').children('.tabContent').removeClass('on');
			$('.tabWrap').children('.tabContent').eq(tab).addClass('on');
		});
	});

	var subTabList = $('.tabSubList');
	$(subTabList).each(function(idx){
		$(this).children('li').children('.tit').each(function(cnt){
			$(this).click(function(){
				$(subTabList).eq(idx).children('li').children('.tit').removeClass('on');
				$(this).addClass('on');
				$(subTabList).eq(idx).parent('.tabSubListWrap').children('.tabSubContent').removeClass('on');
				$(subTabList).eq(idx).parent('.tabSubListWrap').children('.tabSubContent').eq(cnt).addClass('on');
			});
		});
	});

});


// input type date placeholder
$(function(){
	$('.placeholder').each(function() {
		var el = this, type = $(el).attr('type');
		if ($(el).val() == '') $(el).attr('type', 'text');
		$(el).focus(function() {
			$(el).attr('type', type);
			el.click();
		});
		$(el).blur(function() {
			if ($(el).val() == '') $(el).attr('type', 'text');
		});
	});
});

// 아이디찾기 탭 전환
$(function(){
	$('.radioTab > .radioBox').each(function(radio){
		$(this).click(function(){
			$('.radioTabContent').removeClass('on');
			$('.radioTabContent').eq(radio).addClass('on');
		});
	});
});

// 상품 갤러리
$(function(){
	$('.itemListWrap').bxSlider({
		//auto: true,
		slideWidth: 2500,
		minSlides: 1.2,
		maxSlides: 3,
		slideMargin: 12,
		moveSlides: 1,
		pager: false,
		controls: false
	});
});

// 달력
$(function(){
	var CalendarDate = $('.calendarDate > li');
	var lng = $('.calendarDate > li').length;
	var CalendarFirst = 0;
	var CalendarLast = 0;
	var CalendarResetCnt = 0;
	var addDayChk = 0;

	$('.calendarDate > li').each(function(Calendar){
		if ( $(this).parent('.calendarDate').hasClass('eventCalendar') )
		{
			if ( $('.calendarDate').hasClass('eventCalendar') )
			{
				$('.calendarDate > li').each(function(){
					$(this).addClass('noEventDay eventDayChk');
					if ( $(this).hasClass('blinkDate') || $(this).hasClass('eventDay') )
					{
						$(this).removeClass('noEventDay');
					}
					if ( $(this).hasClass('blinkDate') )
					{
						$(this).removeClass('eventDayChk');
					}
				});
			}			

		} else {
			$(this).click(function(){
				if ( !$(this).parent('.calendarDate').hasClass('single') )
				{
					// 예약 불가능 날짜 선택
					if ( $(this).hasClass('noDate') || $(this).hasClass('noDateEx') || $(this).hasClass('blinkDate') || $(this).hasClass('noEventDay'))
					{
						return false;
					}

					// 예약 범위 설정
					if ( $(CalendarDate).hasClass('first') &&  CalendarResetCnt == 0)
					{
						$(CalendarDate).removeClass('range last');
						$(this).addClass('last');
						CalendarLast = Calendar;
						calendarRange(CalendarFirst, CalendarLast);
					} else {
						if (CalendarResetCnt == 1)
						{
							$(CalendarDate).removeClass('first last range');
							$(this).addClass('first');
							calendarReset(Calendar);
							CalendarResetCnt = 0;
						} else {
							$(this).addClass('first');
							calendarReset(Calendar);
						}
					} 
				} else if ( $(this).parent('.calendarDate').hasClass('single') )
				{
					// 예약 불가능 날짜 선택
					if ( $(this).hasClass('noDate') || $(this).hasClass('noDateEx') || $(this).hasClass('blinkDate') )
					{
						return false;
					}
					$(CalendarDate).removeClass('first');
					$(this).addClass('first');
				}

			});
		}
		
	});

	$('.eventDayChk').each(function(i){
		$(this).on('click', function(){
			if ( $(this).hasClass('noDate') || $(this).hasClass('noDateEx') || $(this).hasClass('blinkDate') || $(this).hasClass('noEventDay'))
			{
				return false;
			}

			var eventClassChk = $(this).attr('class').split(' ')[1];
			console.log(eventClassChk);
			var eventClassChkLng = $("."+eventClassChk).length;
			var eventClassidx = $("."+eventClassChk).index();

			//console.log(eventClassidx);		

			if ( addDayChk == 0 )
			{
				// 이벤트 시작 시 클릭 가능 한 범위 리셋 기능
				$('.eventDayChk').addClass('noEventDay');
				$(CalendarDate).each(function(){
					if ( $(this).hasClass(eventClassChk) )
					{
						$(this).removeClass('noEventDay');
					}
				});

				thisIndex = $("."+eventClassChk).index(this);
				var EventExDay = eventClassChkLng - thisIndex;
				$('.eventDayChk').eq(i + EventExDay).removeClass('noEventDay').addClass(eventClassChk + ' addDay');

				console.log(i + ' , ' + thisIndex + ' , ' + EventExDay);

				if ( $('.eventDayChk').hasClass('first') &&  CalendarResetCnt == 0)
				{
					$('.eventDayChk').removeClass('range last');
					$(this).addClass('last');
					CalendarLast = i;
					calendarRangeEx(CalendarFirst, CalendarLast);
					console.log('동작체크 11 ' + i);
				} else {
					if (CalendarResetCnt == 1)
					{
						$('.eventDayChk').removeClass('first last range');
						$(this).addClass('first');
						calendarResetEx(i);
						CalendarResetCnt = 0;
						console.log('동작체크 21');
					} else {
						$(this).addClass('first');
						calendarResetEx(i);
						console.log('동작체크 31 ' + i);
					}
				}
				addDayChk++;
			} else if ( addDayChk != 0)
			{
				if ( $('.eventDayChk').hasClass('first') &&  CalendarResetCnt == 0)
				{
					$('.eventDayChk').removeClass('range last');
					$(this).addClass('last');
					CalendarLast = i;
					calendarRangeEx(CalendarFirst, CalendarLast);
					console.log('동작체크 1 ' + i);
				} else {
					if (CalendarResetCnt == 1)
					{
						$('.eventDayChk').removeClass('first last range');
						$(this).addClass('first');
						calendarResetEx(i);
						CalendarResetCnt = 0;
						console.log('동작체크 2');
					} else {
						$(this).addClass('first');
						calendarResetEx(i);
						console.log('동작체크 3 ' + i);
					}
				}
			}

		});
	});

	// 달력 이벤트 예약
	function calendarResetEx(i) {
		CalendarFirst = i;
		for (var max = 0 ; max < i; max++)
		{
			console.log(max);
			$('.eventDayChk').eq(max).addClass('noEventDay');
		}
		$('.datepickStart').removeClass('dateFoucs');
		$('.datepickArrive').addClass('dateFoucs');
		$('.calendarDate').children('.first').removeClass('fix');
		$('.calendarDate').children('.last').removeClass('fix');
	}

	// 달력 이벤트 값
	function calendarRangeEx(f, l) {
		for (var i = f + 1; i < l; i++ )
		{
			$('.eventDayChk').eq(i).addClass('range');
		}
		$('.calendarDate').children('.first').addClass('fix');
		$('.calendarDate').children('.last').addClass('fix');
	}


	// 달력 초기화 버튼 - 전체
	$('.calendarAllReset').click(function(){
		$(CalendarDate).removeClass('first last range noDateEx');
		$('.datepickArrive').removeClass('dateFoucs');
		$('.datepickStart').addClass('dateFoucs');
		CalendarResetCnt = 0;
		addDayChk = 0;

		$(CalendarDate).each(function(){
			if ( $(this).hasClass('eventDay') )
			{
				$(this).removeClass('noEventDay');
			}
			if ( $(this).hasClass('eventDayEx'))
			{
				$(this).addClass('noEventDay').removeClass('eventDayEx');
			}
			if ( $(this).hasClass('addDay'))
			{
				$(this).addClass('noEventDay');
			}
		});

		$('.eventCalendar').find('.addDay').removeClass().addClass('noEventDay eventDayChk');
		
	});

	// 달력 초기화 - 가는날
	$('.datepickStart').click(function(){
		$(CalendarDate).removeClass('noDateEx');
		$('.datepickArrive').removeClass('dateFoucs');
		$('.datepickStart').addClass('dateFoucs');
		CalendarResetCnt = 1;
	});

	// 달력 선택 불가능 영역 설정
	function calendarNoDate(f) {
		for (var i = 0; f > i; i++ )
		{
			$(CalendarDate).eq(i).addClass('noDateEx');
		}
	}

	// 달력 범위 클래스 추가
	function calendarRange(f, l) {
		for (var i = f + 1; i < l; i++ )
		{
			$(CalendarDate).eq(i).addClass('range');
		}
		$('.calendarDate').children('.first').addClass('fix');
		$('.calendarDate').children('.last').addClass('fix');
	}

	// 달력 리셋
	function calendarReset(Calendar) {
		CalendarFirst = Calendar;
		calendarNoDate(CalendarFirst);
		$('.datepickStart').removeClass('dateFoucs');
		$('.datepickArrive').addClass('dateFoucs');
		$('.calendarDate').children('.first').removeClass('fix');
		$('.calendarDate').children('.last').removeClass('fix');
	}

	

});

// 카운트
$(function(){
	$('.countMinus').click(function(){
		countMinus = $(this).prev('.count').html();
		countMinus--;
		if (countMinus < 0)
		{
			countMinus = 0;
			$(this).prev('.count').html(countMinus);;
		} else {
			$(this).prev('.count').html(countMinus);;
		}
	});

	$('.countPlus').click(function(){
		countPlus = $(this).parent('.countWrap').find('.count').html();
		countPlus++;
		$(this).parent('.countWrap').find('.count').html(countPlus);;
	});
});


// 결제 리스트 
$(function(){
	$('.slideList > .slideDept1').click(function(){
		if ( $(this).parent('li').parent('ul').hasClass('display') )
		{
			return false;
		} else {
			if ( !$(this).hasClass('on') )
			{
				$(this).addClass('on');
				$(this).parent('li').addClass('brd');
				$(this).next('.slideDept2').slideUp(200);
			} else {
				$(this).removeClass('on');
				$(this).parent('li').removeClass('brd');
				$(this).next('.slideDept2').slideDown(200);
			}
		}
	});
});

// 티켓 클릭 이벤트
$(function(){
	var updating = false;
	$('.ticketList > li').click(function() {
		if ( !updating ) {
			var inputID = $(this).find("label").attr("for");
			updating = true;
			$('#' + inputID).click();
			updating = false;
		}
	});
});

/* 침대 객실 */
$(function(){
	var swiper = new Swiper('.roomGallery', {
		slidesPerView: 'auto',
		spaceBetween: 8,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
	});
});

/* 카드 갤러리 기본 */
$(function(){
	var cardLength = $('.mypageGallery').find('.swiper-slide').length;

	if (cardLength == 1)
	{
		$('.mypageGallery').addClass('single');
	} else if (cardLength != 1)
	{
		var swiper = new Swiper('.mypageGallery', {
			slidesPerView: 'auto',
			spaceBetween: 12,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}
});

// 카드 갤러리 - 맴버십
$(function(){
	var Memberswiper = new Swiper('.cardGallery.membership', {
		slidesPerView: 'auto',
		spaceBetween: 12,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	});

	Memberswiper.on('slideChangeTransitionEnd', function () {
	  	var idx = $('.swiper-pagination-bullet-active').index();
	  	$('.membershipCardInfo .signatureCardInfo').eq(idx).addClass('on').siblings().removeClass('on');
	});
});


/* 구매 상품 목록 */
$(function(){
	$('.purchaseListTitle').click(function(){
		if ( !$(this).hasClass('on'))
		{
			$(this).addClass('on');
			$(this).next('.purchaseDetail').slideDown(200);
		} else if ($(this).hasClass('on'))
		{
			$(this).removeClass('on');
			$(this).next('.purchaseDetail').slideUp(200);
		}
	});
});

// 서브뎁스 슬라이드
$(window).scroll(function(){
	var htmlScroll = $('html, body').scrollTop();
	var floatingTab = $('.floatingTab').length;
	if ( htmlScroll > 60)
	{
		$('.headerFixed').addClass('fixed');
	} else if (htmlScroll < 60 )
	{
		$('.headerFixed').removeClass('fixed');
	}

	if (floatingTab == 1)
	{
		if ( htmlScroll > 60)
		{
			$('.floatingTab').addClass('on');
			$('.floatingTab').parent('.tabWrap').css('padding-top','41px');
		} else if (htmlScroll < 60 )
		{
			$('.floatingTab').removeClass('on');
			$('.floatingTab').parent('.tabWrap').css('padding-top','0');
		}
	}
});

// sub Header 메뉴
var subHeaderCall = $('.headerFixed > .now');
$(subHeaderCall).click(function(){
	if ( $(this).hasClass('on'))
	{
		var targetTxt = $(this).next('ul').find('.on').html();
		$(this).removeClass('on');
		$(this).next('ul').slideUp(200);
		$(this).html(targetTxt);
	} else if (!$(this).hasClass('on'))
	{
		$(this).html('');
		$(this).addClass('on');
		$(this).next('ul').slideDown(200);
	}
});


// sub Header 메뉴
$(function(){
	var subHeaderCall = $('.headerFixed > .now');
	$(subHeaderCall).click(function(){
		if ( $(this).hasClass('on'))
		{
			var targetTxt = $(this).next('ul').find('.on').html();
			$(this).removeClass('on');
			$(this).next('ul').slideUp(200);
			$(this).html(targetTxt);
		} else if (!$(this).hasClass('on'))
		{
			$(this).html('');
			$(this).addClass('on');
			$(this).next('ul').slideDown(200);
		}
	});
});

/* faq */
$(function(){
	var faqList = $('.faqWrap > .faqList')
	$(faqList).each(function(faq){
		$(this).click(function(){
			if ( $(this).hasClass('on') )
			{
				$(faqList).removeClass('on');
				$(faqList).find('.answer').slideUp(200, function(){
					$(faqList).eq(faq).removeClass('brd');
				});
			} else {
				$(faqList).removeClass('on');
				$(faqList).find('.answer').slideUp(200, function(){
					$(faqList).removeClass('brd');
				});

				$(this).addClass('on');
				$(this).find('.answer').slideDown(200, function(){
					$(faqList).eq(faq).addClass('brd');
				});
			}

		});
	});
});


/* mypage */
/* barcode */
$(function(){
	$('.btnBarcode').click(function(){
		$('body').css('height','auto');
		var windHeight = $('body').height();
		$('.dimmedLayer').css({'display':'block', 'height':windHeight});
	});

	$('.dimmedCont > .layerCloseBtn').click(function(){
		$('body').css('height','100%');
		$('.dimmedLayer').css('display','none');
	});

	$(window).load(function(){
		if ( $('.dimmedLayer').css('display') == 'block' )
		{
			console.log('z');
			$('body').css('height','auto');
			var windHeight = $('body').height();
			$('.dimmedLayer').css({'display':'block', 'height':windHeight});
		}
	});

});


/* graph gauge */
$(function(){
	$('.tabWrap.membership > .tabList').children('li').eq(3).click(function(){
		var GraphVal1 = $('.pointGraph').find('.pointColor').html();
		var GraphVal2 = $('.pointGraph').find('.next').html();
		var GraphVal1num = GraphVal1.replace(/,/g, '');
		var GraphVal2num = GraphVal2.replace(/,/g, '');
		var MovingVal = GraphVal1num / GraphVal2num * 100;
		$('.pointGraphBar > .bar').animate({
			width:Math.floor(MovingVal) + '%'
		},1000);
	});
});


/* coupon */
$(function(){
	$(window).load(function(){
		$('.couponList > li').each(function(){
			outerBubbleH = $(this).outerHeight();
			BubbleH = (outerBubbleH - 30) / 13;
			Bubble_Val = Math.floor(BubbleH) * 13;
			$(this).find('.bubble').height(Bubble_Val);
			$(this).find('.bubble').css({'height':Bubble_Val, 'margin-top':-(Bubble_Val / 2)});
		});
	});
});

/* 이용문의 슬라이드 */
$(function(){
	slideTime = 300;
	var inquiryList = $('.inquiryList > .inquiryItem');
	$(inquiryList).click(function(idx){
		var idx = $(inquiryList).index(this);
		if ( $(this).hasClass('open') )
		{
			$('.inquiryItem').eq(idx).find('.txt').slideUp(slideTime);
			$('.inquiryItem').eq(idx).find('.answer').slideUp(slideTime, function(){
				$('.inquiryItem').eq(idx).find('.inquiryItemTitle').addClass('on');
				$(inquiryList).eq(idx).removeClass('on open none');
			});
			
		} else {
			$('.inquiryItem').not(this).find('.txt').slideUp(slideTime);
			$('.inquiryItem').not(this).find('.answer').slideUp(slideTime);
			$('.inquiryItem').not(this).find('.txt').slideUp(slideTime);
			$('.inquiryItem').not(this).find('.answer').slideUp(slideTime, function(){
				$('.inquiryItem').not(this).find('.inquiryItemTitle').addClass('on');
				$(inquiryList).not(this).removeClass('on open none');
			});
			$('.inquiryItem').eq(idx).find('.txt').slideDown(slideTime);
			$('.inquiryItem').eq(idx).find('.answer').slideDown(slideTime, function(){
				$('.inquiryItem').eq(idx).find('.inquiryItemTitle').removeClass('on');
				$(inquiryList).eq(idx).addClass('on open none');
			});
		}
	});
});

/* fine swiper */
$(function(){
	
	var nBannerLng = $('.normalSwiper').find('.item').length;
	if ( nBannerLng == 1)
	{
		return false;
	} else {
		$('.normalSwiper').bxSlider({
			controls: false,
			pager: true
		});
	}
});

/* 스테이션 소개 */
$(function(){
	$(window).load(function(){
		var stationLng = $('.stationCont').length;
		$('.stationGallery').find('.all').html(stationLng);
	});
	var stationswiper = new Swiper('.station', {
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
		},		
	});
	stationswiper.on('slideChangeTransitionEnd', function () {
	  	var idx = $('.swiper-pagination-bullet-active').index();
		$('.counter').find('.now').html(idx + 1);
	});
});

/* fine */
$(function(){
	var FineLength = $('.fineEventGallery').find('.swiper-slide').length;

	if (FineLength == 1)
	{
		$('.fineEventGallery').parent('.fineEvent').addClass('single');
	} else if (FineLength != 1)
	{
		var Fineswiper = new Swiper('.fineEventGallery', {
			slidesPerView: 'auto',
			spaceBetween: 12,
		});
	}
});

// 스테이션 소개
$(function(){
	var artContLng = $('.artCont').length;
	$('.artGalleryWrap').find('.all').html(artContLng);
	var artswiper = new Swiper('.artGallery', {
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
		},		
	});
	artswiper.on('slideChangeTransitionEnd', function () {
	  	var idx = $('.swiper-pagination-bullet-active').index();
		$('.artGalleryWrap').find('.now').html(idx + 1);
	});
});


// input reset
$(function(){
	// 리셋버튼
	$('.inpReset').click(function(){
		$(this).prev('.inp').val('');
		$(this).hide();
	});

	// 인풋박스 초기화
	var InpObj = $('input:text, input:password');
	$(InpObj).on('keyup', function(e) {
		if($(this).val().length >= 1) {
			$(this).next('button').css('display','block');
		}
		if ( $(this).val().length == 0 )
		{
			$(this).next('button').css('display','none');
		}
	});
});

// input type date placeholder
$(function(){
	var InpDate = $('input[type=date]');
	$(InpDate).on('change', function(e) {
		if($(this).val()) {
			$(this).prev('label').css('display','none');
		}
		if ( !$(this).val() )
		{
			$(this).prev('label').css('display','block');
		}
	});
});


/* floating button */
$(function(){
	//$('#wrap').scroll(function(){
	$(window).scroll(function(){
		var Top = $(window).scrollTop();		
		FloationEvent(Top);
	});

	$(window).resize(function(){
		FloationEvent();
	});

	function FloationEvent(Top) {
		var WinHeight = $(window).height();
		var FloatingBtn = $('.floating').length;
		var containerHeight = $('#container').height();
		var FooterHeight = $('#footerWrap').height();

		$('.dp').html(Top);

		if (FloatingBtn >= 1)
		{
			if ( (containerHeight - Top) > (WinHeight - 110) )
			{
				$('.floating').css('position','fixed');
			} else {
				$('.floating').css('position','static');
			}
		}		
	}
});

// 맴버십 슬라이드
$(function(){
	var dlSlide = $('.dlSlide > .title');
	$(dlSlide).click(function(){
		if ( $(this).next('dd').css('display') == 'block' )
		{
			$(dlSlide).removeClass('on').next('dd').slideUp(300);
		} else {
			$(this).siblings().removeClass('on').next('dd').slideUp(300);
			$(this).addClass('on').next('dd').slideDown(300);
		}
	});
});

// 예약 투숙
$(function(){
	var singleSlide = $('.singleSlide > .title');
	$(singleSlide).click(function(){
		if ( $(this).next('.content').css('display') == 'block')
		{
			$(this).find('.text').removeClass('on');
			$(this).next('.content').slideUp(300);
		} else {
			$(this).find('.text').addClass('on');
			$(this).next('.content').slideDown(300);
		}
	});
});

// 카지노 - 이용방법
$(function(){
	$('.casinoList.step > li').click(function(){
		if ( $(this).children('.desc').css('display') == 'block')
		{
			$(this).removeClass('on');
			$(this).children('.desc').slideUp(300);
		} else {
			$(this).addClass('on');
			$(this).children('.desc').slideDown(300);
		}
	});
});

// floor
$(function(){
	var floorSwipeLng = $('.floorSwipe').find('.item').length;
	floorSwipeLng = floorSwipeLng - 2;
	for (var i = 0 ;i < floorSwipeLng ; i++)
	{
		$('.floorSwipe').find('.bx-pager-item').eq(i).children('a').html((i + 1) +'F');
	}
});

// multi Swipe
$(function(){

	// Type1
	$(window).load(function(){
		$('.swipeType1').each(function(h){
			var swType1H = $(this).find('.Type1').height();
			var swType1Lng = $(this).find('.swiper-slide').length;
			$(this).find('.swiper-slide').height(swType1H);	
			$(this).find('.all').html(swType1Lng);
		});
	});

	var sliders = [];
	$('.Type1').each(function(index, element){

		$(this).addClass('s'+index);
		var slider = new Swiper('.s'+index, {
			slidesPerView: 'auto',
			spaceBetween: 8,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
			onSlideChangeEnd:function(swipe){
				console.log(geSlideDataIndex(swipe))
			},
		});
		sliders.push(slider);
	});

	$('.swipeType1').each(function(swipeType1){
		$(this).find('.swiper-pagination-current').on('DOMSubtreeModified', function(){
			PagerNum = $(this).html();
			$('.swipeType1').eq(swipeType1).find('.now').html(PagerNum);
		});
	});

	// Type2
	$(window).load(function(){
		$('.swipeType2').each(function(h){
			var Bullet = "<span class='bullet'></span>";
			var BulletMark = "<span></span>";
			var swType2Lng = $(this).find('.swiper-slide').length;
			$(this).find('.all').html(swType2Lng);
			$(this).find('.swiper-pagination').after(Bullet);
			for ( var i = 0; i <  swType2Lng; i++ )
			{
				$(this).find('.bullet').append(BulletMark);
			}
			$(this).find('.bullet').children('span').eq(0).addClass('on');
		});
	});

	var sliders2 = [];
	$('.Type2').each(function(index, element){

		$(this).addClass('s2'+index);
		var slider2 = new Swiper('.s2'+index, {
			slidesPerView: 'auto',
			spaceBetween: 8,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
		});
		sliders2.push(slider2);
	});

	$('.swipeType2').each(function(swipeType2){
		$(this).find('.swiper-pagination-current').on('DOMSubtreeModified', function(){
			PagerNum2 = $(this).html();
			$('.swipeType2').eq(swipeType2).find('.now').html(PagerNum2);
			$('.swipeType2').eq(swipeType2).find('.bullet').children('span').removeClass('on');
			$('.swipeType2').eq(swipeType2).find('.bullet').children('span').eq(PagerNum2 - 1).addClass('on');
		});
	});

});

//jackpot
$(function(){
	$('.amount').prop('Counter',0).animate({
		Counter: $('.amount').text()
	}, {
		duration: 3000,
		easing: 'linear',
		step: function (now) {
			$('.amount').text(commaSeparateNumber(Math.floor(now)));
		}
	});

	function commaSeparateNumber(x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});


// membership select
$(function(){
	$('.cardSelect > li').each(function(idx){
		$(this).click(function(){
			if ( !$(this).find('.ele').hasClass('on') )
			{
				$(this).children('.ele').addClass('on');
				$(this).find('label', $(this)).trigger('click');
			} else if ( $(this).find('.ele').hasClass('on') )
			{
				$(this).children('.ele').removeClass('on');
				$(this).find('label', $(this)).trigger('click');
			}
		});
		$(this).find('label').on('click', function(e) {
			e.stopPropagation();
		});
	});
});