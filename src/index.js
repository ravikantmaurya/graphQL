import { GraphQLServer } from "graphql-yoga";

//demo user data

const users = [{
  id: '1',
  name: 'Ravikant',
  email: 'abc@gmail.com',
  age: 30
},{
  id: '2',
  name: 'John',
  email: 'john@gmail.com',
  age: 29
},{
  id: '3',
  name: 'Jane',
  email: 'jane@gmail.com'
}]

// demo post data

const posts = [{
  id: '1',
  title: 'Spiderman',
  body: 'He is neighbourhood friendly hero.',
  published: false,
  author: '1'
  },
  {
    id: '2',
    title: 'Superman hero',
    body: 'There is a exceptional way of doing unimaganable things.',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'Batman',
    body: 'He has built his own suit.',
    published: true,
    author: '2'
  }
]

const comments = [
  {
  id: 23,
  text: 'This worked well for me. Thanks!',
  author: '1'
  },
  {
  id: 24,
  text: 'Glad you made it.',
  author: '2'
  },
  {
  id: 25,
  text: 'That didnt worked for me.',
  author: '3'
  },
  {
  id: 26,
  text: 'Dont worry, ill work it out.',
  author: '1'
  },
]

//Type definations (schema)
const typeDefs = `
    type Query{
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }
    type User{
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post{
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
    }

    type Comment{
      id: ID!
      text: String!
      author: User!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info){
      if(!args.query){
        return users
      }
      return users.filter((user)=>{
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if(!args.query){
        return posts
      }
      return posts.filter((post)=>{
        return post.title.toLowerCase().includes(args.query.toLowerCase()) || 
        post.body.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    comments(parent, args, ctx, info){
      return comments
    },
    me() {
      return {
        id: 'sdsdj132',
        name: "Ravikant Maurya",
        email: "ravikantmaurya@gmail.com",

      }
    },
    post() {
      return {
        id: 'post-1',
        title: "Published Post 1",
        body: "This post is necessary",
        published: true
      }
    } 
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find((user)=> {
        console.log(user)
        return user.id === parent.author
      })
    }
  },
  User: {
    posts(parent, args, ctx, info){
      return posts.filter((post)=>{
        return post.id == parent.id
      })
    }
  },
  Comment: {
    users(parent, args, ctx, info){
      //console.log(parent)
      return users.find((user)=>{
        return user.id == parent.author
      })
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
