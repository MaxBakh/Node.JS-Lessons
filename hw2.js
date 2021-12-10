// console.log('Record 1');

// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             сonsole.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });

// console.log('Record 5');

// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));


//////// 1 5 6 2 3 4

const process = require('process');
const EventEmitter = require('events');

const emitter = new EventEmitter();

let timer = setInterval(function () {
    let date1 = process.argv[2];

    let date2 = process.argv[3];


    let pattern = '/(\d{2})\-(\d{2})\-(\d{4})/';
    let dt1 = new Date(date1.replace(pattern, '$3-$2-$1'));
    let dt2 = new Date(date2.replace(pattern, '$3-$2-$1'));
    let t = dt2 - dt1;


    if (t > 0) {
        // let hoursOutput = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // let minsOutput = Math.floor((t % (1000 * 60)) / (1000 * 60));
        let daysOutput = Math.floor((t % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        let monthOutput = Math.round((t % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 * 24 * 30));
        let yearOutput = Math.floor((t % (1000 * 60 * 60 * 24 * 30 * 365)) / (1000 * 60 * 60 * 24 * 365));


        console.log(`Осталось до ${dt2}  days ${ daysOutput }  month ${monthOutput}  years ${ yearOutput}`);

    } else {

        console.log("The countdown is over!");

    }

}, 1000);

// function my_day() {
//     // понятно, что можно всё записать короче, выкинув промежуточные переменные!
//     // но тут максимально подробно расписано
//     let sd1 = '12-12-2021';
//     let sd2 = daysInput + '-' + monthInput + '-' + yearInput;
//     let pattern = '/(\d{2})\-(\d{2})\-(\d{4})/';
//     let dt1 = new Date(sd1.replace(pattern, '$3-$2-$1'));
//     let dt2 = new Date(sd2.replace(pattern, '$3-$2-$1'));
//     let diff = dt2 - dt1;
//     let c = diff / (1000 * 60 * 60 * 24);
//     console.log(c);
// }
// my_day();