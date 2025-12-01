import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { DEFAULT_DELIMITER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
    super();
    IllegalArgumentException.assert(
      source !== null && source !== undefined,
      "Source array cannot be null or undefined."
    );
    IllegalArgumentException.assert(
      this.isValidDelimiter(delimiter),
      "Invalid delimiter"
    );
    this.components = [...source];
    this.delimiter = delimiter;
  }

  public clone(): Name {
    return new StringArrayName([...this.components], this.delimiter);
  }

  public getNoComponents(): number {
    return this.components.length;
  }

  public getComponent(i: number): string {
    IllegalArgumentException.assert(
      this.isValidIndex(i),
      "Index out of bounds"
    );
    return this.components[i];
  }

  public setComponent(i: number, c: string) {
    IllegalArgumentException.assert(
      this.isValidIndex(i),
      "Index out of bounds"
    );
    IllegalArgumentException.assert(
      c !== null && c !== undefined,
      "Component cannot be null or undefined"
    );
    const oldComponent = this.components[i];
    this.components[i] = c;
    MethodFailedException.assert(
      this.components[i] === c,
      "setComponent failed"
    );
  }

  public insert(i: number, c: string) {
    IllegalArgumentException.assert(
      i >= 0 && i <= this.components.length,
      "Index out of bounds for insert"
    );
    IllegalArgumentException.assert(
      c !== null && c !== undefined,
      "Component cannot be null or undefined"
    );
    const oldLength = this.components.length;
    this.components.splice(i, 0, c);
    MethodFailedException.assert(
      this.components.length === oldLength + 1,
      "insert failed to increase size"
    );
    MethodFailedException.assert(
      this.components[i] === c,
      "insert failed to place element correctly"
    );
  }

  public append(c: string) {
    IllegalArgumentException.assert(
      c !== null && c !== undefined,
      "Component cannot be null or undefined"
    );
    const oldLength = this.components.length;
    this.components.push(c);
    MethodFailedException.assert(
      this.components.length === oldLength + 1,
      "append failed"
    );
  }

  public remove(i: number) {
    IllegalArgumentException.assert(
      this.isValidIndex(i),
      "Index out of bounds"
    );
    const oldLength = this.components.length;
    this.components.splice(i, 1);
    MethodFailedException.assert(
      this.components.length === oldLength - 1,
      "remove failed"
    );
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  private isValidIndex(i: number): boolean {
    return i >= 0 && i < this.components.length;
  }
}
