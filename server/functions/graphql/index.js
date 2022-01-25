const { GraphQLServer } = require('graphql-yoga');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const firebase = require('firebase-admin');

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: (context) => {
        return ({
            ...context.request.headers,
            db: firebase.firestore()
        })
    }
});

server.createHttpServer({ cors: true });
server.express.use((req,res, next)=> {
    console.log(req.headers)
    next();
})

module.exports = server.express;