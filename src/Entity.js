class Entity {
    constructor(genes, maxViruses) {
        this.genes = genes
        this.maxViruses = maxViruses

        this.isAlive = true
        this.viruses = []
    }

    infect(virus) {
        if(this.viruses.length > this.maxViruses){
            this.isAlive = false
            return
        }

        this.viruses.push(virus)
    }

    virusReproduce() {
        for (const virus of this.viruses) {
            virus.reproduce()
        }
    }
}

module.exports = Entity