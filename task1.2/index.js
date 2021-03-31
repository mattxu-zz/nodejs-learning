import fs from 'fs';
import readline from 'readline';
import csv from 'csvtojson';

const csvFileReadStream = fs.createReadStream('./task1.2/csv/books.csv');
const jsonFileWriteStream = fs.createWriteStream('./task1.2/books.txt', { flags: 'w' });
const rl = readline.createInterface(csvFileReadStream);
let firstLine = null;
rl.on('line', (line) => {
    if (!firstLine) {
        firstLine = line;
    } else {
        const csvLineToParse = `${firstLine}\n${line}`;
        csv()
            .fromString(csvLineToParse)
            .then((parsed) => {
                const newJsonLine = parsed[0];
                jsonFileWriteStream.write(`${JSON.stringify(newJsonLine)} \n`, logError);
            });
    }
});

const logError = (error) => {
    if (error) {
        console.log(error);
    }
};

csvFileReadStream.on('error', logError);

jsonFileWriteStream.on('error', logError);
