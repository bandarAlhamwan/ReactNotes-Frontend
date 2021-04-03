import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import NotesService from "./services/NotesService";


const  NotesList= () => {

    const [notes, setNotes] = useState([]);

    useEffect(() =>{
        NotesService.getAll()
        .then(Response => {
            console.log('printing response', Response.data);
            setNotes(Response.data);
        })
        .catch(Error => {
            console.log('something went wrong')
        })
    },[])

    return ( 
        <div className="main-content">
            <h4>List of Notes</h4>
            <div className="notes-list mt-4">
                {
                    // notes && mean When notes avalible pass it
                    notes.length > 0 ? notes.map(note =>(
                        <div key={note.id} className="notes-preview mt-3">
                            <Link to={`/notes/${note.id}`}>
                                <h5 className="primary-color text-capitalize">{note.title}</h5>
                                <Moment fromNow className="font-italic">{note.updatedAt}</Moment>
                            </Link>
                        </div>
                    )) : <div> No Notes Available</div>
                }
            </div>
        </div>
     );
}

 
export default NotesList;

// sfc: to create stateless functional componenet