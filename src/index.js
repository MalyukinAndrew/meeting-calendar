import { Select } from './select/select';
import pushMeeting from './form/form';
import loginForm from './form/loginForm'
import { render, renderTable } from './table/table';
import './select/styles.scss';
import './main.scss';
import { createUserClass } from "./utils"
import { rawParticipants } from './constants'

const createEventButton = document.getElementById('create-event');
const closeFormButton = document.getElementById('close-form');
const formBackdrop = document.querySelector('.create-event-form');

export let selectedWeekDay;
export let selectedTime;
export let selectedParticipants = [];
export let currentUser;

function showCreateEventWindow(e) {
  e.preventDefault();
  formBackdrop.classList.toggle('show');
  form.classList.toggle('show');
}

createEventButton.addEventListener('click', showCreateEventWindow);
closeFormButton.addEventListener('click', showCreateEventWindow);
formBackdrop.addEventListener('click', showCreateEventWindow);

export const tableColumns = ['Time \\ Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const tableRows = [];
for (let i = 10; i <= 18; i++) {
  tableRows.push(`${i}:00`);
}

const participants = rawParticipants.map(createUserClass)

export const data = {
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
};

export let filteredData = JSON.parse(JSON.stringify(data));

const dayPicker = new Select('#day', {
  placeholder: 'Choose day',
  data: tableColumns.map((item, id) => ({
    id: id.toString(),
    value: item,
  })).splice(1),
  onSelect(value) {
    selectedWeekDay = value.value;
  },
});

const timePicker = new Select('#time', {
  placeholder: 'Choose time',
  data: tableRows.map((item, id) => ({
    id: id.toString(),
    value: item,
  })),
  onSelect(value) {
    selectedTime = value.value;
  },
});

const participantsPicker = new Select('#participants', {
  placeholder: 'Choose participants',
  data: participants.map((item, id) => ({
    id: id.toString(),
    value: item.name,
  })),
  onSelect(value) {
    selectedParticipants = value.map((item) => item.value);
  },
});

const userAuth = new Select('#auth', {
  placeholder: 'Choose user',
  data: participants.map((item, id) => ({
    id: id.toString(),
    value: item.name,
  })),
  onSelect(value) {
    currentUser = participants.filter((item)=>{
      return item.name===value.value
    });
  }
});

export function filterFunc() {
  filteredData = JSON.parse(JSON.stringify(data));
  for (const day in filteredData) {
    for (const time in filteredData[day]) {
      if (!filteredData[day][time].participants.includes(filterBy)) {
        delete filteredData[day][time];
      }
    }
  }
}

const participantsFilter = [...participants];
participantsFilter.unshift('All members');
export let filterBy = 'All members';
const filter = new Select('#filter', {
  placeholder: 'All members',
  data: participantsFilter.map((item, id) => ({
    id: id.toString(),
    value: item.name || item,
  })),
  onSelect(value) {
    filterBy = value.value;
    if (filterBy === 'All members') {
      renderTable(data);
    } else {
      filterFunc();
      renderTable(filteredData);
    }
  },
});
