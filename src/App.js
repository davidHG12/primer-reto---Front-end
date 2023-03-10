import './App.css';
import { useState, useEffect } from 'react';
import Switch from "react-switch";
import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import TaskContainer from './Components/TaskContainer';
import axios from 'axios';

const URI = 'https://q4soyrvvra.execute-api.us-east-1.amazonaws.com/api/tareas';

function App() {

  const [tareas, setTareas] = useState([])
  const [dark, setDark] = useState(true);

 
  
  useEffect(() => {
    getTareas();
  }, [])

  const getTareas = async () => {
    const res = await axios.get(URI);
    console.log(res.data)
    setTareas(res.data);
  };
  

  return (
    <div className={`${dark ? 'darkMode-App' : "lightMode-App"} App`}>
      <div className={`${dark ? 'darkMode-app-title-container' : "lightMode-app-title-container"} app-title-container`}>
        <h1 className='app-title'>Lista de tareas</h1>
      </div>
      <Switch
        checked={dark}
        onChange={() => setDark(!dark)}
        uncheckedIcon={<div className='check-sun-btn' ><BsSunFill size={18} /></div>}
        checkedIcon={<div className='check-moon-btn'><BsFillMoonStarsFill size={18} /></div>} />

      <TaskContainer tareas={tareas} setTareas={setTareas} dark={dark} />
    </div >
  );
}

export default App;
