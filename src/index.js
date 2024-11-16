const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}; 

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

//assincrono para que ela possa rodar no momento desejado.
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
    }
    return result
}

async function logRollResult(charName, block, diceResult, atribult) {
    console.log(`${charName} rolou um dado de ${block} ${diceResult} + ${atribult} = ${diceResult + atribult}`)
}

async function playRaceEngine(charac1, charac2) {
    for (let round = 1; round <=5; round++) {
        console.log(`Rodada ${round}`)

        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
        
        //roda Dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();   
        
        //teste de abilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if(block == "RETA"){
            totalTestSkill1 = diceResult1 + charac1.VELOCIDADE
            totalTestSkill2 = diceResult2 + charac2.VELOCIDADE

            await logRollResult(charac1.NOME, "velocidade",totalTestSkill1, charac1.VELOCIDADE)
            await logRollResult(charac2.NOME, "velocidade",totalTestSkill2, charac2.VELOCIDADE)
        }
        if(block == "CURVA"){
            totalTestSkill1 = diceResult1 + charac1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + charac2.MANOBRABILIDADE

            await logRollResult(charac1.NOME, "manobrabilidade",totalTestSkill1, charac1.MANOBRABILIDADE)
            await logRollResult(charac2.NOME, "manobrabilidade",totalTestSkill2, charac2.MANOBRABILIDADE)
        }
        if(block == "CONFRONTO"){
            let powerTestSkill1 = diceResult1 + charac1.PODER
            let powerTestSkill2 = diceResult2 + charac2.PODER

            console.log(`${charac1.NOME} confrontou ${charac2.NOME}!`)

            await logRollResult(charac1.NOME, "poder",powerTestSkill1, charac1.PODER)
            await logRollResult(charac2.NOME, "poder",powerTestSkill2, charac2.PODER)

         
            if(powerTestSkill1 > powerTestSkill2 && charac2.PONTOS > 0){
                console.log(`${charac1.NOME} venceu o confronto! ${charac2.NOME} perdeu 1 ponto`)
                charac2.PONTOS--;
            }

            if(powerTestSkill1 < powerTestSkill2 && charac1.PONTOS > 0){
                console.log(`${charac2.NOME} venceu o confronto! ${charac1.NOME} perdeu 1 ponto`)
                charac1.PONTOS--;
            }

            console.log(powerTestSkill1 == powerTestSkill2
                ? "Confronto empatado! Nenhum ponto foi perdido"
                : ""
            )
            
        }

        //verifica vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${player1.NOME} marcou um ponto!`)
            charac1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${player2.NOME} marcou um ponto!`)
            charac2.PONTOS++;
        }

        console.log("-------------------------------------------------------------")
    }
}

async function declareWinner(charac1, charac2) {
    console.log("Resultado Final: ")
    console.log(`${charac1.NOME}: ${charac1.PONTOS} pontos`)
    console.log(`${charac2.NOME}: ${charac2.PONTOS} pontos`)

    if(charac1.PONTOS > charac2.PONTOS){
        console.log(`\n${charac1.NOME} venceu a corrida!`)
    }else if(charac1.PONTOS < charac2.PONTOS){
        console.log(`\n${charac2.NOME} venceu a corrida!`) 
    }else console.log("A corrida terminou em empate")
    
}

//função autoinvocavel
(async function main() {
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando....\n`)

        await playRaceEngine(player1, player2);
        await declareWinner(player1, player2);
})();

