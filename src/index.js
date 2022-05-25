const Virus = require("./Virus");
const Entity = require("./Entity");
const stats = require("./stats");
const config = require("./config");
const reproduceFactor = require("./reproduceFactor");

const createEntities = () => {
    const entities = []
    for (let i = 0; i < config.entityStartStats.amount; i++) {
        const entity = new Entity({
            genesAmount: config.entityStartStats.genes,
        })

        entities.push(entity)
    }

    return entities
}

const firstInfect = () => {

}

const infectOthers = (entities) => {
    entities.forEach((entity, entityId) => {
        entity.viruses.forEach((virus, virusId) => {
            if (config.algorithmParams.infectChance < Math.random()) {
                let randomEntityId = Math.round(Math.random() * (entities.length - 1))
                while (randomEntityId === entityId) {
                    randomEntityId = Math.round(Math.random() * (entities.length - 1))
                }

                entities[randomEntityId].infect(virus)
                entities[entityId].viruses.splice(virusId, 1)
                virus.parentEntity = entities[randomEntityId]
            }
        })
    })
}

const showInfectMap = (entities) => {
    console.log('Карта зараженных')
    console.table(entities.map(entity => ({isInfected: entity.isInfected()})))
}

const showStats = (entities) => {
    const dataSeparator = '========================================================'

    let virusesAmount = 0
    entities.forEach(entity => {
        virusesAmount += entity.viruses.length
    })

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
    console.log(`Особь, обеспечивающая наилучшее значение критерия оптимальности:`)
    console.log(`Критерий: ${stats.bestVirus ? stats.bestVirus.reproduceFactor: ''}, где критерий родителя: ${stats.bestVirus ? stats.bestVirus.parentEntity.reproduceFactor: ''}`)
    console.log(`Решение: ${stats.bestVirus.genes.join(', ')}`)
}

const init = (isStats) => {
    const entities = createEntities()

    // первое заражение
    for (let i = 0; i < config.virusStartStats.amount; i++) {
        const randomEntityNumber = Math.round(Math.random() * (entities.length - 1))
        const entity = entities[randomEntityNumber]

        let virus = new Virus({
            genesAmount: config.virusStartStats.genes,
            mutationChance: config.algorithmParams.virus.mutationChance,
            parentEntity: entity
        })
        entity.infect(virus)
    }

    // "жизнь вируса в организме"
    for (let i = 0; i < config.algorithmParams.epochCount; i++) {
        let virusesNow = 0
        entities.forEach(entity => entity.viruses.forEach(() => {virusesNow++}))
        console.log(`Эпоха - ${i+1}, cуммарное количество вирусов - ${virusesNow}`)
        entities.forEach(entity => {
            entity.virusReproduce()
            entity.killVirus()
        })

        infectOthers(entities)
    }






    if (isStats) {
        showInfectMap(entities)
        showStats(entities)
    }
}

init(true)


// Выбор типа задачи - максимизация или минимизация
// Выбор Диапазона, вывод графика(R от t)
// добавить критей сходства, применение ген операторов

// применение ген операторов - добавить шанс для каждого ген оператора (сумма = 1, сделать проверку)
// уборка новых вирусов через длину евклида



// console.log(reproduceFactor([-500,-500]))