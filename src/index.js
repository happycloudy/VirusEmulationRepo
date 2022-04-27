const Virus = require("./Virus");
const Entity = require("./Entity");
const stats = require("./stats");
const utilities = require("./utilities");

const virusStartStats = {
    genes: 5,
    amount: 10
}

const entityStartStats = {
    genes: 5,
    maxViruses: 800
}

const algorithmParams = {
    virusFactor: {
        mutationChance: 0.7,
        stealthFactor: 0 // не реализовано?
    },
    entityFactor: {
        sightFactor: 0.3 // не реализовано?
    },
    epochCount: 10,
}


const init = (showStats = true, extendedStats = false) => {
    // первое заражение
    const entity = new Entity({
        genesAmount: entityStartStats.genes,
        maxViruses: entityStartStats.maxViruses
    })

    for (let i = 0; i < virusStartStats.amount; i++) {
        let virus = new Virus({
            genesAmount: virusStartStats.genes,
            mutationChance: algorithmParams.virusFactor.mutationChance
        })
        entity.infect(virus)
    }

    // "жизнь вируса в организме"
    for (let i = 0; i < algorithmParams.epochCount; i++) {
        entity.virusReproduce()
        entity.killVirus()

        if (!entity.isAlive) {
            break
        }
    }

    if (showStats) {
        console.log(`Состояние организма - ${entity.isAlive ? 'жив' : 'помер'}`)
        console.log(`Количество вирусов - ${entity.viruses.length}`)
        console.log(`Количество улучшений вируса через мутацию - ${stats.virusReproduces.mutation}`)
        console.log(`Количество улучшений вируса через транслокацию - ${stats.virusReproduces.translocation}`)
        console.log(`Степень улучшений вируса через мутацию - ${stats.reproduceRatedFactor.mutation}`)
        console.log(`Степень улучшений вируса через транслокацию - ${stats.reproduceRatedFactor.translocation}`)
        console.log('Особи, обеспечивающие наилучшее значение критерия оптимальности...')
        if(extendedStats) {
            console.table(entity.viruses.map(virus => {
                virus.entityReproduceFactor = entity.reproduceFactor
                return virus
            }))
        }
    }
    return {
        virusAmount: entity.viruses.length,
        lethality: entity.isAlive ? 1 : 0,
    }
}

init()
// const virusAmountArray = []
// const lethalityArray = []
// for (let i = 0; i < 1000; i++) {
//     let {virusAmount, lethality} = init(false)
//     virusAmountArray.push(virusAmount)
//     lethalityArray.push(lethality)
// }
// console.log('Среднее количество вирусов ' + utilities.average(virusAmountArray))
// console.log('Средняя выживаемость ' +utilities.average(lethalityArray))

// const initManyEntities = () => {
//     let populationAmount = 100
//
//     // создание популяции
//     const entity = new Entity({
//         genesAmount: entityStartStats.genes,
//         maxViruses: entityStartStats.maxViruses
//     })
//
//     for (let i = 0; i < virusStartStats.amount; i++) {
//         let virus = new Virus({genesAmount: virusStartStats.genes})
//         entity.infect(virus)
//     }
//
//     // "жизнь вируса в организме"
//     for (let i = 0; i < algorithmParams.epochCount; i++) {
//         entity.virusReproduce()
//         entity.killVirus()
//
//         if (!entity.isAlive) {
//             break
//         }
//     }
//
//     console.log(`Состояние организма - ${entity.isAlive ? 'жив': 'помер'}`)
//     console.log(`Количество вирусов - ${entity.viruses.length}`)
//     console.log(`Количество улучшений вируса через мутацию - ${stats.virusReproduces.mutation}`)
//     console.log(`Количество улучшений вируса через транслокацию - ${stats.virusReproduces.translocation}`)
//     console.log('Особи, обеспечивающие наилучшее значение критерия оптимальности...')
//     console.table(entity.viruses.map(virus => {
//         virus.entityReproduceFactor = entity.reproduceFactor
//         return virus
//     }))
// }
//
// initManyEntities()