const fetch = require('node-fetch')
const assert = require('assert')
const request = require('supertest')
const app = require('../server')

describe(`/artillery Test`, () => {
    it(`Test Success Case - 1`, async () => {
        const data = {
            address: 'https://pukuba.ga:2004',
            duration: 3,
            arrivalRate: 5,
            clientCount: 15
        }
        const res = await request(app)
            .post("/artillery")
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data))
            .expect(200)

        assert.strictEqual(res.body[`Scenarios launched`], 15)
        assert.strictEqual(res.body[`Scenarios completed`], 15)
        assert.strictEqual(res.body[`Requests completed`], 225)
        assert.strictEqual(res.body[`Scenario counts`][0], `15 (100%)`)
        assert.strictEqual(res.body.Codes[`200`], 225)

    }).timeout(505050)


    it(`Test Success Case - 2`, async () => {
        const data = {
            address: 'https://pukuba.ga:2004',
            duration: 1,
            arrivalRate: 1,
            clientCount: 1
        }
        const res = await request(app)
            .post("/artillery")
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data))
            .expect(200)

        assert.strictEqual(res.body[`Scenarios launched`], 1)
        assert.strictEqual(res.body[`Scenarios completed`], 1)
        assert.strictEqual(res.body[`Requests completed`], 1)
        assert.strictEqual(res.body[`Scenario counts`][0], `1 (100%)`)
        assert.strictEqual(res.body.Codes[`200`], 1)

    }).timeout(505050)

    it(`Test Failed Case - 1`, async () => {
        const data = {
            address: "https://pukuba.ga:2004",
            duration: 100,
            arrivalRate: 33,
            clientCount: 55
        }
        const res = await request(app)
            .post("/artillery")
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data))
            .expect(401)

        assert.strictEqual(res.body.error, "auth")

    }).timeout(505050)

    it(`Test Failed Case - 2`, async () => {
        const data = {
            address: 'localhost',
            duration: 1,
            arrivalRate: 1,
            clientCount: 1
        }
        const res = await request(app)
            .post("/artillery")
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data))
            .expect(412)

        assert.strictEqual(res.body.error, "url")
    }).timeout(505050)
})