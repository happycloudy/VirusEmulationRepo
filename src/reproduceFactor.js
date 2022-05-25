const config = require('./config')

const t1Function = (nextGen, currentGen) => Math.sqrt(Math.abs(nextGen + currentGen + 1))
const t2Function = (nextGen, currentGen) => Math.sqrt(Math.abs(nextGen - currentGen + 1))

const reproduceFactor = (genes) => {
    let result = 0

    for (let i = 0; i < genes.length; i++) {
        let t1 = t1Function(genes[0], genes[i])
        let t2 = t2Function(genes[0], genes[i])
        result += (genes[0] + 1) * Math.cos(t2) * Math.sin(t1) + genes[0] * Math.cos(t1) * Math.sin(t2)

        // result += (genes[0] + 1) * Math.cos(Math.sqrt(Math.abs(genes[0] - genes[i] + 1))) * Math.sin(Math.sqrt(Math.abs(genes[0] + genes[i] + 1))) +
        //     genes[0] * Math.cos(Math.sqrt(Math.abs(genes[0] + genes[i] + 1))) * Math.sin(Math.sqrt(Math.abs(genes[0] - genes[i] + 1)))
    }


    if (config.algorithmParams.isMaximization) {
        return result
    } else {
        return -result
    }

}

module.exports = reproduceFactor