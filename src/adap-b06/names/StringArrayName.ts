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

  public setComponent(i: number, c: string): Name {
    IllegalArgumentException.assert(
      this.isValidIndex(i),
      "Index out of bounds"
    );
    IllegalArgumentException.assert(
      c !== null && c !== undefined,
      "Component cannot be null or undefined"
    );
    const newComponents = [...this.components];
    newComponents[i] = c;
    return new StringArrayName(newComponents, this.delimiter);
  }

  public insert(i: number, c: string): Name {
    IllegalArgumentException.assert(
      i >= 0 && i <= this.components.length,
      "Index out of bounds for insert"
    );
    IllegalArgumentException.assert(
      c !== null && c !== undefined,
      "Component cannot be null or undefined"
    );
    const newComponents = [...this.components];
    newComponents.splice(i, 0, c);
    return new StringArrayName(newComponents, this.delimiter);
  }

  public append(c: string): Name {
    IllegalArgumentException.assert(
      c !== null && c !== undefined,
      "Component cannot be null or undefined"
    );
    const newComponents = [...this.components];
    newComponents.push(c);
    return new StringArrayName(newComponents, this.delimiter);
  }

  public remove(i: number): Name {
    IllegalArgumentException.assert(
      this.isValidIndex(i),
      "Index out of bounds"
    );
    const newComponents = [...this.components];
    newComponents.splice(i, 1);
    return new StringArrayName(newComponents, this.delimiter);
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  protected isValidIndex(i: number): boolean {
    return i >= 0 && i < this.components.length;
  }
}
