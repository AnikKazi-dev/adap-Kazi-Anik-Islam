import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { DEFAULT_DELIMITER } from "../common/Printable";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
    super();
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
    if (i < 0 || i >= this.components.length) {
      throw new Error("Index out of bounds");
    }
    return this.components[i];
  }

  public setComponent(i: number, c: string) {
    if (i < 0 || i >= this.components.length) {
      throw new Error("Index out of bounds");
    }
    this.components[i] = c;
  }

  public insert(i: number, c: string) {
    if (i < 0 || i > this.components.length) {
      throw new Error("Index out of bounds");
    }
    this.components.splice(i, 0, c);
  }

  public append(c: string) {
    this.components.push(c);
  }

  public remove(i: number) {
    if (i < 0 || i >= this.components.length) {
      throw new Error("Index out of bounds");
    }
    this.components.splice(i, 1);
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }
}
