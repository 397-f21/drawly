import Button from 'react-bootstrap/Button'

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
        <div>
            <Button onClick={prevMonth}>Prev</Button>
            <Button onClick={nextMonth}>Next</Button>
        </div>
    )
}

export default CalendarNav;