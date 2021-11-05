import * as React from "react";
import Button from 'react-bootstrap/Button'
import {getClearButtonStyling} from '../utilities/time'

export const ClearButton = React.forwardRef((props, ref) => (
    <Button
        data-testid='clear-button' onClick={() => ref.current.clearCanvas()} className='clear-button-styling' style={{ background: getClearButtonStyling() }}>
        Clear Canvas
    </Button>
));

export const Undo = React.forwardRef((props, ref) => (
    <div onClick={() => ref.current.undo()} className="tool-circle" data-testod='undo-button'>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.2292 11.6667C14.3646 11.6667 10.8646 13.1104 8.16666 15.4583L2.91666 10.2083V23.3333H16.0417L10.7625 18.0542C12.7896 16.3625 15.3708 15.3125 18.2292 15.3125C23.3917 15.3125 27.7812 18.6812 29.3125 23.3333L32.7687 22.1958C30.7417 16.0854 25.0104 11.6667 18.2292 11.6667Z" fill="white" />
        </svg>
    </div>
));

export const ColorTool = ({ coloringType, color, setColor, setBackgroundImage }) => {
    // coloringType is one of 'stroke', 'canvas'

    return (
        <div className='tool-circle-wrap'>
            <div className='tool-circle'
                style={{ backgroundColor: color }}>
                {coloringType === 'stroke' ? (
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_172:24)">
                            <path d="M21.0125 11.1749L16.325 6.48743L5 17.8124V22.4999H9.6875L21.0125 11.1749ZM7.5 19.9999V18.8499L16.325 10.0249L17.475 11.1749L8.65 19.9999H7.5Z" fill="white" />
                            <path d="M27.5 25H2.5V30H27.5V25Z" fill="white" />
                            <path d="M24.6375 7.55C25.125 7.0625 25.125 6.275 24.6375 5.7875L21.7125 2.8625C21.4625 2.6125 21.15 2.5 20.825 2.5C20.5125 2.5 20.1875 2.625 19.95 2.8625L17.6625 5.15L22.35 9.8375L24.6375 7.55Z" fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_d_172:24" x="-1.5" y="-1.5" width="33" height="35.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_172:24" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_172:24" result="shape" />
                            </filter>
                        </defs>
                    </svg>) : coloringType === 'canvas' ? (
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_58:1072)">
                                <path d="M20.7 11.175L9.525 0L7.7625 1.7625L10.7375 4.7375L4.3 11.175C3.5625 11.9125 3.5625 13.1 4.3 13.825L11.175 20.7C11.5375 21.0625 12.025 21.25 12.5 21.25C12.975 21.25 13.4625 21.0625 13.825 20.7L20.7 13.825C21.4375 13.1 21.4375 11.9125 20.7 11.175ZM6.5125 12.5L12.5 6.5125L18.4875 12.5H6.5125ZM23.75 14.375C23.75 14.375 21.25 17.0875 21.25 18.75C21.25 20.125 22.375 21.25 23.75 21.25C25.125 21.25 26.25 20.125 26.25 18.75C26.25 17.0875 23.75 14.375 23.75 14.375ZM2.5 25H27.5V30H2.5V25Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_58:1072" x="-1.5" y="-4" width="33" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_58:1072" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_58:1072" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    ) : null}
                <input
                    type="color"
                    className='tool-circle'
                    style={{ opacity: 0 }}
                    data-testid={`${coloringType}-color-input`}
                    value={color}
                    onChange={(e) => {
                        setColor(e.target.value);
                        setBackgroundImage('');
                    }}></input>
            </div>
        </div >
    )
}