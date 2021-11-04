export const today = new Date();

export const isMorning = () => {
    return today.getHours() > 0 && today.getHours() <= 12;
}

export const isAfternoon = () => {
    return today.getHours() > 12 && today.getHours() <= 18;
}

export const getLayoutStyling = () => {
    return isMorning() ? 'morning-layout' : isAfternoon() ? 'afternoon-layout' : 'evening-layout';
}

export const getCalendarLayoutStyling = () => {
    return isMorning() ? 'morning-calendar-layout' : isAfternoon() ? 'afternoon-calendar-layout' : 'evening-calendar-layout';
}

export const getDayOfWeekColor = () => {
    return isMorning() ? '#595959' : isAfternoon() ? '#595959' : '#FFFFFF';
}

export const getTimeOfDayBorder = () => {
    return isMorning() ? '1px solid #595959' : isAfternoon() ? '1px solid #595959' : '1px solid #FFFFFF';
}

export const getButtonStyling = () => {
    return isMorning() ? 'morning-button-styling' : isAfternoon() ? 'afternoon-button-styling' : 'evening-button-styling';
}

export const getClearButtonStyling = () => {
    return isMorning() ? 'morning-clear-button-styling' : isAfternoon() ? 'afternoon-clear-button-styling' : 'evening-clear-button-styling';
}

export const getSigninButtonStyling = () => {
    return isMorning() ? 'morning-signin-button-styling' : isAfternoon() ? 'afternoon-signin-button-styling' : 'evening-signin-button-styling';
}

export const getPromptStyling = () => {
    return isMorning() ? 'prompt-styling' : isAfternoon() ? 'prompt-styling' : 'evening-prompt-styling'; 
}

export const getTabStyling = () => {
    return isMorning() ? 'morning-tab' : isAfternoon() ? 'afternoon-tab' : 'evening-tab';
}

export const getActivatedTabStyling = () => {
    return isMorning() ? 'morning-tab-activated' : isAfternoon() ? 'afternoon-tab-activated' : 'evening-tab-activated';
}

export const getTabFill = () => {
    return isMorning() ? '#FDB573' : isAfternoon() ? '#69C1F2' : '#96B3FF';
}

export const getDeactivatedTabStyling = () => {
    return isMorning() ? 'morning-tab-deactivated' : isAfternoon() ? 'afternoon-tab-deactivated' : 'evening-tab-deactivated';
}