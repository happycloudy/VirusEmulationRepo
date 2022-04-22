const t1Function = (nextGen, currentGen) => Math.sqrt(Math.abs(nextGen + currentGen + 1))
const t2Function = (nextGen, currentGen) => Math.sqrt(Math.abs(nextGen + currentGen - 1))

const reproduceFactor = (genes) => {
    let result = 0
    for (let i = 0; i < genes.length - 2; i++) {
        let t1 = t1Function(genes[i + 1], genes[i])
        let t2 = t2Function(genes[i + 1], genes[i])
        result += (genes[i + 1] + 1) * Math.cos(t2) * Math.sin(t1) + genes[i] * Math.cos(t1) * Math.sin(t2)
    }
    return result
}

module.exports = reproduceFactor