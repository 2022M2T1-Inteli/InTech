const vagaModel = require("../models/vaga.js")


const registroVaga = (req, res) => {

    const { SoftskillVaga, NomeVaga, DescricaoVaga, LocalVaga, SalarioVaga, IdEmpresa, HardskillVaga, ModalidadeVaga } = req.body

    const vaga = new vagaModel.Vaga(SoftskillVaga, NomeVaga, DescricaoVaga, LocalVaga, SalarioVaga, IdEmpresa, HardskillVaga, ModalidadeVaga)

    vaga.registerVaga().then((result) => {
        if (result.type === "error") {
            res.status(500).json(result.message)
        } else {
            res.status(200).json(result.message)
        }
    })


}


module.exports = {registroVaga}