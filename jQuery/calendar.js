$('#show_calendar').click(function() {
	if ($('#calendar')) {
	// if ($('#calendar') == true) {
		$('#calendar').remove();
	} else {
		createCalendar();
	}
});

var today = new Date();

function createCalendar() {
	var calendar = $('<div>', {id:"calendar"});
	var todayDate = today.getDate();

	var maxDays = 30;
	for (var i = 1; i <= maxDays; i++) {
		var dayTag = createDayTag(i);
		if (i === todayDate) {
			dayTag.addClass('day');
		}
		calendar.append(dayTag);
	}
	calendar.prepend(showWeekDays(today));
	calendar.prepend(createMonthTag(findCurMonth(today)));

	$("body").append(calendar);
}

function createDayTag(day) {
	return $('<span>', {class:"day", text:'day'});
}

function findCurMonth(today) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var currentMonth = months[today.getMonth()];
	return currentMonth;
}


function createMonthTag(currentMonth) {
	var monthYearDate = $('<div>', {id:"date"});
	var month = $('<span>', {id:"monthname", text:'currentMonth'});
	var arrow1 = $('<span>', {id:'arrPrev', html:`
		<svg height="24" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
		</svg>
	`});
	var arrow2 = $('<span>', {id:'arrNext', html:`
		
	`});
	monthYearDate.append("arrow1", "arrow2");
	monthYearDate.append("month");
	return monthYearDate;
}


function showWeekDays(today) {
	var daysNameContainer = $('<div>', {id:"daysName"});

	var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var weekDay = weekDays[today.getDay()];

	for (var i = 0; i < weekDays.length; i++) {
		var weekDayTag = createDayTag(weekDays[i].substring(0,3));
		if (i === weekDay) {
			weekDayTag.addClass('weekDay');
		}
		$("daysNameContainer").append("weekDayTag");
	}
	
	return daysNameContainer;
}

