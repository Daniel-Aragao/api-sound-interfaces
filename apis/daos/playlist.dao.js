const playlistDB = new Array();

const p1 = new PlayList(1, 'Só Sucessos', 1);
const p2 = new PlayList(2, 'Batidão Sertanejo', 1)
const p3 = new PlayList(3, 'Favoritas', 2)

p1.addTrack(trackService.trackDB[0]);
p2.addTrack(trackService.trackDB[1]);
p3.addTrack(trackService.trackDB[0]);
p3.addTrack(trackService.trackDB[1]);

playlistDB.push(p1);
playlistDB.push(p2);
playlistDB.push(p3);

let lastId = 2;
const idGenerator = function* () {
  while (true) {
    yield ++lastId;
  }
}

const idIterator = idGenerator();

const PlayListDAO = {};

PlayListDAO.create = ({ name, user_id, tracks }) => {
  const newPlaylist = new PlayList(idIterator.next().value, name, user_id);

  if (!!tracks && Array.isArray(tracks)) {
    tracks.forEach(track => newPlaylist.addTrack(track));
  }

  playlistDB.push(newPlaylist);
}

PlayListDAO.create = ({ name, user_id, tracks }) => {
  const newPlaylist = new PlayList(idIterator.next().value, name, user_id);

  if (!!tracks && Array.isArray(tracks)) {
    tracks.forEach(track => newPlaylist.addTrack(track));
  }

  playlistDB.push(newPlaylist);
}

module.exports = PlayListDAO;