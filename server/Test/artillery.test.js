const fetch = require('node-fetch')
const assert = require('assert')

const endPoint = `http://localhost:1008/artillery`

describe(`/artillery Test`, () => {
    it(`Local Test - 1`, async () => {
        const data = {
            address: endPoint,
            duration: 1,
            arrivalRate: 1,
            clientCount: 1
        }
        const result = await fetch(endPoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await result.json()
        assert.strictEqual(json['Scenarios launched'], 1)
        assert.strictEqual(json['Scenarios completed'], 1)
        assert.strictEqual(json['Requests completed'], 1)
        assert.strictEqual(json.Codes['404'], 1)
    })

    it(`Local Test - 2`, async () => {
        const data = {
            address: endPoint,
            duration: 1,
            arrivalRate: 100,
            clientCount: 10
        }
        const result = await fetch(endPoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await result.json()
        assert.strictEqual(json['Scenarios launched'], 100)
        assert.strictEqual(json['Scenarios completed'], 100)
        assert.strictEqual(json['Requests completed'], 1000)
        assert.strictEqual(json.Codes['404'], 1000)
    })

    it(`Local Test - 3`, async () => {
        const data = {
            address: endPoint,
            duration: 5,
            arrivalRate: 10,
            clientCount: 100
        }
        const result = await fetch(endPoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await result.json()
        assert.strictEqual(json['Scenarios launched'], 50)
        assert.strictEqual(json['Scenarios completed'], 50)
        assert.strictEqual(json['Requests completed'], 5000)
        assert.strictEqual(json.Codes['404'], 5000)
    })

    it(`Local Test - 4`, async () => {
        const result = await fetch(endPoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await result.json()
        assert.strictEqual(result.status, 400)
        assert.strictEqual(json.error, 'body error')
    })
})