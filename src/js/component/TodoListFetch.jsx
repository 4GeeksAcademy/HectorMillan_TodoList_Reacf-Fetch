import React, {useEffect, useState} from "react";

export const TodoListFetch = () => {

    const host = "https://playground.4geeks.com/todo";
    const user = "hectormillan";
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

   // Funcion async para recoger los datos dada una URI.
   // Async function to collect data given a URI.

    const getTodos = async () => {
              
        const uri = `${host}/users/${user}`;
        
        const options = {
            method: 'GET'
        }
    
        const response = await fetch(uri,options);

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        setTodos(data.todos);

    }

    // Funcion async para añadir una tarea al usuario especificado.
    // async function to add a task to the specified user.

    const addTodos = async () => {
           
        const uri = `${host}/todos/${user}`;
        const dataToSend = {
            label: newTask,
            is_done: false
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dataToSend)
          
        }

        const response = await fetch(uri, options)
        if(!response.ok)
            {
                return;
            }
            const data = await response.json()
            getTodos();


    }

// Funcion async para editar una tarea segun una id pasada como parametro (taskID).
// Async function to edit a task according to an id passed as a parameter (taskID).

    const editTodos = async (taskId) => {
          
        /*
        event.preventDefault();
              */
        const uri = `${host}/todos/` + taskId;
              const dataToSend = {
            label: newTask,
            is_done: isDone
        }

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(uri, options);
        if (!response.ok) {
            return;
        }
        const data = await response.json()

     
        setIsEditing(false);
        setEditTask('');

    }

    // Funcion para elimiar una tarea segun una Id dada.
    // Function to delete a task based on a given Id.

    const delTodos = async (taskId) => {

      
        const uri = `${host}/todos/${taskId}`;
      

        const options = {
            method: 'DELETE'
        }
        
        const response = await fetch(uri,options)
        if(!response.ok)
            {
              
                return;
            }
           
         getTodos();

    
    }


    const handleSubmitAdd = (event) => {
       
        addTodos();
        setNewTask("");


    }

    

    const handleSubmitEdit = (event,id) => {
      
       // event.preventDefault();

      
        editTodos(event,id);
        getTodos();
     
       
          
    }

    const handleSaveId = (event)  => {
        setIsEditing(true);
        setEditTask(event)
       
       
    }


    const handleSubmitDelete = (id) => {
       
        delTodos(id);
              
    }

    useEffect(() => {
        getTodos();
    }, []);

    

    return (

        <div className="container">
            <h1>
                Todo List witch Fetch
            </h1>

            <form  className={isEditing ? "d-none" : ""} onSubmit={handleSubmitAdd}>
               
               Add Task
               <input type="text" onChange={event => setNewTask(event.target.value)} value={newTask}></input>
           
            
                 <ul className="list-group">
                    {todos.map((iterator) =>
                        <li key={iterator.id} className="list-group-item">{iterator.label} {iterator.id}
                           <i className="" onClick={() => handleSubmitDelete(iterator.id)}> ❌
											
							</i> 
                            <i className="" onClick={() => handleSaveId(iterator.id)}> 
                            ✏️
                             </i> 

                        </li>
                      
                    )
                    }

                </ul>
                </form>
                     

            <form className={isEditing ? "" : "d-none"} onSubmit={(event) => (editTodos(editTask))}>
               <div className="mb-3">
                    <label for="inputTask" className="form-label"> Edit Task</label>
                    <input type="text" className="form-control" id="inputTask"onChange={event => setNewTask(event.target.value)} value={newTask} ></input>
                    
                </div>
                

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checklbox1" onChange={event=> setIsDone(e.target.checked)} checked={isDone}></input>
                    <label for="checklbox1" className="form-check-label">Check me</label>
              
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
               
            </form>
 

        </div>

    )
}