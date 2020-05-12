import React,{Fragment, useState, useEffect} from   "react"
import Edit from "../components/Edit"
import Editable from "../components/Editable"
import Task from "./Task"
import { BsPencil, BsTrash } from "react-icons/bs";

const Subtopic =({subtopico, deleteSubtopics}) => {
    const [tasks, setTasks]= useState([]);
    const [subtopic, setSubtopic]= useState(subtopico);
    const [newTask, setNewTask] = useState("");
    const [subtopic_name, setSubtopicName]=useState(subtopico.subtopic_name);
    const [subtopic_description, setSubtopicDescription]=useState("");


    
    const getTasks = async () =>{
        try {
            const response = await fetch(`http://localhost:5000/subtopics/${subtopic.subtopic_id}/tasks`)
            const jsonData = await response.json();
            setTasks(jsonData)
            console.log(jsonData);
        } catch (err) {
            console.log(err.message)
        }
      }

      const createTask = async e => {
        e.preventDefault();
        try {
            const body = {description: newTask, theme_id: subtopic.theme_id, topic_id: subtopic.topic_id, subtopic_id: subtopic.subtopic_id};
            const response = await fetch("http://localhost:5000/tasks",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json()
            
            const newTasks = [...tasks, jsonData];
            console.log("create subtopics", newTasks)
            setTasks(newTasks);
            setNewTask("")
        } catch (err) {
            console.error(err.message)
        }
        console.log("create theme")
    }
    const deleteTasks = (task_id) => {
        const newTasks = tasks.filter(task => task.task_id !== task_id);
        console.log("delete", newTasks);
        setTasks(newTasks)
    
    }
    


      const updateSubtopicName = async e => {
        console.log("update")
        e.preventDefault();
        try {
           
            const body = {subtopic_name, description: subtopic.description};
            const response = await fetch(`http://localhost:5000/subtopics/${subtopic.subtopic_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            setSubtopic({ ...subtopic, subtopic_name});
            console.log(subtopic)
            

        } catch (err) {
            console.error(err.message);
        }
    }

    const updateSubtopicDescription = async e => {
        console.log("update")
        e.preventDefault();
        try {
           
            const body = {subtopic_name: subtopic.subtopic_name, description: subtopic_description};
            const response = await fetch(`http://localhost:5000/subtopics/${subtopic.subtopic_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            setSubtopic({ ...subtopic, description: subtopic_description});
            console.log(subtopic)
            

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteSubtopic = async e => {
      e.preventDefault();
      try {
        const deleteSubtopic = await fetch(`http://localhost:5000/subtopics/${subtopic.subtopic_id}`,{
            method: "DELETE"
        });
        deleteSubtopics(subtopic.subtopic_id)
    } catch (err) {
        console.error(err.message);
    }
     console.log("Deleted")
  }


      useEffect(()=>{
        getTasks();
    },[]);

    return <Fragment>
        <div className="card">
            <div className="card-body" data-toggle="modal" data-target={`#myModalSubtopic${subtopic.subtopic_id}`}> 
            
            {subtopic.subtopic_name}
            
            </div>
          

                <div className="modal" id={`myModalSubtopic${subtopic.subtopic_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header"
                        onMouseOver={()=>{document.getElementById(`deleteButtonSt${subtopic.subtopic_id}`).style.display = 'block'}}
                        onMouseOut={()=>{document.getElementById(`deleteButtonSt${subtopic.subtopic_id}`).style.display = 'none'}}
                    >
                        <div>
                    <Editable
                    text={subtopic_name}
                    placeholder="Write a task name"
                    type="input"
                    >
                    <input
                        type="text"
                        name="task"
                        placeholder="Write a task name"
                        value={subtopic_name}
                        onChange={e => setSubtopicName(e.target.value)}
                        onBlur={e =>updateSubtopicName(e)}
                    />
                    </Editable>
                    <div>
                        Descrição:
                        <Editable
                    text={subtopic_description}
                    placeholder="Write a task name"
                    type="input"
                    >
                    <input
                        type="text"
                        name="task"
                        placeholder="Write a task name"
                        value={subtopic_description}
                        onChange={e => setSubtopicDescription(e.target.value)}
                        onBlur={e =>updateSubtopicDescription(e)}
                    />
                    </Editable>
                    </div>
                    </div>
                      

                        <div class="dropdown"  className="float-right"  id={`deleteButtonSt${subtopic.subtopic_id}`}  style={{display: "none"}}>
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            <BsTrash/>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" data-dismiss="modal" onClick={e => deleteSubtopic(e)}>Deletar Subtópico</a>
                            </div>
                            </div>



                        <button type="button" className="close" data-dismiss="modal">&times;</button>

                       
                    </div>

                    <div className="modal-body">
                        {tasks.map(task =>(
                            <div className="card" key={task.task_id}>
                                <Task tarefa={task} deleteTasks={deleteTasks}/>
                            </div>
                        ))}

                        <div className="card" >
                            <Editable
                            text={""}
                            placeholder="Write a task description"
                            type="input"
                            >
                            <input
                                type="text"
                                name="task"
                                placeholder="Write a task name"
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                onBlur={e =>createTask(e)}
                            />
                            <button >save</button>
                            </Editable>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
                </div>

        </div>
    </Fragment>
};

export default Subtopic;