const fs = require('fs');
const readline = require('readline')
const ACCESS_HW = './access.log';

const readStreamsHw = fs.createReadStream(
    ACCESS_HW, {
        flags: 'r',
        encoding: 'utf-8',
        end: 14000
    }
);


// В модуле readline, используя объекты Interface для 
// построчной обработки тения потоковых данных.
// Поэтому сначала необходимо создать объект Interface.
// В модуле readline вы можете создать объект Interface 
// с помощью метода createInterface. 

const readLineFile = readline.createInterface({
    input: readStreamsHw,
    // input: значение атрибута является объектом, к
    // оторый может использоваться для чтения потоковых
    //  данных и используется для указания источника прочитанных
    //   данных.,
    terminal: true
})

readLineFile.on('line', (line)=>{
if(line.includes('89.123.1.41')){
    const writeStreams89 = fs.createWriteStream(
       './89.123.1.41_requests.log',
        {
            flags: 'a',
            encoding: 'utf-8'
        }
    )

     writeStreams89.write(line + '\n');
}

if(line.includes("34.48.240.111")){
    const writeStreams34 = fs.createWriteStream(
        './34.38.240.111_requests.log',
        {
            flags: 'a',
            encoding: 'utf-8'
        }
    )
     writeStreams34.write(line + '\n');
}
});










