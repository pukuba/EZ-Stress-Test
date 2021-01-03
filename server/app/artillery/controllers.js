const { exec } = require('child_process')
const path = require('path')
const yaml = require('js-yaml')

const yamlParse = (stdout) => {
    let strArr = [], cnt = 0
    for (let i = stdout.length - 1; i; i--) {
        if (cnt >= 5) break
        if (stdout[i] == 'S' || cnt >= 3) cnt++
        strArr.unshift(stdout[i])
    }
    const resultYaml = strarr.join("")
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

    const query = `artillery quick --duration ${duration} --rate ${arrivalRate} -n ${clientCount} ${address}`

    try {
        exec(query, (error, stdout, stderr) => {
            if (error || stderr) res.status(400).send("exec Error")
            const resultJson = yamlParse(stdout)
            res.status(200).json(resultJson)
        })
    } catch {
        res.status(400).send("exec Error")
    }

}

module.exports = {
    getArtillery
}