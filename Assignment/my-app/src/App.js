import React from "react";
import BoxComponent from "./BoxComponent";

const App = () => {
  return (
    <div className="App">
      <h1>
        <center>Task Assignment</center>
      </h1>
      <BoxComponent
        title1="Level 1 : Event Registration Form"
        githubLink="https://github.com/HarshN187/Task-Assignment/tree/main/Level-1"
        vercelLink="https://task-assignment-silk.vercel.app/"
      />
      <BoxComponent
        title1="Level 2 : Job Application Form"
        githubLink="https://github.com/HarshN187/Task-Assignment/tree/main/Level-2"
        vercelLink="https://task-assignment-f7fc.vercel.app/"
      />
      <BoxComponent
        title1="Level 3 : Advanced Survey form"
        githubLink="https://github.com/HarshN187/Task-Assignment"
        vercelLink="https://task-assignment-xrie.vercel.app/"
      />
    </div>
  );
};

export default App;
