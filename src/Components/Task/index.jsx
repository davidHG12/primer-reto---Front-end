import React, { useState } from 'react'
import './Task.css'
import { MdCancel, MdEdit, MdDoneAll } from 'react-icons/md'
import axios from 'axios';

const URI = 'https://1twk8kaz1m.execute-api.us-east-1.amazonaws.com/api/tarea';
const URI2 = 'https://1twk8kaz1m.execute-api.us-east-1.amazonaws.com/api/tareas';

const Task = ({ tareas, setTareas, tarea, index, dark}) => {

    const [icono, setIcono] = useState(<MdEdit size={20} />);
    const [isEditing, setIsEditing] = useState(false);
    const [titulo, setTitulo] = useState(tarea.titulo);
    const [contenido, setContenido] = useState(tarea.contenido);

    const getTareas = async () => {
        const res = await axios.get(URI2);
        setTareas(res.data);
      };

    const deleteTarea = async index => {
        const data = {titulo: index};
        await axios.delete(URI, {data});
        getTareas();
      };
    
    const patchTitulo = async (i, tituloPatched) =>{
        const data = {titulo: i, updateKey: "titulo", updateValue: tituloPatched}
        await axios.patch(URI, data);
        getTareas();
    }

    const patchContenido = async (i, contenidoPatched) =>{
        const data = {titulo: i, updateKey: "contenido", updateValue: contenidoPatched}
        await axios.patch(URI, data);
        getTareas();
    }

    const patchTarea = (index,tituloPatched,contenidoPatched) => {
        console.log(index, tituloPatched, contenidoPatched)
        if (tituloPatched !== tarea.titulo) patchTitulo(index, tituloPatched)
        if (contenidoPatched !== tarea.contenido) patchContenido(index, contenidoPatched)
    }

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
        console.log(titulo)
      };
    
      const handleContenidoChange = (event) => {
        setContenido(event.target.value);
      };
    
      const handleEditButtonClick = () => {
        if (isEditing) {
          // Guardar los cambios
          patchTarea(index, titulo, contenido);
        }
        setIsEditing(!isEditing);
        setIcono(icono.type === MdEdit ? <MdDoneAll size={20} /> : <MdEdit size={20} />);
      };
    return (
        <div className={`${dark ? 'darkMode-task-container' : "lightMode-task-container"} box-task-container`}>
            <div className={`${dark ? 'darkMode-box-task' : "lightMode-box-task"} box-task`}>
                <div className={`${dark ? 'darkMode-task-title' : 'lightMode-task-title'} box-task-title`}>
                    {isEditing ? <input type="text" value={titulo} onChange={handleTituloChange} /> : tarea.titulo}
                </div>
                <div className={`${dark ? 'darkMode-task-description' : "lightMode-task-description"} box-task-description`}>
                    {isEditing ? <input type="text" value={contenido} onChange={handleContenidoChange} /> : tarea.contenido}
                </div>            </div>
            <div className={`${dark ? 'darkMode' : "lightMode"} box-task-action`}>
                <button className={`${dark ? 'darkMode-task-completed' : "lightMode-task-completed"} box-task-completed ${dark ? 'darkMode-task-btn' : "lightMode-task-btn"} box-task-btn`} onClick={() => handleEditButtonClick()}>{icono}</button>
                <button className={`${dark ? 'darkMode-task-remove' : "lightMode-task-remove"} box-task-remove ${dark ? 'darkMode-task-btn' : "lightMode-task-btn"} box-task-btn`} onClick={() => deleteTarea(index)}><MdCancel size={20} /></button>
            </div>
        </div>)
}

export default Task