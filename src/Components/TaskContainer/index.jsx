import React, { useState } from 'react'
import Task from '../Task'
import './TaskContainer.css'
import axios from 'axios';

const URI = 'https://1twk8kaz1m.execute-api.us-east-1.amazonaws.com/api/tarea';
const URI2 = 'https://1twk8kaz1m.execute-api.us-east-1.amazonaws.com/api/tareas';

const TaskContainer = ({ tareas, setTareas, dark }) => {

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const getTareas = async () => {
        const res = await axios.get(URI2);
        console.log(res.data)
        setTareas(res.data);
      };

    const store = async e => {
    e.preventDefault();
    const nuevaTarea = {titulo: titulo, contenido: contenido};
    await axios.post(URI, nuevaTarea);
    getTareas();
    };

    return (
        <div className='tasks-container'>
            <form className='input-form' action='handleSubmit' onSubmit={store}>
                <input className='task-input task-input-title'
                    name='titulo' 
                    type="text" 
                    placeholder='Escribre un titulo'
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    required />
                <input className='task-input task-input-desc'
                    name='contenido' 
                    type="text" 
                    placeholder='Escribre tu nota'
                    value={contenido}
                    onChange={e => setContenido(e.target.value)} 
                    required />
                <button className={`task-btn ${dark ? 'darkMode-add-btn' : 'lightMode-add-btn'} add-btn`}
                    type='submit'>Agregar</button>
            </form >

            <div className={`${dark ? 'darkMode-box-tasks-container' : "lightMode-box-tasks-container"} box-tasks-container`}>
                {tareas.tareas?.map((tarea) => {
                    return <Task tarea={tarea} tareas={tareas} setTareas={setTareas} index={tarea.titulo} dark={dark} key={tarea.titulo}/>
                })}
            </div>
        </div>
    )
}

export default TaskContainer