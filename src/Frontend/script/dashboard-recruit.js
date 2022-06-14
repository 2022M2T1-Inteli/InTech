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
                        <img src="../../images/EditIcon.svg"
                            style="filter: invert(93%) sepia(20%) saturate(4786%) hue-rotate(336deg) brightness(106%) contrast(91%);"
                            alt="">
                        <img src="../../images/DeleteIcon.svg"
                            style="filter: invert(41%) sepia(53%) saturate(6570%) hue-rotate(343deg) brightness(96%) contrast(99%);"
                            alt="">
                    </a>
                </div>
            </div>`
            }

            divPai.innerHTML += `<button><a href="./cadastroRecrutadora5.html" ><img src="../../images/AddBtn.svg" alt="Adicionar vaga" srcset=""></a></button>`

        }
    })
}