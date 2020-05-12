import React,{Fragment, useState, useEffect} from   "react"

import Theme from "./Theme";
import About from "./About"
import Edit from "../components/Edit"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

const Boards = () =>  {
    const [themes, setThemes]= useState([]);
    const [newTheme, setNewTheme] = useState("");
    
    const getThemes = async () =>{
      try {
          const response = await fetch("http://localhost:5000/themes")
          const jsonData = await response.json();
          setThemes(jsonData)
          console.log(jsonData);
      } catch (err) {
          console.log(err.message)
      }
    }

    const createTheme = async e => {
      e.preventDefault();
      try {
          const body = {theme_name: newTheme};
          const response = await fetch("http://localhost:5000/themes",{
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body)
          });
          const jsonData = await response.json()
          
          const newThemes = [...themes, jsonData];
          setThemes(newThemes);
      } catch (err) {
          console.error(err.message)
      }
      console.log("create theme")
  }
  
    useEffect(()=>{
      getThemes();
  },[]);
  
  function handleClick(e) {
    e.preventDefault();
    console.log('O link foi clicado.');
  }
  
    return <Fragment>
      <div  className="container mt-5">
        <div className="">
        <h2>Quadros Pessoais</h2>
        </div>
        {themes.map(theme =>(
          <div key={theme.theme_id}>
            
            <div className="card" onClick={e=>(console.log("O link oi clicado", theme.theme_id))}  >
              
            <Link  className="btn btn-primary stretched-link" to={`/boards/${theme.theme_id}`} >
              <div className="card-body"> {theme.theme_name}</div>
              </Link> 
              
              </div>
          
          <br/>
          </div>
        ))}

          <div className="card" >
    
              
          <Link  className="btn btn-primary stretched-link"  >
            Criar
            <Edit 
                    icone={<div />}
                    idmodal="criartema" headerText={"Criar novo tema"} 
                    actionButton={(e)=>createTheme(e)} actionText={"Criar tema"} 
                    buttonAction={() => setNewTheme("")}
                    
                    >   
                    <input className="form-control input-lg" type='text' value={newTheme} onChange={e => setNewTheme(e.target.value)} />
                </Edit>
          </Link> 
                
        </div>


      </div>
  
  

        
    </Fragment>;
    
  }
  
 

export default Boards;