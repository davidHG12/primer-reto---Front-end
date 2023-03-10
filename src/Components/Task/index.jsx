import React from 'react'
import './Task.css'
import { MdCancel, MdDoneAll } from 'react-icons/md'
import axios from 'axios';

const URI = 'https://q4soyrvvra.execute-api.us-east-1.amazonaws.com/api/tarea';
const URI2 = 'https://q4soyrvvra.execute-api.us-east-1.amazonaws.com/api/tareas';

const Task = ({ tareas, setTareas, tarea, dark}) => {


    const getTareas = async () => {
        const res = await axios.get(URI2);
        console.log(res.data)
        setTareas(res.data);
      };

    const deleteTarea = async index => {
        const target = {titulo: index};
        await axios.delete(URI, target);
        getTareas();
      };

    return (
        <div className={`${dark ? 'darkMode-task-container' : "lightMode-task-container"} box-task-container`}>
            <div className={`${dark ? 'darkMode-box-task' : "lightMode-box-task"} box-task`}>
                <div className={`${dark ? 'darkMode-task-title' : 'lightMode-task-title'} box-task-title`} style={{ textDecoration: tarea.completed ? "line-through" : "" }}>{tarea.titulo}</div>
                <div className={`${dark ? 'darkMode-task-description' : "lightMode-task-description"} box-task-description`} style={{ textDecoration: tarea.completed ? "line-through" : "" }}>{tarea.contenido}</div>
            </div>
            <div className={`${dark ? 'darkMode' : "lightMode"} box-task-action`}>
                <button className={`${dark ? 'darkMode-task-completed' : "lightMode-task-completed"} box-task-completed ${dark ? 'darkMode-task-btn' : "lightMode-task-btn"} box-task-btn`}><MdDoneAll size={20} /></button>
                <button className={`${dark ? 'darkMode-task-remove' : "lightMode-task-remove"} box-task-remove ${dark ? 'darkMode-task-btn' : "lightMode-task-btn"} box-task-btn`} onClick={() => deleteTarea(tarea.titulo)}><MdCancel size={20} /></button>
            </div>
        </div>)
}

export default Task