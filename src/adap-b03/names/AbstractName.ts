import { Name } from "./Name";
import { DEFAULT_DELIMITER } from "../common/Printable";

export abstract class AbstractName implements Name {
  public abstract clone(): Name;
  public abstract getNoComponents(): number;
  public abstract getComponent(i: number): string;
  public abstract setComponent(i: number, c: string): void;
  public abstract insert(i: number, c: string): void;
  public abstract append(c: string): void;
  public abstract remove(i: number): void;

  public asString(delimiter: string = this.getDelimiterCharacter()): string {
    let components: string[] = [];
    for (let i = 0; i < this.getNoComponents(); i++) {
      components.push(this.getComponent(i));
    }
    return components.join(delimiter);
  }

  public toString(): string {
    return this.asDataString();
  }

  public asDataString(): string {
    return this.asString(DEFAULT_DELIMITER);
  }

  public isEqual(other: Name): boolean {
    if (this.getNoComponents() !== other.getNoComponents()) {
      return false;
    }
    for (let i = 0; i < this.getNoComponents(); i++) {
      if (this.getComponent(i) !== other.getComponent(i)) {
        return false;
      }
    }
    return true;
  }

  public getHashCode(): number {
    let hashCode: number = 0;
    const s: string = this.asDataString();
    for (let i: number = 0; i < s.length; i++) {
      let c: number = s.charCodeAt(i);
      hashCode = (hashCode << 5) - hashCode + c;
      hashCode |= 0;
    }
    return hashCode;
  }

  public isEmpty(): boolean {
    return this.getNoComponents() === 0;
  }

  public abstract getDelimiterCharacter(): string;

  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}
