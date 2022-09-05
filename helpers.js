
exports.sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0)

exports.pluck = property => element => element[property]

exports.mode = (arr) => arr.sort((a, b) =>
    arr.filter(v => v === a).length
    - arr.filter(v => v === b).length
).pop()

exports.groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}