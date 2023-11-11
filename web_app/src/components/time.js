const date = new Date();
export const getToday = () => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let today = `${year}-${month}-${day}`
    return today
}

export const getTomorrow = () => {
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let tomorrow = `${year}-${month}-${day}`
    return tomorrow
}

export const getHoursToday = () => {
    let hours = date.getHours();
    return hours;
}

export const getHoursIn = (workshifthours) => {
    let parts = workshifthours.split("-");
    let checkintime = parseInt(parts[0]);
    return checkintime
}

export const getHoursOut = (workshifthours) => {
    let parts = workshifthours.split("-");
    let checkouttime = parseInt(parts[1]);
    return checkouttime
}