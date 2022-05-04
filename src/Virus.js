const reproduceFactor = require("./reproduceFactor");
const operators = require("./VirusOperators");
const utilities = require("./utilities");


class Virus {
    constructor({genesAmount, genes, cameFrom, mutationChance}) {
        this.genes = genes? genes : utilities.generateGenes(genesAmount)
        this.cameFrom = cameFrom || 'initial'
        this.mutationChance = mutationChance || Math.random()
        this.reproduceFactor = reproduceFactor(this.genes)


        // TEST ONLY
        const genesTest = [0.2,0.5,0.4,0.3]
        let res = operators.segregation(genesTest)
        console.log('result: ' + res)
    }

    reproduce() {
        return //TODO: УБРАТЬ
        if(this.mutationChance < Math.random()){
            return
        }

        let randomOperator = operators.randomOperator()
        return new Virus({
            genes: randomOperator(this.genes),
            cameFrom: randomOperator.name,
            mutationChance: this.mutationChance
        })
    }
}

module.exports = Virus