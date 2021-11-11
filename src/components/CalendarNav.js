import {getButtonStyling} from '../utilities/time.js';

const CalendarNav = ({year, setYear, month, setMonth}) => {

    const prevMonth = () => {
        if (month === 0) {
            setYear(year-1);
        }
        setMonth((month + 11) % 12)
    }

    const nextMonth = () => {
        if (month === 11) {
            setYear(year+1)
        }
        setMonth((month + 1) % 12)
    }

    return (
        <div className='date-control'>
            {/* <Button className='button-styling' style={{ backgroundColor: getButtonStyling() }} onClick={prevMonth}>Prev</Button>
            <Button className='button-styling' style={{ backgroundColor: getButtonStyling() }} onClick={nextMonth}>Next</Button> */}
            <h1 className='prev' style={{color: getButtonStyling()}} onClick={prevMonth}> &#60; </h1>
            <h1 className='next' style={{color: getButtonStyling()}} onClick={nextMonth}> &#62; </h1>
        </div>
    )
}

export default CalendarNav;