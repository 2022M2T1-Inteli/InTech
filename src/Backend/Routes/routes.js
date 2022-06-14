const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//----------------------------------------------


Routes.post("/listVagas", (req, res) => {
    async function getDB() {

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const vaga = await db.get("SELECT * FROM vagas WHERE id_vaga = ?", [req.query.id_vaga])
        const empresa = await db.get("SELECT nome_empresa, cultura_empresa, telefone_empresa, site_empresa FROM empresas WHERE id_empresas = ?", [vaga.id_empresas])

        const vagaString = JSON.stringify(vaga)
        const empresaString = JSON.stringify(empresa)

        const allInfos = `{"vagaInfos": ${vagaString}, "empresaInfos":${empresaString}}`;

        const JSONInfos = JSON.parse(allInfos)

        res.status(200).json(JSONInfos)
        db.close()
    }
    getDB()
})


//Abner e Gabriel
Routes.post('/applied', (req, res) => {
    async function insertDB() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const { id_candidata, id_vaga } = req.body

        await db.run(`UPDATE vagas SET id_candidatas = ${id_candidata} WHERE id_vaga = ${id_vaga}`)

        db.close();

        res.status(200).send()
    }

    insertDB();

})





// exportando todos os Routes para serem utilizados em outro arquivo js
module.exports = Routes

