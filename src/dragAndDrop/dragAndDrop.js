import { Api } from '../api';
import {
  data, filterBy, filteredData, filterFunc,
} from '../index';
import { renderTable } from '../table/table';

export default function addDragAndDrop() {
  const draggableMeetingCard = document.querySelectorAll('.filled');
  const dropZone = document.querySelectorAll('.drop-zone');

  let day;
  let time;
  let title;
  let participants;
  let id;

  draggableMeetingCard.forEach((item) => {
    item.addEventListener('dragstart', ((e) => {
      day = item.dataset.day;
      time = item.dataset.time;
      title = item.dataset.title;
      participants = item.dataset.participants.split(',');
      id = item.dataset.id;
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
      Api.put(`/events/${id}`, {
        data:JSON.stringify({
          title: title,
          participants: participants,
          time:e.target.dataset.time,
          day:e.target.dataset.day
        })
      })
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
