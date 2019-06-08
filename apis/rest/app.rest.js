const express = require('express');
const bodyParser = require('body-parser');

const  userService = require('../services/user.service');
const  playListService = require('../services/playlist.service');
const  trackService = require('../services/track.service');

// Create a new express application instance
const app = express();


app.use(bodyParser.json());

// user routes
const USERS_PATH = 'users';
app.post(`/${USERS_PATH}`, userService.create);

app.put(`/${USERS_PATH}/:id`, userService.update);

app.get(`/${USERS_PATH}`, userService.getAll);

app.get(`/${USERS_PATH}/:id`, userService.getById);

// playlist routes
const PLAYLIST_PATH = 'playlists';
app.post(`/${PLAYLIST_PATH}`, playListService.create);

app.put(`/${PLAYLIST_PATH}/:id`, playListService.update);

app.get(`/${USERS_PATH}/:user_id/${PLAYLIST_PATH}`, playListService.getAll);

app.get(`/${USERS_PATH}/:user_id/${PLAYLIST_PATH}/:id`, playListService.getById);

// user routes
const TRACKS_PATH = 'tracks';
app.post(`/${TRACKS_PATH}`, trackService.create);

app.put(`/${TRACKS_PATH}/:id`, trackService.update);

app.get(`/${TRACKS_PATH}`, trackService.getAll);

app.get(`/${TRACKS_PATH}/:id`, trackService.getById);

app.listen(3000, function () {
  console.log('Servidor - API Rest rodando na porta 3000');
});