const { spawn } = require('child_process')

spawn("artillery quick --duration 3 --rate 10 -n 20 https://blog.outsider.ne.kr/", (err,))