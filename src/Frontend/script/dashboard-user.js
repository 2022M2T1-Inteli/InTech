// quando do login, pegar infos de candidata cadastradas no banco de dados, e display na página de perfil da candidata 
function logadoUser() {
    let usuario = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))

    $("#name").html(usuario.nome_candidata)
    $("#local").val(usuario.pais_candidata)
    $("#cargoCandidata").val(usuario.cargo_candidata)
    $("#escolaridadeCandidata").val(usuario.escolaridade_candidata)

    let Hardskills = usuario.hardskill_candidata.split(",")

    for (let i = 0; i < Hardskills.length; i++) {

        let hardspace = document.querySelector("#hardskills")

        hardspace.innerHTML += `<p id="${Hardskills[i]}" class="rounded-pill skill">${Hardskills[i]} <i class="closeSoftSkill" onclick="removeHardSkill(${Hardskills[i]})" data-id="${Hardskills[i]}">✕</i></p>`
    }
    
    let Softskills = usuario.softskill_candidata.split(",")

    for (let i = 0; i < Softskills.length; i++) {

        let softspace = document.querySelector("#softskills")

        softspace.innerHTML += `<p class="skill rounded-pill">${Softskills[i]} <i class="closeSoftSkill" data-id="${Softskills[i]}">✕</i></p>`
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
                                alt="Retirar aplicação">
                        </a>
                    </div>
            </div>`

            }

        }
    })

}
function removeHardSkill(e) {
    console.log(e)
}

function editarUser(id_candidata, estado, cidade, cargo, grauDeInstrução, hardskill, softskill) {
    alert('foi salvo')
    // $.ajax({
    //     url: "http://localhost:3000/user/editarUser",
    //     method: "PUT",
    //     data: {
    //         id_candidata: id_candidata,
    //         estado: estado,
    //         cidade: cidade,
    //         cargo: cargo,
    //         grauDeInstrução: grauDeInstrução,
    //         hardskill: hardskill,
    //         softskill: softskill
    //     },
    //     success: function () {
    //         //se tiver que voltar a tela usar window.replace,
    //         // se for fazer na mesma tela so pede para fazer reload na pagina ou aparecer um popup e depois reload
    //     },
    //     error: function () {
    //         // colocar algum ponto do html para aparecer a mensagem de erro
    //     }
    // })
}

function deleteUser(id_candidata) {
    $.ajax({
        url: "http://localhost:3000/user/deleteCandidata",
        method: "DELETE",
        data: {
            id_candidata: id_candidata
        },
        success: function () {
            //redirecionar para o index.js
        },
        error: function () {
            //mostrar erro na pagina html 
        }


    })
}
