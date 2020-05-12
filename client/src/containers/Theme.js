import React,{Fragment, useState, useEffect} from   "react"
import Topic from "./Topic"
import { BsPencil, BsTrash } from "react-icons/bs";
import Editable from "../components/Editable"
import Edit from "../components/Edit"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

const Theme =() => {
    let { id } = useParams();
    const [topics, setTopics]= useState([]);
    const [theme, setTheme]= useState({});
    const [theme_name, setThemeName]=useState("");
    const [newTopic, setNewTopic]=useState("")

  const getTheme = async () =>{
    try {
        const response = await fetch(`http://localhost:5000/themes/${id}`)
        const jsonData = await response.json();
        console.log("json data",jsonData.theme_name)
        setTheme(jsonData)
        setThemeName(jsonData.theme_name)
       
    } catch (err) {
        console.log(err.message)
    }
  }


    const getThemeTopics = async () =>{
        try {
            const response = await fetch(`http://localhost:5000/themes/${id}/topics`)
            const jsonData = await response.json();
            setTopics(jsonData)
            console.log(jsonData);
        } catch (err) {
            console.log(err.message)
        }
      }
      

      //edit theme name function
      const updateThemeName = async e => {
          console.log("update")
          e.preventDefault();
          console.log(theme)
          try {
             
              const body = {theme_name};
              const response = await fetch(`http://localhost:5000/themes/${theme.theme_id}`,{
                  method: "PUT",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(body)
              })
              setTheme({ ...theme, theme_name});
              console.log(theme)
              
  
          } catch (err) {
              console.error(err.message);
          }
      }

      const deleteTheme = async e => {
        e.preventDefault();
        try {
          const deleteTheme = await fetch(`http://localhost:5000/themes/${theme.theme_id}`,{
              method: "DELETE"
          });
          console.log(deleteTheme)
      } catch (err) {
          console.error(err.message);
      }
       console.log("Deleted")
       window.location = "/";
    }
    const deleteTopics = (topic_id) => {
        const newTopics = topics.filter(topic => topic.topic_id !== topic_id);
        console.log("delete", newTopics);
        setTopics(newTopics)

    }

    const createTopic = async e => {
        e.preventDefault();
        try {
            const body = {topic_name: newTopic, theme_id: theme.theme_id};
            const response = await fetch("http://localhost:5000/topics",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json()
            
            const newTopics = [...topics, jsonData];
            console.log("create topic", newTopics);
            setTopics(newTopics);
        } catch (err) {
            console.error(err.message)
        }
        console.log("create theme")
    }



      useEffect(()=>{
        getThemeTopics();
        getTheme();
    },[]);
    
    const disableInput = (e) => {
        document.getElementById('yourText').disabled = e.target.checked;
        console.log(e.target.checked);
    }
    
    return <Fragment>

        <div className="container">
        <div 
            className="row"
             onMouseOver={()=>{document.getElementById('div1').style.display = 'block'}}
             onMouseOut={()=>{document.getElementById('div1').style.display = 'none'}}
        >
            <div className="display-3 col-sm">{theme.theme_name} </div>
            <div  className="al" id="div1"  style={{display: "none"}}>
                <Edit 
                    icone={<BsPencil/>}
                    idmodal={`theme${theme.theme_id}`} headerText={"Editar Tema"} 
                    actionButton={(e)=>updateThemeName(e)} actionText={"Editar"} 
                    buttonAction={() => setThemeName(theme.theme_name)}
                    
                    >   
                    <input className="form-control input-lg" type='text' value={theme_name} onChange={e => setThemeName(e.target.value)} />
                </Edit>
                <Edit 
                    icone={<BsTrash/>}
                    idmodal={`themedelete${theme.theme_id}`} headerText={"Deletar Tema"} 
                    actionButton={(e)=>deleteTheme(e)} actionText={"Deletar"} 
                    
                    >   
                    <div>
                    Are you sure you want to Delete {theme.theme_name}?
                    </div>
                </Edit>
            </div>
               

        </div>
        </div>
        <br/>
      <div className="container-fluid">
    <div className="row flex-row flex-nowrap">
        {console.log(topics)}
        {topics.map(topic=>(
            <div className="col-3" style={{ "max-width":"300px"}} key={topic.topic_id}>
                <Topic topico={topic} deleteTopics={deleteTopics} >
                    
                </Topic>
            </div>
            
        ))
        }
        <div className="col-3" style={{ "max-width":"300px"}}>
            <div className="card">
            <Edit 
                    icone={<div>Coisa</div>}
                    idmodal="criartopico" headerText={"Criar novo tópico"} 
                    actionButton={(e)=>createTopic(e)} actionText={"Criar tópico"} 
                    buttonAction={() => setNewTopic("")}
                    
                    >   
                    <input className="form-control input-lg" type='text' value={newTopic} onChange={e => setNewTopic(e.target.value)} />
                </Edit>
            </div>
        </div>


    </div>
</div>
    </Fragment>
};

export default Theme;





 
  
