$(function() {
    var appApiKeys = [
        'm776869201-5fb62143a517518855535060', // Beef calc
        'm777533370-d0c467f7d0d2a4f5f5fe55e5' // data cap
    ];
    
    var sitesApiKeys = [
        'm776200798-7f01a10f2fa63a5e45f5b05b' // personal site
    ];

    var anySitesDown = false;

    loadMonitorsInCategory(appApiKeys, '#apps');
    loadMonitorsInCategory(sitesApiKeys, '#sites');

    $(document).ajaxStop(function() {
        $('.overall-status').removeClass('status-intermediate');
        if (anySitesDown) {
            $('.overall-status').addClass("status-error");
            $('.overall-status .site-summary').html('There is a disruption in service.');
        }
        else {
            $('.overall-status').addClass("status-operational");
            $('.overall-status .site-summary').html('All systems available.');
        }
    });


    function loadMonitorsInCategory(apiKeys, categorySelector) {
        $(apiKeys).each(function() {
            var url = 'https://api.uptimerobot.com/getMonitors?logs=1&alertContacts=1&responseTimes=1&statuses=1-2&responseTimesAverage=180&customUptimeRatio=30&format=json&noJsonCallback=1&apiKey=' + this;
            $.getJSON(url, function(result) {
                var monitor = result.monitors.monitor[0];
                loadTplForMonitor(monitor, categorySelector);
            });
        });
    }

    function loadTplForMonitor(monitor, categorySelector) {
        var path = '/tpl/up.html';
        if (monitor.status != 2) {
            path = '/tpl/down.html';
            anySitesDown = true;
        }

        $.get(path, null, function(result) {
            var finalTemplate = result;
            finalTemplate = finalTemplate.replace("{{monitor.name}}", monitor.friendlyname);
            finalTemplate = finalTemplate.replace("{{monitor.uptime}}", monitor.alltimeuptimeratio);
            finalTemplate = finalTemplate.replace("{{monitor.link}}", monitor.url);
            finalTemplate = finalTemplate.replace("{{monitor.checktime}}", monitor.responsetime[0].datetime);
            finalTemplate = finalTemplate.replace("{{monitor.responsetime}}", monitor.responsetime[0].value);
            
            $(categorySelector).append(finalTemplate);

            $('.site.site-status .site-summary').unbind('click');
            $('.site.site-status .site-summary').click(function() {
                $(this).parents().children('.site-details').toggleClass('hidden');
                $(this).toggleClass('rounded');
                $(this).toggleClass('rounded-top');
            });

        });
    }

});

