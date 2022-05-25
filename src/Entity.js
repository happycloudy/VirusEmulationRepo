const stats = require("./stats");
const utilities = require("./utilities");
const reproduceFactor = require("./reproduceFactor");
const config = require("./config");

class Entity {
    constructor({genesAmount, genes, maxViruses}) {
        this.genes = genes ? genes : utilities.generateGenes(genesAmount)
        this.maxViruses = maxViruses

        this.isAlive = true
        this.viruses = []
        this.reproduceFactor = reproduceFactor(this.genes)

        if (config.algorithmParams.stealthSightMechanic.enabled) {
            this.sightFactor = Math.random() * config.algorithmParams.stealthSightMechanic.maxSightFactor * 10
        }
    }

    checkVirusesStatus(viruses = this.viruses) {
        if (viruses.length > this.maxViruses) {
            this.isAlive = false
            return false
        } else {
            return true
        }
    }

    infect(virus) {
        if (!this.checkVirusesStatus()) {
            return
        }

        this.viruses.push(virus)
    }

    virusReproduce() {
        if (!this.isAlive) {
            return;
        }

        let newViruses = [...this.viruses]

        for (const virus of this.viruses) {
            let newVirus = virus.reproduce()
            if (newVirus) {
                // console.log(utilities.EuclidRange(virus.genes, newVirus.genes))
                if (newVirus.reproduceFactor < this.reproduceFactor) {
                    continue
                }

                newViruses.push(newVirus)

                if (newVirus.reproduceFactor > virus.reproduceFactor) {
                    stats.virusReproduces[newVirus.cameFrom.toLowerCase()] += 1

                    stats.reproduceRatedSum[newVirus.cameFrom.toLowerCase()][0] += (newVirus.reproduceFactor - virus.reproduceFactor)
                    stats.reproduceRatedSum[newVirus.cameFrom.toLowerCase()][1] += 1

                    if (stats.bestVirus !== undefined) {
                        if (newVirus.reproduceFactor > stats.bestVirus.reproduceFactor) {
                            stats.bestVirus = newVirus
                        }
                    } else {
                        stats.bestVirus = newVirus
                    }
                }
            }

            if (!this.checkVirusesStatus(newViruses)) {
                this.viruses = newViruses
                return
            }
        }

        this.viruses = newViruses
    }

    getRandomVirusStack(virusStack) {
        let virusAmount = Math.round(Math.random() * (config.algorithmParams.segregationMaxViruses - 1))
        while (virusAmount >= (this.viruses.length - 1)) {
            virusAmount = Math.round(Math.random() * (config.algorithmParams.segregationMaxViruses - 1))
        }

        const filteredViruses = this.viruses.filter(virus => {
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

        for (const virusNumber of virusNumbers) {
            virusStack.push(filteredViruses[virusNumber].genes)
        }


        return virusStack
    }

    killVirus() {
        if (config.algorithmParams.stealthSightMechanic.enabled) {
            this.viruses = this.viruses.filter(virus => virus.stealthFactor > this.sightFactor)
        } else {
            this.viruses = this.viruses.filter(virus => virus.reproduceFactor > this.reproduceFactor)
        }
    }

    isInfected() {
        return this.viruses.length
    }
}

module.exports = Entity