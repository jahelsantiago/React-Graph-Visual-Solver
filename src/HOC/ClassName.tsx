import React from 'react'

interface Props {
    className? : string;
    children? : React.ReactNode;
}

export default function ClassName(props:Props) {
  return (
    <div className={props.className}>
        {props.children}
    </div>
  )
}
