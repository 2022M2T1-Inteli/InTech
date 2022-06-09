


function catchUserData() {

    //Tela de Cadastro 1
    let forms1 = {
        NomeCandidata: document.querySelector('#nomeCandidata').value,
        EmailCandidata: document.querySelector('#emailCandidata').value,
        CelularCandidata: document.querySelector('#celularCandidata').value,
        CPFCandidata: document.querySelector('#cpfCandidata').value,
        GeneroCandidata: document.querySelector('#genero').value,
        SenhaCandidata: document.querySelector('#senha').value,
        NascimentoCandidata: document.getSelection("#data-nascimento").value,
        PaisCandidata: document.getSelection("#pais").value,
        EstadoCandidata: document.getSelection("#estado").value,
        CidadeCandidata: document.getSelection("#cidade").value
    }

    sessionStorage.setItem("User1", JSON.stringify(forms1))

    window.location.replace("/views/Users/cadastroUsuaria2.html")




}

function catchUserData2() {
    let userForms1 = JSON.parse(sessionStorage.getItem("User1"))




    //aqui vai as infos da tela cadastro 2
    let Status_candidata = document.querySelector("#statusCandidata").value
    let Escolaridade_candidata = document.querySelector("#escolaridadeCandidata").value
    let Cargo_canditada = document.querySelector("#cargoCandidata").value

    let Softskills = document.querySelectorAll("#softskills")
    let Hardskills = document.querySelectorAll("#hardskills")

    let SoftskillsOn = []
    let HardskillsOn = []

    let PDFcurriculo = document.querySelector("#formFile")

    for (let i = 0; i < Softskills.length; i++) {

        SoftskillsOn.push(Softskills[i].innerText)

    }

    for (let i = 0; i < Hardskills.length; i++) {

        HardskillsOn.push(Hardskills[i].innerText)

    }

    let SoftskillsDB = SoftskillsOn.toString()
    let HardskillsDB = HardskillsOn.toString()




    // Nome_Candidata,Escolaridade_candidata,Email_candidata,CPF_canditada,Genero_canditada,Data_nascimento,Curriculo_candidata,Softskill_candidata,Senha_canditada,Cargo_canditada,Celular_candidata, Pais_candidata,Status_candidata,Hardskill_candidata,Estado_candidata,Cidade_candidata


    sendUserData(userForms1.NomeCandidata, Escolaridade_candidata, userForms1.EmailCandidata, userForms1.CPFCandidata, userForms1.GeneroCandidata, "23/09/2003", "asdada", SoftskillsDB, userForms1.SenhaCandidata, Cargo_canditada, userForms1.CelularCandidata, "Lembrar gabriel", Status_candidata, HardskillsDB, "Lembrar gabriel", "Lembrar gabriel")

    sessionStorage.removeItem("User1")
}

function deleteCatchDataUser() {
    sessionStorage.removeItem("User1")

}

// function putDatas(){
//     userForms1 = JSON.parse(sessionStorage.getItem("User1"))

//     document.querySelector('#nomeCandidata').value = userForms1.NomeCandidata
// }




function catchRecruiterData() {


    let formsRecruit1 = {
        // Tela de Cadastro Recrutadora 1 
        NomeEmpresa: document.querySelector('#nomeEmpresa').value,
        RamoAtividade: document.querySelector('#ramoEmpresa').value,
        CnpjEmpresa: document.querySelector('#cnpjEmpresa').value,
        LocalizacaoEmpresa: document.querySelector('#localizacaoEmpresa').value


    }

    sessionStorage.setItem("Recruit1", JSON.stringify(formsRecruit1))

    window.location.pathname = '/src/Frontend/views/Recruiter/cadastroRecrutadora2.html'









}

function catchRecruiterData2() {

    let recuitForms1 = JSON.parse(sessionStorage.getItem("Recruit1"))

    // Tela de Cadadastro Recrutadora 2
    let TelefoneEmpresa = document.querySelector('#telefoneEmpresa').value;
    let SiteEmpresa = document.querySelector('#siteEmpresa').value;
    let EmailEmpresa = document.querySelector('#emailEmpresa').value;
    let SenhaEmpresa = document.querySelector('#senha').value;




    sendRecruitData(recuitForms1.NomeEmpresa, EmailEmpresa, recuitForms1.RamoAtividade, "logo", SenhaEmpresa, "cultura", TelefoneEmpresa, SiteEmpresa, recuitForms1.CnpjEmpresa, recuitForms1.LocalizacaoEmpresa)

    sessionStorage.removeItem("Recruit1")

}

