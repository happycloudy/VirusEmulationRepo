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

        if (config.algorithmParams.stealthSightMechanic.enabled) {
            this.stealthFactor = Math.random() * config.algorithmParams.stealthSightMechanic.maxStealthFactor * 10
        }
    }

    reproduce() {
        if (this.mutationChance < Math.random()) {
            return
        }

        let randomOperator = operators.randomOperator()

        if (randomOperator.name === 'Segregation') {
            let virusStack = [this.genes]

            utilities.getVirusesStack(virusStack)
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