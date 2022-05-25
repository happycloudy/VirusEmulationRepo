const utilities = {
    generateGenes: (N) => {
        let genes = []
        for (let i = 0; i < N; i++) {
            genes.push(parseFloat(Math.random().toFixed(3)))
        }
        return genes
    },
    average: arr => {
        let sum = 0
        arr.forEach(el => sum += el)
        return sum / arr.length
    },
    EuclidRange: (beforeMutationGenes,afterMutationGenes) => {
        let range = 0
        for (let i = 0; i < afterMutationGenes.length; i++) {
            range += Math.pow(afterMutationGenes[i] - beforeMutationGenes[i],2)
            // console.log(afterMutationGenes[i], beforeMutationGenes[i], afterMutationGenes[i] - beforeMutationGenes[i])
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