const config = require("./config");
const utilities = {
    generateGenes: (N) => {
        let genes = []
        for (let i = 0; i < N; i++) {
            let randomNumber = Math.floor(config.algorithmParams.range.min + Math.random() * (config.algorithmParams.range.max + 1 - config.algorithmParams.range.min))
            genes.push(parseFloat(randomNumber.toFixed(3)))
        }
        return genes
    },
    EuclidRange: (beforeMutationGenes,afterMutationGenes) => {
        let range = 0
        for (let i = 0; i < afterMutationGenes.length; i++) {
            range += Math.pow(afterMutationGenes[i] - beforeMutationGenes[i],2)
        }
        return Math.sqrt(range)
    },

    isSameGenes: (genes1, genes2) => {
        let isSame = true
        for (let i = 0; i < genes1.length; i++) {
            if(genes1[i] !== genes2[i]){
                isSame = false
            }
        }
        return isSame
    }
}

module.exports = utilities