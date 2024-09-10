const updateUserController = require('../controller/updateUserController');
const userModel = require('../database/userModel');

jest.mock('../database/userModel'); // Mock do módulo userModel

describe('Update User Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: 'fake-id'
            },
            body: {
                email: 'updated@example.com',
                password: 'newpassword',
                name: 'Updated Name'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    it('should update a user and return the updated user', async () => {
        // Mock do método findById para simular a recuperação do usuário
        const mockUser = {
            _id: 'fake-id',
            email: 'old@example.com',
            name: 'Old Name',
            password: 'oldpassword',
            save: jest.fn().mockResolvedValue(true)
        };
        userModel.findById.mockResolvedValue(mockUser);

        await updateUserController(req, res);

        // Verifica se findById foi chamado com o ID correto
        expect(userModel.findById).toHaveBeenCalledWith('fake-id');

        // Verifica se o usuário foi atualizado com os novos dados
        expect(mockUser.email).toBe('updated@example.com');
        expect(mockUser.name).toBe('Updated Name');
        expect(mockUser.password).toBe('newpassword');

        // Verifica se save foi chamado e se a resposta correta foi enviada
        expect(mockUser.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ userFind: mockUser });
    });

    it('should return 404 if user not found', async () => {
        // Mock do método findById para simular que o usuário não foi encontrado
        userModel.findById.mockResolvedValue(null);

        await updateUserController(req, res);

        // Verifica se findById foi chamado com o ID correto
        expect(userModel.findById).toHaveBeenCalledWith('fake-id');

        // Verifica se a resposta de erro 404 foi enviada
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
});