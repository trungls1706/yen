let obj = {
    'MB00':
        [
            {
                id: 0
            },
            {
                id: 1
            }
        ],
    'MB00HN':
        [
            {
                id: 0
            },
            {
                id: 1
            }
        ],
    'MT01':
        [
            {
                id: 0
            },
            {
                id: 1
            }
        ],
    'MT02':
        [
            {
                id: 0
            },
        ]
}

// let obj2 = {
//     'MB00': 'MIENBAC',
//     'MB00HN': 'HANOI',
//     'MT01,MT01': 'MIENTAY'
// }

// for (const item in obj) {
//     if(item == 'MB00'){

//     }

//     console.log(item)
//     // console.log(`${item}: ${obj[item]}`);
// }


const google_map =
    `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.568532373197!2d106.6983828142262!3d10.767698192327451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40040619f1%3A0x52ae70ac65c04625!2zMjIzIE5ndXnhu4VuIEPDtG5nIFRy4bupLCBOZ3V54buFbiBUaMOhaSBCw6xuaCwgUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1513826839819" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`

let abc = google_map.split('src="')
let z = abc[1].split('"')
console.log(abc)
console.log('---')
console.log(z)