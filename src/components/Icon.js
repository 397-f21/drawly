import * as React from "react";
import { useState } from 'react';
import Image from 'react-bootstrap/Image'

import ReactModal from 'react-modal';

const Icon = ({ key, svg, loc }) => {
    const [modalVisible, setModalVisible] = useState(false);

    ReactModal.setAppElement('#root');

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <div className='calendar-entry' style={{ gridArea: loc }}>
            <Image key={key} className='calendar-entry' onClick={openModal} src={svg} roundedCircle />
            <ReactModal isOpen={modalVisible} onRequestClose={closeModal}>
                <div className="modal-text">Filter by Line</div>
                <Image key={key} onClick={openModal} src={svg} roundedCircle />
                <button className="btn btn-primary" onClick={closeModal}>Close</button>
            </ReactModal>
        </div>
    )
}

export default Icon;