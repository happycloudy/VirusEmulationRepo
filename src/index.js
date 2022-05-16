const Virus = require("./Virus");
const Entity = require("./Entity");
const stats = require("./stats");
const config = require("./config");

const createEntities = () => {
    const entities = []
    for (let i = 0; i < config.entityStartStats.amount; i++) {
        const entity = new Entity({
            genesAmount: config.entityStartStats.genes,
            maxViruses: config.entityStartStats.maxViruses
        })

        entities.push(entity)
    }

    return entities
}

const init = (showStats, extendedStats = false) => {
    const entities = createEntities()

    // первое заражение
    for (let i = 0; i < config.virusStartStats.amount; i++) {
        const randomEntityNumber = Math.round(Math.random() * (entities.length - 1))
        const entity = entities[randomEntityNumber]

        let virus = new Virus({
            genesAmount: config.virusStartStats.genes,
            mutationChance: config.algorithmParams.virusFactor.mutationChance,
            parentEntity: entity
        })
        entity.infect(virus)
    }

    // "жизнь вируса в организме"
    for (let i = 0; i < config.algorithmParams.epochCount; i++) {
        entities.forEach(entity => {
            if (!entity.isAlive) {
                return
            }
            entity.virusReproduce()
            entity.killVirus(config.algorithmParams.stealthSightMechanic)
        })
    }

    if (showStats) {
        // console.log(`Состояние организма - ${entity.isAlive ? 'жив' : 'помер'}`)
        // console.log(`Количество вирусов - ${entity.viruses.length}`)
        console.log(`Количество улучшений вируса через мутацию - ${stats.virusReproduces.mutation}`)
        console.log(`Количество улучшений вируса через транслокацию - ${stats.virusReproduces.translocation}`)
        console.log(`Степень улучшений вируса через мутацию - ${stats.reproduceRatedFactor.mutation}`)
        console.log(`Степень улучшений вируса через транслокацию - ${stats.reproduceRatedFactor.translocation}`)
        if (extendedStats) {
            console.log('Особи, обеспечивающие наилучшее значение критерия оптимальности...')
            // console.table(entity.viruses.map(virus => {
            //     virus.entityReproduceFactor = entity.reproduceFactor
            //     return virus
            // }))
        }
    }
}

init(true, false)