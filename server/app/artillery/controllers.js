const { exec } = require('child_process')
const { readFileSync } = require('fs')
const cryptoRandomString = require('crypto-random-string')
const path = require('path')

const filePath = path.join(__dirname, "../../Storage")

const getArtillery = (req, res) => {

    const fileName = cryptoRandomString({ length: 16 });
    const address = req.body.address // 주소
    const duration = req.body.duration // 시간
    const arrivalRate = req.body.arrivalRate // 초당 리퀘스트
    const clientCount = req.body.clientCount // 동시 접속수

    const query = `artillery quick --duration ${duration} --rate ${arrivalRate} -n ${clientCount} ${address} -o ${filePath}/${fileName}.json`

    exec(query, (error, stdout, stderr) => {
        if (error || stderr) res.status(400).error("cammand error")
        const jsonFile = readFileSync(`${filePath}/${fileName}.json`, 'utf-8')
        const json = JSON.parse(jsonFile)
        console.log(json)
        res.status(200).json(json)
    })

}

module.exports = {
    getArtillery
}