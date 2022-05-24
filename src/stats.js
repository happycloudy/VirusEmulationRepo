const initialState = {
    virusReproduces: {
        mutation: 0,
        translocation: 0,
        duplication: 0,
        fragmentaryinversion: 0,
        segregation: 0,
    },
    reproduceRatedSum: {
        mutation: [0,0],
        translocation: [0,0],
        duplication: [0,0],
        fragmentaryinversion: [0,0],
        segregation: [0,0],
    },
    bestVirus: undefined
}

const stats = {...initialState}

module.exports = stats