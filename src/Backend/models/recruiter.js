const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class Recruiter {
    constructor(nome, email, ramo, logo, senha, cultura, telefone, site, cnpj, localização) {
        this.nome = nome,
            this.email = email,
            this.ramo = ramo,
            this.logo = logo,
            this.senha = senha,
            this.cultura = cultura,
            this.telefone = telefone,
            this.site = site,
            this.cnpj = cnpj,
            this.localização = localização
    }

    async genereteRecruiter() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª liste as colunas em ordem que querem ser preenchidas
        // 2ª Values (? x quantidade de dados que entrarao)
        // 3ª [valor1, valor2,valor3 .....]



        const insi = await db.run("INSERT INTO empresas (nome_empresa,email_empresa,ramo_empresa,logo_empresa,senha_empresa,cultura_empresa,telefone_empresa,site_empresa,cnpj_empresa,localizacao_empresa) VALUES (?,?,?,?,?,?,?,?,?,?)", [this.nome, this.email, this.ramo, this.logo, this.senha, this.cultura, this.telefone, this.site, this.cnpj, this.localização])

        if (insi.changes === 0) {
            const error = {
                type: "error",
                message: "try again, erro com o banco"
            }

            return error
        }

        const success = {
            type: "success",
            message: "add with success in DB"
        }

        return success

    }

    async loginRecruiter(email, senha) {
        if (!email && !senha) {
            const error = {
                type: "error",
                message: "Email e Senha necessários"
            }

            return error

        } else if (!email) {
            const error = {
                type: "error",
                message: "Email necessário"

            }

            return error
        } else if (!senha) {
            const error = {
                type: "error",
                message: "Senha necessária"
            }

            return error
        } else if (email && senha) {


            const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

            const user = await db.all("SELECT * FROM empresas WHERE email_empresa == ?", [email])



            if (!user[0]) {
                const error = {
                    type: "error",
                    message: "Email não registrado"
                }

                return error
            }



            else if (user[0].senha_empresa == senha) {
                const success = {
                    type: "success",
                    data: user[0]
                }

                return success

            }

            else if ((user[0].senha_empresa == senha) == false) {
                const error = {
                    type: "error",
                    message: "Email ou Senha não corresponde"
                }

                return error
            }

        }
    }

    async allJobsRecruiter(id_empresa) {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const vagas = await db.all(`SELECT * FROM vagas WHERE id_empresas = ${id_empresa}`)

        const success = {
            type:"success",
            data:vagas
        }

        return success
    }



    async deleteRecuiter(id_empresa){
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        //verificar se existe esse id no db
        const rowId = db.all(`SELECT * FROM empresas WHERE id_empresas = ${id_empresa} `)

        const DeleteRecuiter = db.run(`DELETE FROM empresas WHERE id_empresas = ${id_empresa}`)
        const DeleteJobsRecruiter = db.run(`DELETE FROM vagas WHERE id_empresas = ${id_empresa}`)

        if(await DeleteRecuiter.changes === 0 || await DeleteJobsRecruiter.changes === 0){
            const error ={
                type:"error",
                message:"Erro no banco de dados"
            }
            return error
        }

        const success = {
            type:"success",
            message:"Recrudator deletado com sucesso"
        
        }

        return success

    }

    async editRecruiter(id_empresa,logo,email,senha,telefone,site,localização){
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })


        let infosChangesRecruiter = []

        if(logo){
            infosChangesRecruiter.push(`logo_empresa = ${logo}`)
        }if(email){
            infosChangesRecruiter.push(`email_empresa = ${email}`)
        }if(senha){
            infosChangesRecruiter.push(`senha_empresa = ${senha}`)
        }if(telefone){
            infosChangesRecruiter.push(`telefone_empresa = ${telefone}`)
        }if(site){
            infosChangesRecruiter.push(`site_empresa = ${site}`)
        }if(localização){
            infosChangesRecruiter.push(`localizacao_empresa = ${localização}`)
        }

        let infosChangesRecruiterDB = infosChangesRecruiter.join(",")

        const UpdateRecruiter = db.run(`UPDATE empresas SET ${infosChangesRecruiterDB} WHERE ${id_empresa}`)

        if(UpdateRecruiter.changes === 0){
            const error = {
                type:"error",
                message:"Erro no banco de dados"
            }
            return error
        }

        const success = {
            type:"success",
            message:"Alterado com sucesso"
        }

        return success
    }


}


module.exports = { Recruiter }