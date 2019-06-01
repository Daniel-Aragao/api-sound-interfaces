const User = require('../models/User');
const playListService = require('../rest/services/playlist.service');

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

class UserDAO {};

UserDAO.create = ({ firstName, lastName }) => {
  const newUser = new User(idIterator.next().value, firstName, lastName);
  userDB.push(newUser);
  return newUser;
};

UserDAO.update = (userToUpdate, id) => {
  userDB.findIndex(user => user.id === Number.parseInt(id));
  if (index < 0) {
    return null;
  }
  const body = userToUpdate || {};
  const user = userDB[index];
  ['firstName', 'lastName'].forEach((key) => {
    if (!!body[key]) {
      user[key] = body[key];
    }
  });
  const updatedUser = { ...user };
  userDB[index] = updatedUser;

  return updatedUser;
};

UserDAO.getById = (id) => {
  for (let i = 0; i < userDB.length; i++) {
    const user = userDB[i];
    if (user.id === Number.parseInt(id)) {
      const playlists = playListService.playlistDB.map(p => {
        if (p.user_id === user.id) return p;
      }).filter(plist => !!plist);
      return {
        ...user,
        playlists,
      }
    }
  }
  return null;
};

UserDAO.getAll = () => {
  return userDB.map(user => {
    const playlists = playListService.playlistDB.map(p => {
      if (p.user_id === user.id) return p;
    }).filter(plist => !!plist);
    return {
      ...user,
      playlists,
    };
  });
}

module.exports = UserDAO;