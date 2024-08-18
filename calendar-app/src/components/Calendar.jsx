import moment from 'moment'
import 'moment/locale/ru'
import React from 'react'
import './Calendar.css'

moment.locale('ru')

const getDayOfWeek = date => {
	return moment(date).format('dddd')
}

const getMonthName = date => {
	return moment(date).format('MMMM')
}

const getMonthNameShort = date => {
	return moment(date).format('MMMM').toUpperCase()
}

const Calendar = ({ date = new Date() }) => {
	const currentDate = moment(date)
	const startOfMonth = currentDate.clone().startOf('month').startOf('week')
	const endOfMonth = currentDate.clone().endOf('month').endOf('week')

	const days = []
	let day = startOfMonth.clone()
	while (day.isBefore(endOfMonth, 'day')) {
		days.push(day.clone())
		day.add(1, 'day')
	}

	const month = currentDate.format('MMMM')
	const year = currentDate.format('YYYY')

	return (
		<div className='ui-datepicker'>
			<div className='ui-datepicker-material-header'>
				<div className='ui-datepicker-material-day'>{getDayOfWeek(date)}</div>
				<div className='ui-datepicker-material-date'>
					<div className='ui-datepicker-material-day-num'>
						{currentDate.date()}
					</div>
					<div className='ui-datepicker-material-month'>
						{getMonthName(date)}
					</div>
					<div className='ui-datepicker-material-year'>{year}</div>
				</div>
			</div>
			<div className='ui-datepicker-header'>
				<div className='ui-datepicker-title'>
					<span className='ui-datepicker-month'>{getMonthNameShort(date)}</span>
					&nbsp;<span className='ui-datepicker-year'>{year}</span>
				</div>
			</div>
			<table className='ui-datepicker-calendar'>
				<colgroup>
					<col />
					<col />
					<col />
					<col />
					<col />
					<col className='ui-datepicker-week-end' />
					<col className='ui-datepicker-week-end' />
				</colgroup>
				<thead>
					<tr>
						<th scope='col' title='Понедельник'>
							Пн
						</th>
						<th scope='col' title='Вторник'>
							Вт
						</th>
						<th scope='col' title='Среда'>
							Ср
						</th>
						<th scope='col' title='Четверг'>
							Чт
						</th>
						<th scope='col' title='Пятница'>
							Пт
						</th>
						<th scope='col' title='Суббота'>
							Сб
						</th>
						<th scope='col' title='Воскресенье'>
							Вс
						</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 6 }).map((_, weekIndex) => (
						<tr key={weekIndex}>
							{Array.from({ length: 7 }).map((_, dayIndex) => {
								const currentDay = days[weekIndex * 7 + dayIndex]
								const isToday = currentDay && currentDay.isSame(date, 'day')
								const isOtherMonth =
									currentDay && currentDay.month() !== currentDate.month()
								return (
									<td
										key={dayIndex}
										className={[
											isToday ? 'ui-datepicker-today' : '',
											isOtherMonth ? 'ui-datepicker-other-month' : '',
											currentDay &&
											(currentDay.day() === 0 || currentDay.day() === 6)
												? 'ui-datepicker-week-end'
												: '',
										].join(' ')}
									>
										{currentDay ? currentDay.date() : ''}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Calendar
