import PropTypes from "prop-types";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import { Square } from "../square";

interface Props extends PropsFromRedux {
  className?: string;
}



export const board = (props: Props) => {

  return (
    <main className={props.className}>
      <div className="h-full w-full bg-slate-200 grid grid-cols-10 gap-1">
        {Array.from({ length: props.rows * props.columns }).map((_, i) => (
          <Square key={i} col={i%props.columns} row = {Math.floor(i/props.rows)}/>
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

export default connector(board);
