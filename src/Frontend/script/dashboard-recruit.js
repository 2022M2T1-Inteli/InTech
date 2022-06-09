function loadVagas() {
    let EmpresaInfos = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin")); 

    $.ajax({
        url: 'http://localhost:3000/rotas/listAllEmpresaVagas',
        method: 'POST', 
        data: {
            id_empresa: EmpresaInfos.id_empresas
        }, 
        success: function(res) {
            const divPai = document.querySelector('#rowBack'); 
            for (let i = 0; i < res.length; i++) {
                const divPai = document.querySelector('#rowBack'); 

                divPai.innerHTML += `<div class="card" style="width: 445px;">
                <h1>Desenvolvedora Front-End</h1>
                <p>Descrição da vaga</p>

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

            divPai.innerHTML += `<button onclick=""><img src="../../images/AddBtn.svg" alt="Adicionar vaga" srcset=""></button>`

        }
    })
}