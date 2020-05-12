import React,{Fragment, useState, useEffect} from   "react"
import Edit from "../components/Edit"
import Editable from "../components/Editable"

import { BsPencil, BsTrash } from "react-icons/bs";

const Subtopic =({tarefa, deleteTasks}) => {
    const [task, setTask]= useState(tarefa);
    const [taskDescription, setTaskDescription] = useState("");


    
      

    const updateTaskDescription = async e => {
        console.log("update")
        e.preventDefault();
        try {
           
            const body = {description: taskDescription};
            const response = await fetch(`http://localhost:5000/tasks/${task.task_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            setTask({ ...task, description: taskDescription});
            

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteTask = async e => {
      e.preventDefault();
      try {
        const deleteTask = await fetch(`http://localhost:5000/tasks/${task.task_id}`,{
            method: "DELETE"
        });
        deleteTasks(task.task_id)
    } catch (err) {
        console.error(err.message);
    }
     console.log("Deleted")
  }


      useEffect(()=>{
    },[]);

    return <Fragment>
            <div className="card-body">
                <div><Editable
                            text={task.description}
                            placeholder="Write a task description"
                            type="input"
                            >
                            <input
                                type="text"
                                name="task"
                                placeholder="Write a task name"
                                value={taskDescription}
                                onChange={e => setTaskDescription(e.target.value)}
                                onBlur={e =>updateTaskDescription(e)}
                            />
                            <button >save</button>
                            </Editable></div>
                <button type="button" className="close" onClick={e => deleteTask(e)}>&times;</button>
            </div>
            
            
     
    </Fragment>
};

export default Subtopic;