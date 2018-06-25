document.querySelector('#show_calendar')
	.addEventListener('click', function () {
		if (document.querySelector('#calendar')) {
			document.querySelector('#calendar').remove();
		} else {
			createCalendar()
		}
	})

var today = new Date();

function createCalendar() {
	var calendar = document.createElement('div');
	calendar.id = 'calendar';
	var todayDate = today.getDate();


	var maxDays = 30;
	for (var i = 1; i <= maxDays; i++) {
		var dayTag = createDayTag(i);
		calendar.append(dayTag)
		if (i === todayDate) {
			dayTag.classList.add('today')
		};
	}
		if (dayTag < today.getTime()) {
		  dayTag.classList.add('dateDisabled')
		};
		dayTag.addEventListener('click', clickDay);
	calendar.prepend(showWeekDays(today));
	calendar.prepend(createMonthYearTag(findCurMonth(today)));

	document.body.append(calendar);
}


function clickDay(event) {
	var dates = document.querySelectorAll('.day');
	for (var i = 0; i < dates.length; i++) {
		dates[i].classList.remove('clickday');
}
		event.target.classList.add('clickday');
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


function findCurMonth(today) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var currentMonth = months[today.getMonth()];
	return currentMonth;
}


function createMonthYearTag(currentMonth) {
	var monthYearDate = document.createElement('div');
	monthYearDate.id = 'date';
	var month = document.createElement('span');
	month.id = 'monthname';
	month.textContent = currentMonth;
	var space = document.createTextNode("\x20");
	var year = document.createElement('span');
	year.id = 'year';
	year.textContent = today.getFullYear();
	var arrow1 = document.getElementById('arrPrev');
	var arrow2 = document.getElementById('arrNext');
	monthYearDate.append(arrow1, arrow2);
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

