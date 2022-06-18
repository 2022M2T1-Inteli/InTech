// função que carrega todas as vagas registradas de tal empresa registrada

function loadVagas() {
    let EmpresaInfos = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"));
    $("#nomeEmpresa").html(EmpresaInfos.nome_empresa) // coloca as informações da empresa logando diretamente no frontend
    $("#email").html(EmpresaInfos.email_empresa) // coloca as informações da empresa logando diretamente no frontend

    $.ajax({
        url: 'http://localhost:3000/recruiter/listAllEmpresaVagas', // porta da rota
        method: 'POST',
        data: { // o que será enviado (req.body)
            id_empresa: EmpresaInfos.id_empresas
        },
        success: function (res) { //se retornar status:200, executa código abaixo
            console.log(res)
            const divPai = document.querySelector('#rowBack');
            for (let i = 0; i < res.length; i++) {
                const divPai = document.querySelector('#rowBack');

                //abaixo: modelo HTML que será retornado

                divPai.innerHTML += `<div class="card" style="width: 445px;">  
                <h1>${res[i].nome_vaga}</h1>
                <p>${res[i].descricao_vaga}</p>

                <div class="icons">
                    <a href="./vagaCadastrada.html">
                        <img src="../../images/PeopleIcon.svg"
                            style="filter: invert(19%) sepia(39%) saturate(6051%) hue-rotate(271deg) brightness(62%) contrast(125%);"
                            alt="">
                    </a>
                        <img src="../../images/EditIcon.svg"
                            style="filter: invert(93%) sepia(20%) saturate(4786%) hue-rotate(336deg) brightness(106%) contrast(91%);"
                            alt="">
                    <button class="btn btn-danger" onclick="openPopup(${res[i].id_vaga})">
                        <img src="../../images/DeleteIcon.svg"
                            style="filter: invert(41%) sepia(53%) saturate(6570%) hue-rotate(343deg) brightness(96%) contrast(99%);"
                            alt="">
                    </button>
                </div>
            </div>`
            }

            divPai.innerHTML += `<button><a href="./cadastroRecrutadora5.html" ><img src="../../images/AddBtn.svg" alt="Adicionar vaga" srcset=""></a></button>`

        }
    })
}

// quando do login, pegar infos de empresa cadastradas no banco de dados, e display na página de perfil da empresa
function logadoRecruit(email,senha) {
    let Recruit = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"))
    $("#name").html(Recruit.nome_empresa)
    $("#localizacao").val(Recruit.localizacao_empresa)
    $("#telefone").val(Recruit.telefone_empresa)
    $("#site").val(Recruit.site_empresa)
    $("#cultura").val(Recruit.cultura_empresa)
    $("#preview").attr("src", Recruit.logo_empresa)
    $("#email").val(Recruit.email_empresa)
    $("senha").val(Recruit.senha_empresa)

    $.ajax({
        url: "http://localhost:3000/recruiter/loginRecruit",
        method: "POST",
        data: {
            email: email,
            senha: senha

        },
        error: function (res) {
            $("#error").html(res.responseJSON)
        },
        success: function (res) {
            sessionStorage.setItem("EmpresaDadosLogin", JSON.stringify(res))


        }
    })

}


function EditCompany(id_empresa, logo, email, senha, telefone, site, localização, ramo, cultura) {

    $.ajax({
        url: "http://localhost:3000/recruiter/editEmpresa",
        method: "PUT",
        data: {
            id_empresa: id_empresa,
            logo: logo,
            email: email,
            senha: senha,
            telefone: telefone,
            site: site,
            localização: localização,
            ramo: ramo,
            cultura: cultura
        },
        success: function () {
            let senhaEmpresa = senha
            let emailEmpresa = email

            sessionStorage.removeItem("EmpresaDadosLogin")
            loginRecruit(emailEmpresa, senhaEmpresa)
            window.location.reload()



        },
        error: function (res) {
            alert(res)
        }

    })

}




