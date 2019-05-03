const User = require('../models/User');
const playListService = require('./playlist.service');

const userDB = new Array();

userDB.push(new User(1, 'João', 'das Neves'));
userDB.push(new User(2, 'Neto', 'das Neves'));

let lastId = 2;
const idGenerator = function* () {
  while (true) {
    yield ++lastId;
  }
}

const idIterator = idGenerator();

const create = (args) => {
  const { firstName, lastName } = args;

  const newUser = new User(idIterator.next().value, firstName, lastName);
  userDB.push(newUser);

  return newUser;
}

const update = (args) => {
  const { id } = args;
  const index = userDB.findIndex(user => user.id === Number.parseInt(id));
  if (index < 0) {
    return null;
  }
  const body = args || {};
  const user = userDB[index];
  ['firstName', 'lastName'].forEach((key) => {
    if (!!body[key]) {
      user[key] = body[key];
    }
  });
  const updatedUser = { ...user };
  userDB[index] = updatedUser

  return updatedUser;
};

const getById = (args) => {
  const { id } = args;
  const user = userDB.find(user => user.id === Number.parseInt(id));
  if (!!user) {
    return user;
  }
  return null;
};


const getAll = () => {
  const data = userDB.map(user => {
    const playlists = playListService.playlistDB.map(p => {
      if (p.user_id === user.id) return p;
    }).filter(plist => !!plist);
    return {
      ...user,
      playlists,
    };
  });

  return data;
};

module.exports = {
  create,
  update,
  getById,
  getAll,
  userDB,
}
