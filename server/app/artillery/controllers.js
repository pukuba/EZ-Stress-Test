const { exec } = require('child_process')
const yaml = require('js-yaml')

const yamlLoop = (str, cnt, idx) => {
    if (cnt == 5) return ""
    if (str[idx] == 'S' || cnt >= 3) cnt++
    return yamlLoop(str, cnt, idx - 1) + str[idx]
}

const yamlParse = (stdout) => {
    const resultString = yamlLoop(stdout, 0, stdout.length - 1)
    return obj = yaml.load(resultString, { encoding: 'utf-8' })
}

const isURL = (url) => {
    const str = /^http[s]?\:\/\//i
    return str.test(url)
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

    else if (typeof address !== "string" || typeof duration !== "number" || typeof arrivalRate !== "number" || typeof clientCount !== "number") {
        res.status(412).json({ error: "type" })
    }

    else if (arrivalRate * clientCount > 1000 || duration > 30) {
        res.status(401).json({ error: "auth" })
    }

    else if (!isURL(address)) {
        res.status(412).json({ error: "url" })
    }

    else if (duration < 0 || arrivalRate < 0 || clientCount < 0) {
        res.status(412).json({ error: "minus" })
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
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: 'exec error' })
        }

    }
}

module.exports = {
    getArtillery
}