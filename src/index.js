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
    entities.forEach((entity, entityId) => {
        if(!entity.isAlive){
            return
        }
        entity.viruses.forEach((virus, virusId) => {
            if (config.algorithmParams.infectChance < Math.random()) {
                let randomEntityId = Math.round(Math.random() * (entities.length - 1))
                while (randomEntityId === entityId) {
                    randomEntityId = Math.round(Math.random() * (entities.length - 1))
                }

                entities[randomEntityId].infect(virus)
                entities[entityId].viruses.splice(virusId, 1)
            }
        })
    })
}

const showStats = (entities) => {
    let virusesAmount = 0
    entities.forEach(entity => {
        virusesAmount += entity.viruses.length
    })

    const dataSeparator = '========================================================'

    console.log('Карта зараженных')
    console.table(entities.map(entity => ({isInfected: entity.isInfected()})))

    if(!virusesAmount) {
        console.log('Вирусы вымерли')
        return
    }

    console.log(dataSeparator)
    console.log('Улучшения:')
    console.log(`через мутацию - ${stats.virusReproduces.mutation}`)
    console.log(`через транслокацию - ${stats.virusReproduces.translocation}`)
    console.log(`через дупликацию - ${stats.virusReproduces.duplication}`)
    console.log(`через сегрегацию - ${stats.virusReproduces.segregation}`)
    console.log(`через фрагментарную инверсию - ${stats.virusReproduces.fragmentaryinversion}`)
    console.log(dataSeparator)
    console.log('Степень улучшения:')
    console.log(`через мутацию - ${(stats.reproduceRatedSum.mutation[0]/stats.reproduceRatedSum.mutation[1]).toFixed(3)}`)
    console.log(`через транслокацию - ${(stats.reproduceRatedSum.translocation[0]/stats.reproduceRatedSum.translocation[1]).toFixed(3)}`)
    console.log(`через дупликацию - ${(stats.reproduceRatedSum.duplication[0]/stats.reproduceRatedSum.duplication[1]).toFixed(3)}`)
    console.log(`через сегрегацию - ${(stats.reproduceRatedSum.segregation[0]/stats.reproduceRatedSum.segregation[1]).toFixed(3)}`)
    console.log(`через фрагментарную инверсию - ${(stats.reproduceRatedSum.fragmentaryinversion[0]/stats.reproduceRatedSum.fragmentaryinversion[1]).toFixed(3)}`)
    console.log(dataSeparator)
    console.log(`Особь, обеспечивающая наилучшее значение критерия оптимальности...`)
    console.log(`Критерий: ${stats.bestVirus ? stats.bestVirus.reproduceFactor: ''}, где критерий родителя: ${stats.bestVirus ? stats.bestVirus.parentEntity.reproduceFactor: ''}`)
    console.log(`Решение: ${stats.bestVirus.genes}`)
}

const init = (stats) => {
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
            entity.killVirus()
        })

        infectOthers(entities)
    }

    if (stats) {
        showStats(entities)
    }
}

init(true)