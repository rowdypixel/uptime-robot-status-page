$(function() {
    var apiKeys = [
        'm776869201-5fb62143a517518855535060', // Beef calc
        'm776200798-7f01a10f2fa63a5e45f5b05b' // personal site
    ];

    $(apiKeys).each(function() {
        var url = 'https://api.uptimerobot.com/getMonitors?logs=1&alertContacts=1&responseTimes=1&statuses=1-2&responseTimesAverage=180&customUptimeRatio=30&format=json&noJsonCallback=1&apiKey=' + this;
        $.getJSON(url, function(result) {
            var monitor = result.monitors.monitor[0];
            console.log(monitor);
            if (monitor.status == 2) {
                $.get('/tpl/up.html', null, function(result) {
                    
                    var finalTemplate = result;
                    finalTemplate = finalTemplate.replace("{{monitor.name}}", monitor.friendlyname);
                    finalTemplate = finalTemplate.replace("{{monitor.uptime}}", monitor.alltimeuptimeratio);
                    $('#results').append(finalTemplate);
                });
            }

            else {//if (monitor.status == '1') {

            }
        });
    });
});

