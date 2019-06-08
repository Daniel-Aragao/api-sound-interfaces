const User = require('../models/User');
const playListService = require('./playlist.service');

const userDB = new Array();

for (let i = 1; i <= 2000; i++) {
  userDB.push(new User(i, `Neto ${i}`, `das Neves ${i}`));
}

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
    user.playlists = playListService.getAll({ user_id: id });
  }
  if (!!user) {
    return user;
  }
  return null;
};


const getAll = (amount) => {
  const data = userDB.slice(0, amount).map(user => {
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
