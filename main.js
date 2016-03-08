(function() {
    var apiKey = 'u147240-04ca80f5f67800d222f88b33';
    var url = 'https://api.uptimerobot.com/getMonitors?logs=1&alertContacts=1&responseTimes=1&responseTimesAverage=180&monitors=15830-32696&customUptimeRatio=30&format=json&apiKey = ' + apiKey;
    
    $.getJson(url, function(result){
        console.log(result);
    });
});