function catchVacancyData() {
    let Nome_vaga = document.querySelector("#nomeVaga").value
    let Descricao_vaga = document.querySelector("#descricaoVaga").value
    let Local_vaga = document.querySelector("#localizacao").value

    let Habilidades_vaga = document.querySelectorAll("span")
    let habilidadeDB = []


    for (let i = 0; i < Habilidades_vaga.length; i++) {

        habilidadeDB.push(Habilidades_vaga[i].innerText)

    }

    let HabilidadeDBVaga = habilidadeDB.toString()
    let Salario_vaga = document.querySelector("#salarioVaga").value

    sendVacancyData()



}




function sendUserData(Nome_Candidata, Escolaridade_candidata, Email_candidata, CPF_canditada, Genero_canditada, Data_nascimento, Curriculo_candidata, Softskill_candidata, Senha_canditada, Cargo_canditada, Celular_candidata, Pais_candidata, Status_candidata, Hardskill_candidata, Estado_candidata, Cidade_candidata) {
    $.ajax({
        url: "http://localhost:3000/rotas/formCandidata",
        method: "POST",
        data: {
            Nome_Candidata: Nome_Candidata,
            Escolaridade_candidata: Escolaridade_candidata,
            Email_candidata: Email_candidata,
            CPF_candidata: CPF_canditada,
            Genero_candidata: Genero_canditada,
            Data_nascimento: Data_nascimento,
            Curriculo_candidata: Curriculo_candidata,
            Softskill_candidata: Softskill_candidata,
            Senha_candidata: Senha_canditada,
            Cargo_candidata: Cargo_canditada,
            Celular_candidata: Celular_candidata,
            Pais_candidata: Pais_candidata,
            Status_candidata: Status_candidata,
            Hardskill_candidata: Hardskill_candidata,
            Estado_candidata: Estado_candidata,
            Cidade_candidata: Cidade_candidata

        },
        success: function () {
            window.location.replace("/views/index.html")
        }

    })
}

function sendRecruitData(NomeEmpresa, EmailEmpresa, RamoAtividade, Logo_Empresa, SenhaEmpresa, Cultura_Empresa, TelefoneEmpresa, SiteEmpresa, CnpjEmpresa, LocalizacaoEmpresa) {
    $.ajax({
        url: "http://localhost:3000/rotas/formEmpresa",
        method: "POST",
        data: {
            Nome_Empresa: NomeEmpresa,
            Email_Empresa: EmailEmpresa,
            Ramo_de_Atividade: RamoAtividade,
            Logo_Empresa: Logo_Empresa,
            Senha_Empresa: SenhaEmpresa,
            Cultura_Empresa: Cultura_Empresa,
            Telefone_Empresa: TelefoneEmpresa,
            Site_Empresa: SiteEmpresa,
            cnpj_Empresa: CnpjEmpresa,
            Localizacao_Empresa: LocalizacaoEmpresa
        },
        success: function () {
            window.location.replace("/views/index.html")

        }
    })



}


function sendVacancyData(SoftskillVaga,NomeVaga,DescricaoVaga,LocalVaga,SalarioVaga,IdEmpresa,HardskillVaga,ModalidadeVaga) {
    $.ajax({
        url: "http://localhost:3000/rotas/formVagas",
        method: "POST",
        data: {
            SoftskillVaga:SoftskillVaga,
            NomeVaga:NomeVaga,
            DescricaoVaga:DescricaoVaga,
            LocalVaga:LocalVaga,
            SalarioVaga:SalarioVaga,
            IdEmpresa:IdEmpresa,
            HardskillVaga:HardskillVaga,
            ModalidadeVaga:ModalidadeVaga
        
        }
    })
}


function loginUser() {

    let email_candidata = document.querySelector("#email").value
    let senha_candidata = document.querySelector("#senha").value


    $.ajax({
        url: "http://localhost:3000/rotas/loginUser",
        method: "POST",
        data: {
            email: email_candidata,
            senha: senha_candidata

        },
        error: function (res) {
            $("#error").html(res.responseJSON.message)
        },
        success: function (res) {
            sessionStorage.setItem("UsuarioDadosLogin", JSON.stringify(res))
            window.location.replace("./testelogin.html")

        }
    })
}

function loginRecruit() {
    let email_empresa = document.querySelector("#email").value
    let senha_empresa = document.querySelector("#senha").value


    $.ajax({
        url: "http://localhost:3000/rotas/loginRecruit",
        method: "POST",
        data: {
            email: email_empresa,
            senha: senha_empresa

        },
        error: function (res) {
            $("#error").html(res.responseJSON.message)
        },
        success: function (res) {
            sessionStorage.setItem("EmpresaDadosLogin", JSON.stringify(res))
            window.location.replace("./testelogin.html")

        }
    })
}

function logadoUser() {
    let usuario = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))

    $("#nome_candidataLogada").html(usuario.nome_candidata)
    $("#email_candidataLogada").html(usuario.email_candidata)
    $("#softskill_candidataLogada").html(usuario.softskill_candidata)
    $("#hardskill_candidataLogada").html(usuario.hardskill_candidata)
}

function logadoRecruit(){
    let Recruit = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"))

}