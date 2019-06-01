const express = require('express');
const expressGrapql = require('express-graphql');
const { buildSchema } = require('graphql');


const schema = buildSchema(`
  type User {
    id: Int
    firstName: String
    lastName: String
  }

  type Track {
    id: Int
    name: String
    author: String
  }

  type Playlist {
    id: Int
    name: String
    user: User
    tracks: [Track]
  }

  type Query {
    playlists: String
  }
`)

const root = {
  playlists: () => 'Hello world',
}

const app = express();

app.use('/graphql', expressGrapql({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, function () {
  console.log('Servidor - API Rest rodando na porta 3000');
});