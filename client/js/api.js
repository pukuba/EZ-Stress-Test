const endpoint = 'https://pukuba.ga/artillery'

const get_lists = async (address, duration, arrivalRate, clientCount) => {
    const query = {
        address,
        duration,
        arrivalRate,
        clientCount
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    });
    const result = await response.json()

    return result
}

const api = async () => {
    document.getElementById("end").style.display = "block"
    document.getElementById("result").style.display = "none"
    document.getElementById("load").style.display = "block"

    fnMove()

    const val = document.getElementById("forms")

    let all_list = await get_lists(val[0].value, Number(val[2].value), Number(val[3].value), Number(val[4].value))
    document.getElementById("result").style.display = "block"
    document.getElementById("load").style.display = "none"

    if (all_list["Error"] != undefined || val[3].value * val[4].value >= 1000) {
        document.getElementById("result").innerHTML = "<h1 style='text-align: center;'>Error</h1>"
        document.getElementById("result").style.backgroundColor = "rgba(204, 91, 73, 0.1)"
        document.getElementById("result").style.borderColor = "#CC5B49"
    }
    else {
        //print time
        test_time()

        document.getElementById("json").textContent = JSON.stringify(all_list, undefined, 2)

        //print Codes
        if (all_list["Codes"][200] == undefined) all_list["Codes"][200] = "Null"
        if (all_list["Codes"][400] == undefined) all_list["Codes"][400] = "Null"

        document.getElementById("end_200").innerHTML = all_list["Codes"][200]
        document.getElementById("end_400").innerHTML = all_list["Codes"][400]

        //print Scenario Counts
        document.getElementById("scenario_0").innerHTML = all_list["Scenario counts"][0]

        //chart
        document.getElementById("chartContainer").innerHTML = '&nbsp;'
        document.getElementById("chartContainer").innerHTML = '<canvas id="myChart" width="500" height="400"></canvas>'
        const ctx = document.getElementById('myChart').getContext('2d')
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Max', 'Median', 'Min', 'p95', 'p99'],
                datasets: [{
                    label: 'Response time (msec)',
                    data: [all_list["Response time (msec)"]["max"], all_list["Response time (msec)"]["median"], all_list["Response time (msec)"]["min"], all_list["Response time (msec)"]["p95"], all_list["Response time (msec)"]["p99"]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ]
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

function test_time() {
    var now = new Date()
    now = now.toUTCString()
    document.getElementById("time").innerHTML = "Test Time : " + now
}

function fnMove() {
    const offset = $("#end").offset()
    $('html, body').animate({ scrollTop: offset.top }, 0)
}