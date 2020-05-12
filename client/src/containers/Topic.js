import React,{Fragment, useState, useEffect} from   "react"
import Subtopic from "./Subtopic";
import Edit from "../components/Edit"
import { BsPencil, BsTrash } from "react-icons/bs";

const Topic =({topico, deleteTopics}) => {
    const [topic, setTopic]= useState(topico);
    const [subtopics, setSubtopics]= useState([]);
    const [newSubtopic, setNewSubtopic] = useState("");
    const [topic_name, setTopicName]=useState("");

    const getSubtopics = async () =>{
        try {
            const response = await fetch(`http://localhost:5000/topics/${topic.topic_id}/subtopics`)
            const jsonData = await response.json();
            setSubtopics(jsonData)
            console.log(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const updateTopicName = async e => {
        console.log("update")
        e.preventDefault();
        try {
           
            const body = {topic_name};
            const response = await fetch(`http://localhost:5000/topics/${topic.topic_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            setTopic({ ...topic, topic_name});
            console.log(topic)
            

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteTopic = async e => {
      e.preventDefault();
      try {
        const deleteTopic = await fetch(`http://localhost:5000/topics/${topic.topic_id}`,{
            method: "DELETE"
        });
        deleteTopics(topic.topic_id)
    } catch (err) {
        console.error(err.message);
    }
     console.log("Deleted")
  }

  const createSubtopic = async e => {
    e.preventDefault();
    try {
        const body = {subtopic_name: newSubtopic, theme_id: topic.theme_id, topic_id: topic.topic_id};
        const response = await fetch("http://localhost:5000/subtopics",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        const jsonData = await response.json()
        
        const newSubtopics = [...subtopics, jsonData];
        console.log("create subtopics", newSubtopics)
        setSubtopics(newSubtopics);
    } catch (err) {
        console.error(err.message)
    }
    console.log("create theme")
}

const deleteSubtopics = (subtopic_id) => {
    const newSubtopics = subtopics.filter(subtopic => subtopic.subtopic_id !== subtopic_id);
    console.log("delete", newSubtopics);
    setSubtopics(newSubtopics)

}



    



      useEffect(()=>{
        getSubtopics();
    },[]);

    return <Fragment>
        <div className="card">
            <div className="card-header row"
                onMouseOver={()=>{document.getElementById(`cardtopic${topic.topic_id}`).style.display = 'block'}}
                onMouseOut={()=>{document.getElementById(`cardtopic${topic.topic_id}`).style.display = 'none'}}
            >
                <div className="col">
                {topic.topic_name}
                </div>
                
                <div className="float-right" id={`cardtopic${topic.topic_id}`} style={{display: "none"}}>
                    
                <Edit 
                    icone={<BsPencil/>}
                    idmodal={`topic${topic.topic_id}`} headerText={"Editar Topico"} 
                    actionButton={(e)=>updateTopicName(e)} actionText={"Editar"} 
                    buttonAction={() => setTopicName(topic.topic_name)}
                    
                    >   
                    <input className="form-control input-lg" type='text' value={topic_name} onChange={e => setTopicName(e.target.value)} />
                </Edit>
                <Edit 
                    icone={<BsTrash/>}
                    idmodal={`themedelete${topic.topic_id}`} headerText={"Deletar Topico"} 
                    actionButton={(e)=>deleteTopic(e)} actionText={"Deletar"} 
                    
                    >   
                    <div>
                    Are you sure you want to Delete {topic.topic_name}?
                    </div>
                </Edit>

                </div>
                
            
            </div>
            <div className="card-body">
                {subtopics.map(subtopic => (
                    <div key={subtopic.subtopic_id}>
                        <Subtopic  subtopico={subtopic} deleteSubtopics={deleteSubtopics}/>
                    <br/>
                    </div>
                ))

                }
                
            </div>
            <div class="card-footer">
            <Edit 
                    icone={<div>Adicionar subtópico</div>}
                    idmodal={`criarsubtopicoin${topic.topic_id}`} headerText={"Criar novo subtópico"} 
                    actionButton={(e)=>createSubtopic(e)} actionText={"Criar subtópico"} 
                    buttonAction={() => setNewSubtopic("")}
                    
                    >   
                    <input className="form-control input-lg" type='text' value={newSubtopic} onChange={e => setNewSubtopic(e.target.value)} />
                </Edit>
            </div>
        </div>
    </Fragment>
};

export default Topic;