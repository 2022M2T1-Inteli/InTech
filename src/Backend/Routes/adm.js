const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Aparece todas as vagas cadastradas no banco de dados
Routes.get("/listAllVagas", (req, res) => {

    //Uma função que espera as coisas dentro dela acontecem para assim efetuar o codigo
    async function getDB() {

        //abre o banco de dados sqlite
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })
        //roda comando sql e retora uma promise
        await db.all("SELECT * FROM vagas").then((result) => {
            res.json(result)
        })

        //fecha o banco de dados
        db.close()
    }

    //chamando a função que foi criada
    getDB()


})

// Aparece todas as candidatas cadastradas no banco de dados
Routes.get("/listCandidatas", (req, res) => {

    async function listCand() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        //roda comando sql e retorna uma promise
        await db.all("SELECT * FROM candidatas").then((result) => {
            res.json(result)
        })

        // fecha o banco de dados
        db.close()

    }


    listCand()



})

// Aparece todas as empresas cadastradas no banco de dados
Routes.get("/listEmpresasParceiras", (req, res) => {

    async function listEmpresa() {

        //abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // roda comandos sql e retorna uma promise
        let array = []
        const empresaData = await db.all("SELECT * FROM empresas WHERE isAproved = 1")
        for (let i = 0; i < empresaData.length; i++) {
            const vagaQtnInfo = await db.all(`SELECT id_vaga FROM vagas WHERE id_empresas = ${empresaData[i].id_empresas}`)
            let x = JSON.stringify(empresaData[i]) + ', "qtnVagas:"' + JSON.stringify(vagaQtnInfo)
            array.push(x)
        }


        console.log(array)

        // fecha o banco de dados
        db.close()

    }

    listEmpresa()
})

Routes.get("/listEmpresasSolicitantes", (req, res) => {
    async function listEmpresas() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.all('SELECT * FROM empresas WHERE isAproved = 0').then((result) => {
            res.json(result)
        })

        db.close()
    }

    listEmpresas()
})

module.exports = Routes