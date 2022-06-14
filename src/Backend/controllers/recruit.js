const recruiterModel = require("../models/recruiter")

const registerRecruiter = (req, res) => {
    const { Nome_Empresa, Email_Empresa, Ramo_de_Atividade, Logo_Empresa, Senha_Empresa, Cultura_Empresa, Telefone_Empresa, Site_Empresa, cnpj_Empresa, Localizacao_Empresa } = req.body

    const recruiter = new recruiterModel.Recruiter(Nome_Empresa, Email_Empresa, Ramo_de_Atividade, Logo_Empresa, Senha_Empresa, Cultura_Empresa, Telefone_Empresa, Site_Empresa, cnpj_Empresa, Localizacao_Empresa)

    recruiter.genereteRecruiter().then((result) => {
        if (result.type === "error") {
            res.status(500).json(result.message)
        } else {
            res.status(200).json(result.message)
        }

    })


}

const loginRecuiter = (req, res) => {
    const { email, senha } = req.body

    const recruiter = new recruiterModel.Recruiter()

    recruiter.loginRecruiter(email, senha).then((result) => {
        if (result.type === "error") {
            res.status(400).json(result.message)
        } else {
            res.status(200).json(result.data)
        }
    })
}

const showJobsRecruiter = (req, res) => {
    const { id_empresa } = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.allJobsRecruiter(id_empresa).then((result) => {
        res.status(200).json(result.data)
    })
}

const deleteRecuiter = (req, res) => {

    const { id_empresas } = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.deleteRecuiter(id_empresas).then((result) => {
        if (result.type === "error") {
            res.status(500).json({
                error: result.message
            })
        }else{
            res.status(200).json({
                message:result.message
            })
        }
    })

}


module.exports = { registerRecruiter, loginRecuiter, showJobsRecruiter,deleteRecuiter }
