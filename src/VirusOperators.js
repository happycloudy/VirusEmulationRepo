const getRandomPosition = (length) => Math.round(Math.random() * length)
const getRandomGen = () => Math.random()

const getRandomFragment = (length) => {
    let randomStart = Math.round(Math.random() * length) / 2
    let randomEnd = Math.round(Math.random() * length) / 2
}


const Mutation = (genes) => {
    let randomPosition = getRandomPosition(genes.length)
    genes[randomPosition] = parseFloat(getRandomGen().toFixed(3))

    return genes
}

const Duplication = (genes) => {
    // let randomPosition = getRandomPosition(genes.length)
    // let randomLength = getRandomPosition((genes.length - randomPosition) / 2) + 1
    //
    // let fragment = []
    // for (let i = randomPosition; i < randomPosition + randomLength; i++) {
    //     fragment.push(genes[i])
    // }
    // console.log(randomPosition, randomLength, fragment)
    // let fragmentIndex = 0
    // for (let i = randomPosition + randomLength; i < randomPosition + randomLength * 2; i++) {
    //     genes[i] = fragment[fragmentIndex]
    //     fragmentIndex++
    // }
    //
    // return genes
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