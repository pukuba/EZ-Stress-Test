const path = require('path')
const routesPath = path.join(__dirname, `../app/*/routes.js`)

const swaggerDefinition = {
    "info": {
        "title": "EZ-SERVER-STRESS_TEST",
        "version": "1.0.0",
        "description": "REST API"
    },
    "basePath": "/",
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/artillery": {
            "post": {
                "description": "Get Stress",
                "parameters": [
                    {
                        "name": "Stress",
                        "in": "body",
                        "schema": {
                            "$ref": "#/definitions/Stress"
                        }
                    }
                ]
                ,
                "responses": {
                    "200": {
                        "description": "Success"
                    },
                    "400": {
                        "description": "Error"
                    }
                }
            }
        }
    },
    "definitions": {
        "Stress": {
            "required": [
                "address",
                "duration",
                "arrivalRate",
                "clientCount"
            ],
            "properties": {
                "address": {
                    "type": "string"
                },
                "duration": {
                    "type": "integer"
                },
                "arrivalRate": {
                    "type": "integer"
                },
                "clientCount": {
                    "type": "integer"
                }
            }
        }
    }
}

const options = {
    swaggerDefinition,
    apis: [routesPath]
}

module.exports = options