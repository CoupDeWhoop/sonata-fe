import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePickerWeb = ({ date, setDate }) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      showTimeSelect
      timeIntervals={15}
      inline
    />
  );
};

export default DateTimePickerWeb;
