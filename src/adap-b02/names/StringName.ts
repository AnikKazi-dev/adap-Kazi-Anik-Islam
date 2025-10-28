import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { StringArrayName } from "./StringArrayName";

export class StringName implements Name {

    private name: string;
    private delimiter: string;

    constructor(name: string, delimiter: string = DEFAULT_DELIMITER) {
        this.name = name;
        this.delimiter = delimiter;
    }

    private get asStringArrayName(): StringArrayName {
        return new StringArrayName(this.name, this.delimiter);
    }

    isEqual(other: any): boolean {
        if (other instanceof StringName) {
            return this.name === other.name && this.delimiter === other.delimiter;
        }
        return this.asStringArrayName.isEqual(other);
    }

    getHashCode(): number {
        return this.asStringArrayName.getHashCode();
    }

    clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) {
            return this.name;
        }
        return this.asStringArrayName.asString(delimiter);
    }

    asDataString(): string {
        return this.asStringArrayName.asDataString();
    }

    getComponent(i: number): string {
        return this.asStringArrayName.getComponent(i);
    }

    setComponent(i: number, c: string): void {
        const newArrayName = this.asStringArrayName;
        newArrayName.setComponent(i, c);
        this.name = newArrayName.asString(this.delimiter);
    }

    getNoComponents(): number {
        return this.asStringArrayName.getNoComponents();
    }

    insert(i: number, c: string): void {
        const newArrayName = this.asStringArrayName;
        newArrayName.insert(i, c);
        this.name = newArrayName.asString(this.delimiter);
    }

    append(c: string): void {
        const newArrayName = this.asStringArrayName;
        newArrayName.append(c);
        this.name = newArrayName.asString(this.delimiter);
    }

    remove(i: number): void {
        const newArrayName = this.asStringArrayName;
        newArrayName.remove(i);
        this.name = newArrayName.asString(this.delimiter);
    }

    isEmpty(): boolean {
        return this.asStringArrayName.isEmpty();
    }

    concat(other: Name): void {
        const newArrayName = this.asStringArrayName;
        newArrayName.concat(other);
        this.name = newArrayName.asString(this.delimiter);
    }
}
