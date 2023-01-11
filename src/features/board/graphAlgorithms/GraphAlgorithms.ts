import { graphMatrix, graphBlock } from "../boardSlice";

export default abstract class DFS {
  protected matrix: graphMatrix;
  private steps: graphMatrix[] = [];

  constructor(matrix: graphMatrix) {
    //create copy of matrix
    this.matrix = JSON.parse(JSON.stringify(matrix));
  }

  /**
   * Search for the path and add each step to the steps
   */
  abstract searchAlgorithm(): void;

  /**
   *
   * @param kind search for the matrix a block that matches the kind
   * @returns the row and col of the block
   */
  protected getFirstPoint(kind: graphBlock) {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        if (this.matrix[row][col] === kind) {
          return [row, col];
        }
      }
    }
    return [-1, -1];
  }

  /**
   * Add a copy of the current state of the matrix to the steps
   */
  protected addCopy() {
    this.steps.push(JSON.parse(JSON.stringify(this.matrix)));
  }

  public getNeighbords(row: number, col: number) {
    const directions = [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1],
    ];
    return directions.filter(([newRow, newCol]) =>
      this.isValidPoint(newRow, newCol)
    );
  }

  protected isValidPoint(row: number, col: number) {
    const point = this.matrix[row]?.[col];
    return point === "NONE" || point === "END" || false;
  }

  public getSteps(): graphMatrix[] {
    this.searchAlgorithm();
    return this.steps;
  }

  public getMatrix(): graphMatrix {
    return this.matrix;
  }
}
