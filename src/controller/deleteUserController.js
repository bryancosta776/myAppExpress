const userModel = require('../database/userModel')

module.exports = async (req, res) => {
    try {
        const {id} = req.params

        const userFind = await userModel.findByIdAndDelete(id)

        if(!userFind){
            res.status(404).send({message: 'User not found'})
        }

        return res.status(204).end()
    } catch (error) {
        res.status(500).json({error: 'Usuario deletado'})
    }
}