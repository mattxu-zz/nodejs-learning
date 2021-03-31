import { reverseStr } from './helper';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    const input = process.stdin.read();
    if (input !== null) {
        const reversedInput = reverseStr(input);
        process.stdout.write(`${reversedInput} \n`);
    }
});
