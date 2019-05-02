const User = require('../../models/User');
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

const create = (req, res) => {
  const { firstName, lastName } = req.body;
  const newUser = new User(idIterator.next().value, firstName, lastName);
  userDB.push(newUser);
  res.status(201).json({
    message: 'Usuário criado',
    data: newUser,
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const index = userDB.findIndex(user => user.id === Number.parseInt(id));
  if (index < 0) {
    return res.status(404).json({
      message: 'Usuário não encontrado',
      data: null,
    });
  }
  const body = req.body || {};
  const user = userDB[index];
  ['firstName', 'lastName'].forEach((key) => {
    if (!!body[key]) {
      user[key] = body[key];
    }
  });
  const updatedUser = { ...user };
  userDB[index] = updatedUser
  res.json({
    message: 'Usuário atualizado',
    data: updatedUser,
  })
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userDB.find(user => user.id === Number.parseInt(id));
  if (!!user) {
    return res.json({
      data: user,
    });
  }
  res.status(404).json({
    message: 'Usuário não encontrado',
    data: null,
  });
};


const getAll = (req, res) => {
  const data = userDB.map(user => {
    const playlists = playListService.playlistDB.map(p => {
      if (p.user_id === user.id) return p;
    }).filter(plist => !!plist);
    return {
      ...user,
      playlists,
    };
  })
  res.json({
    data
  });
};

module.exports = {
  create,
  update,
  getById,
  getAll,
  userDB,
}
