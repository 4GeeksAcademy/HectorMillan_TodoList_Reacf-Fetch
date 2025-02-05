import React, { useEffect, useState } from "react";

export const ExampleFetch = () => {

    const [users, setUsers] = useState([]);
    const host = 'https://jsonplaceholder.typicode.com';

    const getUsers = async () => {

        // defino la URI
        const uri = `${host}/users`;

        // defino el metodo
        const options = {
            method: 'GET'

        }

        // ejecuto el Tetch con los dos parametros y lo asigno a una constante.

        // cuidado que esta instruccion demora. 
        const response = await fetch(uri,options);
 // 4.- Verificar si el response responde ok
        if (response.ok)  {
            console.log('OK', response.status);
        } else {
            console.log('error', response.status, response.statusText);
        }
// 5.- Extraigo los datos json del response.
       const data = await response.json();
       console.log(data);

       // 6. Realizo la logica de la funcion.
       setUsers(data);


        console.log(response);

    }

    useEffect(() => {
        getUsers();

    },[])



    return(
     <div className="container">
     <h1 className="text-center text-succes" >Example Fetch</h1>
     <ul className="list-group">
            {users.map((iterator, index) =>
                <li key={index} className="list-group-item">{iterator.name}</li>
            )}
        </ul>
     </div>
    )
}