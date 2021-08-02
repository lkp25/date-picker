import {format, fromUnixTime, getUnixTime} from 'date-fns'

const datePickerBtn = document.querySelector('.openclose-btn')
const datePickerHeaderText = document.querySelector('.month-year')
const calendar = document.querySelector('.date-picker-box')

datePickerBtn.addEventListener('click', e=>{
    calendar.classList.toggle('calendar-open')
    const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate)
    setupDatePicker(selectedDate)
})

function setupDatePicker(selectedDate){
   datePickerHeaderText.innerHTML = format(selectedDate, "MMMM - yyyy")
}

function setDate(date){
    datePickerBtn.innerText = format(date, 'MMMM do, yyyy')
    datePickerBtn.dataset.selectedDate = getUnixTime(date)
}

setDate(new Date())