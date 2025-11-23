import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {
  private components: string[] = [];

  constructor(other: string[] | string, delimiter: string = DEFAULT_DELIMITER) {
    if (typeof other === "string") {
      this.components = this.parse(other, delimiter);
    } else {
      this.components = [...other];
    }
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

  isEqual(other: any): boolean {
    if (other instanceof StringArrayName) {
      return this.asDataString() === other.asDataString();
    }
    return false;
  }

  getHashCode(): number {
    const s = this.asDataString();
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  clone(): Name {
    return new StringArrayName([...this.components]);
  }

  asString(delimiter: string = DEFAULT_DELIMITER): string {
    const unmaskedComponents = this.components.map((c) => {
      let unmasked = "";
      for (let i = 0; i < c.length; i++) {
        if (c[i] === ESCAPE_CHARACTER && i + 1 < c.length) {
          unmasked += c[i + 1];
          i++;
        } else {
          unmasked += c[i];
        }
      }
      return unmasked;
    });
    return unmaskedComponents.join(delimiter);
  }

  asDataString(): string {
    return this.components.join(DEFAULT_DELIMITER);
  }

  getComponent(i: number): string {
    if (i < 0 || i >= this.components.length) {
      throw new Error("Index out of bounds");
    }
    return this.components[i];
  }

  setComponent(i: number, c: string): void {
    if (i < 0 || i >= this.components.length) {
      throw new Error("Index out of bounds");
    }
    this.components[i] = c;
  }

  getNoComponents(): number {
    return this.components.length;
  }

  insert(i: number, c: string): void {
    if (i < 0 || i > this.components.length) {
      throw new Error("Index out of bounds");
    }
    this.components.splice(i, 0, c);
  }

  append(c: string): void {
    this.components.push(c);
  }

  remove(i: number): void {
    if (i < 0 || i >= this.components.length) {
      throw new Error("Index out of bounds");
    }
    this.components.splice(i, 1);
  }

  isEmpty(): boolean {
    return this.components.length === 0;
  }

  concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}
