const readUserController = require('../controller/readUserController');
const userModel = require('../database/userModel');

jest.mock('../database/userModel'); // Mock do módulo userModel

describe('Get Users Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {}; // Não há params ou body para este caso
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it('should return a list of users and status 201', async () => {
        // Mock do método find para simular a recuperação dos usuários
        const mockUsers = [
            { _id: '1', name: 'User One', email: 'one@example.com' },
            { _id: '2', name: 'User Two', email: 'two@example.com' }
        ];
        userModel.find.mockResolvedValue(mockUsers);

        await readUserController(req, res);

        expect(userModel.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ userModelFinal: mockUsers });
    });

    it('should handle errors and return 500 status', async () => {
        // Mock do método find para simular um erro
        userModel.find.mockRejectedValue(new Error('Database Error'));

        await readUserController(req, res);

        expect(userModel.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'User not exists'});
    });
});