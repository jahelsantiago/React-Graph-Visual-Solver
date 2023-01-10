import React from "react";
import { Info, Board } from "./features";

function App() {
  return (
    <div className="flex">
      <Board className="h-screen w-4/6" />
      <Info className="h-screen w-2/6" />
    </div>
  );
}

export default App;
