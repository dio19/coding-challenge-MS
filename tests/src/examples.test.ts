import { SAMPLE_INPUT, EXPECTED_OUTPUT } from '../mocks/sample';
import { INVALID_LINE, INVALID_ITEM_NAME } from '../mocks/invalidCommands';
import { doIt } from '../../src/software-dependency';

describe('Test code with an example input', () => {
    it('Expected output', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        doIt(SAMPLE_INPUT);
        EXPECTED_OUTPUT.forEach((string) => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(string));
        })
      });
});

describe('Test code with invalid line', () => {
    it('Expected output when a command line is longer than 80 characters', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const invalidLine = INVALID_LINE.find((line) => line.length > 80)
        doIt(INVALID_LINE);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`"${invalidLine}" contains more than 80 characters. Ignoring command!`));
      });
});

describe('Test code with invalid item name', () => {
    it('Expected output when a item name is longer than 10 characters', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let invalidName = '';
        INVALID_ITEM_NAME.forEach((line) => {
            const parsedLine = line.replace(/  +/g, ' ');
            const lineTokens = parsedLine.split(" ");
            const commandNames = lineTokens.slice(1);
            invalidName = commandNames.find((name) => name.length > 10)
            console.log('invalid name', invalidName)
        })
        doIt(INVALID_ITEM_NAME);
        invalidName && expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`"${invalidName}" contains more than 10 characters. Ignoring command!`));
      });
});
