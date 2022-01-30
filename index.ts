import { doIt } from "./src/software-dependency";
import { SAMPLE_INPUT } from "./tests/mocks/sample";

export default function runExample(input: string[]) {
    doIt(input);
};

runExample(SAMPLE_INPUT);