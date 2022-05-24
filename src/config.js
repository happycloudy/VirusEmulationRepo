module.exports = {
    virusStartStats:{
        genes: 5,
        amount: 20
    },

    entityStartStats: {
        genes: 5,
        maxViruses: 800,
        amount: 10,
    },

    algorithmParams: {
        virusFactor: {
            mutationChance: 0.5,
        },
        entityFactor: {
            infectChance: 0.3,
        },

        epochCount: 50,

        segregationMaxViruses: 5,
        stealthSightMechanic: {
            enabled: true,
            maxStealthFactor: 0.5,
            maxSightFactor: 0.3
        },

        infectChance: 0.5,
    }
}