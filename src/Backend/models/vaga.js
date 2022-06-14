const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


class Vaga {
    constructor(softskill, nome, descricao, local, salario, idEmpresa, hardskill, modalidade) {

        this.softskill = softskill,
            this.nome = nome,
            this.descricao = descricao,
            this.local = local,
            this.idEmpresa = idEmpresa,
            this.hardskill = hardskill,
            this.modalidade = modalidade
        this.salario = salario

    }

    async registerVaga() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

    

        const insic = await db.run("INSERT INTO vagas (softskill_vaga,nome_vaga,descricao_vaga,local_vaga,salario_vaga,id_empresas,hardskill_vaga,modalidade_vaga) VALUES(?,?,?,?,?,?,?,?)", [this.softskill, this.nome, this.descricao, this.local, this.salario, this.idEmpresa, this.hardskill, this.modalidade])

        if (insic.changes === 0){
            const error = {
                type:"error",
                message:"erro no db"
            }

            return error
        }


        const success = {
            type:"success",
            message:"add in DB with success"
        }

        return success
    }
}


module.exports = {Vaga}