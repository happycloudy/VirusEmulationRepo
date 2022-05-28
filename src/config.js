const initialConfig = {
    virusStartStats: {
        genes: 2,
        amount: 3000
    },

    entityStartStats: {
        genes: 2,
        amount: 1000,
    },

    algorithmParams: {
        infectChance: 0.5,
        epochCount: 100,
        segregationMaxViruses: 5,
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

        result: {
            maxViruses: 10
        },
        euclidMinRange: 200,
        dropRandomVirusChance: 0.7,
        visualizeStep: 1,
    },

    chartConfig: {
        type: 'line',
        data: {
            labels: [],
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Номер эпохи',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Критерий оптимальности'
                    }
                },
            }
        },
    },
}

let config = {...initialConfig}

module.exports = config