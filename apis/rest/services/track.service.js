const trackService = require('../../services/track.service');


const create = (req, res) => {
  res.status(201).json({
    message: 'Música criado',
    data: trackService.create(req.body),
  });
};

const update = (req, res) => {
  const updatedTrack = trackService.update({
    ...req.params,
    ...(req.body || {})
  });

  if(!!updatedTrack){
    res.json({
      message: 'Música atualizada',
      data: updatedTrack,
    })
  }else{
    return res.status(404).json({
      message: 'Música não encontrada',
      data: null,
    });
  }  
};

const getById = (req, res) => {
  const track = trackService.getById(req.params);
  
  if (!!track) {
    return res.json({
      data: track,
    });
  }else{
    res.status(404).json({
      message: 'Usuário não encontrado',
      data: null,
    });
  }
};


const getAll = (req, res) => {
  res.json({
    data: trackService.getAll()
  });
};

module.exports = {
  create: create,
  update: update,
  getById: getById,
  getAll: getAll
}
