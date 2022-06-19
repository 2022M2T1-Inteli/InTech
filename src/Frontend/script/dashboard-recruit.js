const getUrlParameter = new URLSearchParams(window.location.search)

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

                divPai.innerHTML += `
                <div class="card" style="width: 445px;">  
                    <a style="color: black; text-decoration: none;" href="./VagaDescricao.html?id_vaga=${res[i].id_vaga}">
                    <h1>${res[i].nome_vaga}</h1>
                    <p>${res[i].descricao_vaga}</p>

                <div class="icons">
                    <button class="btn btn-danger" onclick="openPopup(${res[i].id_vaga})">
                        <img src="../../images/DeleteIcon.svg"
                            style="filter: invert(41%) sepia(53%) saturate(6570%) hue-rotate(343deg) brightness(96%) contrast(99%);"
                            alt="">
                    </button>
                </div>
                </a>
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

let hardSkills
let softSkills

function loadVagaInformation() {

    const id_vaga = getUrlParameter.get('id_vaga')

    $.ajax({
        url: `http://localhost:3000/rotas/listVagaInfo?id_vaga=${id_vaga}`,
        method: 'POST', 
        success: (res) => {
            console.log(res)
            $("#tituloVaga").html(res.nome_vaga)
            $("#descricaoVaga").val(res.descricao_vaga)
            $("#salario").val(res.salario_vaga)
            $("#localizacao").val(res.local_vaga)
            $("#modalidade").val(res.modalidade_vaga)

            hardSkills = res.hardskill_vaga.split(',')
            updateHardSkills(hardSkills)
            softSkills = res.softskill_vaga.split(',')
            updateSoftSkills(softSkills)

            $.ajax({
                url: 'http://localhost:3000/rotas/listCandidatas',
                method: 'POST',
                data: {
                    id_vaga: id_vaga
                }, 
                success: (res) => {

                    let divC = document.querySelector('#AplicantesCards')

                    for (let i = 0; i < res.length; i++) {
                        let match = res[i].match_percent * 100

                        divC.innerHTML += `
                        <div id="${i}" class="CardCandidata">
                            <h2 id="nomeCandidata" class="nomeCand">${res[i].nome_candidata}</h2>
                            <a href="mailto:${res[i].email_candidata}" id="contato">Entrar em contato</a>
                            <p><span id="porcentagem">${match}% de compatibilidade</span></p>

                            

                        </div>

                        `
                        
                        let div = document.getElementById(`${i}`)

                        if (match >= 80) {
                            div.classList.add('roxoesc')
                        } else {
                            div.classList.add('roxoclaro')
                        }

                        if (res[i].curriculo_candidata !== null) {
                            div.innerHTML += `<div class="CV">
                                <a id="CV${i}" download="${res[i].nome_candidata} - CV" href="${res[i].curriculo_candidata}"> <img src="../../images/DownloadIcon.svg" style="width: 20px;" alt="Icone de download">Baixar CV</a>
                            </div>`
                        } else {
                            div.innerHTML += `<div class="CV"> <i> * Usuária sem currículo cadastrado </i></div>`
                        }
                    }
                }
            })
        }
    })
}

let hardspace = document.querySelector("#hardskillsContainer")
let softspace = document.querySelector("#softskillsContainer")

function updateHardSkills(array) {
    clearHardSkills()
    for (let i = 0; i < array.length; i++) {
        hardspace.innerHTML += `<span id="${array[i]}" class="rounded-pill skill">${array[i]} <i class="closeSoftSkill" onclick="removeHardSkill(${i})"></i></span>`
    }
}

function updateSoftSkills(array) {
    clearSoftSkills()
    for (let i = 0; i < array.length; i++) {
        softspace.innerHTML += `<span id="${array[i]}" class="skill rounded-pill">${array[i]} <i class="closeSoftSkill" onclick="removeSoftSkill(${i})"></i></span>`
    }
}

function clearHardSkills() {
    hardspace.querySelectorAll('span').forEach(tagElement => tagElement.remove());
}

function clearSoftSkills() {
    softspace.querySelectorAll('span').forEach(tagElement => tagElement.remove());
}

function removeHardSkill(e) {
    hardSkills.splice(e, 1)
    updateHardSkills(hardSkills)
}

function removeSoftSkill(e) {
    softSkills.splice(e, 1)
    updateSoftSkills(softSkills)
}

function loginRecruit(email,senha) {
  

    $.ajax({
        url: "http://localhost:3000/recruiter/loginRecruit",
        method: "POST",
        data: {
            email: email,
            senha: senha

        },
        error: function (res) {
            console.log(res)
            $("#error").html(res.responseJSON)
        },
        success: function (res) {
            
            sessionStorage.setItem("EmpresaDadosLogin", JSON.stringify(res))
            window.location.reload()
            

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
           
            let email = document.querySelector("#email").value
            let senha = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin")).senha_empresa

            sessionStorage.removeItem("EmpresaDadosLogin")
            setTimeout(function(){
                loginRecruit(email,senha)

            },1000) 
            
            // 
        },
        error: function (res) {
            alert(res)
        }

    })

}

function editVaga(softskill, descricao, salario, hardskill, modalidade, local) {
    $.ajax({
        url: "http://localhost:3000/vaga/editVaga",
        method: "PUT",
        data: {
            id_vaga: getUrlParameter.get("id_vaga"),
            softskill: softskill,
            descricao: descricao,
            salario: salario,
            hardskill: hardskill,
            modalidade: modalidade,
            local: local
        },
        success: function () {
            window.location.reload()
        },
        error: function (err) {
            alert(err)
        }
    })

}



