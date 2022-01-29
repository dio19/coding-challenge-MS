export class Software {
    private name: string;
    private dependencies: Software[]

    constructor(name: string) {
        this.name = name;
        this.dependencies = [];
    }

    public getName(): string {
        return this.name;
    }

    public getDependencies(): Software[] {
        return this.dependencies;
    }

    public addDependencies(dependency: Software) {
        return this.dependencies.push(dependency);
    }

    public toString() {
        return this.getName();
    }

    public equals(otherSoftware: Software) {
        if (this == otherSoftware) {
            return true;
        }
        return this.name === otherSoftware.name;
    }
}