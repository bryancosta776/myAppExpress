const userModel = require('../database/userModel')

module.exports = async (req, res) => {
    try {
        const {id} = req.params
        const {email, password, name} = req.body

        const userFind = await userModel.findById(id)

        if(!userFind){
            res.status(404).send({message: 'User not found'})
        }

        userFind.email = email
        userFind.name = name
        userFind.password = password

        
        await userFind.save()

        return res.json({userFind})
    } catch (error) {
        res.status(404).send({ message: 'User not found' })
    }
}