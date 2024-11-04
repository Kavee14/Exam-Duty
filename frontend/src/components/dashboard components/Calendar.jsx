import React, { useState } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar p-4">
      <div className="calendar-widget">
        <CalendarComponent
          onChange={handleDateChange}
          value={date}
        />
      </div>
      
    </div>
  );
};

export default Calendar;
