

getCurrentTime = () => {
    const time = new Date().toLocaleString("sv", {timeZone: "Asia/Seoul"}).replace(/\s/g, "T");
    console.log(time);
    return time;
}

module.exports = {getCurrentTime};