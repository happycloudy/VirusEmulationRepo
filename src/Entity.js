const stats = require("./stats");
const utilities = require("./utilities");
const reproduceFactor = require("./reproduceFactor");

class Entity {
    constructor({genesAmount, genes, maxViruses}) {
        this.genes = genes ? genes : utilities.generateGenes(genesAmount)
        this.maxViruses = maxViruses

        this.isAlive = true
        this.viruses = []
        this.reproduceFactor = reproduceFactor(this.genes)
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
        let newViruses = [...this.viruses]

        for (const virus of this.viruses) {
            let newVirus = virus.reproduce()
            if (newVirus) {
                if(newVirus.reproduceFactor < this.reproduceFactor) {
                    continue
                }


                newViruses.push(newVirus)
                if (newVirus.reproduceFactor > virus.reproduceFactor) {
                    stats.virusReproduces[newVirus.cameFrom.toLowerCase()] += 1
                }
            }

            if (!this.checkVirusesStatus(newViruses)) {
                this.viruses = newViruses
                return
            }
        }

        this.viruses = newViruses
    }

    getRandomVirus() {
        const randomNumber = Math.floor(Math.random() * (this.viruses.length - 1))
        return this.viruses[randomNumber]
    }

    killVirus() {
        this.viruses = this.viruses.filter(virus => virus.reproduceFactor > this.reproduceFactor)
    }
}

module.exports = Entity