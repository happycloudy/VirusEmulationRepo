const reproduceFactor = require("./reproduceFactor");
const operators = require("./VirusOperators");
const utilities = require("./utilities");
const config = require("./config");


class Virus {
    constructor({genesAmount, genes, cameFrom, mutationChance, parentEntity}) {
        this.genes = genes ? genes : utilities.generateGenes(genesAmount)
        this.cameFrom = cameFrom || 'initial'
        this.mutationChance = mutationChance || Math.random()
        this.reproduceFactor = reproduceFactor(this.genes)
        this.parentEntity = parentEntity
    }

    reproduce() {
        if (this.mutationChance < Math.random()) {
            return
        }

        let randomOperator = operators.randomOperator()

        if (randomOperator.name === 'Segregation') {
            const virusStack = [this.genes]
            for (let i = 0; i < Math.random() * config.algorithmParams.segregationMaxViruses - 1; i++) {
                virusStack.push(this.parentEntity.getRandomVirus())
            }
            return new Virus({
                genes: randomOperator(virusStack),
                cameFrom: randomOperator.name,
                mutationChance: this.mutationChance,
                parentEntity: this.parentEntity,
            })
        } else {
            return new Virus({
                genes: randomOperator(this.genes),
                cameFrom: randomOperator.name,
                mutationChance: this.mutationChance,
                parentEntity: this.parentEntity,
            })
        }


    }
}

module.exports = Virus