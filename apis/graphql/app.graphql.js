const express = require('express');
const expressGrapql = require('express-graphql');
const { buildSchema } = require('graphql');

const userService = require('../services/user.service');
const playListService = require('../services/playlist.service');

const schema = buildSchema(`
  type User {
    id: Int
    firstName: String
    lastName: String
    playlists: [Playlist]
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

  type Mutation {
    saveUser(firstName: String!, lastName: String!): User
    updateUser(id: Int!, firstName: String, lastName: String): User
  }

  type Query {
    users: [User]
    user(id: Int!): User
    playlists(id: Int!): [Playlist]
  }
`)

const root = {
  playlists: () => 'Hello world',
  users: () => userService.getAll(),
  user: (params) => userService.getById({ id: params.id }),
  saveUser: (params) => userService.create(params),
  updateUser: (params) => userService.update(params),
  playlists: (params) => playListService.getAll({ user_id: params.id }),
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