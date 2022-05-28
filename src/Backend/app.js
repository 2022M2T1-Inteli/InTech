const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado

const rotas = require("./Routes/routes.js") // Trazendo os codigos de outra api local

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// separador de rodas ( localhost:3000/rotas/X)
app.use("/rotas",rotas)



// Iniciando o servidor localmente na porta 3000
app.listen(3000, () => {
    console.log("Servidor aberto http://localhost:3000")
})