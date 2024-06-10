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
  "січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
]

function MonthlyCalendar({setPeriod, selectedMonth = 0, setDay, setMonth, selectedYear = false}) {
  
    const defineClassNameTableCell = (i, j) => {
      let className = "";
      if(i == 5) {
        className += "empty-border-bottom "
      }
      if(j == 0) {
        className += "empty-border-left"
      }
      if(j == 6) {
        className += "empty-border-right"
      }
      return className;
    }
    
    const monthesData = [0,1,2,3,4,5,6,7,8,9,10,11].map((monthNumber) => calculateMonthlyData(monthNumber, selectedYear));
    const carouselRef = useRef(null);
    const carouselRefForm = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(selectedMonth);
    
    useEffect(() => {
      if(carouselRef.current && selectedMonth) {
        carouselRef.current.goTo(selectedMonth);
        setCurrentMonth(selectedMonth);
        setCurrentMonthData(CalendarData[MONTHS[selectedMonth]]);
        carouselRefForm.current.goTo(0);
      }
    }, [carouselRef.current]);
  

    const [currentMonthData, setCurrentMonthData] = useState(CalendarData[MONTHS[0]]);

    const handleNext = debounce(() => {
      carouselRef.current.next();
    }, 300);

    const handlePrev = debounce(() => {
      carouselRef.current.prev();
    }, 300);

    const handleNextForm = debounce(() => {
      carouselRefForm.current.next();
    }, 500);

    const handlePrevForm = debounce(() => {
      carouselRefForm.current.prev();
    }, 500);

    const handlePeriodMenuClick = (e) => {
      setPeriod(e.key);
    };
    const afterChangeCarousel = (index) => {
      setMonth(index);
      setCurrentMonth(index);
      setCurrentMonthData(CalendarData[MONTHS[index]]);
      carouselRefForm.current.goTo(0);
    }
    const handleChangeMonth = (day) => {
      if(day.style.includes('next'))
        handleNext();
      else if(day.style.includes('prev'))
        handlePrev()
      else if(day.event) {
        setDay(day.number);
        setPeriod('3');
      }
      else {
        let a = 1;
      }
    }
    return (
      <>
        <div className="monthly-title">
          Воїни Волі: Від Гетьманщини до УПА
        </div>
        <div className="content-wrapper">
        <div className="monthly-content">
          <div className="monthly-controls">
              <div className="monthly-month-controls">
                <div className="arrow left" onClick={handlePrev}><BlueArrowIcon/></div>
                <p className="monthly-month-name">{MONTHS[currentMonth]}</p>
                <div className="arrow right" onClick={handleNext}><BlueArrowIcon/></div>
              </div>
              <div className="monthly-dropdown-controls">
                      <Dropdown
                          menu={{
                          items,
                          selectable: true,
                          defaultSelectedKeys: ['2'],  
                          onClick: handlePeriodMenuClick,
                          }}
                          placement="bottom"
                          overlayClassName="dropdown-menu"
                      >
                          <div className="monthly-dropdown">
                              <p>Місяць</p>
                              <div className="arrow down"><ArrowIcon/></div>
                          </div>
                      </Dropdown>
              </div>
          </div>
          
          <Carousel dots={false} ref={carouselRef} afterChange={afterChangeCarousel}>
              {
                monthesData.map((monthData) => (
                  <div>
                    <div className="monthly-calendar">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">Пн</th>
                            <th scope="col">Вт</th>
                            <th scope="col">Ср</th>
                            <th scope="col">Чт</th>
                            <th scope="col">Пт</th>
                            <th scope="col">Сб</th>
                            <th scope="col">Нд</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            monthData.map((week, i) => (
                                <tr>
                                {
                                  week.map((day, j) => (
                                    <td className={defineClassNameTableCell(i ,j) + ` ${day.style}` + `${day.event ? ' event' : ''}` } onClick={() => handleChangeMonth(day)} >
                                      {day.number}
                                      {
                                        day.event && <div className='dot'></div>
                                      }
                                    </td>
                                  ))
                                }
                                </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              }

          </Carousel>
          
        </div>
        <div className="form-content">
            <Carousel dots={false} ref={carouselRefForm}>
              {
                Object.keys(currentMonthData).map((dayNumber) => (
                  <div>
                    <div>
                    <div className="form">
                      <p className="title">{currentMonthData[+dayNumber]["Заголовок"]}</p>
                      <p className="text">{currentMonthData[+dayNumber]["Стаття"]}</p>
                      <div className="monthly-month-controls">
                        <div className="arrow left" onClick={handlePrevForm}><BlueArrowIcon/></div>
                        <p className="monthly-month-name">{dayNumber} {MONTHS_rod[currentMonth]}</p>
                        <div className="arrow right" onClick={handleNextForm}><BlueArrowIcon/></div>
                      </div>
                      <div className="monthly-month-image"><img src={window.location.origin + `/photos/${currentMonthData[+dayNumber]['Фото_Місяць']}`} height='400px'/></div>
                    </div>  
                    </div>
                  </div>
                ))
              }
            </Carousel>
          </div>
        </div>
      </>
    );
  }
  
  export default MonthlyCalendar;
  