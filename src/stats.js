const initialState = {
    virusReproduces: {
        mutation: 0,
        translocation: 0,
        duplication: 0,
        fragmentaryinversion: 0,
        segregation: 0,
    },
    reproduceRatedFactor: {
        mutation: 0,
        translocation: 0,
        duplication: 0,
        fragmentaryinversion: 0,
        segregation: 0,
    }
}

const stats = {...initialState}

module.exports = stats