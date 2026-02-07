// hoursHandler.js

export const calculateHours = (startTime, endTime, date) => {
    const startFull = new Date(`${date}T${startTime}`);
    const endFull = new Date(`${date}T${endTime}`);


    const diffInMs = endFull - startFull; // calculate the difference in milliseconds

    const roundedTime = roundTimeQuarterHour(diffInMs); // round the time to the nearest quarter-hour

    if (roundedTime.hours < 0) // check if the time is negative
        return {hours: `${roundedTime.hours}:${roundedTime.minutes.toString().padStart(2, '0')}`,
            error: "Negative time.\nPlease check the times and try again."};

    return {hours: `${roundedTime.hours}:${roundedTime.minutes.toString().padStart(2, '0')}`,
        error: null}
}


export const getHourlyRates = (dashboardData, activity) => {
    if (activity === ""){
        return 0.00;
    }

    return dashboardData.rates_map[activity];
}


export const roundTimeQuarterHour = (timeMs) => {

    const totalMinutes = timeMs / (1000 * 60); // convert milliseconds to minutes
    const roundedTotalMinutes = Math.round(totalMinutes / 15) * 15; // round to the nearest 15 minutes

    const hours = Math.floor(roundedTotalMinutes / 60); // get the hours
    const minutes = roundedTotalMinutes % 60; // get the minutes

    return {hours: hours, minutes: minutes}; // return an object with hours and minutes
}