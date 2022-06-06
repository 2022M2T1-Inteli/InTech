let userForms1
let recuitForms1





function catchUserData() {

    //Tela de Cadastro 1
    let forms1 = {
        NomeCandidata: document.querySelector('#nomeCandidata').value,
        EmailCandidata: document.querySelector('#emailCandidata').value,
        CelularCandidata: document.querySelector('#celularCandidata').value,
        CPFCandidata: document.querySelector('#cpfCandidata').value,
        GeneroCandidata: document.querySelector('#genero').value,
        SenhaCandidata: document.querySelector('#senha').value
    }

    sessionStorage.setItem("User1", JSON.stringify(forms1))


    // adicionar localizacao



    window.location.pathname = "/src/Frontend/views/Users/cadastroUsuaria2.html"
    // Tela de Cadastro 2







}

function catchUserData2() {
    userForms1 = JSON.parse(sessionStorage.getItem("User1"))




    //aqui vai as infos da tela cadastro 2
    let Status_candidata = document.querySelector("#Status_candidata").value
    let Escolaridade_candidata = document.querySelector("#Escolaridade_candidata").value

    let SoftSkillIn = document.querySelectorAll("#testesoft")
    let HardSkillIn = document.querySelectorAll("#testehard")
    let SoftSkillon = []
    let HardSkillon = []

    let PDFcurriculo = document.querySelector("#formFile")

    for (let i = 0; i < SoftSkillIn.length; i++) {

        SoftSkillon.push(SoftSkillIn[i].innerText)

    }
    for (let i = 0; i < HardSkillIn.length; i++) {

        HardSkillon.push(HardSkillIn[i].innerText)

    }

    let SoftSkill = SoftSkillon.toString()
    let HardSkill = HardSkillon.toString()


    

    sendUserData(userForms1.NomeCandidata, Escolaridade_candidata, userForms1.EmailCandidata, userForms1.CelularCandidata, userForms1.CPFCandidata, "teste", "teste2", "teste3", userForms1.GeneroCandidata, SoftSkill || HardSkill, userForms1.SenhaCandidata)
}





function catchRecruiterData() {


    let formsRecruit1 = {
        // Tela de Cadastro Recrutadora 1 
        NomeEmpresa : document.querySelector('#nomeEmpresa').value,
        RamoAtividade : document.querySelector('#ramoEmpresa').value,
        CnpjEmpresa : document.querySelector('#cnpjEmpresa').value,
        LocalizacaoEmpresa : document.querySelector('#localizacaoEmpresa').value


    }

    sessionStorage.setItem("Recruit1",JSON.stringify(formsRecruit1))

    window.location.pathname = '/src/Frontend/views/Recruiter/cadastroRecrutadora2.html'









}

function catchRecruiterData2() {

    recuitForms1 = JSON.parse(sessionStorage.getItem("Recruit1"))

    // Tela de Cadadastro Recrutadora 2
    let TelefoneEmpresa = document.querySelector('#telefoneEmpresa').value;
    let SiteEmpresa = document.querySelector('#siteEmpresa').value;
    let EmailEmpresa = document.querySelector('#emailEmpresa').value;
    let SenhaEmpresa = document.querySelector('#senhaEmpresa').value;




    sendRecruitData(recuitForms1.NomeEmpresa,recuitForms1.RamoAtividade,recuitForms1.CnpjEmpresa,recuitForms1.LocalizacaoEmpresa,TelefoneEmpresa,SiteEmpresa,EmailEmpresa,SenhaEmpresa)

}




function sendUserData(Nome_Candidata, Escolaridade_candidata, Email_candidata, Celular_candidata, CPF_canditada, UF_candidata, Cidade_candidata, Data_nascimento, Genero_canditada, Habilidade_candidata, Senha_canditada, Cargo_canditada) {
    $.ajax({
        url: "http://localhost:3000/formCandidata",
        method: "POST",
        data: {
            Nome_Candidata: Nome_Candidata,
            Escolaridade_candidata: Escolaridade_candidata,
            Email_candidata: Email_candidata,
            Celular_candidata: Celular_candidata,
            CPF_canditada: CPF_canditada,
            UF_candidata: UF_candidata,
            Cidade_candidata: Cidade_candidata,
            Data_nascimento: Data_nascimento,
            Genero_canditada: Genero_canditada,
            Habilidade_candidata: Habilidade_candidata,
            Senha_canditada: Senha_canditada,
        }
    })
}



function sendRecruitData(NomeEmpresa,RamoAtividade,CnpjEmpresa,LocalizacaoEmpresa,TelefoneEmpresa,SiteEmpresa,EmailEmpresa,SenhaEmpresa){
    $.ajax({
        url:"http://localhost:3000/rotas/formEmpresa",
        method: "POST",
        data:{Nome_Empresa:NomeEmpresa,
            Ramo_de_Atividade:RamoAtividade,
            cnpj:CnpjEmpresa,
            Localizacao:LocalizacaoEmpresa,
            Telefone:TelefoneEmpresa,
            Site:SiteEmpresa,
            Email:EmailEmpresa,
            Senha:SenhaEmpresa

        },
        sucesse: function(sucess){
            console.log(sucess.status)
           

        }
    }).done(function(){
        window.location.pathname = '/src/Frontend/views/Recruiter/cadastroRecrutadora4.html'
    })



}