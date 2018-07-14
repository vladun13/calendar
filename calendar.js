var today = new Date();
document.querySelector('#show_calendar')
	.addEventListener('click', function () {
		if (document.querySelector('#calendar')) {
			document.querySelector('#calendar').remove();
			document.getElementById("selectedDate").remove();
		} else {
			createCalendar(today.getMonth())
		}
	})


function createCalendar(monthIndex) {
	var calendar = document.createElement('div');
	calendar.id = 'calendar';
	var todayDate = today.getDate();
	var totalDays = function (monthIndex, year) {
		return new Date(year, monthIndex, 0).getDate();
	}
	function firstDay(monthIndex, year) {
		return new Date(year, monthIndex, 1);
	}
	for (var i = 0; i < firstDay(monthIndex, today.getFullYear()).getDay(); i++) {
		var dayTag = createDayTag();
		calendar.append(dayTag)
	}

	for (var i = 1; i <= totalDays(monthIndex+1, today.getFullYear()); i++) {
		var dayTag = createDayTag(i);
		if (i === todayDate && monthIndex === today.getMonth()) {
			dayTag.classList.add('today')
		};
		if (monthIndex < today.getMonth() || (monthIndex === today.getMonth() && Number(dayTag.textContent) < today.getDate())) {
		  dayTag.classList.add('dateDisabled')
		}
		else {
			dayTag.addEventListener('click', function (event) {
				clickDay(event, monthIndex)
			});
		}
		calendar.append(dayTag)
	}
	calendar.prepend(showWeekDays(today));
	calendar.prepend(createMonthYearTag(findCurMonth(monthIndex), monthIndex));
	
	document.body.append(calendar);
}


function clickDay(event, monthIndex) {
	var dates = document.querySelectorAll('.day');
	for (var i = 0; i < dates.length; i++) {
		dates[i].classList.remove('clickday');
	}
	event.target.classList.add('clickday');
	var choosedDate = createDayTag('Choosen date is ' + event.target.textContent + '-' + (monthIndex + 1) + '-' + today.getFullYear());
	choosedDate.id = 'selectedDate';
	if (document.getElementById("selectedDate")) {
            document.getElementById("selectedDate").remove();
	}
	document.body.append(choosedDate);
}




// function clickDay(event) {
// 	var dates = document.querySelectorAll('.day');
// 	for (var i = 0; i < dates.length; i++) {

// 		if (dates[i].style.backgroundColor === 'rgb(231, 233, 237)') {
// 			dates[i].style.backgroundColor = '#fff'
// 		} 
// 	}
// 	event.target.style.backgroundColor = '#E7E9ED';
// }

function createDayTag(day) {
	var span = document.createElement('span');
	span.classList.add('day');
	span.textContent = day;
	return span;
}


function findCurMonth(monthIndex) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var currentMonth = months[monthIndex];
	return currentMonth;
}


function createMonthYearTag(currentMonth, monthIndex) {
	var monthYearDate = document.createElement('div');
	monthYearDate.id = 'date';
	var month = document.createElement('span');
	month.id = 'monthname';
	month.textContent = currentMonth;
	var space = document.createTextNode("\x20");
	var year = document.createElement('span');
	year.id = 'year';
	year.textContent = today.getFullYear();
	var arrowSVG = '<svg height="24" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg>';
	var arrowLeft = document.createElement('button');
	arrowLeft.innerHTML = arrowSVG;
	arrowLeft.id = 'arrPrev';
	arrowLeft.addEventListener('click', function () {
		document.querySelector('#calendar').remove();	
		createCalendar(monthIndex - 1);
	});
	var arrowRight = document.createElement('button');
	arrowRight.innerHTML = arrowSVG;
	arrowRight.id = 'arrNext';
	arrowRight.addEventListener('click', function () {
		document.querySelector('#calendar').remove();	
		createCalendar(monthIndex + 1);
	});
	monthYearDate.append(arrowLeft, arrowRight);
	monthYearDate.append(month);
	monthYearDate.append(space);
	monthYearDate.append(year);
	return monthYearDate;
}



function showWeekDays(today) {
	var daysNameContainer = document.createElement('div');
	daysNameContainer.id = 'daysName';

	var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var weekDay = weekDays[today.getDay()];

	for (var i = 0; i < weekDays.length; i++) {
		var weekDayTag = createDayTag(weekDays[i].substring(0,3));
		if (i === weekDay) {
			weekDayTag.classList.add(weekDay);
		}
		daysNameContainer.append(weekDayTag);
	}
	
	return daysNameContainer;
}

