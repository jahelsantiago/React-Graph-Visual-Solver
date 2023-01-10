import PropTypes from 'prop-types'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'

interface Props extends PropsFromRedux {
  className?: string;
  row: number;
  col: number;
}

export const square = (props:Props) => {
  return (
    <div className='bg-slate-500'>
           {props.row} - {props.col}
    </div>
  )
}


const mapStateToProps = (state:RootState) => ({})

const mapDispatchToProps = (dispatch:AppDispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(square)