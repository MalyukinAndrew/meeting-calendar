import { data, filterBy, tableColumns, tableRows, filteredData, currentUser } from '../index'
import addDragAndDrop from '../dragAndDrop/dragAndDrop'
import { Api } from '../api';

export const table = document.getElementById('tab');

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
                removeButton.dataset.id = inputData[column][time].id

                titleWrapper.classList.add('filled')
                titleWrapper.dataset.id = inputData[column][time].id
                titleWrapper.dataset.title = event
                titleWrapper.dataset.participants = inputData[column][time].participants
                if (currentUser[0].role === "user") {
                    titleWrapper.draggable = false
                }
                else {
                    titleWrapper.draggable = true
                    removeButton.addEventListener('click', removeMeeting)
                    titleWrapper.appendChild(removeButton)
                }

                tdElem.classList.add('taken')

            }
            titleWrapper.dataset.day = column
            titleWrapper.dataset.time = time
            tdElemText.innerText = index === 0 ? time : event;
            if (index !== 0 && currentUser[0].role === "admin") {
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
    Api.delete(`/events/${data[day][time].id}`).then(() => {
        delete data[day][time]
        delete filteredData[day][time]
        if (filterBy === 'All members') {
            renderTable(data)
        }
        else {
            renderTable(filteredData)
        }
    })
}

export function renderTable(inputData) {
    table.innerHTML = ''
    renderHeader();
    renderTableBody(inputData);
    addDragAndDrop()
}

export function render() {
    Api.get('/events').then((res) => {
        if (res.data === null) {
            renderTable(data)
        }
        else {
            res.data.map(item => {
                const parsedData = JSON.parse(item.data)
                const id = item.id
                data[parsedData.day][parsedData.time] = {
                    title: parsedData.title,
                    participants: parsedData.participants,
                    id: id
                }
            })
        }
    }).then(() => {
        renderTable(data)
    })
}
