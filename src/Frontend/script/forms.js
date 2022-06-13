function validateEmail(email) {
    var re = /\S+@\S+\.\S+/; // função de validação de email
    return re.test(email);
}


function catchUserData() { // função que pega os dados de usuário de acordo com o que colocam no input



    let error = document.querySelector("#error")
    //Tela de Cadastro 1
    let forms1 = {
        NomeCandidata: document.querySelector('#nomeCandidata').value,
        EmailCandidata: document.querySelector('#emailCandidata').value,
        CelularCandidata: document.querySelector('#celularCandidata').value,
        CPFCandidata: document.querySelector('#cpfCandidata').value,
        GeneroCandidata: document.querySelector('#genero').value,
        SenhaCandidata: document.querySelector('#senha').value,
        NascimentoCandidata: document.querySelector("#data-nascimento").value,
        PaisCandidata: document.querySelector("#pais").value,
        EstadoCandidata: document.querySelector("#estado").value,
        CidadeCandidata: document.querySelector("#cidade").value
    }

    // caso o usuário não preencha um campo corretamente, ele receberá uma mensagem de alerta

    if (!forms1.NomeCandidata) {
        error.innerHTML = "Nome necessário"
        window.scroll(0, 0)

    } else if (!forms1.EmailCandidata) {
        error.innerHTML = "Email necessário"
        window.scroll(0, 0)

    } else if (forms1.EmailCandidata) {
        if (validateEmail(forms1.EmailCandidata) == false) {
            error.innerHTML = "Email invalido"
            window.scroll(0, 0)
        } else {
            if (!forms1.CelularCandidata) {
                error.innerHTML = "Numero de celular obrigatório"
                window.scroll(0, 0)
            } else if (!forms1.CPFCandidata) {
                error.innerHTML = "CPF necessário"
                window.scroll(0, 0)
            } else if (!forms1.PaisCandidata) {
                error.innerHTML = "Pais necessário"
                window.scroll(0, 0)
            } else if (!forms1.EstadoCandidata) {
                error.innerHTML = "Estado necessário"
                window.scroll(0, 0)
            } else if (!forms1.CidadeCandidata) {
                error.innerHTML = "Campo cidade necessário"
                window.scroll(0, 0)
            } else if (!forms1.NascimentoCandidata) {
                error.innerHTML = "Data necessária"
                window.scroll(0, 150)
            } else if (!forms1.GeneroCandidata) {
                error.innerHTML = "Gênero necessário"
                window.scroll(0, 160)
            } else if (!forms1.SenhaCandidata) {
                error.innerHTML = "Senha obrigatoria"
                window.scroll(0, 170)
            } else {
                sessionStorage.setItem("User1", JSON.stringify(forms1)) // salvando objeto na session storage

                window.location.replace("/views/Users/cadastroUsuaria2.html") // direciona para outr página

            }
        }
    }



}

function catchUserData2() { // função que pega os dados do formulário
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

        SoftskillsOn.push(Softskills[i].innerText) // soft skills são adicionadas no array SoftskillsOn

    }

    for (let i = 0; i < Hardskills.length; i++) {

        HardskillsOn.push(Hardskills[i].innerText) // hard skills são adicionadas no array HardskillsOn

    }

    let SoftskillsDB = SoftskillsOn.toString() // transforma em string
    let HardskillsDB = HardskillsOn.toString() // transforma em string




    // Nome_Candidata,Escolaridade_candidata,Email_candidata,CPF_canditada,Genero_canditada,Data_nascimento,Curriculo_candidata,Softskill_candidata,Senha_canditada,Cargo_canditada,Celular_candidata, Pais_candidata,Status_candidata,Hardskill_candidata,Estado_candidata,Cidade_candidata


    sendUserData(userForms1.NomeCandidata, Escolaridade_candidata, userForms1.EmailCandidata, userForms1.CPFCandidata, userForms1.GeneroCandidata, "23/09/2003", "asdada", SoftskillsDB, userForms1.SenhaCandidata, Cargo_canditada, userForms1.CelularCandidata, "Lembrar gabriel", Status_candidata, HardskillsDB, "Lembrar gabriel", "Lembrar gabriel")

    sessionStorage.removeItem("User1")
}

function deleteCatchDataUser() { // função que remove os itens da session storage
    sessionStorage.removeItem("User1")

}

// function putDatas(){
//     userForms1 = JSON.parse(sessionStorage.getItem("User1"))

//     document.querySelector('#nomeCandidata').value = userForms1.NomeCandidata
// }




function catchRecruiterData() { // função que pega os valores do formulário preenchido pelo recrutador


    let formsRecruit1 = {
        // Tela de Cadastro Recrutadora 1 
        NomeEmpresa: document.querySelector('#nomeEmpresa').value,
        RamoAtividade: document.querySelector('#ramoEmpresa').value,
        CnpjEmpresa: document.querySelector('#cnpjEmpresa').value,
        LocalizacaoEmpresa: document.querySelector('#localizacaoEmpresa').value


    }

    sessionStorage.setItem("Recruit1", JSON.stringify(formsRecruit1))

    window.location.pathname = '/src/Frontend/views/Recruiter/cadastroRecrutadora2.html' // direciona para outra página









}

