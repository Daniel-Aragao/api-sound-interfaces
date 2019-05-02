const Track = require('../models/Track');

const trackDB = new Array();

trackDB.push(new Track(1, 'Pagodão do pedrão', 'Pedrão'));
trackDB.push(new Track(2, 'Meu coração ta bêbado', 'Gavião do sertanejeiro'));

let lastId = 2;
const idGenerator = function* () {
  while (true) {
    yield ++lastId;
  }
}

const idIterator = idGenerator();

const create = (req, res) => {
  const { musicName, musicAuthor } = req.body;
  const newTrack = new Track(idIterator.next().value, musicName, musicAuthor);

  trackDB.push(newTrack);

  res.status(201).json({
    message: 'Música criado',
    data: newTrack,
  });

};

const update = (req, res) => {
  const { id } = req.params;
  const index = trackDB.findIndex(track => track.id === Number.parseInt(id));

  if (index < 0) {
    return res.status(404).json({
      message: 'Música não encontrada',
      data: null,
    });
  }

  const body = req.body || {};
  const track = trackDB[index];
  ['musicName', 'musicAuthor'].forEach((key) => {
    if (!!body[key]) {
      track[key] = body[key];
    }
  });

  const updatedTrack = { ...track };
  trackDB[index] = updatedTrack

  res.json({
    message: 'Música atualizada',
    data: updatedTrack,
  })
};

const getById = (req, res) => {
  const { id } = req.params;
  const track = trackDB.find(track => track.id === Number.parseInt(id));
  if (!!track) {
    return res.json({
      data: track,
    });
  }
  res.status(404).json({
    message: 'Usuário não encontrado',
    data: null,
  });
};


const getAll = (req, res) => {  
  res.json({
    data: trackDB
  });
};

module.exports = {
  create,
  update,
  getById,
  getAll,
  trackDB: trackDB,
}
