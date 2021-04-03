import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import NotesService from "./services/NotesService";

const AddNote = () => {

    const[title , setTilte] = useState('');
    const[body  , setBody] = useState('');
    const[category , setCategory] = useState('programming');
    const history = useHistory();
    const {id} = useParams();
    const [errors, setErrors] = useState(false);

    const saveNote = (e) =>{
        e.preventDefault();
        if(!title || !body){
            setErrors(true);
            return;
        }
        
        const note = {title,body,category,id};

        if(id){
            NotesService.update(note)
                .then(response =>{
                    console.log("Note updated successfully",response.data);
                    history.push("/");
                })
                 .catch(error =>{
                     console.log("Something went wrong", error)
                 })
        }  else{
            NotesService.create(note)
            .then(response =>{
                console.log("Note added Successfully", response.data);
                history.push('/');
            })
            .catch(error =>{
                console.log('something went Wroing' , error);
            })  
        }
    }

    // wasn't here but we add it to update note else if in saveNote()
    useEffect( () =>{
        if(id){
            NotesService.getById(id)
                .then(note =>{
                    setTilte(note.data.title);
                    setBody(note.data.body);
                    setCategory(note.data.category);
                })
                 .catch(error =>{
                     console.log("Something went wrong", error);
                 })
        }
    },[])
    // End 
    return ( 
        <div className="create">
            <div className="text-center">
            <h5>{id ? "Update a Note" : "Add a New Note"}</h5>
            {errors && <span style={{color: 'red' , fontStyle: 'italic'}}>Please enter mandatory fields</span>}
            <br/><br/>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Note Title: <sup>*</sup></label>
                    <input type="text" className="form-control" id="title" 
                     value={title} onChange={(e) => setTilte(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="body">Note Description: <sup>*</sup></label>
                    <textarea className="form-control" id="body"
                     value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Note Category:</label>
                    <select className="form-control" id="category" 
                     value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="programming">Programming</option>
                        <option value="vacation">Vacation</option>
                        <option value="meeting">Meeting</option>
                        <option value="blogging">Blogging</option>
                    </select>
                </div>
                
                <div className="text-center">
                    <button onClick={(e) => saveNote(e)}>{id ? "Update Note" : "Add Note"}</button>
                </div>
            </form>
        </div>
     );
}
 
export default AddNote;
