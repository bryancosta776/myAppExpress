const createUserController = require('./createUserController');
const userModel = require('../database/userModel');
const { generateToken } = require('../controller/jwt/jwt');

jest.mock('../database/userModel');
jest.mock('../controller/jwt/jwt');

describe('Create User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    generateToken.mockReturnValue('fake-jwt-token');
  });

  it('should create a new user and return a token', async () => {
    userModel.create.mockResolvedValue({
      _id: 'fake-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    await createUserController(req, res);

    expect(userModel.create).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(generateToken).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      userModelFinal: expect.any(Object),
      token: 'fake-jwt-token'
    });
  });

  it('should handle errors and return 500 status', async () => {
    userModel.create.mockRejectedValue(new Error('Database Error'));

    await createUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad request' });
  });
});