
import CalendarData from './CalendarData';

// Monday - 1
// Tuesday - 2
// Wednesday - 3
// Thursday - 4
// Friday - 5
// Saturday - 6
// Sunday - 0
const months = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
]

export const calculateMonthlyData = (month, year) => {
    // Formatting
    let monthData = [];

    if(!year) {
        year = new Date().getFullYear();
    }

    let startDate = new Date(year, month, 1).getDay();

    if(startDate === 0) {
        startDate = 7;
    }
    // Start Calculating Month
    let addDays = 0;
    if(startDate  === 1) {
        addDays = 7;
        let firstRow = [];
        for(let i=1; i<8; i++)
        firstRow.push({number: i, style: 'active', event: CalendarData[months[month]][i.toString()] ? true : false })
        monthData.push(firstRow)
    }
    else {
        let prevDateNumber;
        if(month !== 0)
            prevDateNumber = new Date(year, month, 0);
        else
            prevDateNumber = new Date(year-1, 12, 0);
        let startArrayDate = prevDateNumber.getDate() - (startDate - 2);
        let firstRow = [];
        for(let i=startArrayDate; i<prevDateNumber.getDate()+1; i++)
            firstRow.push({number: i, style: 'inactive prev', event: CalendarData[months[prevDateNumber.getMonth()]][i.toString()] ? true : false});
        let needMoreElements = 8 - firstRow.length;

        for(let j=1; j<needMoreElements; j++)
            firstRow.push({number: j, style: 'active', event: CalendarData[months[month]][j.toString()] ? true : false });
        monthData.push(firstRow);
    }

    let lastElem = monthData[0][6].number;
    let lastDateInMonth = new Date(year, month+1, 0).getDate();


    let index = lastElem + 1;
    let startIndex = 1;

    while(index<=35 + addDays) {
        let j = 0;
        let row = [];
        while(j<7){
        if(index > lastDateInMonth) {
                row.push({number: startIndex, style: 'inactive next', event: CalendarData[months[month == 11 ? 0 : month+1]][startIndex.toString()] ? true : false});
            startIndex += 1;
            }
        else {
            row.push({number: index, style: 'active', event: CalendarData[months[month]][index.toString()] ? true : false});
        }
            j += 1;
        index += 1;
            
        }
        monthData.push(row);
    }

    return monthData;
}
    
    
    
    
    
    
    
    
    
    
    
    
    