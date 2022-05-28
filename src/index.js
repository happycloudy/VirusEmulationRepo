const Virus = require("./Virus");
const Entity = require("./Entity");
const stats = require("./stats");
const config = require("./config");
const fs = require('fs');
const {ChartJSNodeCanvas} = require('chartjs-node-canvas');
const utilities = require("./utilities");

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

const createViruses = () => {
    const viruses = []
    for (let i = 0; i < config.virusStartStats.amount; i++) {
        viruses.push(new Virus({
            genesAmount: config.virusStartStats.genes,
            mutationChance: config.algorithmParams.virus.mutationChance,
            parentEntity: undefined
        }))
    }
    return viruses
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

const setBestVirus = (entities) => {
    let bestVirus = undefined

    entities.forEach(entity => {
        entity.viruses.forEach(virus => {
            if (bestVirus === undefined || bestVirus.reproduceFactor < virus.reproduceFactor) {
                bestVirus = virus
            }
        })
    })
    stats.bestVirus = bestVirus


    let bestVirusEver = undefined

    stats.bestViruses.forEach(virus => {
        if (bestVirusEver === undefined || bestVirusEver.reproduceFactor < virus.reproduceFactor) {
            bestVirusEver = virus
        }
    })
    stats.bestVirusEver = bestVirusEver
}

const clearEntities = (entities) => {
    entities.forEach(entity => entity.clearViruses())
}

const splitVirusesByEntities = (entities) => {
    // console.log(stats.bestViruses.map(virus => virus.reproduceFactor).join(' '))
    entities.forEach(entity => {
        if (config.algorithmParams.infectChance > Math.random()) {
            if (config.algorithmParams.dropRandomVirusChance > Math.random()) {
                entity.viruses.push(new Virus({
                    genesAmount: config.virusStartStats.genes,
                    mutationChance: config.algorithmParams.virus.mutationChance,
                    parentEntity: entity
                }))
            } else {
                const randomVirusNumber = Math.round(Math.random() * (stats.bestViruses.length - 1))
                stats.bestViruses[randomVirusNumber].parentEntity = entity
                entity.viruses.push(stats.bestViruses[randomVirusNumber])
            }
        }
    })

    return entities
}

const setBestViruses = (entities) => {
    stats.bestViruses.sort((a, b) => a.reproduceFactor - b.reproduceFactor)
    // console.log(stats.bestViruses.map(virus => virus.reproduceFactor).join(' '))

    entities.forEach(entity => {
        entity.viruses.forEach(virus => {
            const euclidRange = utilities.EuclidRange(stats.bestViruses[0].genes, virus.genes)
            const isRMore = stats.bestViruses[0].reproduceFactor < virus.reproduceFactor
            const isNotInArray = !utilities.isGenInArray(virus.genes, stats.bestViruses)

            if (isRMore && isNotInArray && euclidRange > config.algorithmParams.euclidMinRange) {
                stats.bestViruses[0] = virus
            }
        })
    })
}


const showStats = () => {
    const dataSeparator = '========================================================'

    console.log(dataSeparator)
    console.log('Улучшения:')
    console.log(`через мутацию - ${stats.virusReproduces.mutation}`)
    console.log(`через транслокацию - ${stats.virusReproduces.translocation}`)
    console.log(`через дупликацию - ${stats.virusReproduces.duplication}`)
    console.log(`через сегрегацию - ${stats.virusReproduces.segregation}`)
    console.log(`через фрагментарную инверсию - ${stats.virusReproduces.fragmentaryinversion}`)
    console.log(dataSeparator)
    console.log('Степень улучшения:')
    console.log(`через мутацию - ${(stats.reproduceRatedSum.mutation[0] / stats.reproduceRatedSum.mutation[1]).toFixed(3)}`)
    console.log(`через транслокацию - ${(stats.reproduceRatedSum.translocation[0] / stats.reproduceRatedSum.translocation[1]).toFixed(3)}`)
    console.log(`через дупликацию - ${(stats.reproduceRatedSum.duplication[0] / stats.reproduceRatedSum.duplication[1]).toFixed(3)}`)
    console.log(`через сегрегацию - ${(stats.reproduceRatedSum.segregation[0] / stats.reproduceRatedSum.segregation[1]).toFixed(3)}`)
    console.log(`через фрагментарную инверсию - ${(stats.reproduceRatedSum.fragmentaryinversion[0] / stats.reproduceRatedSum.fragmentaryinversion[1]).toFixed(3)}`)
    console.log(dataSeparator)
    console.log('Лучшие вирусы:')
    console.table({
        R: stats.bestViruses.map(virus => virus.reproduceFactor),
        genes: stats.bestViruses.map(virus => virus.genes),
    })
    console.log(dataSeparator)
    console.log(`Особь, обеспечивающая наилучшее значение критерия оптимальности:`)
    console.log(`Критерий: ${stats.bestVirusEver ? stats.bestVirusEver.reproduceFactor : ''}, где критерий родителя: ${stats.bestVirusEver ? stats.bestVirusEver.parentEntity.reproduceFactor : ''}`)
    console.log(`Решение: ${stats.bestVirusEver.genes.join(', ')}`)
}

const visualize = async (data) => {
    config.chartConfig.data.labels = data.map(item => item.epoch)
    config.chartConfig.data.datasets.push({
        label: "Результирующая функция",
        data: data.map(item => item.virus.reproduceFactor),
        fill: false,
        borderColor: ['rgb(51, 204, 204)'],
        borderWidth: 1,
        xAxisID: 'xAxis1' //define top or bottom axis ,modifies on scale
    })


    const width = 1500;
    const height = 500;
    const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
    const chartJSNodeCanvas = new ChartJSNodeCanvas({width, height, backgroundColour});
    const base64Image = await chartJSNodeCanvas.renderToDataURL(config.chartConfig)

    const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("out.png", base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
}

const init = (isStats, isVisualize) => {
    const entities = createEntities()
    stats.bestViruses = [...createViruses().splice(0, config.algorithmParams.result.maxViruses)]
    stats.bestViruses.sort((a, b) => a.reproduceFactor - b.reproduceFactor)
    stats.bestVirus = stats.bestViruses[0]
    splitVirusesByEntities(entities)


    for (let i = 0; i < config.algorithmParams.epochCount; i++) {
        let virusesNowStart = 0
        if (i) {
            splitVirusesByEntities(entities)
        }
        if (isStats) {
            entities.forEach(entity => entity.viruses.forEach(() => {
                virusesNowStart++
            }))
        }

        entities.forEach(entity => {
            entity.virusReproduce()
            entity.killVirus()
        })
        setBestViruses(entities)
        setBestVirus(entities)
        if (((i + 1) % config.algorithmParams.visualizeStep === 0)) {
            stats.epochViruses.push({
                virus: stats.bestVirus,
                epoch: i + 1
            })
        }

        if (isStats) {
            let virusesNow = 0
            entities.forEach(entity => entity.viruses.forEach(() => {
                virusesNow++
            }))
        }
        clearEntities(entities)
    }


    if (isStats) {
        showStats(entities)
        if (isVisualize) {
            visualize(stats.epochViruses)
        }
    }
}

init(true, true)
