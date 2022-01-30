import { doIt } from "./src/software-dependency";
import { EXAMPLE_INPUT } from "./tests/mocks/example";

export default function runExample(input: string[]) {
    doIt(input);
};

runExample(EXAMPLE_INPUT);