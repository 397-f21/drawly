export const today = new Date();

export const isMorning = () => {
    return today.getHours() > 0 && today.getHours() <= 12;
}

export const isAfternoon = () => {
    return today.getHours() > 12 && today.getHours() <= 18;
}

export const getLayoutStyling = () => {
    return isMorning() ? 'linear-gradient(180deg, #FFFFFF 0%, #FFE9AF 100%)' : isAfternoon() ? 'linear-gradient(180DEG, #D1E9FF 0%, rgba(255, 202, 123, 0.57) 100%)' : 'linear-gradient(180deg, #333333 0%, #1F305C 100%)';
}

export const getCalendarLayoutStyling = () => {
    return isMorning() ? '#FDB573' : isAfternoon() ? '#69C1F2' : '#B0C6FF';
}

export const getDayOfWeekColor = () => {
    return isMorning() ? '#595959' : isAfternoon() ? '#595959' : '#FFFFFF';
}

export const getTimeOfDayBorder = () => {
    return isMorning() ? '1px solid #595959' : isAfternoon() ? '1px solid #595959' : '1px solid #FFFFFF';
}

export const getButtonStyling = () => {
    return isMorning() ? '#FDB573' : isAfternoon() ? '#69C1F2' : '#96B3FF';
}

export const getClearButtonStyling = () => {
    return isMorning() ? '#FDB573' : isAfternoon() ? '#69C1F2' : '#96B3FF';
}

export const getSigninButtonStyling = () => {
    return isMorning() ? '#FDB573' : isAfternoon() ? '#69C1F2' : '#69C1F2';
}

export const getDateStyling = () => {
    return isMorning() ? '#FDB573' : isAfternoon() ? '#69C1F2' : '#96B3FF'; 
}

export const getPromptStyling = () => {
    return isMorning() ? 'prompt-styling' : isAfternoon() ? 'prompt-styling' : 'evening-prompt-styling'; 
}

export const getPromptGreeting = () => {
    return isMorning() ? 'Good morning!' : isAfternoon() ? 'Good afternoon!' : 'Good evening!'; 
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