const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const { createServer } = require('http')
require('dotenv').config()

const app = express()

const cors = require('cors')
const resolvers = require('./resolvers')
const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')

const start = () => {
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200,
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        engine: {
            reoirtSchema: true,
            variant: process.env.APOLLO_KEY
        },
    })
    server.applyMiddleware({ app })

    app.get('/', expressPlayground({ endpoint: '/graphql' }))
    app.get('playground', expressPlayground({ endpoint: '/graphql' }))
    app.use(cors(corsOptions))

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT }, () => {
        console.log(`GraphQL Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
}

start()