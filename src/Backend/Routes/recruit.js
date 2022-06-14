const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const recruiterController = require("../controllers/recruit")


Routes.post("/formEmpresa",recruiterController.registerRecruiter)
Routes.post("/loginRecruit",recruiterController.loginRecuiter)
Routes.post('/listAllEmpresaVagas',recruiterController.showJobsRecruiter)
Routes.delete("/deleteEmpresa", recruiterController.deleteRecuiter)

// Edita os valores das colunas da tabela empresas que estão registradas no banco de dados
Routes.put("/editEmpresa", (req, res) => {


    async function editDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª seleciono a tabela
        // 2ª os valores que quero alterar
        // 3ª ?, ?
        // 4ª [valor1,valor2,valor3]
        await db.run(`UPDATE empresas SET email_empresa = ?  WHERE id_vaga == ? `, [req.body.Email_empresa, req.body.id_chave])



        // fecha o banco de dados
        db.close()

    }

    editDB()

    res.send(" Perfil da empresa editada com sucesso no banco de dados")


})






module.exports = Routes