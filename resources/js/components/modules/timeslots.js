import React from 'react';
import moment from 'moment';
import {
  Button
} from 'react-bootstrap';


const TimeSlots = () => {
  let toReturn = [];

  let startTime = moment('9:30:00', 'h:mm:ss');
  const endTime = moment('17:00:00', 'h:mm:ss');

  //in minutes
  const interval = 30;
 
  const renderTimeSlots = () => {
    while(startTime <= endTime) {
      const start = startTime.format('h:mm');
      const end = startTime.add(interval,'minutes').format('h:mm');

      toReturn.push(
        <Button 
          className="timeSlots__timeSlot"
          value={{
            start,
            end
          }}
        >
          <div>
            <span>{start}</span>
              -
            <span>{end}</span>
          </div>
          <span>
            Michael Rivera
          </span>
        </Button>
      );

      startTime = startTime.add(interval,'minutes')
    }

    return toReturn;
  }

  return (
    <div className="timeSlots">
      { renderTimeSlots() }
      <Button className="timeSlots__timeSlot">
        <div>
          <span>9:30</span>
            -
          <span>10:00</span>
        </div>
        <span>
          Michael Rivera
        </span>
      </Button>
      <Button className="timeSlots__timeSlot taken">
        <div>
          <span>9:30</span>
            -
          <span>10:00</span>
        </div>
        <span>
          Michael Rivera
        </span>
      </Button>
      <Button className="timeSlots__timeSlot activeState">
        <div>
          <span>9:30</span>
            -
          <span>10:00</span>
        </div>
        <span>
          Michael Rivera
        </span>
      </Button>
      <Button className="timeSlots__timeSlot busy">
        <div>
          <span>9:30</span>
            -
          <span>10:00</span>
        </div>
        <span>
          Michael Rivera
        </span>
      </Button>
      <Button className="timeSlots__timeSlot approved">
        <div>
          <span>9:30</span>
            -
          <span>10:00</span>
        </div>
        <span>
          Michael Rivera
        </span>
      </Button>
    </div>
  );
}

export default TimeSlots;