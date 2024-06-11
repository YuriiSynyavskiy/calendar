import {  Carousel, Dropdown } from 'antd';
import React, { useState, useRef , useEffect} from 'react';
import debounce from 'debounce';
import { ArrowIcon, BlueArrowIcon} from './icons';
import {calculateMonthlyData} from './utils';
import CalendarData from './CalendarData';

const items = [
  {
    key: '1',
    label: 'Рік'
  },
  {
    key: '2',
    label: 'Місяць'
  },
  {
    key: '3',
    label: 'День'
  },
];
const MONTHS = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
]
const MONTHS_rod = [
  " січня", " лютого", " березня", " квітня", " травня", " червня", " липня", " серпня", " вересня", " жовтня", " листопада", " грудня"
]

function DailyCalendar({setPeriod, selectedMonth=0, selectedDate=false}) {

    const [currentDateData, setCurrentDateData] = useState(CalendarData[MONTHS[selectedMonth]]);
    const [currentDate, setCurrentDate] = useState(Object.keys(CalendarData[MONTHS[selectedMonth]])[0]);

    const handlePeriodMenuClick = (e) => {
      setPeriod(e.key);
    };

    useEffect(() => {
      if(selectedDate)
        setCurrentDate(selectedDate);
      }
    , []);
  
    const handleDailyMenuClick = debounce((key) => {
      setCurrentDate(Object.keys(currentDateData)[+key.key - 1]);
    }, 300);

    return (
      <div className="daily-calendar">
        <div className="daily-title">
          Воїни Волі: Від Гетьманщини до УПА
        </div>
        <div className="daily-controls">
          <div className="daily-dropdown-controls">
              <Dropdown
                  menu={{
                  items: Object.keys(currentDateData).map((item, index) => (
                    {
                      key: (index+1).toString(), 
                      label: item + MONTHS_rod[selectedMonth]
                    }
                  )),
                  selectable: true,
                  defaultSelectedKeys: [ (Object.keys(currentDateData).indexOf(currentDate) + 1).toString() ],  
                  onClick: handleDailyMenuClick,
                  }}
                  placement="bottom"
                  overlayClassName="dropdown-menu"
              >
                <div className="daily-dropdown">
                    <p>{currentDate} {MONTHS_rod[selectedMonth]}</p>
                    <div className="arrow down"><BlueArrowIcon/></div>
                </div>
              </Dropdown>
            </div>
            <div className="monthly-dropdown-controls">
              <Dropdown
                  menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: ['3'],  
                  onClick: handlePeriodMenuClick,
                  }}
                  placement="bottom"
                  overlayClassName="dropdown-menu"
              >
                <div className="monthly-dropdown">
                    <p>День</p>
                    <div className="arrow down"><ArrowIcon/></div>
                </div>
              </Dropdown>
            </div>
        </div>
        <div className="daily-main">
          <div className="daily-main-content">
            <div className="daily-main-content-image">
              <img src={window.location.origin + `/photos/${currentDateData[currentDate]['Фото_День']}`}/>
            </div>
            <div className="daily-main-content-text-wrapper">
              <div className="daily-main-content-title">
                <span>{currentDateData[currentDate]['Імя форми']}</span>
              </div>
              <div className="daily-main-content-text">
                <span>{currentDateData[currentDate]['Стаття форми']}</span>
              </div>
            </div>
          </div>
          <hr/>
          <div className="daily-main-secondary">
            <div className="daily-main-secondary-title">
                  <span>Корисні статті:</span>
            </div>
            <div className="daily-main-secondary-refs">
                  <ul>
                  {
                    currentDateData[currentDate]['Посилання'].map((ref) => (
                      <li>
                        <span>{ref.split("&")[0].trim()}</span>
                        <a href={ref.split("&")[1].trim()}>{ref.split("&")[1].trim()}</a>
                      </li>
                    ))
                  }
                  </ul>
            </div>
          </div>
        </div>                 
      </div>
    );
  }
  
  export default DailyCalendar;
  