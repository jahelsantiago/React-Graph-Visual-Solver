import { algorithmsType } from "../../info/infoSlice";
import { graphMatrix } from "../boardSlice";
import BFS from "./BFS";
import DFS from "./DFS";

export default class AlgorithmsFactory {
  static getStepsList(algorithm: algorithmsType, matrix: graphMatrix): graphMatrix[]{
    switch (algorithm) {
      case "BFS":
        const bfs = new BFS(matrix);
        return bfs.getSteps();
      case "DFS":
        const dfs = new DFS(matrix);
        return dfs.getSteps();
      default:
        return new BFS(matrix).getSteps();
    }
  }
}
