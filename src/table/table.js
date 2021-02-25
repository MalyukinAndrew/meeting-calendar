import { data, filterBy, tableColumns, tableRows, filteredData, currentUser } from '../index'
import addDragAndDrop from '../dragAndDrop/dragAndDrop'

export const table = document.getElementById('tab');

const rawCalendarData = localStorage.getItem('calendarData');
const calendarData = JSON.parse(rawCalendarData);

function renderHeader() {
    const trElem = document.createElement('tr');
    tableColumns.map((column) => {
        const thElem = document.createElement('th');
        thElem.innerText = column;
        trElem.appendChild(thElem);
    })
    table.appendChild(trElem);
}

function renderTableBody(inputData) {
    tableRows.map((time) => {
        const trElem = document.createElement('tr');
        tableColumns.map((column, index) => {
            const tdElem = document.createElement('td');
            const tdElemText = document.createElement('span');
            const titleWrapper = document.createElement('div')
            const removeButton = document.createElement('button')
            tdElem.appendChild(titleWrapper)
            titleWrapper.appendChild(tdElemText)
            let event = ''
            if (index !== 0 && inputData[column][time]) {
                event = inputData[column][time]?.title

                removeButton.classList.add('remove-btn')
                removeButton.innerText = 'X'
                removeButton.dataset.day = column
                removeButton.dataset.time = time

                titleWrapper.classList.add('filled')
                titleWrapper.dataset.title = event
                titleWrapper.dataset.participants = inputData[column][time].participants
                if (currentUser[0].role==="user"){
                    titleWrapper.draggable = false
                }
                else{
                    titleWrapper.draggable = true
                    removeButton.addEventListener('click', removeMeeting)
                titleWrapper.appendChild(removeButton)
                }
                

                tdElem.classList.add('taken')

                
            }
            titleWrapper.dataset.day = column
            titleWrapper.dataset.time = time
            tdElemText.innerText = index === 0 ? time : event;
            if (index !== 0 && currentUser[0].role==="admin") {
                tdElem.classList.add('drop-zone')
                tdElem.dataset.day = column
                tdElem.dataset.time = time
            }
            trElem.appendChild(tdElem);
        })
        table.appendChild(trElem);
    })
}

function removeMeeting(event) {
    const day = event.target.dataset.day
    const time = event.target.dataset.time
    delete data[day][time]
    localStorage.setItem('calendarData', JSON.stringify(data));
    delete filteredData[day][time]
    if (filterBy === 'All members') {
        renderTable(data)
    }
    else {
        renderTable(filteredData)
    }
}

export function renderTable(inputData) {
    table.innerHTML = ''
    renderHeader();
    renderTableBody(inputData);
    addDragAndDrop()
}

export function render() {
    const loginFormBack = document.querySelector(".login-form-back")
    const loginForm = document.querySelector(".login-form")
    if (calendarData) {
        for (const day in calendarData) {
            for (const time in calendarData) {
                data[day] = calendarData[day]
            }
        }
        // loginForm.classList.add('show')
        // loginFormBack.classList.add('show')
        renderTable(data);
    }
    else {
        // loginFormBack.classList.add('show')
        // loginForm.classList.add('show')
        renderTable(data);
    }
}

