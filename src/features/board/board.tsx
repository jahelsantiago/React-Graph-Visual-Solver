import PropTypes from "prop-types";
import React, {useState} from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import Square from "./square";

let COLS = process.env.REACT_APP_COLS;
let REACT_APP_COLS = COLS ? parseInt(COLS) : 20;
interface Props extends PropsFromRedux {
  className?: string;
}

const Board = (props: Props) => {
 
  return (
    <main className={props.className}>
      <div className= {`h-full w-full bg-slate-200 grid gap-1`} style= {{gridTemplateColumns: `repeat(${REACT_APP_COLS}, minmax(0, 1fr))`}}>
        {Array.from({ length: props.rows * props.columns }).map((_, i) => (
          <Square
            key={i}
            col={i % props.columns}
            row={Math.floor(i / props.rows)}
          />
        ))}
      </div>
    </main>
  );
};

const mapStateToProps = (state: RootState) => ({
  rows: state.info.rows,
  columns: state.info.cols,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Board);
