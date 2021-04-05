
//https://socket.io/docs/v3/client-initialization/
let potValue = 0

const socket = io() 

socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('potValue', (data) => {
    document.getElementById('potValue').innerHTML = data
    console.log(data)
    potValue = data
})

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['My Potentiometer', 0],
]);

var options = {
    width: 1400, height: 1120,
    min: 0, max: 1024,
    minorTicks: 5
};

var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

chart.draw(data, options);

setInterval(function() {
    data.setValue(0, 1, potValue);
    chart.draw(data, options);
}, 100);
setInterval(function() {
    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
}, 5000);
setInterval(function() {
    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
    chart.draw(data, options);
}, 26000);
}