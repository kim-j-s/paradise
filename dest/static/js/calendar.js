// 달력
$(function(){
	var CalendarDate = $('.calendarDate > li');
	var lng = $('.calendarDate > li').length;
	var CalendarFirst = 0;
	var CalendarLast = 0;
	var CalendarResetCnt = 0;
	var addDayChk = 0;

	console.log('전체 길이 : ' + lng);

	var cnt = 0;
	$('#layerContent').scroll(function(){
		var xx = $('#layerContent').scrollTop();
		if (cnt < 3)
		{
			cnt++;
			console.log('dd' + cnt);			
			if ( xx < 150)
			{
				$.ajax({ type: "GET",   
					url: "month" + cnt +".html",   
					async: false,
					success : function(text)
					{
						response= text;
						console.log('페이지 호출' + cnt);
					}
				});
				$(response).insertBefore('.calendarAllReset');
				CalendarDayResetetc();
				//CalendarClickEvent();
			}
		}
	});

	// 달력 날짜 초기화
	CalendarDayReset();

	// 달력 클릭 이벤트
	CalendarClickEvent();

	// 달력 날짜 초기화
	function CalendarDayResetetc() {
		var lng = $('.calendarDate > li').length;
		console.log('스크롤시 길이 값 : ' + lng);
		if ( $('.eventDayChk').hasClass('first') ) {
			console.log('있음');
			var eventClassChk = $('.first').attr('class').split(' ')[1];
			console.log('예외처리 이벤트 클래스 : ' + eventClassChk);

			$('.calendarDate > li').each(function(Calendar){
				if ( !$(this).hasClass(eventClassChk) && !$(this).hasClass('noEventDay') && !$(this).hasClass('blinkDate') )
				{
					$(this).addClass('noEventDay eventDayChk');
				}
			});
			CalendarClickEvent();

		} else {
			CalendarDayReset();
			CalendarClickEvent();
		}
	}	

	// 달력 클릭 이벤트
	function CalendarClickEvent() {
		$('.eventDayChk').each(function(i){
			$(this).off().on('click', function(){

				console.log('클릭 이벤트');
				
				if ( $(this).hasClass('noDate') || $(this).hasClass('noDateEx') || $(this).hasClass('blinkDate') || $(this).hasClass('noEventDay'))
				{
					return false;
				}

				var eventClassChk = $(this).attr('class').split(' ')[1];
				var eventClassChkLng = $("."+eventClassChk).length;
				var eventClassidx = $("."+eventClassChk).index();

				console.log('그룹 클래스명 : ' + eventClassChk);
				console.log('이벤트 그룹의 날짜 길이 : ' + eventClassChkLng);

				var cccc = $(this).index();
				console.log('선택된 날짜의 인덱스 : ' + cccc + ' , ' + i);

				if ( addDayChk == 0 )
				{
					// 이벤트 시작 시 클릭 가능 한 범위 리셋 기능
					// 선택된 이벤트 그룹 ex : eventDay1 을 제외한 나머지 비활성화
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

					console.log('이벤트 그룹 명 : ' + thisIndex + ' , ' + EventExDay);


					if ( $('.eventDayChk').hasClass('first') && CalendarResetCnt == 0)
					{
						$('.eventDayChk').removeClass('range last');
						$(this).addClass('last');
						CalendarLast = i;
						calendarRangeEx(CalendarFirst, CalendarLast);
					} else {
						if (CalendarResetCnt == 1)
						{
							$('.eventDayChk').removeClass('first last range');
							$(this).addClass('first');
							calendarResetEx(i);
							CalendarResetCnt = 0;
						} else {
							$(this).addClass('first');
							calendarResetEx(i);
							console.log(i);
							$('.'+eventClassChk).addClass('noEventDay');
							for ( z = i ; z < i + 10 ; z++)
							{
								if ( $('.eventDayChk').eq(z).hasClass(eventClassChk))
								{
									$('.eventDayChk').eq(z).removeClass('noEventDay');
								}
							}
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
					} else {
						if (CalendarResetCnt == 1)
						{
							$('.eventDayChk').removeClass('first last range');
							$(this).addClass('first');
							calendarResetEx(i);
							CalendarResetCnt = 0;
						} else {
							$(this).addClass('first');
							calendarResetEx(i);
						}
					}
				}

			});
		});
	}

	// 달력 날짜 초기화
	function CalendarDayReset() {
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
	}

	// 달력 이벤트 예약
	function calendarResetEx(i) {
		CalendarFirst = i;
		for (var max = 0 ; max < i; max++)
		{
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

	// 달력 선택 불가능 영역 설정
	function calendarNoDate(f) {
		for (var i = 0; f > i; i++ )
		{
			$(CalendarDate).eq(i).addClass('noDateEx');
		}
	}

	// 달력 초기화 버튼 - 전체
	$('.calendarAllReset').click(function(){
		calendarAllReset();
		console.log('전체 길이 리셋 : ' + lng);
	});

	function calendarAllReset() {
		var CalendarDate = $('.calendarDate > li');
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
	}

	// 달력 초기화 - 가는날
	/*
	$('.datepickStart').click(function(){
		$(CalendarDate).removeClass('noDateEx');
		$('.datepickArrive').removeClass('dateFoucs');
		$('.datepickStart').addClass('dateFoucs');

		//var eventClassChk = $(this).attr('class').split(' ')[1];

		$('.eventDay').removeClass('noEventDay');
		$('.addDay').removeClass();


		CalendarResetCnt = 1;
	});
	*/
});