const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const sqlite = require("sqlite")
const bodyParser = require("body-parser")

const rotas = require("./Routes/routes.js")

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nós devemos entregar, sem frontedn, o cadastro da empresa, o cadastro da usuária, alguém entrando na conta e o match de vagas.

app.use("/rotas",rotas)




app.listen(3000, () => {
    console.log("Servidor aberto http://localhost:3000")
})