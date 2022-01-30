import { SAMPLE_INPUT, EXPECTED_OUTPUT } from '../mocks/sample';
import { INVALID_LINE, INVALID_ITEM_NAME, INVALID_COMMAND } from '../mocks/invalidCommands';
import { doIt } from '../../src/software-dependency';
import { COMMAND } from '../../src/command';

describe('Test code with an example input', () => {
    it('Expected output', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        doIt(SAMPLE_INPUT);
        EXPECTED_OUTPUT.forEach((string) => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(string));
        })
      });
});

describe('Test code with invalid lines', () => {
    it('Expected output when there is a command line that contains more than 80 characters', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const invalidLines = [];
        INVALID_LINE.forEach((line) => {
            if(line.length > 80) {
                invalidLines.push(line);
            }
        })
        doIt(INVALID_LINE);
        invalidLines.length > 0 && invalidLines.forEach((line) => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`"${line}" contains more than 80 characters. Ignoring command!`));
        })
      });
});

describe('Test code with invalid item name', () => {
    it('Expected output when there is a item name that contains more than 10 characters', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let invalidName = '';
        INVALID_ITEM_NAME.forEach((line) => {
            const parsedLine = line.replace(/  +/g, ' ');
            const lineTokens = parsedLine.split(" ");
            const commandNames = lineTokens.slice(1);
            invalidName = commandNames.find((name) => name.length > 10)
        })
        doIt(INVALID_ITEM_NAME);
        invalidName && expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`"${invalidName}" contains more than 10 characters. Ignoring command!`));
      });
});

describe('Test code with invalid commands', () => {
    it('Expected output when there is a invalid command', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        let invalidNames = [];
        INVALID_COMMAND.forEach((line) => {
            const parsedLine = line.replace(/  +/g, ' ');
            const lineTokens: string[] = parsedLine.split(" ");
            const commandName = lineTokens[0];
            const command: COMMAND = commandName as COMMAND;
            if (COMMAND[command] === undefined) {
                invalidNames.push(command);
            }
        })
        doIt(INVALID_COMMAND);
        invalidNames.length > 0 && invalidNames.forEach((name) => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`"${name}" is not a valid command. Try typing in uppercase, please`));
        })
      });
});
