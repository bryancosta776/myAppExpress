const userModel = require('../database/userModel')
const {generateToken} = require('../controller/jwt/jwt')

module.exports = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const userModelFinal = await userModel.create({name, email, password})

        const token = generateToken(userModelFinal)


        res.status(201).json({userModelFinal, token})

    } catch (error) {
        res.status(400).json({error: 'Bad request'})
    }
}





