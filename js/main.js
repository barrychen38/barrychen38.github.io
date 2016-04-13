console.log('I am Adobe.');
var getId = function(id) {
    return document.getElementById(id);
};
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
function showTime(con) {
    var time = new Date(),
        year = time.getFullYear(),
        month = monthDay(time.getMonth()),
        date = checkTime(time.getDate()),
        day = weekDay(time.getDay());
    con.innerHTML = day + ", " + month + " " + date + ", " + year;
}
    