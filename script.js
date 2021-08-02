import {addMonths, subMonths, format, fromUnixTime, getUnixTime, startOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay} from 'date-fns'
import { startOfWeek, endOfMonth } from 'date-fns/esm'

const datePickerBtn = document.querySelector('.openclose-btn')
const datePickerHeaderText = document.querySelector('.month-year')
const calendar = document.querySelector('.date-picker-box')
const previousMonthBtn = document.querySelector('.arrow-left')
const nextMonthBtn = document.querySelector('.arrow-right')
const datesGrid = document.querySelector('.dates-grid')
let currentDate = new Date()

datePickerBtn.addEventListener('click', e=>{
    calendar.classList.toggle('calendar-open')
    const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate)
    currentDate = selectedDate //resets the calendar to todays date every time it is opened or closed
    setupDatePicker(selectedDate)
})

function setupDatePicker(selectedDate){
   datePickerHeaderText.innerHTML = format(currentDate, "MMMM - yyyy")
   setupDates(selectedDate)
}

function setupDates(selectedDate){
    const firstWeekStart = startOfWeek(startOfMonth(currentDate))
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
    const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeekEnd})
    datesGrid.innerHTML = ""
    dates.forEach(date => {
        const dateElement = document.createElement('button')
        dateElement.classList.add('date')
        dateElement.innerText = date.getDate()
        if(!isSameMonth(date, currentDate)){
            dateElement.classList.add('date-picker-other-month-date')
        }
        if(isSameDay(date, selectedDate)){
            dateElement.classList.add('selected')
        }
        dateElement.addEventListener('click', e=>{
            setDate(date)
            //close the calendar when date is picked
            calendar.classList.remove('calendar-open')
        })
        datesGrid.appendChild(dateElement)
    })
}

nextMonthBtn.addEventListener('click', e=>{
    currentDate = addMonths(currentDate, 1)
    const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate)

    setupDatePicker(selectedDate)
})
   
previousMonthBtn.addEventListener('click', e=>{
    currentDate = subMonths(currentDate, 1)
    const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate)

    setupDatePicker(selectedDate)
})
  

function setDate(date){
    datePickerBtn.innerText = format(date, 'MMMM do, yyyy')
    datePickerBtn.dataset.selectedDate = getUnixTime(date)
}

setDate(new Date())