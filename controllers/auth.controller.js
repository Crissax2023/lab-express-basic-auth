const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User.model');

const getLogin = (req, res) => {
    res.render('auth/login')
}


const postLogin = async (req, res, next) => {
    console.log('SESSION =====> ', req.session);

    const { username, password } = req.body;

    try {
        if(!username)
            return res.render('auth/login', { errorMessage: 'El campo username es requerido' })
        if(!password)
            return res.render('auth/login', { errorMessage: 'El campo password es requerido' })


        const user = await User.findOne({ username });
        if(!username) {
            return res.render('auth/login', { errorMessage: 'El username o password son incorrectos' })
        }
        // -> true | false
        const match = bcrypt.compareSync(password, user.password)
        console.log('match: ', match)
        if(match) {
            const loggedUser = user.toObject();
            delete loggedUser.password;
            // guardamos al user en el req.session
            req.session.currentUser = loggedUser;
            console.log('')
            // return res.render('user/profile', { email })

            return res.redirect(`/auth/profile`)
        }

        res.render('auth/login', { errorMessage: 'El email o password son incorrectos' })
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/signup', { errorMessage: error.message });
        } else {
            next(error);
        }    
    }
}
