const config = require("./config");
const stats = require("./stats");

const isSameGenes = (genes1, genes2) => {
    let isSame = true
    for (let i = 0; i < genes1.length; i++) {
        if (genes1[i] !== genes2[i]) {
            isSame = false
        }
    }
    return isSame
}

const utilities = {
    generateGenes: (N) => {
        let genes = []
        for (let i = 0; i < N; i++) {
            let randomNumber = Math.floor(config.algorithmParams.range.min + Math.random() * (config.algorithmParams.range.max + 1 - config.algorithmParams.range.min))
            genes.push(parseFloat(randomNumber.toFixed(3)))
        }
        return genes
    },
    EuclidRange: (beforeMutationGenes, afterMutationGenes) => {
        let range = 0
        for (let i = 0; i < afterMutationGenes.length; i++) {
            range += Math.pow(afterMutationGenes[i] - beforeMutationGenes[i], 2)
        }
        return Math.sqrt(range)
    },
    isSameGenes: isSameGenes,
    getVirusesStack: (virusStack) => { // INDEV
        let virusAmount = Math.round(Math.random() * (config.algorithmParams.segregationMaxViruses - 1))
        while (virusAmount >= (stats.bestViruses.length - 1)) {
            virusAmount = Math.round(Math.random() * (config.algorithmParams.segregationMaxViruses - 1))
        }

        const filteredViruses = stats.bestViruses.filter(virus => {
            let same = utilities.isSameGenes(virus.genes, virusStack[0])
            return !same
        })

        const virusNumbers = []
        for (let i = 0; i < virusAmount; i++) {
            let number = Math.round(Math.random() * (filteredViruses.length - 1))

            while (virusNumbers.find(virusNumber => virusNumber === number)) {
                number = Math.round(Math.random() * (filteredViruses.length - 1))
            }
            virusNumbers.push(number)
        }
        // console.log(filteredViruses)
        for (const virusNumber of virusNumbers) {
            virusStack.push(filteredViruses[virusNumber].genes)
        }


        return virusStack
    },

    isGenInArray: (gen, viruses) => {
        return !!viruses.find(virus => isSameGenes(virus.genes, gen))
    }
}

module.exports = utilities