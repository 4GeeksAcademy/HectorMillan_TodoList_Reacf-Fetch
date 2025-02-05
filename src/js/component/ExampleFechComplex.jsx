import React, { useEffect, useState } from "react";

export const ExampleFechComplex = () => {

    const [characters, setCharacters] = useState([]);
    const base_url = "https://swapi.tech/api";

    // 0. Funcion asincrona
    const getCharacters = async () => {
 // 1. uri
    const uri = `${base_url}/people`

    const options = {
        method: 'GET'
    }

    const response = await fetch(uri, options)

        if(!response.ok){
            // trato el error
            console.log('Error: response.status, response.statusText');
            return
        }

// recupero los datos 

        const data = await response.json();

// ejecuto mi logica.

    setCharacters(data.results);

    console.log(setCharacters);


    }


   

   useEffect(() => {
    getCharacters();
   
       },[])
   
   
   
       return(
        <div className="container">
        <h1 className="text-center text-succes" >Example Fetch</h1>
        <ul className="list-group">    
            {characters.map((iterator) => 
            <li className="list-group-item">iterator</li>    
        )}           
           </ul>
        </div>
       )


   }
