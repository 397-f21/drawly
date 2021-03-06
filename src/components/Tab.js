import {getTabStyling, getActivatedTabStyling, getTabFill, getDeactivatedTabStyling} from '../utilities/time.js';

const today = new Date();

const Tab = ({mode, swapMode}) => {
    return(
        <div className={getTabStyling(today)}>
            <div data-testid="draw-tab" data-cy="draw-tab" onClick={() => swapMode()} className={mode === 'draw' ? getActivatedTabStyling() : getDeactivatedTabStyling()}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.375 11.75C18.4105 11.75 19.25 10.9105 19.25 9.875C19.25 8.83947 18.4105 8 17.375 8C16.3395 8 15.5 8.83947 15.5 9.875C15.5 10.9105 16.3395 11.75 17.375 11.75Z" fill={mode === 'draw' ? 'white' : getTabFill()}/>
                    <path d="M8.625 11.75C9.66053 11.75 10.5 10.9105 10.5 9.875C10.5 8.83947 9.66053 8 8.625 8C7.58947 8 6.75 8.83947 6.75 9.875C6.75 10.9105 7.58947 11.75 8.625 11.75Z" fill={mode === 'draw' ? 'white' : getTabFill()}/>
                    <path d="M13 18C11.15 18 9.5625 16.9875 8.6875 15.5H6.6C7.6 18.0625 10.0875 19.875 13 19.875C15.9125 19.875 18.4 18.0625 19.4 15.5H17.3125C16.4375 16.9875 14.85 18 13 18ZM12.9875 0.5C6.0875 0.5 0.5 6.1 0.5 13C0.5 19.9 6.0875 25.5 12.9875 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 12.9875 0.5ZM13 23C7.475 23 3 18.525 3 13C3 7.475 7.475 3 13 3C18.525 3 23 7.475 23 13C23 18.525 18.525 23 13 23Z" fill={mode === 'draw' ? 'white' : getTabFill()}/>
                </svg>
            </div>
            <div data-testid='cal-tab' onClick={() => swapMode()} className={mode === 'calendar' ? getActivatedTabStyling() : getDeactivatedTabStyling()}>
                <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8333 2.12499H17.7917V0.0416565H15.7083V2.12499H5.29168V0.0416565H3.20834V2.12499H2.16668C1.02084 2.12499 0.0833435 3.06249 0.0833435 4.20832V20.875C0.0833435 22.0208 1.02084 22.9583 2.16668 22.9583H18.8333C19.9792 22.9583 20.9167 22.0208 20.9167 20.875V4.20832C20.9167 3.06249 19.9792 2.12499 18.8333 2.12499ZM18.8333 20.875H2.16668V9.41665H18.8333V20.875ZM18.8333 7.33332H2.16668V4.20832H18.8333V7.33332Z" fill={mode === 'calendar' ? 'white' : getTabFill()}/>
                </svg>
            </div>
        </div>
    )
}

export default Tab;