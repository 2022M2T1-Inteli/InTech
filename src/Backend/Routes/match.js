const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado



async function matchDoMilenio(){

    const db = await sqlite.open({filename:`./database/banco_de_dados.db`,driver:sqlite3.Database})

    let habCandidata
    let Vagas

    await db.get(`SELECT habilidades_candidata FROM candidatas WHERE id_candidata == ?`,[req.header.id]).then((res)=>{
        habCandidata += res
    })

    await db.all(`SELECT habilidades_vaga FROM vagas `).then((res)=>{
        Vagas += res
    })

    let a = habCandidata.habilidade_candidata.split(",")

    let JsonVagasMatch = []
    let c = []
    
    for(let i = 0; i<Vagas.length; i++){
        let b = Vagas[i].habilidades_vaga.split(",")

        if(a.indexOf(b)){
            
        }



        

        

    }
    

}

matchDoMilenio()