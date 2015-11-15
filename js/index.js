console.log('I am Adobe.');
var getId = function(id) {
    return document.getElementById(id);
};
window.onload = function() {
    showTime();
}
function checkTime(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}
function weekDay(day) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}
function monthDay(month) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}
function showTime() {
    var timer = new Date(),
        year = timer.getFullYear(),
        month = monthDay(timer.getMonth()),
        date = checkTime(timer.getDate()),
        day = weekDay(timer.getDay());
    getId("date").innerHTML = day + ", " + month + " " + date + ", " + year;
    setTimeout(showTime, 500);
}
    