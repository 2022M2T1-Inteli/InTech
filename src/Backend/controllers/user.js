const userModel = require("../models/user")

const registerUser = (req,res)=>{


    const { Nome_Candidata, Escolaridade_candidata, Email_candidata, CPF_candidata, Genero_candidata, Data_nascimento, Curriculo_candidata, Softskill_candidata, Senha_candidata, Cargo_candidata, Celular_candidata, Pais_candidata, Status_candidata, Hardskill_candidata, Estado_candidata, Cidade_candidata } = req.body


    const user = new userModel.User(Nome_Candidata, Escolaridade_candidata, Email_candidata, CPF_candidata, Genero_candidata, Data_nascimento, Curriculo_candidata, Softskill_candidata, Senha_candidata, Cargo_candidata, Celular_candidata, Pais_candidata, Status_candidata, Hardskill_candidata, Estado_candidata, Cidade_candidata)

    user.genereteUser().then((result)=>{
        if(result.type === "error"){
            res.status(500).json(result.message)
        }else{
            res.status(200).json(result.message)
        }
    })
}

const loginUser = (req,res)=>{
    const { email, senha } = req.body

    const user = new userModel.User()

    user.loginUser(email,senha).then((result)=>{
        if(result.type === "error"){
            res.status(400).json(result.message)
        }else{
            res.status(200).json(result.data)
        }
    })
}

const listaVagasAplicadas = (req,res)=>{
    const {id_candidata} = req.body

    const user = new userModel.User()

    user.listjobs(id_candidata).then((result)=>{
        res.status(200).json(result.data)
    })
  
}


module.exports = {registerUser,loginUser,listaVagasAplicadas}