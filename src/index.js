import { GraphQLServer } from "graphql-yoga";

//location
//bio

//Type definations (schema)
const typeDefs = `
    type Query{
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    hello() {
      return `This is my first query`;
    },
    name() {
      return `Ravikant Maurya`;
    },
    location() {
      return `Gurugram`;
    },
    bio() {
      return `I'm  30 years old`;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
