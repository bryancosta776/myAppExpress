const deleteUserController = require('../controller/deleteUserController');
const userModel = require('../database/userModel');

jest.mock('../database/userModel'); // Mock do módulo userModel

describe('Delete User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: 'fake-id'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      end: jest.fn()
    };
  });

  it('should delete a user and return 204', async () => {
    // Mock do método findByIdAndDelete para simular a exclusão de um usuário
    userModel.findByIdAndDelete.mockResolvedValue({
      _id: 'fake-id',
      name: 'Test User',
      email: 'test@example.com'
    });

    await deleteUserController(req, res);

    expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('fake-id');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled(); // Verifica se res.end() foi chamado
  });

  it('should return 404 if user not found', async () => {
    // Mock do método findByIdAndDelete para simular que o usuário não foi encontrado
    userModel.findByIdAndDelete.mockResolvedValue(null);

    await deleteUserController(req, res);

    expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('fake-id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should handle errors and return 500 status', async () => {
    // Mock do método findByIdAndDelete para simular um erro
    userModel.findByIdAndDelete.mockRejectedValue(new Error('Database Error'));

    await deleteUserController(req, res);

    // Verifica se res.status(500) foi chamado e se um erro é registrado
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({error: 'Usuario deletado'});
  });
});