const mongoose = require('mongoose')

const User = require('../../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_post_signup = function (req, res, next) {

  User.find({ email: req.body.email }, function (er, result_user) {
    if (result_user.length >= 1) {

      return res.status(409).json({
        message: 'Email exists'
      })

    } else {

      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(500).json({
            error: err
          })
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            password_text: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
          })

          user.save(function (err, result) {

            if (result) {
              console.log(result)
              res.status(200).json({
                message: 'Creates user in POST /signup',
                product: {
                  _id: result.id,
                  email: result.email,
                  password: result.password,
                  firstname: req.body.firstname,
                  lastname: req.body.lastname
//                  password_text: result.password_text,

                }
              })
            } else if (err) {
              console.log(err)
              res.status(500).json({
                error: err
              })
            }

          })
        }

      })

    }
  })

}

exports.user_post_login = function (req, res, next) {

  User.find({ email: req.body.email }, function (err, result) {
    if (result.length < 1) {

      console.log(err)
      res.status(401).json({
        message: 'Auth Failed'

      })

    }
    bcrypt.compare(req.body.password, result[0].password, function (err_pass, result_pass) {
      if (err_pass) {
        return res.status(401).json({
          message: 'Auth Failed'
        })
      } else if (result_pass) {
        const token = jwt.sign({
            email: result[0].email,
            userId: result[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h'
          }
        )

        return res.status(200).json({
          message: 'Auth Successful',
          token: token
        })
      }
    })
  })

}

exports.user_post_delete = function (req, res, next) {

  const id = req.params.userId
  console.log('=========deleting user========')

  // by deleting, just setting the status of user to false,
  // not actually deleting the user

  User.update({ _id: id }, { status: false }, function (err, result) {
    if (result) {
      console.log(result)
      res.status(200).json({
        message: 'User deleted',

      })
    } else if (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  })
}
