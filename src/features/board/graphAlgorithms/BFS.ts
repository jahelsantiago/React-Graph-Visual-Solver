import { graphMatrix, graphBlock } from "../boardSlice";

export default class BFS {
  private matrix: graphMatrix;
  private steps: graphMatrix[] = [];

  constructor(matrix: graphMatrix) {
    //create copy of matrix
    this.matrix = JSON.parse(JSON.stringify(matrix));
  }

  private bfs() {
    //get the start point
    const [row, col] = this.getFirstPoint("START");
    //add the start point to the queue
    const queue:[number, number][] = [[row, col]];
    //create a copy of the matrix
    this.addCopy();
    //while the queue is not empty
    while (queue.length > 0) {
      //get the first element from the queue
      const [row, col] = queue.shift()!;
      //get the neighbords of the current point
      const neighbords = this.getNeighbords(row, col);
      //for each neighbord
      for (const [newRow, newCol] of neighbords) {
        //if the neighbord is the end
        if (this.matrix[newRow][newCol] === "END") {
          //add the end to the steps
          this.addCopy();
          //return the steps
          return;
        }
        //add the neighbord to the queue
        queue.push([newRow, newCol]);
        //mark the neighbord as visited
        this.matrix[newRow][newCol] = "VISITED";
        //add the neighbord to the steps
        this.addCopy();
      }
    }
  }
  

  /**
   * 
   * @param kind search for the matrix a block that matches the kind
   * @returns the row and col of the block
   */
  private getFirstPoint(kind: graphBlock) {
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
  private addCopy() {
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

  private isValidPoint(row: number, col: number) {
    const point = this.matrix[row]?.[col];
    return point === "NONE" || point === "END" || false;
  }

  public getSteps(): graphMatrix[] {
    this.bfs();
    return this.steps;
  }

  public getMatrix(): graphMatrix {
    return this.matrix;
  }
}

export { BFS };
