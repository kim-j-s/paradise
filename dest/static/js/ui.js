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
			console.log(radio);
			$('.radioTabContent').removeClass('on');
			$('.radioTabContent').eq(radio).addClass('on');
		});
	});
});

// 인풋박스 초기화
$(function(){
	//cosole.log('x');
	$('.inpReset').click(function(){
		$(this).prev('.inp').val('');
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

	$('.calendarDate > li').each(function(Calendar){
		$(this).click(function(){
			if ( !$(this).parent('.calendarDate').hasClass('single') )
			{
				// 예약 불가능 날짜 선택
				if ( $(this).hasClass('noDate') || $(this).hasClass('noDateEx') || $(this).hasClass('blinkDate') )
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
		
	});

	// 달력 초기화 버튼 - 전체
	$('.calendarAllReset').click(function(){
		$(CalendarDate).removeClass('first last range noDateEx');
		$('.datepickArrive').removeClass('dateFoucs');
		$('.datepickStart').addClass('dateFoucs');
		CalendarResetCnt = 0;
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
		console.log('x');
		console.log(f);
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
		if ( !$(this).hasClass('on') )
		{
			$(this).addClass('on');
			$(this).next('.slideDept2').slideUp(200);
		} else {
			$(this).removeClass('on');
			$(this).next('.slideDept2').slideDown(200);
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