const { exec } = require('child_process')
const yaml = require('js-yaml')

const yamlParse = (stdout) => {
    const strArr = []
    for (let i = stdout.length - 1, cnt = 0; i; i--) {
        if (cnt >= 5) break
        if (stdout[i] == 'S' || cnt >= 3) cnt++
        strArr.unshift(stdout[i])
    }

    const resultYaml = strArr.join("")
    const obj = yaml.load(resultYaml, { encoding: 'utf-8' })
    return JSON.parse(JSON.stringify(obj))
}

const getArtillery = (req, res) => {
    const {
        address,
        duration,
        arrivalRate,
        clientCount
    } = req.body

    if (!address || !duration || !arrivalRate || !clientCount) {
        res.status(412).json({ error: "empty" })
    }

    if (typeof address !== "string" || typeof duration !== "number" || typeof arrivalRate !== "number" || typeof clientCount !== "number") {
        res.status(412).json({ error: "type" })
    }

    if (arrivalRate * clientCount > 1000) {
        res.status(401).json({ error: "auth" })
    }

    else {
        const query = `artillery quick --duration ${duration} --rate ${arrivalRate} -n ${clientCount} ${address}`
        console.log(query)
        try {
            exec(query, (error, stdout, stderr) => {
                if (error || stderr) res.status(400).json({ error: 'exec error' })
                const resultJson = yamlParse(stdout)
                res.status(200).json(resultJson)
            })
        } catch {
            res.status(400).json({ error: 'exec error' })
        }

    }
}

module.exports = {
    getArtillery
}