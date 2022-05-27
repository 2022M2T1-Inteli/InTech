const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const sqlite = require("sqlite")
const bodyParser = require("body-parser")
const Routes = express.Router()

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//  edit candidata, edit empresa

Routes.get("/", (req, res) => {
    res.send("worket")
})


Routes.get("/listVagas", (req, res) => {

    async function getDB() {

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.all("SELECT * FROM vagas").then((result) => {
            res.json(result)
        })

        db.close()
    }

    getDB()


})

Routes.get("/listCandidatas",(req,res)=>{

    async function listCand(){

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.run("SELECT * FROM candidatas").then((result)=>{
            res.json(result)
        })

        db.close()

    }

    listCand()



})

Routes.get("/listEmpresa",(req,res)=>{
    
   async function listEmpresa(){

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.run("SELECT * FROM empresas").then((result)=>{
            res.json(result)
        })

        db.close()

    }

    listEmpresa()
   
})


Routes.post("/formEmpresa", (req, res) => {


    async function putDB() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.run("INSERT INTO empresas (nome_empresa,ramo_empresa,cnpj_empresa,localizacao_empresa,telefone_empresa,site_empresa,email_empresa) VALUES (?,?,?,?,?,?,?)", [req.body.Nome_Empresa, req.body.Ramo_de_Atividade, req.body.cnpj, req.body.Localização, req.body.Telefone, req.body.Site, req.body.Email])


        db.close()
    }

    putDB()

    res.send("Empresa registrada com sucesso")



})

Routes.post("/formCanditada", (req, res) => {


    async function putDB() {
        let db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })




        const result = await db.run("INSERT INTO candidatas (nome_candidata, escolaridade_candidata,email_candidata,cpf_candidata,genero_candidata,nascimento_candidata,habilidades_candidatas,senha_candidata,cargo_candidata,curriculo_candidata) VALUES (?,?,?,?,?,?,?,?,?,?)",z [req.body.Nome_candidata, req.body.Escolaridade_candidata, req.body.Email_candidata, req.body.Cpf_canditada, req.body.Genero_canditada, req.body.Data_Nascimento, req.body.Habilidade_candidata, req.body.Senha_canditada, req.body.Cargo_canditada, "curriculo"])


        db.close()
    }

    putDB()

    res.send("Candidata registrada com sucesso")
})

Routes.post("/formVagas", (req, res) => {

    async function putDB() {
        let db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.run("INSERT INTO vagas (soft_vaga,hard_vaga,nome_vaga,descricao_vaga,local_vaga,salario_vaga) VALUES(?,?,?,?,?,?)", [req.body.Soft_Vaga, req.body.Hard_Vaga, req.body.Nome_vaga, req.body.Descricao_Vaga, req.body.Local_Vaga, req.body.Salario_Vaga])


        db.close()
    }

    putDB()

    res.send("Vaga registra com sucesso!")

})


Routes.delete("/deleteVagas", (req, res) => {

    async function delDB() {

        const db = await sqlite.open({ filename:"./database/banco_de_dados.db",driver:sqlite3.Database})

        await db.run(`DELETE FROM vagas WHERE id_vaga == ${req.body.id_chave}`)

        db.close()
    }

    delDB()

    res.send("Vaga excluida com sucesso no banco de dados")


})

Routes.delete("/deleteEmpresa", (req, res) => {

    async function delDB() {
        const db = await sqlite.open({ filename:"./database/banco_de_dados.db",driver:sqlite3.Database})

        await db.run(`DELETE FROM empresas WHERE id_vaga == ${req.body.id_chave}`)

        db.close()
    }

    delDB()

    res.send("Empresa excluida com sucesso no banco de dados")


})

Routes.delete("/deleteCanditada", (req, res) => {

    async function delDB() {
        const db = await sqlite.open({ filename:"./database/banco_de_dados.db",driver:sqlite3.Database})

        await db.run(`DELETE FROM canditada WHERE id_vaga == ${req.body.id_chave}`)

        db.close()
    }

    delDB()

    res.send("Canditada excluida com sucesso no banco de dados")


})


Routes.put("/editVaga",(req,res)=>{
    

    async function editDB(){

        const db = await sqlite.open({filename:"./database/banco_de_dados.db",driver:sqlite3.Database})

        await db.run(`UPDATE vagas SET nome_vaga = ? , salario_vaga = ?  WHERE id_vaga == ? `,[req.body.Nome_vaga,req.body.Salario_vaga,req.body.id_chave])


        db.close()

    }

    editDB()

    res.send("Vaga editada com sucesso no banco de dados")


})

Routes.put("/editCandidata",(req,res)=>{
    

    async function editDB(){

        const db = await sqlite.open({filename:"./database/banco_de_dados.db",driver:sqlite3.Database})

        await db.run(`UPDATE canditadas SET nome_canditada = ?  WHERE id_vaga == ? `,[req.body.Nome_candidata,req.body.id_chave])


        db.close()

    }

    editDB()

    res.send("Perfil editada com sucesso no banco de dados")


})


Routes.put("/editEmpresa",(req,res)=>{
    

    async function editDB(){

        const db = await sqlite.open({filename:"./database/banco_de_dados.db",driver:sqlite3.Database})

        await db.run(`UPDATE empresas SET email_empresa = ?  WHERE id_vaga == ? `,[req.body.Email_empresa,req.body.id_chave])


        db.close()

    }

    editDB()

    res.send(" Perfil da empresa editada com sucesso no banco de dados")


})


module.exports = Routes
