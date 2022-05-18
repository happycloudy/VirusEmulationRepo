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

const infectOthers = (entities) => {
    entities.forEach(entity => {

    })
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
            infectOthers(entities)
            entity.killVirus()
        })
    }

    if (showStats) {
        const dataSeparator = '========================================================'

        console.log('Улучшения:')
        console.log(`через мутацию - ${stats.virusReproduces.mutation}`)
        console.log(`через транслокацию - ${stats.virusReproduces.translocation}`)
        console.log(`через дупликацию - ${stats.virusReproduces.duplication}`)
        console.log(`через сегрегацию - ${stats.virusReproduces.segregation}`)
        console.log(`через фрагментарную инверсию - ${stats.virusReproduces.fragmentaryinversion}`)
        console.log(dataSeparator)
        console.log('Степень улучшения:')
        console.log(`через мутацию - ${stats.reproduceRatedFactor.mutation}`)
        console.log(`через транслокацию - ${stats.reproduceRatedFactor.translocation}`)
        console.log(`через дупликацию - ${stats.reproduceRatedFactor.duplication}`)
        console.log(`через сегрегацию - ${stats.reproduceRatedFactor.segregation}`)
        console.log(`через фрагментарную инверсию - ${stats.reproduceRatedFactor.fragmentaryinversion}`)
        if (extendedStats) {
            console.log('Особи, обеспечивающие наилучшее значение критерия оптимальности...')
            let survivedViruses = []
            entities.forEach(entity => {
                if (entity.viruses.length) {
                    entity.viruses.forEach(virus => {
                        virus.entityReproduceFactor = entity.reproduceFactor
                        delete virus.mutationChance
                        survivedViruses.push(virus)
                    })
                }
            })

            console.table(survivedViruses.sort((a, b) => b.reproduceFactor - a.reproduceFactor))
        }
    }
}

init(true, false)