require("dotenv").config()

const express = require('express');
const path = require('path');
const cors = require('cors');



const port = process.env.PORT;

const app = express(); // invoca o framework

// config JSON and form data response
// ativa funcionalidades dos elementos nas cont acima
app.use(express.json())
app.use(express.urlencoded({extended: false})) // aceitar formdata

// resolver CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'})) // endereço do frontend

// image upload
app.use("/uploads", express.static(path.join(__dirname, "uploads"))) // pasta com arquivos estáticos - join junta dirname (diretório atual) com uploads

// dbconnection
require("./config/db.js")

// routes
const router = require("./routes/Router.js");
app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
