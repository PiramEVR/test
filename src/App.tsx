import React from 'react';
import style from './App.module.css';
import {Messages} from "./components/messages/Messages";

function App() {

  return (
    <div className={style.app}>
        <Messages/>
    </div>
  );
}

export default App;
