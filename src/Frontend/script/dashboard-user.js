
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
        url: "http://localhost:3000/user/listVagaUser",
        method: "POST",
        data: {
            id_candidata: usuario.id_candidata
        },
        success: function (res) {

            for (let i = 0; i < res.length; i++) {
                let div = document.querySelector(".vagasUser")

                div.innerHTML += `
                <div class="appliedCard rounded-pill card mb-2" style="width: 445px;">
                    <a href="./usuariaCandidata2.html?id_vaga=${res[i].id_vaga}">
                        <h1 class = "d-flex justify-content-center fs-4 p-3">${res[i].nome_vaga}</h1>
                        <p class = "d-flex justify-content-center">${res[i].descricao_vaga}</p>
                    </a>
                    <div class="icons">
                        <a href="/" class="mb-3 d-flex justify-content-center">
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