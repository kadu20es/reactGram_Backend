const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


// connection
const conn = async () => {
    try {

        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8zplxei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log('Conectado ao banco')

        return dbConn;

    } catch (error) {
        console.error(`Não foi possível conectar ao banco: ${error}`);
    }
}

conn();

module.exports = conn;
