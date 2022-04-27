const getRandomPosition = (length) => Math.round(Math.random() * length)
const getRandomGen = () => Math.random()
const getRandomBordered = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))
const factorial = (n) => (n !== 1) ? n * factorial(n - 1) : 1
const getRandomBorderedBy2 = (min, max) => {
    let res = getRandomBordered(min, max)
    return res % 2 === 0 ? res : getRandomBorderedBy2(min, max)
}


const Mutation = (genes) => {
    let randomPosition = getRandomPosition(genes.length - 1)
    genes[randomPosition] = parseFloat(getRandomGen().toFixed(3))
    return genes
}

//TODO: убрать undefined возвращение
const Duplication = (genes) => {
    let randomPosition = getRandomPosition(genes.length - 1)
    let randomLength = getRandomPosition(Math.round((genes.length - 1 - randomPosition)))

    let fragment = []
    for (let i = randomPosition; i < randomPosition + randomLength; i++) {
        fragment.push(genes[i])
    }
    if (!fragment.length) {
        return
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

const Translocation = (genes) => {
    let randomStart = getRandomPosition(genes.length - 1)
    let randomEnd = getRandomBordered(randomStart, genes.length - 1)
    for (let i = randomStart; i < randomEnd; i++) {
        genes[i] = parseFloat(getRandomGen().toFixed(3))
    }
    return genes
}

// in dev
const FragmentaryInversion = (genes) => {
    let inversions = getRandomBorderedBy2(1, Math.floor((genes.length - 1) / 2))
    console.log(inversions)
    let amount = factorial(genes.length) - 1
}

const operators = {
    mutation: Mutation,
    // duplication: Duplication,
    // segregation: Segregation,
    translocation: Translocation,
    // fragmentaryInversion: FragmentaryInversion,
}

operators.length = Object.keys(operators).length
operators.randomOperator = () => {
    let randomOperatorNumber = getRandomPosition(operators.length - 1)
    let i = 0
    for (const operatorName of Object.keys(operators)) {
        if (i === randomOperatorNumber){
            return operators[operatorName]
        }
        i++
    }
}

module.exports = operators