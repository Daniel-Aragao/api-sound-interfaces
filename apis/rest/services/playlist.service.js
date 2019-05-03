const playlistService = require('../../services/playlist.service');


const create = (req, res) => {
  res.status(201).json({
    message: `'Playlist ${name} criada'`,
    data: playlistService.create(req.body),
  });
};

const update = (req, res) => {
  const updatedTrack = playlistService.update({
    ...req.params,
    ...(req.body || {})
  });

  if(!!updatedTrack){
    res.json({
      message: `Playlist ${name} atualizada`,
      data: updatedTrack,
    })
  }else{
    return res.status(404).json({
      message: 'Playlist não encontrada',
      data: null,
    });
  }
};

const getById = (req, res) => {
  const playList = playlistService.getById(req.params);

  if (!!playList) {
    return res.json({
      data: playList,
    });
  }else{
    res.status(404).json({
      message: 'Playlist não encontrada',
      data: null,
    });
  }
};


const getAll = (req, res) => {
  res.json({
    data: playlistService.getAll(req.params)
  });
};

module.exports = {
  create,
  update,
  getById,
  getAll
}
