import { Calendar, Carousel, ConfigProvider, Button, Dropdown } from 'antd';
import dayjs from 'dayjs';
import React, { useState, useRef } from 'react';

import debounce from 'debounce';
import { ArrowIcon, BlackArrowIcon} from './icons';
import CalendarData from './CalendarData';
import locale from 'antd/locale/ru_RU';

locale.Calendar.lang.shortWeekDays[0] = 'Нд';

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
  

function YearlyCalendar({setPeriod, setMonth, setDay}) {
    const carouselRef = useRef(null)
    const months = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ]
    const currentYear = dayjs().year();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [headerCurrentYear, setHeaderCurrentYear] = useState(dayjs().year());
    const [yearRange, setYearRange] = useState([currentYear, currentYear+1, currentYear-1]);
    
    
    const handleChangeDay = (m, d) => {
        setMonth(m);
        setDay(d);
        setPeriod('3');
    };

    const handlePeriodMenuClick = (e) => {
        setPeriod(e.key);
    };
    
    const handleNext = debounce(() => {
        carouselRef.current.next();
    }, 500);

    const handlePrev = debounce(() => {
        carouselRef.current.prev();
    }, 500);

    const switchYear = (index) => {

        let newYearRange;

        if(index - currentIndex == 1 || index - currentIndex  == -2) {
            newYearRange = [yearRange[2], yearRange[0], yearRange[1]].map(elem => elem + 1);
        }
        else {
            newYearRange = [yearRange[1], yearRange[2], yearRange[0]].map(elem => elem - 1);
        }
        setHeaderCurrentYear(newYearRange[index]);
        setYearRange(newYearRange);

        setCurrentIndex(index);
    }

    const redirectToMonthCalendar = (monthNumber) => {
        setMonth(monthNumber);
        setPeriod('2')
    }

    const cellRender = (date, info) => {
        
        if (info.type === 'date') {

            return React.cloneElement(info.originNode, {
              ...info.originNode.props,
              className: info.originNode.props.className + (CalendarData[months[date.$M]][date.$D.toString()] ? ' event-presented' : ''),
              children: info.originNode.props.children,
              onClick: (CalendarData[months[date.$M]][date.$D.toString()] ? () => handleChangeDay(date.$M, date.$D) : null ),
            });
        }
        return info.originNode;      
    };
    

    return (
    <>
        <div className="background-wrapper"></div>
        <div className="bg">
            <img src="background-image.png"/>
        </div>
        <div className="bg-opacity"></div>
        <div className='content'>
            <div className="header">
                <h1>Воїни Волі: Від Гетьманщини до УПА</h1>
                <div className="subheader">
                    <div className="header-controls">
                        <div className="arrow left" onClick={handlePrev}><ArrowIcon/></div>
                        {headerCurrentYear}
                        <div className="arrow right" onClick={handleNext}><ArrowIcon/></div>
                    </div>
                    <div className="dropdown-control">
                        <Dropdown
                            menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: ['1'],  
                            onClick: handlePeriodMenuClick
                            }}
                            placement="bottom"
                        >
                            <div className="dropdown">
                                <p>Рік</p>
                                <div className="arrow down"><BlackArrowIcon/></div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className="yearly-carousel">
                <ConfigProvider locale={locale}>

                <Carousel dots={false} afterChange={switchYear} ref={carouselRef}>
                        {
                            yearRange.map((year) => (
                                <div>
                                    <div className='calendar-main'>
                                    {
                                        [0,1,2].map((quarter) => (
                                            <div className='calendar-main-row'>
                                                {
                                                    [1,2,3,4].map((monthNumb) => (
                                                        <div className='calendar-main-row-month-wrapper'>
                                                            <a className="calendar-main-row-month-title" onClick={() => redirectToMonthCalendar(quarter*4+monthNumb - 1)}>{months[quarter*4+monthNumb - 1]}</a>
                                                            <div className="calendar-main-row-month-content">
                                                                <Calendar value={dayjs(`${year}-${quarter*4+monthNumb}-01`)} fullscreen={false} headerRender={false} fullCellRender={cellRender}/>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                    </div>
                                </div>
                            ))
                        }
                </Carousel>
                </ConfigProvider>
            </div>
        </div>
    </>
);
  }
  
  export default YearlyCalendar;
  