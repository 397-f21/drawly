import * as React from "react";
import { useState } from 'react';
import { useData, useUserState } from '../utilities/firebase.js';
import Icon from './Icon'
import { today, getCalendarLayoutStyling, getDayOfWeekColor, getTimeOfDayBorder } from '../utilities/time.js';
import styled from 'styled-components';
import CalendarNav from './CalendarNav';

const MONTH_MAP = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DATE_TO_GRID = [
    'a00', 'a10', 'a20', 'a30', 'a40', 'a50', 'a60',
    'a01', 'a11', 'a21', 'a31', 'a41', 'a51', 'a61',
    'a02', 'a12', 'a22', 'a32', 'a42', 'a52', 'a62',
    'a03', 'a13', 'a23', 'a33', 'a43', 'a53', 'a63',
    'a04', 'a14', 'a24', 'a34', 'a44', 'a54', 'a64',
    'a05', 'a15', 'a25', 'a35', 'a45', 'a55', 'a65'
]

const Div = styled.div`h2 {color: ${getCalendarLayoutStyling()}}`; // a custom "styled-component" div with programmatic h2 coloring

const Calendar = () => {
    const [user] = useUserState();
    const [images, loading, error] = useData(user ? user.uid : "no_user");
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const generateCalendar = () => {
        const firstOfMonthDay = new Date(year, month, 1).getDay();
        const lastOfMonthDay = new Date(year, month + 1, 0).getDate();
        const mapRange = Array.from({ length: lastOfMonthDay }, (_, i) => DATE_TO_GRID[firstOfMonthDay + i]);
        return (
            mapRange.map(thisGridArea => {
                return (
                    <div key={thisGridArea} className='calendar-entry-empty' style={{ gridArea: thisGridArea, border: getTimeOfDayBorder() }}></div>
                )
            })
        )
    }

    const generateCalendarRange = () => {
        const firstOfMonthDay = new Date(year, month, 1).getDay();
        const lastOfMonthDay = new Date(year, month + 1, 0).getDate();
        const mapRange = Array.from({ length: lastOfMonthDay }, (_, i) => DATE_TO_GRID[firstOfMonthDay + i]);
        return mapRange;
    }

    const formattedImages = () => {
        const mapRange = generateCalendarRange();
        return (Object.keys(images ?? {}).map(key => {
            const imageDateIndex = new Date(key).getDate() - 1;
            const imageDateMonth = new Date(key).getMonth();
            return (imageDateMonth === month) ? <Icon key={key} date_string={key} svg={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} loc={mapRange[imageDateIndex]} /> : null;
        }
        ));
    }

    return (
        // See definition of "Div" above for explanation
        <Div className='calendar-layout' data-testid="cal" data-cy="cal">
            <div className='date-utils'>
                <h2>{MONTH_MAP[month] + ' ' + year}</h2>
                <CalendarNav year={year} setYear={setYear} month={month} setMonth={setMonth} />
            </div>
            <div className='calendar-grid'>
                <h1 style={{ gridArea: 'dd0', color: getDayOfWeekColor() }}>SU</h1>
                <h1 style={{ gridArea: 'dd1', color: getDayOfWeekColor() }}>MO</h1>
                <h1 style={{ gridArea: 'dd2', color: getDayOfWeekColor() }}>TU</h1>
                <h1 style={{ gridArea: 'dd3', color: getDayOfWeekColor() }}>WE</h1>
                <h1 style={{ gridArea: 'dd4', color: getDayOfWeekColor() }}>TH</h1>
                <h1 style={{ gridArea: 'dd5', color: getDayOfWeekColor() }}>FR</h1>
                <h1 style={{ gridArea: 'dd6', color: getDayOfWeekColor() }}>SA</h1>
                {generateCalendar()}
                {loading ? <p>Images Loading</p> : error ? <p>Error loading images</p> : formattedImages()}
            </div>
            {/* <CalendarNav year={year} setYear={setYear} month={month} setMonth={setMonth} /> */}
        </Div>
    )
}
export default Calendar;
