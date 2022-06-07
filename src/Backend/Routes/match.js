const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado



async function matchDoMilenio(){

    const db = await sqlite.open({filename:`./database/banco_de_dados.db`,driver:sqlite3.Database})

    await db.run(`SELECT habilidades_candidata FROM candidatas`)
    await db.run(`SELECT habilidades_vaga FROM vagas `)
    

}

matchDoMilenio()