const process = require('process');
const EventEmitter = require('events');

const emitter = new EventEmitter();


const timerGenarate = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

let dateCounter = () => {
    let date1 = process.argv[2];

    let date2 = process.argv[3];


    let pattern = '/(\d{2})\-(\d{2})\-(\d{4})/';
    let dt1 = new Date(date1.replace(pattern, '$3-$2-$1'));
    let dt2 = new Date(date2.replace(pattern, '$3-$2-$1'));
    let t = dt2 - dt1;


    if (t > 0) {

        let daysOutput = Math.floor((t % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        let monthOutput = Math.round((t % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 * 24 * 30));
        let yearOutput = Math.floor((t % (1000 * 60 * 60 * 24 * 30 * 365)) / (1000 * 60 * 60 * 24 * 365));


        console.log(`Осталось до ${dt2}  days ${ daysOutput }  month ${monthOutput}  years ${ yearOutput}`);

    } else {

        console.log("The countdown is over!");

    }

};

const timerRun = async () => {
    const countDateTo = timer();
    console.log(countDateTo);

    await new Promise(resolve => setInterval(resolve, timerGenarate(1000, 4000)));

    await timerRun();
}