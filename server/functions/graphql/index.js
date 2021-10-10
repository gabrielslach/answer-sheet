const { GraphQLServer } = require('graphql-yoga');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    introspection: true,
    playgroud: true
});

server.createHttpServer({ cors: true });

module.exports = server.express;