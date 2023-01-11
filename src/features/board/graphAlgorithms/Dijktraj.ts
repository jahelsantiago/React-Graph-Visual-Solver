import { graphMatrix, graphBlock } from "../boardSlice";
import GraphAlgorithms from "./GraphAlgorithms";

export default class Dijktraj extends GraphAlgorithms {
  constructor(matrix: graphMatrix) {
    super(matrix);
  }

  searchAlgorithm() {
    //get the start point
    const [row, col] = this.getFirstPoint("START");
    //add the start point to the queue
    const queue: [number, number][] = [[row, col]];
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
          this.matrix[newRow][newCol] = "FINISHED";
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
}
