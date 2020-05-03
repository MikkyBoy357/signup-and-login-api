const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    // unique:true
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

  },

  password: { type: String, required: true },

// password_text: { type: String, required: false },

  status: { type: Boolean, default: true },

  firstname: { type: String, required: true},

  lastname: { type: String, required: true}

})

module.exports = mongoose.model('User', userSchema)

