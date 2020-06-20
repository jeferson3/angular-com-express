'use strict'

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { sign, verify } = require('../config/jwt.config');


exports.get = (req, res) => {
    User.findAll().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(500).json({ status: 'error', error: error.name })
    })
}

exports.me = (req, res) => {
    res.json(req.auth)

}
exports.login = async (req, res) => {
    try {
        const [, hash] = await req.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

        await User.findOne({ where: { email } }).then(async data => {
            await bcrypt.compare(password, data.password).then(result => {
                if (result) {
                    const token = sign({ user: data.id });

                    res.status(200).json({ data, token })
                }
                else {
                    res.status(401).json({ error: 'inválid password' })
                }
            })

        }).catch(error => {
            res.json({ status: 'falid to find data' })
        })


    } catch (error) {
        console.error({ error: error });
    }



}

exports.post = (req, res) => {

    const { name, email, password } = req.body;

    bcrypt.hash(password, 10).then(hash => {

        User.create({
            name: name,
            email: email,
            password: hash
        }).then(data => {
            const token = sign({ user: data.id });
            res.status(200).json({
                status: 'user created',
                user: data,
                token: token
            })

        }).catch(error => {
            res.status(500).json({
                status: "error",
                errorName: error.name
            })
        });
    }).catch(error => {
        res.json({ error: error })
    })

}

exports.delete = (req, res) => {
    let { id } = req.params;
    User.destroy({ where: { id: id } }).then(() => {
        res.json({ status: 'user deleted success' })
    }).catch(() => {
        res.json({ status: 'error delete user' })
    })
}

exports.put = (req, res) => {
    let { id } = req.params;
    User.update(req.body, { where: { id: id } }).then(() => {
        res.json({ status: 'user changed success' })
    }).catch(() => {
        res.json({ status: 'error change user' })
    })
}