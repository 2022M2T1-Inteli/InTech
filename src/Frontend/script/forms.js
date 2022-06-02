// Candidata 
let userForms1

function catchUserData() {

    //Tela de Cadastro 1
    let forms1 = {
        NomeCandidata:document.querySelector('#nomeCandidata').value,
        EmailCandidata : document.querySelector('#emailCandidata').value,
        CelularCandidata : document.querySelector('#celularCandidata').value,
        CPFCandidata : document.querySelector('#cpfCandidata').value,
        GeneroCandidata : document.querySelector('#genero').value,
        SenhaCandidata : document.querySelector('#senha').value



    }

    sessionStorage.setItem("User1",JSON.stringify(forms1))


    // adicionar localizacao



    window.location.pathname = "/src/Frontend/views/Users/cadastroUsuaria2.html"
    // Tela de Cadastro 2




    //Nome_candidata, Escolaridade_candidata, Email_candidata, Celular_candidata, CPF_canditada, UF_candidata, Cidade_candidata, Data_nascimento, Genero_canditada, Habilidade_candidata, Senha_canditada, Cargo_canditada

    
}

function catchUserData2(){
    userForms1 =  JSON.parse(sessionStorage.getItem("User1"))
    //aqui vai as infos da tela cadastro 2

    // sendUserData(nome)
}

function sendUserData(a,b,c) {
    $.ajax({
        url: "http://localhost:3000/rotas/formCandidata",
        method: "POST",
        data:{Nome_Candidata:a,}
    })
}


function catchRecruiterData() {

    // Tela de Cadastro Recrutadora 1 
    let NomeEmpresa = document.querySelector('#nomeEmpresa');
    let RamoAtividade = document.querySelector('#ramoEmpresa');
    let CnpjEmpresa = document.querySelector('#cnpjEmpresa');
    let LocalizacaoEmpresa = document.querySelector('#localizacaoEmpresa')

    // Tela de Cadadastro Recrutadora 2
    let TelefoneEmpresa = document.querySelector('#telefoneEmpresa').value;
    let SiteEmpresa = document.querySelector('#siteEmpresa').value;
    let EmailEmpresa = document.querySelector('#emailEmpresa').value;
    let SenhaEmpresa = document.querySelector('#senhaEmpresa').value;

}




