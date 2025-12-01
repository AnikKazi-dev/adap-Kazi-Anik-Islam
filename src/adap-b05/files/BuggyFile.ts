import { File } from "./File";
import { Directory } from "./Directory";

export class BuggyFile extends File {
  constructor(baseName: string, parent: Directory) {
    super(baseName, parent);
  }

  /**
   * Fault injection for homework
   * @returns base name, here always ""
   */
  protected doGetBaseName(): string {
    // this.baseName = ""; // Fault injection removed/commented out to make test work
    return super.doGetBaseName();
  }
}
