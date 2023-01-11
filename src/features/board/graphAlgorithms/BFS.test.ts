//create tests for the BFS class using jest

import BFS from "./BFS";
import { graphMatrix, graphBlock } from "../boardSlice";

describe("BFS", () => {
    it("Get the list of neighbords", () => {
        const matrix = [
        ["START", "WALL", "WALL", "WALL"],
        ["NONE", "WALL", "WALL", "WALL"],
        ["END", "WALL", "WALL", "WALL"],
        ["WALL", "WALL", "WALL", "WALL"],
        ] as graphMatrix;
        const bfs = new BFS(matrix);
        const neighbords = bfs.getNeighbords(1, 0);
        //should contain only one neighbord
        console.log(neighbords);
        expect(neighbords).toHaveLength(1);
        expect(neighbords).toContainEqual([2, 0]);

    });
    it("When surronnded by walls returns none", () => {
        const matrix = [
        ["START", "WALL", "WALL", "WALL"],
        ["NONE", "WALL", "WALL", "WALL"],
        ["END", "WALL", "NONE", "WALL"],
        ["WALL", "WALL", "WALL", "WALL"],
        ] as graphMatrix;
        const bfs = new BFS(matrix);
        const neighbords = bfs.getNeighbords(2, 2);
        //should contain only one neighbord
        expect(neighbords).toHaveLength(0);
    });
    it("when no obstacles, should return all", () => {
        //create a matrix of NONE
        const matrix = [
        ["START", "NONE", "NONE", "NONE"],
        ["NONE", "NONE", "NONE", "NONE"],
        ["NONE", "END", "NONE", "NONE"],
        ["NONE", "NONE", "NONE", "NONE"],
        ] as graphMatrix;

        const bfs = new BFS(matrix);
        const neighbords = bfs.getNeighbords(1, 1);
        //should contain only one neighbord
        expect(neighbords).toHaveLength(4);
        expect(neighbords).toContainEqual([1, 0]);
        expect(neighbords).toContainEqual([0, 1]);
        expect(neighbords).toContainEqual([1, 2]);
        expect(neighbords).toContainEqual([2, 1]);
    });
});

// Path: src\features\board\graphAlgorithms\BFS.ts


