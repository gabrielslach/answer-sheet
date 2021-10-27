const { GraphQLServer } = require('graphql-yoga');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: (context) => (context.request.headers)
});

server.createHttpServer({ cors: true });
server.express.use((req,res, next)=> {
    console.log(req.headers)
    next();
})

module.exports = server.express;