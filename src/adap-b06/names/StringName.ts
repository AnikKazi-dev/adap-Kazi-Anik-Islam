import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { StringArrayName } from "./StringArrayName";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {
  protected name: StringArrayName;
  protected delimiter: string;

  constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
    super();
    IllegalArgumentException.assert(
      source !== null && source !== undefined,
      "Source string cannot be null or undefined."
    );
    IllegalArgumentException.assert(
      this.isValidDelimiter(delimiter),
      "Invalid delimiter"
    );
    this.delimiter = delimiter;
    this.name = new StringArrayName(this.parse(source, delimiter), delimiter);
  }

  private parse(s: string, delimiter: string): string[] {
    const components: string[] = [];
    let current = "";
    let isEscaped = false;
    for (const char of s) {
      if (isEscaped) {
        current += char;
        isEscaped = false;
      } else if (char === ESCAPE_CHARACTER) {
        isEscaped = true;
      } else if (char === delimiter) {
        components.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    components.push(current);
    return components;
  }

  public clone(): Name {
    return new StringName(this.asString(), this.delimiter);
  }

  public getNoComponents(): number {
    return this.name.getNoComponents();
  }

  public getComponent(i: number): string {
    return this.name.getComponent(i);
  }

  public setComponent(i: number, c: string): Name {
    const newName = this.name.setComponent(i, c);
    return new StringName(newName.asString(this.delimiter), this.delimiter);
  }

  public insert(i: number, c: string): Name {
    const newName = this.name.insert(i, c);
    return new StringName(newName.asString(this.delimiter), this.delimiter);
  }

  public append(c: string): Name {
    const newName = this.name.append(c);
    return new StringName(newName.asString(this.delimiter), this.delimiter);
  }

  public remove(i: number): Name {
    const newName = this.name.remove(i);
    return new StringName(newName.asString(this.delimiter), this.delimiter);
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public asString(delimiter: string = this.delimiter): string {
    return this.name.asString(delimiter);
  }
}
