import * as React from "react";
import { useState } from 'react';
import { useData, useUserState } from '../utilities/firebase.js';
import Image from 'react-bootstrap/Image'
import ReactModal from 'react-modal';
import Icon from './Icon'
import {isMorning, isAfternoon} from '../App.js';

const MONTH_MAP = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DATE_TO_GRID = [
    'a00', 'a10', 'a20', 'a30', 'a40', 'a50', 'a60',
    'a01', 'a11', 'a21', 'a31', 'a41', 'a51', 'a61',
    'a02', 'a12', 'a22', 'a32', 'a42', 'a52', 'a62',
    'a03', 'a13', 'a23', 'a33', 'a43', 'a53', 'a63',
    'a04', 'a14', 'a24', 'a34', 'a44', 'a54', 'a64',
    'a05', 'a15', 'a25', 'a35', 'a45', 'a55', 'a65'
]

const today = new Date();

const getCalendarLayoutStyling = (today) => {
    return isMorning(today) ? 'morning-calendar-layout' : isAfternoon(today) ? 'afternoon-calendar-layout' : 'evening-calendar-layout';
}

const Calendar = () => {
    const [user] = useUserState();
    const [images, loading, error] = useData(user ? user.uid : "no_user");

    const generateCalendar = () => {
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstOfMonthDay = new Date(year, month, 1).getDay();
        const lastOfMonthDay = new Date(year, month + 1, 0).getDate();
        const mapRange = Array.from({ length: lastOfMonthDay }, (_, i) => DATE_TO_GRID[firstOfMonthDay + i]);
        console.log(mapRange)
        return (
            mapRange.map(thisGridArea => {
                return (
                    <div className='calendar-entry-empty' style={{ gridArea: thisGridArea }}></div>
                )
            })
        )
    }

    const generateCalendarRange = () => {
        const year = today.getFullYear();
        const month = today.getMonth();
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
            return (imageDateMonth === today.getMonth()) ? <Icon key={key} svg={`data:image/svg+xml;utf8,${encodeURIComponent(images[key])}`} loc={mapRange[imageDateIndex]} /> : null;
        }
        ));
    }

    return (
        <div className={getCalendarLayoutStyling(today)}>
            <h2>{MONTH_MAP[today.getMonth()] + ' ' + today.getFullYear()}</h2>
            <div className='calendar-grid'>
                <h1 style={{ gridArea: 'dd0' }}>SU</h1>
                <h1 style={{ gridArea: 'dd1' }}>MO</h1>
                <h1 style={{ gridArea: 'dd2' }}>TU</h1>
                <h1 style={{ gridArea: 'dd3' }}>WE</h1>
                <h1 style={{ gridArea: 'dd4' }}>TH</h1>
                <h1 style={{ gridArea: 'dd5' }}>FR</h1>
                <h1 style={{ gridArea: 'dd6' }}>SA</h1>
                {generateCalendar()}
                {loading ? <p>Images Loading</p> : formattedImages()}
            </div>
        </div>
    )
}
export default Calendar;
