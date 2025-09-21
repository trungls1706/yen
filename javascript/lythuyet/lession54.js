const players = [
    { id: 11, name: 'Messi', age: 33 },
    { id: 12, name: 'Ronaldo', age: 34 },
    { id: 13, name: 'Young', age: 35 },
    { id: 14, name: 'Mane', age: 21 },
    { id: 15, name: 'Salah', age: 24 },
]

const convertArrayToObject = (arr, key) => {
    return arr.reduce((prev, cur) => {
        return {
            ...prev,
            [cur[key]]: cur
        }
    }, [])
}

// let playersModified = convertArrayToObject(players, 'name');


const playerProfile = [
    { name: "Ronaldo", team: "Juventus " },
    { name: "Messi", team: "Barcelona" },
    { name: "Mane", team: "Liverpool" }
];

playerProfileModified = {
    Mane: { team: "Liverpool" },
    Messi: { team: "Barcelona" },
    Ronaldo: { team: "Juventus " }
}

const getMapFromArray = (data) => {
    return arr.reduce((prev, cur) => {
        prev[cur.name] = { team: cur.team }
        return prev
    }, {})
}