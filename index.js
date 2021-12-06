const colors = require('colors');
const process = require('process');
let primeNumStart = process.argv[2];
let primeNum = process.argv[3];
let arr = [];


nextPrime:
    for (let i = primeNumStart; i <= primeNum; i++) {

        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;

        }
        arr.push(i);

    }


//Если простых чисел в диапазоне нет, нужно, чтобы программа сообщила об этом в терминале красным цветом.
const found = arr.some(i => arr.indexOf(i));
if (!found) {
    console.log(colors.red('В заданном диапозоне нет простых чисел'));
}


//Если аргумент, переданный при запуске, не считается числом — сообщите об этом ошибкой и завершите программу.
if (isNaN(primeNumStart) || isNaN(primeNum)) {

    process.on('exit', () => {
        console.log(colors.yellow(' Аргумент не считается числом'));
    })
}



const greenColor = arr.filter(function (value, index, arr) {
    return index % 3 == 0;
});



const yellowColor = arr.filter(function (value, index, arr) {
    return index % 3 == 1;
});

const redColor = arr.filter(function (value, index, arr) {
    return (index + 1) % 3 == 0;

});

console.log(colors.white(arr));
console.log(colors.green(greenColor));
console.log(colors.yellow(yellowColor));
console.log(colors.red(redColor));
console.log(colors.green(greenColor) + colors.yellow(yellowColor) + colors.red(redColor));