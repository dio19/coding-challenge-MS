import {COMMAND} from "./command";
import {Software} from "./software";

let allSoftware: Record<string, Software> = {};
let installedSoftware: Software[] = [];

export function doIt(input: string[]) {
    for (let i = 0; i < input.length; i++) {
        const inp = input[i];
        doItForInputElem(inp)
    }
}

function doItForInputElem(inp: string) {
    const parsedInput = inp.replace(/  +/g, ' ');
    console.log(parsedInput);
    const commandTokens: string[] = parsedInput.split(" ");
    const commandString = commandTokens[0];
    let command: COMMAND = commandString as COMMAND;
    const commandArgs = commandTokens.slice(1);
    if (parsedInput.length > 80) {
        console.log(`"${parsedInput}" contains more than 80 characters. Ignoring command!`);
        command = 'END' as COMMAND;
    };
    const invalidItemName = commandArgs.find((arg) => arg.length > 10);
    if (invalidItemName) {
        console.log(`"${invalidItemName}" contains more than 10 characters. Ignoring command!`);
        command = 'END' as COMMAND;
    };
    switch (command) {
        case COMMAND.DEPEND:
            const softwareName = commandArgs[0];
            buildDependencies(softwareName, commandArgs.slice(1));
            break;
        case COMMAND.INSTALL:
            const softwareToBeInstalled: Software = getSoftware(commandArgs[0]);
            if (isAlreadyInstalled(softwareToBeInstalled)) {
                console.log(softwareToBeInstalled.toString() + " is already installed");
            } else {
                //Install dependencies first
                const softwareDependenciesToBeInstalled = softwareToBeInstalled.getDependencies();
                for (const index in softwareDependenciesToBeInstalled) {
                    const softwareDependency = softwareDependenciesToBeInstalled[index];
                    if (!isAlreadyInstalled(softwareDependency)) {
                        install(softwareDependency);
                    }
                }
                //Once the dependencies are installed, install the software
                install(softwareToBeInstalled);
            }
            break;
        case COMMAND.REMOVE:
            const softwareToBeRemoved: Software = getSoftware(commandArgs[0]);
            if (!isAlreadyInstalled(softwareToBeRemoved)) {
                console.log(softwareToBeRemoved.toString() + " is not installed");
            } else if (canRemoveSoftware(softwareToBeRemoved)) {
                installedSoftware = installedSoftware.filter(function (item) {
                    return !item.equals(softwareToBeRemoved)
                })

                const currentSoftwareDependencies = softwareToBeRemoved.getDependencies();
                console.log("Removing " + softwareToBeRemoved)
                for (const index in currentSoftwareDependencies) {
                    const dependency = currentSoftwareDependencies[index];
                    if (canRemoveSoftware(dependency)) {
                        console.log("Removing " + dependency.toString());
                        installedSoftware = installedSoftware.filter(function (item) {
                            return !item.equals(dependency)
                        })
                    }
                }
            } else {
                console.log(softwareToBeRemoved + " is still needed");
            }
            break;
        case COMMAND.LIST:
            for (const index in installedSoftware) {
                const installedSoft = installedSoftware[index];
                console.log(installedSoft.toString());
            }
            break;
        case COMMAND.END:
            break;
    }
    COMMAND[command] === undefined && console.log(`"${command}" is not a valid command. Try typing in uppercase, please`);
}

function install(software: Software) {
    console.log("Installing " + software.toString());
    installedSoftware.push(software);
}

function buildDependencies(softwareName: string, dependencies: string[]) {
    for (let i = 0; i < dependencies.length; i++) {
        const currentDependency: string = dependencies[i];
        const dependenciesOfDependency: Software[] = getSoftware(currentDependency).getDependencies();

        if (dependenciesOfDependency != null
            && dependenciesOfDependency.some(value => value.equals(getSoftware(softwareName)))) {
            console.log(currentDependency + " depends on " + softwareName + ", ignoring command");
        } else {
            getSoftware(softwareName).addDependencies(getSoftware(currentDependency));
        }
    }
}


function getSoftware(name: string): Software {
    let software: Software = allSoftware[name];
    if (software == null) {
        software = new Software(name);
        allSoftware[name] = software;
    }
    return software;
}

function isAlreadyInstalled(softwareToBeInstalled: Software): boolean {
    return installedSoftware.some(value => value.equals(softwareToBeInstalled))
}

function canRemoveSoftware(softwareToBeRemoved: Software): boolean {
    for (const i in installedSoftware) {
        const installedSoft = installedSoftware[i];
        const requiredDependencies: Software[] = installedSoft.getDependencies();
        if (requiredDependencies != null) {
            for (const j in requiredDependencies) {
                const dependency = requiredDependencies[j];
                if (softwareToBeRemoved.equals(dependency)) {
                    return false;
                }
            }
        }
    }
    return true;
}
