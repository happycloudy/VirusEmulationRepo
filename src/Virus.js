const reproduceFactor = require("./reproduceFactor");
const operators = require("./VirusOperators");

const generateGenes = (N) => {
    let genes = []
    for (let i = 0; i < N; i++) {
        genes.push(parseFloat(Math.random().toFixed(3)))
    }
    return genes
}


class Virus {
    constructor(genesAmount) {
        this.genes = generateGenes(genesAmount)
        this.reproduceFactor = reproduceFactor(this.genes)


        // TEST ONLY
        let gen = [0.5,0.3,0.7]
        operators.segregation(gen)
        // console.log(operators.duplication(gen))
    }

    reproduce() {
        // console.log(this.genes)
    }
}

module.exports = Virus