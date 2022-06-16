function loadData() {
    loadCandidatas()
    loadEmpresasParceiras()
    loadEmpresasSolicitantes()
    loadDashVagas()
}

//função apenas para a dashboard. retorna apenas os números de candidatas
function loadCandidatas() {
    $.ajax({
        url: "http://localhost:3000/adm/listCandidatas",
        type: 'GET',
        success: (res) => {
            $("#qtnCandidatas").html(res.length)
        }
    })
}

//função apenas para a dashboard. retorna apenas os números de empresas
function loadEmpresasParceiras() {
    $.ajax({
        url: "http://localhost:3000/adm/listEmpresasParceiras",
        type: 'GET',
        success: (res) => {
            $("#qtnEmpresas").html(res.length)
            const tbody = document.querySelector('#tabela-empresas')
            for (let i = 0; i < res.length; i++) {
                tbody.innerHTML += `
                <tr>
                    <td class="opportunities">
                        <img src="${res[i].logo_empresa}"alt="Logo da empresa ${res[i].nome_empresa}">
                        <div class="people-de">
                        <h5>${res[i].nome_empresa}</h5>
                    </td>

                    <td class="people-designation">
                        <p id="vagas-${res[i].id_empresas}"></p>
                    </td>


                    <td class="edit"><a href="#"> Remover empresa </a></td>
                </tr>`
            }
            console.log(res)
        }
    })
}

function loadEmpresasSolicitantes() {
    $.ajax({
        url: 'http://localhost:3000/adm/listEmpresasSolicitantes',
        type: 'GET',
        success: (res) => {
            const tbody = document.querySelector('tbody')
            for (let i = 0; i < res.length; i++) {
                tbody.innerHTML += `
                <tr>
                <td class="opportunities">
                    <img src="${res[i].logo_empresa}" alt="logo da empresa cadastrada">
                    <div class="people-de">
                        <h5>${res[i].nome_empresa}</h5>
                </td>

                <td class="role">
                    <p>00/00/00</p>
                </td>

                <td class="edit"><a href="#"> Analisar solicitação </a></td>
            </tr>
                `
            }
        }
    })
}

//função apenas para a dashboard. retorna apenas os números de vagas
function loadDashVagas() {
    $.ajax({
        url: "http://localhost:3000/adm/listAllVagas",
        type: 'GET',
        success: (res) => {
            $("#qtnVagas").html(res.length)

        }
    })
}