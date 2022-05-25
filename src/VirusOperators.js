const config = require('./config')

const getRandomPosition = (length) => Math.round(Math.random() * length)
const getRandomGen = () => Math.random()
const getRandomBordered = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))
const getRandomBorderedBy2 = (min, max) => {
    let res = getRandomBordered(min, max)
    return res % 2 === 0 ? res : getRandomBorderedBy2(min, max)
}
const getRandomPositive = (max) => Math.round(Math.random() * max)


const Mutation = (incomingGenes) => {
    let genes = [...incomingGenes]
    let randomPosition = getRandomPosition(genes.length - 1)
    genes[randomPosition] = parseFloat(getRandomGen().toFixed(3))

    return genes
}

const Duplication = (incomingGenes) => {
    let genes = [...incomingGenes]
    let randomPosition = getRandomPosition(genes.length - 1)
    let randomLength = getRandomPosition(Math.round((genes.length - 1 - randomPosition)))

    let fragment = []
    for (let i = randomPosition; i < randomPosition + randomLength; i++) {
        fragment.push(genes[i])
    }
    if (!fragment.length) {
        return genes
    }

    let fragmentIndex = 0
    for (let i = randomPosition + randomLength; i < randomPosition + (randomLength * 2); i++) {
        if (i > genes.length - 1) break
        genes[i] = fragment[fragmentIndex]
        fragmentIndex++
    }

    return genes
}

const Segregation = (viruses) => {
    let newGenesLength = viruses[0].length
    let newGenes = []
    for (let i = 0; i < newGenesLength; i++) {
        let randomVirusNumber = getRandomPosition(viruses.length - 1)
        newGenes.push(viruses[randomVirusNumber][i])
    }
    return newGenes
}

const Translocation = (incomingGenes) => {
    let genes = [...incomingGenes]
    let randomStart = getRandomPosition(genes.length - 1)
    let randomEnd = getRandomBordered(randomStart, genes.length - 1)
    for (let i = randomStart; i < randomEnd; i++) {
        genes[i] = parseFloat(getRandomGen().toFixed(3))
    }
    return genes
}

const FragmentaryInversion = (incomingGenes) => {
    let genes = [...incomingGenes]
    let inversionPosition, inversionLength
    if (genes.length === 2) {
        inversionPosition = 0
        inversionLength = 1
    } else {
        inversionPosition = getRandomBordered(0, Math.floor((genes.length - 2) / 2))
        inversionLength = genes.length % 2 === 0 ?
            getRandomBordered(1, genes.length / 2 - inversionPosition) :
            getRandomBordered(1, (genes.length - 1) / 2 - inversionPosition)
    }
    let tmp = [...genes.slice(inversionPosition, inversionPosition + inversionLength)]

    let breakpoint = genes.length % 2 === 0 ?
        genes.length - 1 - inversionPosition :
        genes.length - 1 - inversionPosition
    let counter = tmp.length - 1

    for (let i = breakpoint; i > breakpoint - inversionLength; i--) {
        genes[i] = tmp[counter]
        counter--
    }

    return genes
}

const operators = {
    mutation: Mutation,
    duplication: Duplication,
    segregation: Segregation,
    translocation: Translocation,
    fragmentaryInversion: FragmentaryInversion,
}

operators.length = Object.keys(operators).length
operators.randomOperator = () => {
    let randomOperatorNumber = Math.random()
    let counter = 0
    counter += config.algorithmParams.virus.mutationOperatorChance
    if(randomOperatorNumber < counter){
        return operators.mutation
    }

    counter += config.algorithmParams.virus.duplicationOperatorChance
    if(randomOperatorNumber < counter){
        return operators.duplication
    }

    counter += config.algorithmParams.virus.segregationOperatorChance
    if(randomOperatorNumber < counter){
        return operators.segregation
    }

    counter += config.algorithmParams.virus.translocationOperatorChance
    if(randomOperatorNumber < counter){
        return operators.translocation
    }

    counter += config.algorithmParams.virus.fragmentaryInversionOperatorChance
    if(randomOperatorNumber < counter){
        return operators.fragmentaryInversion
    }
}

module.exports = operators