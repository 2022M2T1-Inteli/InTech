const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado


async function matchDoMilenio() {
    const db = await sqlite.open({ filename: `../database/banco_de_dados.db`, driver: sqlite3.Database })

    // pegando as habilidades da candidata e todas as vagas
    const dbCandidataSkills = await db.get('SELECT habilidades_candidata FROM candidatas');
    const dbVagas = await db.all('SELECT * FROM vagas');

    // Comentei pq como ainda não estava tendo conexão pra pegar o ID estava dando erro no req.header
    // const dbCandidataSkills = await db.get(`SELECT habilidades_candidata FROM candidatas WHERE id_candidata == ?`,[req.header.id]).then((res)=>{
    //     habCandidata += res
    // })

    // const dbVagasSkills = await db.all(`SELECT * FROM vagas `).then((res)=>{
    //     Vagas += res
    // })

    let candidataSkills = (dbCandidataSkills.habilidades_candidata).split(', ') //transformando as habilidades da candidata em um array
    let idVagasMatched = [] //variável que guardará o ID das vagas que deram match
   
    for (let x = 0; x < dbVagas.length; x++) { //mapeando vaga por vaga
        let vagaSkills = (dbVagas[x].habilidades_vaga).split(', ') //transformando as skills da vaga mapeada em um array
        let matchedSkills = [] // guardará quais skills deram match

        for (let i = 0; i < vagaSkills.length; i++) { // mapeando skill por skill 
            if (vagaSkills.indexOf(candidataSkills[i]) > -1) { // quando uma skill não da match, retorna -1 e quando da match, retorna um número >= 0
                matchedSkills.push(candidataSkills[i]) // guarda o valor da skill que deu match 
            } 
        }

        let matchPercent = matchedSkills.length /vagaSkills.length // calcula a porcentagem do match

        //caso o match seja maior igual a 50% ele guarda o id da vaga na variável idVagasMatched
        if (matchPercent >= 0.5) {
            idVagasMatched.push(dbVagas[x].id_vaga) 
        }

    }

    console.log(idVagasMatched)
}

matchDoMilenio()