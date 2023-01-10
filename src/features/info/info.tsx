import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { selectCurrentAction, setCurrentAction, setStart } from "./infoSlice";
import StepContainer from "./StepContainer";

interface Props extends PropsFromRedux {
  className?: string;
}

export const info = (props: Props) => {
  return (
    <aside className={props.className}>
      <div className="h-full w-full bg-white flex flex-col justify-around px-16">
        <h1 className="text-4xl text-center py-10 font-bold">
          Algoritmos en grafos
        </h1>
        <StepContainer focused={props.currentAction === 'START'} onStepClick={props.setStart}>
          <h2 className="sub-title">
            Has click sobre un punto de partida
          </h2>
        </StepContainer>
        <StepContainer focused={props.currentAction === 'END'} onStepClick={props.setEnd}>
          <h2 className="sub-title">
            Has click sobre un punto de llegada
          </h2>
        </StepContainer>
        <StepContainer focused={props.currentAction === 'WALLS'} onStepClick={props.setWall}>
          <h2 className="sub-title">
            Selecciona las paredes
          </h2>
        </StepContainer>
        <StepContainer focused={false} onStepClick={() => {}}>
          <h2 className="sub-title">
            Selecciona un algoritmo
          </h2>
        </StepContainer>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ejecutar
        </button>
      </div>
    </aside>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentAction: selectCurrentAction(state),
});

const mapDispatchToProps = (dispatch:AppDispatch) => ({
  setStart: () => dispatch(setCurrentAction("START")),
  setEnd: () => dispatch(setCurrentAction("END")),
  setWall: () => dispatch(setCurrentAction("WALLS")),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default  connector(info);
