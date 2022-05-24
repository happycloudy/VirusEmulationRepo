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
        let newViruses = [...this.viruses]

        for (const virus of this.viruses) {
            let newVirus = virus.reproduce()
            if (newVirus) {
                if (newVirus.reproduceFactor < this.reproduceFactor) {
                    continue
                }

                newViruses.push(newVirus)

                if (newVirus.reproduceFactor > virus.reproduceFactor) {
                    stats.virusReproduces[newVirus.cameFrom.toLowerCase()] += 1

                    if(stats.bestVirus !== undefined){
                        if(newVirus.reproduceFactor > stats.bestVirus.reproduceFactor){
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

    getRandomVirus() {
        const randomNumber = Math.floor(Math.random() * (this.viruses.length - 1))
        return this.viruses[randomNumber]
    }

    killVirus() {
        if (config.algorithmParams.stealthSightMechanic.enabled) {
            this.viruses = this.viruses.filter(virus => virus.stealthFactor > this.sightFactor)
        } else {
            this.viruses = this.viruses.filter(virus => virus.reproduceFactor > this.reproduceFactor)
        }
    }
}

module.exports = Entity