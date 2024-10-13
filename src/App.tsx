import React, { useState, useEffect, Children } from 'react';
import './styles.css';
import DateRangeSelector from './components/DateRangeSelector';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparkLineChart from './components/SparkLineChart';
import bookingData from './data/bookings.json'; 
import {Booking} from './types';
import { channel } from 'diagnostics_channel';
const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange([startDate, endDate]);
    // You can also filter your booking data based on this date range if needed
  };

  const filteredData: Booking[] = bookingData.filter((booking: Booking) => {
    const arrivalDate = new Date(
      booking.arrival_date_year,
      Number(booking.arrival_date_month) - 1,
      booking.arrival_date_day_of_month
    );
    return (
      (!dateRange[0] || arrivalDate >= dateRange[0]) && 
      (!dateRange[1] || arrivalDate <= dateRange[1])
    );
  });
  console.log("Filtered Data:", filteredData);

  // Assuming you have an array with structure { date: Date, visitors: number }
const visitorsPerDay = filteredData.map((booking: Booking) => ({
  x: new Date(booking.arrival_date_year, Number(booking.arrival_date_month) - 1, booking.arrival_date_day_of_month),
  y: booking.adults + booking.children, // Total visitors
}));

console.log("Visitors Per Day Data:", visitorsPerDay);

<TimeSeriesChart data={visitorsPerDay} />



  const visitorsPerCountry = filteredData.reduce<Record<string, number>>((acc, booking) => {
  const country = booking.country;
  if (!acc[country]) acc[country] = 0;
  acc[country] += booking.adults + booking.children + booking.babies;
  return acc;
}, {});


  const countryData = Object.keys(visitorsPerCountry).map((country) => ({
    country,
    visitors: visitorsPerCountry[country]
  }));

  const adultVisitorsData = filteredData.map((booking) => ({
  x: new Date(booking.arrival_date_year, Number(booking.arrival_date_month) - 1, booking.arrival_date_day_of_month),
  y: booking.adults,
}));
  const totalChildren = filteredData.map((booking) => ({
  x: new Date(
    booking.arrival_date_year,
    Number(booking.arrival_date_month) - 1, // Ensure month is a number
    booking.arrival_date_day_of_month
  ),
  y: booking.children,
}));

const countryNames = countryData.map((item) => item.country); // Extract country names
const visitorCounts = countryData.map((item) => item.visitors); // Extract visitor counts

return (
  <div>
    <h1>Hotel Booking Dashboard</h1>
    <DateRangeSelector onDateChange={handleDateChange} />
    <h2>Visitors Per Day (Time Series)</h2>
    <TimeSeriesChart data={visitorsPerDay} />
    <h2>Visitors Per Country (Column Chart)</h2>
    <ColumnChart chartData={visitorCounts} categories={countryNames} /> 
    <h2>Total Adult Visitors (Sparkline)</h2>
    <SparkLineChart data={adultVisitorsData} label="Total Adult" />
    <h2>Total Child Visitors (Sparkline)</h2>
    <SparkLineChart data={totalChildren} label="Total Children" />
  
  </div>
  
);

};

export default App;
