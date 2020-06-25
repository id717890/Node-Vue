// const { createBlogpost } = blogService
const User = require('../models/User')
const authService = require('../services/auth.service')
const { body, validationResult } = require('express-validator')

  const index = async (req, res, next) => {
    try {

      const users = await User.findAll();
      return res.status(200).json(
        users
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        msg: 'Internal server error'
      });
    }
  }

  const register = async (req, res, next) => {  
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { body } = req;

    const find = await User.findOne({
      where: {
        email: body.email
      }
    })

    console.log('FIND')
    console.log(find)
    if (find) {
        return res.status(400).json({ msg: 'E-mail already in use' }); 
    }
  


    if (body.password === body.password2) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  }

  // return {
  //   getAllUsers
  // }

// const postBlogpost = async (req, res, next) => {
//   const {
//     user,
//     content
//   } = req.body
//   try {
//     await createBlogpost(user, content)
//     // other service call (or same service, different function can go here)
//     // i.e. - await generateBlogpostPreview()
//     res.sendStatus(201)
//     next()
//   } catch (e) {
//     console.log(e.message)
//     res.sendStatus(500) && next(error)
//   }
// }

module.exports = {index, register}