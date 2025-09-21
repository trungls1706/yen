const items = [1, 2, 3, 4, 5, 6, 7] //… your array, filled with values

const n = 2
const result = [[], []] //we create it, then we'll fill it

const wordsPerLine = Math.ceil(items.length / 2)

for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
        const value = items[i + line * wordsPerLine]
        if (!value) continue //avoid adding "undefined" values
        result[line].push(value)
    }
}
