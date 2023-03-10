import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { graphMatrix, resetBoard, setSquares } from "../board/boardSlice";
import { BFS } from "../board/graphAlgorithms";
import AlgorithmsFactory from "../board/graphAlgorithms/AlgorithmsFactory";
import { algorithmsType, resetInfo, selectAlgorithm, selectCurrentAction, setAlgorithm, setCurrentAction, setStart } from "./infoSlice";
import StepContainer from "./StepContainer";
import { VscDebugRestart } from "react-icons/vsc";

interface Props extends PropsFromRedux {
  className?: string;
}

export const info = (props: Props) => {

  return (
    <aside className={props.className + " " +"flex justify-center"} >
      <div className="h-full w-full bg-white flex flex-col justify-around max-w-xs">
        <div className="flex items-center flex-col justify-around">
          <p>(BETA REALESE)</p>
          <h1 className="text-4xl text-center py-10 font-bold">
            Algoritmos en grafos
          </h1>
          <VscDebugRestart className="text-5xl hover:text-blue-500 cursor-pointer" onClick={()=>props.resetBoard()}/>
        </div>
        <StepContainer
          focused={props.currentAction === "START"}
          onStepClick={props.setStart}
          className="h-24"
        >
          <h2 className="sub-title">Has click sobre un punto de partida</h2>
        </StepContainer>
        <StepContainer
          focused={props.currentAction === "END"}
          onStepClick={props.setEnd}
          className="h-24"
        >
          <h2 className="sub-title">Has click sobre un punto de llegada</h2>
        </StepContainer>
        <StepContainer
          focused={props.currentAction === "WALLS"}
          onStepClick={props.setWall}
          className="h-24"
        >
          <h2 className="sub-title">Selecciona las paredes</h2>
        </StepContainer>
        <StepContainer focused={false} onStepClick={() => {}}>
          <h2 className="sub-title pb-2">Selecciona un algoritmo</h2>
          <div className="flex flex-row justify-around py-4">
            <StepContainer focused = {props.selectedAlgorithm === "BFS"} onStepClick = {()=>{props.setAlgorithm("BFS")}} className="px-4">
              BFS
            </StepContainer>
            <StepContainer focused = {props.selectedAlgorithm === "DFS"} onStepClick = {()=>{props.setAlgorithm("DFS")}} className="px-4">
              DFS
            </StepContainer>
            {/* <StepContainer focused = {props.selectedAlgorithm === "DIJKSTRA"} onStepClick = {()=>{props.setAlgorithm("DIJKSTRA")}} className="px-4">
              Dijkstra's 
            </StepContainer> */}
          </div>
        </StepContainer>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>props.solvePath(props.board, props.selectedAlgorithm)}>
          Ejecutar
        </button>
      </div>
    </aside>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentAction: selectCurrentAction(state),
  selectedAlgorithm: selectAlgorithm(state),
  board: state.board.squares,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setStart: () => dispatch(setCurrentAction("START")),
  setEnd: () => dispatch(setCurrentAction("END")),
  setWall: () => dispatch(setCurrentAction("WALLS")),
  setAlgorithm: (algorithm : algorithmsType) => dispatch(setAlgorithm(algorithm)),
  resetBoard: () => {
    dispatch(resetInfo())
    dispatch(resetBoard())
  },
  solvePath: (board: graphMatrix, selectedAlgorithm:algorithmsType) => {
    const steps = AlgorithmsFactory.getStepsList(selectedAlgorithm, board)
    let i = 0 
    // dispatch the graph matrix every 1 second until there is no more steps
    const interval = setInterval(() => {
      if (i < steps.length) {
        dispatch(setSquares(steps[i]))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)
  }
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(info);
