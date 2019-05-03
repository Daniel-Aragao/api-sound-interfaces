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

const create = (args) => {
  const { musicName, musicAuthor } = args;
  const newTrack = new Track(idIterator.next().value, musicName, musicAuthor);

  trackDB.push(newTrack);

  return newTrack;
};

const update = (args) => {
  const { id } = args;
  const index = trackDB.findIndex(track => track.id === Number.parseInt(id));

  if (index < 0) {
    return null;
  }

  const body = args || {};
  const track = trackDB[index];
  ['musicName', 'musicAuthor'].forEach((key) => {
    if (!!body[key]) {
      track[key] = body[key];
    }
  });

  const updatedTrack = { ...track };
  trackDB[index] = updatedTrack

  return updatedTrack;
};

const getById = (args) => {
  const { id } = args;
  const track = trackDB.find(track => track.id === Number.parseInt(id));
  if (!!track) {
    return track;
  }
  return null;
};


const getAll = () => {
  return trackDB;
};

module.exports = {
  create: create,
  update: update,
  getById: getById,
  getAll: getAll,
  trackDB: trackDB,
}
