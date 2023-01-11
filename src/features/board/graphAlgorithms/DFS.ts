import { graphMatrix, graphBlock } from "../boardSlice";
import GraphAlgorithms from "./GraphAlgorithms";

export default class DFS extends GraphAlgorithms {
  constructor(matrix: graphMatrix) {
    super(matrix);
  }

  searchAlgorithm() {
    //get the start point
    const [row, col] = this.getFirstPoint("START")
    //add the start point to the stack
    const stack: [number, number][] = [[row, col]];
    //create a copy of the matrix
    this.addCopy();
    //while the stack is not empty
    while (stack.length > 0) {
        //get the last element from the stack
        const [row, col] = stack.pop()!;
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
            //add the neighbord to the stack
            stack.push([newRow, newCol]);
            //mark the neighbord as visited
            this.matrix[newRow][newCol] = "VISITED";
            //add the neighbord to the steps
            this.addCopy();
        }
        }

    
  }
}
