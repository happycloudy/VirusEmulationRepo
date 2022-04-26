const getRandomPosition = (length) => Math.round(Math.random() * length)
const getRandomGen = () => Math.random()

const getRandomFragment = (length) => {
    let randomStart = Math.round(Math.random() * length) / 2
    let randomEnd = Math.round(Math.random() * length) / 2
}


const Mutation = (genes) => {
    let randomPosition = getRandomPosition(genes.length - 1)
    genes[randomPosition] = parseFloat(getRandomGen().toFixed(3))
    return genes
}

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
        if(i > genes.length - 1) break
        genes[i] = fragment[fragmentIndex]
        fragmentIndex++
    }

    return genes
}

const Segregation = () => {

}

const Translocation = () => {

}

const FragmentaryInversion = () => {

}

const operators = {
    mutation: Mutation,
    duplication: Duplication,
    segregation: Segregation,
    translocation: Translocation,
    fragmentaryInversion: FragmentaryInversion,
}

module.exports = operators