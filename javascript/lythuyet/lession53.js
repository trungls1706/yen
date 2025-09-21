// let team = [
//     { name: 'cong phuong', country: 'Viet Nam' },
//     { name: 'Ronaldo', country: 'Portugal' },
//     { name: 'Quang Hai', country: 'Viet Nam' },
//     { name: 'Messi', country: 'Argentina' },
//     { name: 'Nani', country: 'Portugal' },
// ]

// let arr = []

// for (let i = 0; i < team.length; i++) {
//     if (team[i].country == 'Viet Nam') {
//         arr.push(team[i])
//     }
// }




let team = [
    { name: 'cong phuong', country: 'Viet Nam' },
    { name: 'Ronaldo', country: 'Portugal' },
    { name: 'Quang Hai', country: 'Viet Nam' },
    { name: 'Messi', country: 'Argentina' },
    { name: 'Nani', country: 'Portugal' },
]

//Nhiệm vụ chúng ta làm sao nhóm được các cầu thủ by quốc gia.

// dùng reduce().

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}

console.log(team.groupBy('country'))