import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePickerWeb({ date, setDate }) {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      showTimeSelect
      timeIntervals={15}
      inline
    />
  );
}
