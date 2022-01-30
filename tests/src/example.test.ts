import runExample from '../../index';
import { EXAMPLE_INPUT, EXPECTED_OUTPUT } from '../mocks/example';

describe('Test code with an example input', () => {
    console.log('tamañoñ', EXPECTED_OUTPUT.length)
    it('Expected output"', () => {
        console.log = jest.fn();
        runExample(EXAMPLE_INPUT);
        EXPECTED_OUTPUT.forEach((string) => {
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(string));
        })
      });
});
