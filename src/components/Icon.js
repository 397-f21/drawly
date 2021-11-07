import * as React from "react";
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import ReactModal from 'react-modal';
import { getModalDateColor } from "../utilities/time";
import { getTimeOfDayBorder } from '../utilities/time.js';

const DAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const customStyles = {
    overlay:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const Icon = ({ date_string, svg, loc }) => {
    const [modalVisible, setModalVisible] = useState(false);

    ReactModal.setAppElement('#root');

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const getDate = (date_string) => {
        const date = new Date(date_string);
        const month = MONTH_MAP[date.getMonth()];
        const day = DAY_MAP[date.getDay()];
        const this_date = date.getDate();
        return day + ', ' + month + ' ' + this_date;
    }

    return (
        <div className='calendar-entry-wrapper' style={{ gridArea: loc }}>
            <Image key={date_string} className='calendar-entry' onClick={openModal} src={svg} roundedCircle style={{border: getTimeOfDayBorder()}}/>
            <ReactModal isOpen={modalVisible} onRequestClose={closeModal} className="modal-styling" style={customStyles}>
                <div onClick={closeModal}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8333 5.34167L14.6583 4.16667L9.99996 8.82501L5.34163 4.16667L4.16663 5.34167L8.82496 10L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 10L15.8333 5.34167Z" fill="#DCDCDC"/>
                        </svg>
                </div>
                <div className="modal-text">Your drawing on</div>
                <div className="modal-text-date" style = {{color: getModalDateColor()}}>{getDate(date_string)}</div>
                <Image key={date_string} className='modal-face' onClick={openModal} src={svg} roundedCircle />
            </ReactModal>
        </div>
    )
}

export default Icon;