import {
  data,
  filterBy,
  filterFunc,
  filteredData,
  selectedParticipants,
  selectedWeekDay,
  selectedTime,
} from '../index';
import { renderTable } from '../table/table';


const form = document.getElementById('form');

form.addEventListener('submit', pushMeeting);

export default function pushMeeting(event) {
  event.preventDefault();
  const meetingTitle = document.getElementById('text');
  const error = document.querySelector('.error');
  if (Object.keys(data[selectedWeekDay]).includes(selectedTime)) {
    error.innerText = 'Slot is already booked';
  } else if (meetingTitle.value) {
    data[selectedWeekDay][selectedTime] = {
      title: meetingTitle.value,
      participants: selectedParticipants,
    };
    localStorage.setItem('calendarData', JSON.stringify(data));
    error.innerText = '';
    if (filterBy === 'All members') {
      renderTable(data);
    } else {
      filterFunc();
      renderTable(filteredData);
    }
  } else {
    error.innerText = 'You need to write title first';
  }
}
