const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const vagaController = require("../controllers/vaga")

Routes.post("/formVagas",vagaController.registroVaga)

// Edita os valores das colunas da tabela vagas que estão registrados no banco de dados
Routes.put("/editVaga", (req, res) => {


    async function editDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })




        // executa comando sql
        // 1ª seleciono a tabela
        // 2ª os valores que quero alterar
        // 3ª ?, ?
        // 4ª [valor1,valor2,valor3]


        await db.run(`UPDATE vagas SET nome_vaga = ? , salario_vaga = ?  WHERE id_vaga == ? `, [req.body.Nome_vaga, req.body.Salario_vaga, req.body.id_chave])


        // fecha o banco de dados
        db.close()

    }

    editDB()

    res.send("Vaga editada com sucesso no banco de dados")


})

// Deleta a linha desejada na tabela vagas
Routes.delete("/deleteVagas", (req, res) => {

    async function delDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª escolha a tabela e alguma condição para excluir tal linha

        // IMPORTANTE:
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela


        await db.run(`DELETE FROM vagas WHERE id_vaga == ${req.body.id_chave}`)

        //fecha o banco de dados
        db.close()
    }

    delDB()

    res.send("Vaga excluida com sucesso no banco de dados")


})


module.exports = Routes
