const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

/*************************************************************************************************************************
 *  user sign up and login
 * ********************************************************$***************************************************************/
// Create User account schema
const createUserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: [true, 'Veuillez saisir un e-mail'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Veuillez entrer un email validé']
    },
    password: {
        type: String,
        required: [true, 'Veuillez entrer un mot de passe'],
        minlength: [8, 'La longueur minimale du mot de passe est de 6 caractères']
    },
    Address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false,
        minlength: 9
    },
    zipCode: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// fire a function / hook before doc saved to db
createUserSchema.pre('save', async function(next) {
    // hash password before saving to the DB
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// fire a function after a new user is saved into the database
createUserSchema.post('save', function(user, next) {
    console.log('New user was created & saved into dataBase', user)
    next();
})

// static method to login user
createUserSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Mot de passe incorrect');
  }
  throw Error('Adresse Email incorrecte');
};

const User = mongoose.model('user', createUserSchema);

module.exports = { User };