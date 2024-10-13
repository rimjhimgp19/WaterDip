
import React,{useState} from 'react';

interface DateRangeSelectorProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}


const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
    onDateChange(date, endDate);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
    onDateChange(startDate, date);
  };
  const handleApplyDateRange = () => {
    // Call the onDateChange function with the selected dates
    onDateChange(startDate, endDate);
  };
  return (
    <div>
      <div>
      <input
        type="date"
        onChange={handleStartDateChange}
        placeholder="Start Date"
      />
      <input
        type="date"
        onChange={handleEndDateChange}
        placeholder="End Date"
      />
    </div>
      <button onClick={handleApplyDateRange}>Apply Date Range</button>
    </div>
  );
};

export default DateRangeSelector;
