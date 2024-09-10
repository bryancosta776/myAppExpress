const userModel = require('../database/userModel')

module.exports = async (req, res) => {
    try {
        const userModelFinal = await userModel.find()

        res.status(201).json({userModelFinal})


    } catch (error) {
        res.status(500).json({error: 'User not exists' })
    }
}
