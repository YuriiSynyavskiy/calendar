import './App.css';


import React, { useState , useEffect} from 'react';
import YearlyCalendar from './components/YearlyCalendar';
import MonthlyCalendar from './components/MonthlyCalendar';
import DailyCalendar from './components/DailyCalendar';
import SplashScreen from './components/SplashScreen';


// Just for starting from Monday, no UA locale :(
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const CurrentCalendar = (key, setPeriod, month, setMonth, day, setDay) => {
  switch (key) {
    case '1': return <YearlyCalendar setPeriod={setPeriod} setMonth={setMonth} setDay={setDay}/> 
    case '2': return <MonthlyCalendar setPeriod={setPeriod} selectedMonth={month} setDay={setDay} setMonth={setMonth}/> 
    case '3': return <DailyCalendar setPeriod={setPeriod} selectedMonth={month} selectedDate={day}/>
    case '4': return <SplashScreen/>
  }
};


function App() {

  useEffect(() => {
    setTimeout(() => setPeriod('1'), 10000);
  }, []);

  const [period, setPeriod] = useState('4');
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
