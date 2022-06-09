var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}; 

function loadVagaData() {

    let id_vaga = getUrlParameter('id_vaga')

    $.ajax({
        url: `http://localhost:3000/rotas/listVagas?id_vaga=${id_vaga}`,
        method: 'post',
        success: function(res) {
            $("#tituloVaga").html(res.vagaInfos.nome_vaga)
            $("#nomeEmpresa").html(res.empresaInfos.nome_empresa)
            $("#salarioVaga").html(` - R$ ${res.vagaInfos.salario_vaga}`)
            $("#descricaoVaga").html(res.vagaInfos.descricao_vaga)
            $("#culturaEmpresa").html(res.empresaInfos.cultura_empresa)

            const softskills = res.vagaInfos.softskill_vaga.split(',')
            const hardskills = res.vagaInfos.hardskill_vaga.split(',')

            for (let i = 0; i < softskills.length; i++) {
                const divSoftSkills = document.querySelector('#soft-skills');
                divSoftSkills.innerHTML += `<p class="border border-warning rounded-pill p-2">${softskills[i]}</p>`
            }

            for (let x = 0; x < hardskills.length; x++) {
                const divHardSkills = document.querySelector('#hard-skills');
                divHardSkills.innerHTML += `<p class="border border-warning rounded-pill p-2">${hardskills[x]}</p>`
            }
        }
    })
}


function applyVaga() {
    let id_vaga = getUrlParameter('id_vaga')
    let { id_candidata } = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))
   
    $.ajax({
        url: 'http://localhost:3000/rotas/applied',
        method: 'POST', 
        data: {
            id_candidata: id_candidata,
            id_vaga: id_vaga
        }, 
        success: function() {
            alert('Aplicado, com sucesso!')
        }
    })
}