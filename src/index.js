const Virus = require("./Virus");
const Entity = require("./Entity");


const virusStartStats = {
    genes: 5,
    amount: 50
}

const entityStartStats = {
    genes: 5,
    maxViruses: 300
}

const algorithmParams = {
    virusFactor: [],
    entityFactor: [],
    epochCount: 10,
}


const init = () => {
    // первое заражение
    const entity = new Entity(entityStartStats.genes, entityStartStats.maxViruses)

    for (let i = 0; i < virusStartStats.amount; i++) {
        let virus = new Virus(virusStartStats.genes)
        entity.infect(virus)
    }


    // "жизнь вируса в организме"
    for (let i = 0; i < algorithmParams.epochCount; i++) {
        entity.virusReproduce()
    }
}

init()