import {
  data, filterBy, filteredData, filterFunc,
} from '../index';
import { renderTable } from '../table/table';

const rawCalendarData = localStorage.getItem('calendarData');
const calendarData = JSON.parse(rawCalendarData);

export default function addDragAndDrop() {
  const draggableMeetingCard = document.querySelectorAll('.filled');
  const dropZone = document.querySelectorAll('.drop-zone');

  let day;
  let time;
  let title;
  let participants;

  draggableMeetingCard.forEach((item) => {
    item.addEventListener('dragstart', ((e) => {
      day = item.dataset.day;
      time = item.dataset.time;
      title = item.dataset.title;
      participants = item.dataset.participants.split(',');
    }));
  });

  dropZone.forEach((item) => {
    item.addEventListener('dragover', ((e) => {
      e.preventDefault();
    }));
  });

  dropZone.forEach((item) => {
    item.addEventListener('drop', ((e) => {
      if (Object.keys(data[e.target.dataset.day]).includes(e.target.dataset.time)) {
        alert('You can\'t drag to the booked slot');
      } else {
        delete data[day][time];
        data[e.target.dataset.day][e.target.dataset.time] = {
          title,
          participants,
        };
        localStorage.setItem('calendarData', JSON.stringify(data));
      }
      if (filterBy === 'All members') {
        renderTable(data);
      } else {
        filterFunc();
        renderTable(filteredData);
      }
    }));
  });
}
