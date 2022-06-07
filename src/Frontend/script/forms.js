let userForms1


function catchUserData() {

    //Tela de Cadastro 1
    let forms1 = {
        NomeCandidata: document.querySelector('#nomeCandidata').value,
        EmailCandidata: document.querySelector('#emailCandidata').value,
        CelularCandidata: document.querySelector('#celularCandidata').value,
        CPFCandidata: document.querySelector('#cpfCandidata').value,
        GeneroCandidata: document.querySelector('#genero').value,
        SenhaCandidata: document.querySelector('#senha').value,
        NascimentoCandidata:document.getSelection("#data-nascimento").value
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
    let Cargo_canditada = document.querySelector("#cargoCandidata").value

    let SoftSkillIn = document.querySelectorAll("#testesoft")
    let HardSkillIn = document.querySelectorAll("#testehard")
    let habilidades = []
    

    let PDFcurriculo = document.querySelector("#formFile")

    for (let i = 0; i < SoftSkillIn.length; i++) {

        habilidades.push(SoftSkillIn[i].innerText)

    }

    for (let i = 0; i < HardSkillIn.length; i++) {

        habilidades.push(HardSkillIn[i].innerText)

    }


    let habilidadeDB = habilidades.toString()

    

    sendUserData(userForms1.NomeCandidata, Escolaridade_candidata, userForms1.EmailCandidata, userForms1.CPFCandidata,userForms1.GeneroCandidata,userForms1.NascimentoCandidata,PDFcurriculo,habilidadeDB,userForms1.SenhaCandidata,Cargo_canditada,userForms1.CelularCandidata, "testeteste",Status_candidata)
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

    let recuitForms1 = JSON.parse(sessionStorage.getItem("Recruit1"))

    // Tela de Cadadastro Recrutadora 2
    let TelefoneEmpresa = document.querySelector('#telefoneEmpresa').value;
    let SiteEmpresa = document.querySelector('#siteEmpresa').value;
    let EmailEmpresa = document.querySelector('#emailEmpresa').value;
    let SenhaEmpresa = document.querySelector('#senha').value;




    sendRecruitData(recuitForms1.NomeEmpresa,EmailEmpresa,recuitForms1.RamoAtividade,"logo",SenhaEmpresa,"cultura",TelefoneEmpresa,SiteEmpresa,recuitForms1.CnpjEmpresa,recuitForms1.LocalizacaoEmpresa)

    sessionStorage.removeItem("Recruit1")

}


function catchVacancyData(){
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

    sendVacancyData(HabilidadeDBVaga,Nome_vaga,Descricao_vaga,Local_vaga,Salario_vaga)



}




function sendUserData(Nome_Candidata,Escolaridade_candidata,Email_candidata,CPF_canditada,Genero_canditada,Data_nascimento,Curriculo_candidata,Habilidade_candidata,Senha_canditada,Cargo_canditada,Celular_candidata, UF_candidata,Status_candidata ) {
    $.ajax({
        url: "http://localhost:3000/formCandidata",
        method: "POST",
        data: {
            Nome_Candidata: Nome_Candidata,
            Escolaridade_candidata: Escolaridade_candidata,
            Email_candidata: Email_candidata,
            CPF_canditada: CPF_canditada,
            Genero_canditada: Genero_canditada,
            Data_nascimento: Data_nascimento,
            Curriculo_candidata:Curriculo_candidata,
            Habilidade_candidata: Habilidade_candidata,
            Senha_canditada: Senha_canditada,
            Cargo_canditada:Cargo_canditada,
            Celular_candidata: Celular_candidata,
            UF_candidata: UF_candidata,
            Status_candidata:Status_candidata 
                 
        },
        success: function(){
            window.location.replace()
        }

    })
}

function sendRecruitData(NomeEmpresa,EmailEmpresa,RamoAtividade,Logo_Empresa,SenhaEmpresa,Cultura_Empresa,TelefoneEmpresa,SiteEmpresa,CnpjEmpresa,LocalizacaoEmpresa){
    $.ajax({
        url:"http://localhost:3000/rotas/formEmpresa",
        method: "POST",
        data:{
            Nome_Empresa:NomeEmpresa,
            Email_Empresa:EmailEmpresa,
            Ramo_de_Atividade:RamoAtividade,
            Logo_Empresa:Logo_Empresa,
            Senha_Empresa:SenhaEmpresa,
            Cultura_Empresa:Cultura_Empresa,
            Telefone_Empresa:TelefoneEmpresa,
            Site_Empresa:SiteEmpresa,
            cnpj_Empresa:CnpjEmpresa,
            Localizacao_Empresa:LocalizacaoEmpresa
        },
        success: function(){
            window.location.replace('/views/Recruiter/cadastroRecrutadora4.html')       

        }
    })



}


function sendVacancyData(Habilidades_vaga,Nome_vaga,Descricao_vaga,Local_vaga,Salario_vaga){
    $.ajax({
        url:"http://localhost:3000/rotas/formVagas",
        method:"POST",
        data:{
            Habilidades_vaga:Habilidades_vaga,
            Nome_vaga:Nome_vaga,
            Descricao_vaga:Descricao_vaga,
            Local_vaga:Local_vaga,
            Salario_vaga:Salario_vaga

        }
    })
}