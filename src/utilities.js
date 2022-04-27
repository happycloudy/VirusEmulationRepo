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
    }
}

module.exports = utilities