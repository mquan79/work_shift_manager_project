export const GetDay = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let today = `${year}-${month}-${day}`
    return today
}

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

export const getLastDay = () => {
    let day = date.getDate() - 1;
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

export const compareTimeStringAndHour = (timeString, hourRepresented) => {
    const date = new Date(timeString); 
    const givenHour = parseInt(hourRepresented, 10); 
  
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 
  
    const totalMinutesInGivenHour = givenHour * 60; 
  
    const minuteDifference = Math.abs((hours * 60 + minutes) - totalMinutesInGivenHour); 
  
    return minuteDifference;
}

export const formatDateString = (inputString) => {
    const dateObject = new Date(inputString); 
    const hours = dateObject.getHours(); 
    const minutes = dateObject.getMinutes(); 
    const day = dateObject.getDate(); 
    const month = dateObject.getMonth() + 1; 
    const year = dateObject.getFullYear(); 
  
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  
    return `${formattedTime} ${formattedDate}`;
  }

