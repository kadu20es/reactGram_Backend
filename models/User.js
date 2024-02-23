const mongoose = require('mongoose');
const {Schema} = mongoose;


// Um model é um objeto que possui os métodos inserir, atualizar, ler, etc e é baseado num Schema
const userSchema = new Schema( // collection
    {
        name: String,
        email: String,
        password: String,
        profileImage: String,
        bio: String
    },
    {
        timestamps: true // dois campos: createdAt, updatedAt
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;