const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const router = Router()

// /api/auth
router.post('/register', [
    check('email', 'Incorrect email').isEmail(),
    check('email', 'Password is too short, should be more than 6 char').isLength({min: 6})
    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect email or password.'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate){
            res.status(400).json({message: 'This User has been already created.'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()
        res.status(200).json({message: 'User has been created.'})

    } catch (e) {
        res.status(500).json({message: 'Smth went wrong, try again'})
    }
})
router.post('/login',  async (req, res) =>{

})

module.exports = router