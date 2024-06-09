import './App.css';


import React, { useState } from 'react';
import YearlyCalendar from './components/YearlyCalendar';
import MonthlyCalendar from './components/MonthlyCalendar';
import DailyCalendar from './components/DailyCalendar';


// Just for starting from Monday, no UA locale :(
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const CurrentCalendar = (key, setPeriod, month, setMonth, day, setDay) => {
  console.log(key)
  switch (key) {
    case '1': return <YearlyCalendar setPeriod={setPeriod} setMonth={setMonth} setDay={setDay}/> 
    case '2': return <MonthlyCalendar setPeriod={setPeriod} selectedMonth={month}/> 
    case '3': return <DailyCalendar setPeriod={setPeriod} selectedMonth={month} selectedDate={day}/>
  }
};


function App() {
  const [period, setPeriod] = useState('1');
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  return (
    <>
      {
        CurrentCalendar(period, setPeriod, month, setMonth, day, setDay)
      }
    </>
  );
}

export default App;
