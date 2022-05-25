module.exports = {
    virusStartStats:{
        genes: 2,
        amount: 20
    },

    entityStartStats: {
        genes: 2,
        amount: 10,
    },

    algorithmParams: {
        infectChance: 0.2,
        epochCount: 10,
        segregationMaxViruses: 2,
        isMaximization: false,
        range: {
            min: -500,
            max: 500,
        },
        virus: {
            mutationChance: 1,

            mutationOperatorChance: 0.2,
            duplicationOperatorChance: 0.2,
            segregationOperatorChance: 0.2,
            translocationOperatorChance: 0.2,
            fragmentaryInversionOperatorChance: 0.2,
        },

        stealthSightMechanic: {
            enabled: false,
            maxStealthFactor: 0.5,
            maxSightFactor: 0.3
        },
    }
}