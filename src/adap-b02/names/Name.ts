import { Cloneable } from "../common/Cloneable";
import { Equality } from "../common/Equality";

export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export interface Name extends Equality, Cloneable {
    asString(delimiter?: string): string;
    asDataString(): string;
    getComponent(i: number): string;
    setComponent(i: number, c: string): void;
    getNoComponents(): number;
    insert(i: number, c: string): void;
    append(c: string): void;
    remove(i: number): void;
    clone(): Name;
    isEmpty(): boolean;
    concat(other: Name): void;
}