import {format} from 'date-fns'

const datePickerBtn = document.querySelector('.openclose-btn')
const calendar = document.querySelector('.date-picker-box')

datePickerBtn.addEventListener('click', e=>{
    calendar.classList.toggle('calendar-open')
})

function setDate(date){
    datePickerBtn.innerText = format(date, 'MMMM')
}

setDate(new Date())