const PlayList = require('../../models/Playlist');
const trackService = require('./track.service');

const playlistDB = new Array();

(function(){
  let p1 = new PlayList(1, 'Só Sucessos', 1);
  let p2 = new PlayList(2, 'Batidão Sertanejo', 1)
  let p3 = new PlayList(3, 'Favoritas', 2)

  p1.addTrack(trackService.trackDB[0]);
  p2.addTrack(trackService.trackDB[1]);
  p3.addTrack(trackService.trackDB[0]);
  p3.addTrack(trackService.trackDB[1]);

  playlistDB.push(p1);
  playlistDB.push(p2);
  playlistDB.push(p3);
})();

let lastId = 2;
const idGenerator = function* () {
  while (true) {
    yield ++lastId;
  }
}

const idIterator = idGenerator();

const create = (req, res) => {
  const { name, user_id, tracks } = req.body;
  const newPlaylist = new PlayList(idIterator.next().value, name, user_id);

  if (!!tracks && Array.isArray(tracks)) {
    tracks.forEach(track => newPlaylist.addTrack(track));
  }

  playlistDB.push(newPlaylist);

  res.status(201).json({
    message: `'Playlist ${name} criada'`,
    data: newPlaylist,
  });

};

const update = (req, res) => {
  const { user_id, id, tracks } = req.params;
  const index = playlistDB.findIndex(playList => playList.id === Number.parseInt(id) && Number.parseInt(user_id) === playList.user_id);

  if (index < 0) {
    return res.status(404).json({
      message: 'Playlist não encontrada',
      data: null,
    });
  }

  const body = req.body || {};
  const playList = playlistDB[index];

  ['name', 'user_id'].forEach((key) => {
    if (!!body[key]) {
      playList[key] = body[key];
    }
  });

  if (!!tracks && Array.isArray(tracks)) {
    let toRemove = [];

    playList._tracks.forEach(track => {
      if(tracks.findIndex((t) => parseInt(t.id) == track.id) < 0){
        toRemove.push(track.id)
      }
    });

    toRemove.forEach(id => playList.removeTrack(id));

    tracks.forEach(trackId => {
      if(!playList.containsTrack(parseInt(trackId))){
        let track = trackService.trackDB.find((track) => track.id == parseInt(trackId));
    
        if(!!track){
          playList.addTrack(track);
        }
      }
    });
  }

  const updatedTrack = { ...playList };

  playlistDB[index] = updatedTrack
  
  res.json({
    message: `Playlist ${name} atualizada`,
    data: updatedTrack,
  })
};

const getById = (req, res) => {
  const { user_id, id } = req.params;
  const playList = playlistDB.find(playList => playList.id === Number.parseInt(id) && Number.parseInt(user_id) === playList.user_id);

  if (!!playList) {
    return res.json({
      data: playList,
    });
  }

  res.status(404).json({
    message: 'Playlist não encontrada',
    data: null,
  });
};


const getAll = (req, res) => {
  const { user_id } = req.params;

  res.json({
    data: playlistDB.map(playList => {
      if(playList.user_id === Number.parseInt(user_id)) { return playList }
    }).filter(plist => !!plist),
  });
};

module.exports = {
  create,
  update,
  getById,
  getAll,
  playlistDB,
}
