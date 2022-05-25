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
            mutationChance: 1,

            mutationOperatorChance: 0.2,
            DuplicationOperatorChance: 0.2,
            SegregationOperatorChance: 0.2,
            translocationOperatorChance: 0.2,
            fragmentaryInversionOperatorChance: 0.2,
        },
        entityFactor: {
            infectChance: 0.3,
        },

        epochCount: 10,

        segregationMaxViruses: 5,
        stealthSightMechanic: {
            enabled: false,
            maxStealthFactor: 0.5,
            maxSightFactor: 0.3
        },

        infectChance: 0.5,
    }
}