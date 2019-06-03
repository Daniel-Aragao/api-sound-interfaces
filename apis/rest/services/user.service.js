const UserDAO = require('../../daos/user.dao');
const userService = require("../../services/user.service");

const create = (req, res) => {
  res.status(201).json({
    message: 'Usuário criado',
    data: userService.create(req.body),
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedUser = UserDAO.update(req.body, id);

  if(!!updatedUser){
    res.json({
      message: 'Usuário atualizado',
      data: updatedUser,
    });
  } else {
    return res.status(404).json({
      message: 'Usuário não encontrado',
      data: null,
    });
  }

  res.json({
    message: 'Usuário atualizado',
    data: updatedUser,
  });
};

const getById = (req, res) => {
  const user = userService.getById(req.params);

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
  const data = UserDAO.getAll();
  res.json({
    data
  });
};

module.exports = {
  create,
  update,
  getById,
  getAll,
  getAll
};