function catchRecruiterData2() { // função que pega os valores de outro formulário preenchido pelo recrutador

    let recuitForms1 = JSON.parse(sessionStorage.getItem("Recruit1"))

    // Tela de Cadadastro Recrutadora 2
    let TelefoneEmpresa = document.querySelector('#telefoneEmpresa').value;
    let SiteEmpresa = document.querySelector('#siteEmpresa').value;
    let EmailEmpresa = document.querySelector('#emailEmpresa').value;
    let SenhaEmpresa = document.querySelector('#senha').value;




    sendRecruitData(recuitForms1.NomeEmpresa, EmailEmpresa, recuitForms1.RamoAtividade, "logo", SenhaEmpresa, "cultura", TelefoneEmpresa, SiteEmpresa, recuitForms1.CnpjEmpresa, recuitForms1.LocalizacaoEmpresa)

    sessionStorage.removeItem("Recruit1")

}

// pegar do frontend infos cadastradas pela empresa para inserir no backend posteriormente

function catchVacancyData() {
    let Nome_vaga = document.querySelector("#nomeVaga").value
    let Descricao_vaga = document.querySelector("#descricaoVaga").value
    let ModalidadeVaga = document.querySelector("#modalidade").value
    let Local_vaga = document.querySelector("#localizacao").value

    let SoftskillsVaga = document.querySelectorAll("#softskills")
    let HardskillsVaga = document.querySelectorAll("#hardskills")

    let SoftskillsVagaOn = []
    let HardskillsVagaOn = []

    for (let i = 0; i < SoftskillsVaga.length; i++) {

        SoftskillsVagaOn.push(SoftskillsVaga[i].innerText)

    }


    for (let i = 0; i < HardskillsVaga.length; i++) {

        HardskillsVagaOn.push(HardskillsVaga[i].innerText)

    }



    let SoftskillsVagaDB = SoftskillsVagaOn.toString()
    let HardskillsVagaDB = HardskillsVagaOn.toString()
    let Salario_vaga = document.querySelector("#salarioVaga").value

    let empresa = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"))

    sendVacancyData(SoftskillsVagaDB, Nome_vaga, Descricao_vaga, Local_vaga, Salario_vaga, empresa.id_empresas, HardskillsVagaDB, ModalidadeVaga)



}



// enviar infos do cadastro da candidata para o banco de dados
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

// enviar infos do cadastro da companhia para o banco de dados
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

// enviar para banco de dados uma vaga cadastrada
function sendVacancyData(SoftskillVaga, NomeVaga, DescricaoVaga, LocalVaga, SalarioVaga, IdEmpresa, HardskillVaga, ModalidadeVaga) {
    $.ajax({
        url: "http://localhost:3000/rotas/formVagas",
        method: "POST",
        data: {
            SoftskillVaga: SoftskillVaga,
            NomeVaga: NomeVaga,
            DescricaoVaga: DescricaoVaga,
            LocalVaga: LocalVaga,
            SalarioVaga: SalarioVaga,
            IdEmpresa: IdEmpresa,
            HardskillVaga: HardskillVaga,
            ModalidadeVaga: ModalidadeVaga

        },
        success: function () {
            window.location.replace("/views/Recruiter/cadastroRecrutadora3.html")
        }
    })
}

// enviar e-mail e senha informados quando do login de candidata na landing page
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
            window.location.replace("/views/Users/usuariaCandidata1.html")

        }
    })
}

// enviar e-mail e senha informados quando do login de empresa na landing page
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
            window.location.replace("/views/Recruiter/cadastroRecrutadora3.html")

        }
    })
}

// quando do login, pegar infos de candidata cadastradas no banco de dados, e display na página de perfil da candidata 
function logadoUser() {
    let usuario = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))

    $("#name").html(usuario.nome_candidata)
    $("#local").html(usuario.pais_candidata)
    $("#ocup").html(usuario.cargo_candidata)
    $("#grau").html(usuario.escolaridade_candidata)

    let Hardskills = usuario.hardskill_candidata.split(",")

    for (let i = 0; i < Hardskills.length; i++) {

        let hardspace = document.querySelector("#HSK")

        hardspace.innerHTML += `<p class="softSkillTag">${Hardskills[i]}</p>`
    }


    let Softskills = usuario.softskill_candidata.split(",")

    for (let i = 0; i < Softskills.length; i++) {

        let softspace = document.querySelector("#SSK")

        softspace.innerHTML += `<p class="softSkillTag">${Softskills[i]}</p>`
    }

    $.ajax({
        url: "http://localhost:3000/rotas/listVagaUser",
        method: "POST",
        data: {
            id_candidata: usuario.id_candidata
        },
        success: function (res) {

            for (let i = 0; i < res.length; i++) {


                let div = document.querySelector("#vagasUser")

                div.innerHTML += `<div class=" rounded-pill card mb-2" style="width: 445px;">
                <h1 class = "d-flex justify-content-center fs-4 p-3">${res[i].nome_vaga}</h1>
                <p class = "d-flex justify-content-center">${res[i].descricao_vaga}</p>

                <div class="icons">
                    <a href="" class="mb-3 d-flex justify-content-center">
                        <img src="../../images/DeleteIcon.svg"
                            style="filter: invert(41%) sepia(53%) saturate(6570%) hue-rotate(343deg) brightness(96%) contrast(99%);"
                            alt="">
                    </a>
                </div>
            </div>`




            }


        }
    })

}

// quando do login, pegar infos de empresa cadastradas no banco de dados, e display na página de perfil da empresa
function logadoRecruit() {
    let Recruit = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"))

}

