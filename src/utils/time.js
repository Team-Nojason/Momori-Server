

dateToDateTime = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}


getCurrentTime = () => {
    return dateToDateTime(new Date());
}

module.exports = {dateToDateTime, getCurrentTime}