import React, { useState } from "react";
import "./App.css";

import Checkbox from "./Checkbox";

function App() {
  const [isChecked, setChecked] = useState(false);
  const toggleCheck = () => {
    setChecked(!isChecked);
  }
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={toggleCheck}
    />
  );
}

export default App;
