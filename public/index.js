
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
        width: 1000, height: 800,
        min: 0, max: 1024,
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    chart.draw(data, options);

    setInterval(function() {
        data.setValue(0, 1, potValue);
        chart.draw(data, options);
    }, 100);
}