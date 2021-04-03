import httpClient from "../http-common";

const getAll = () =>{
    return httpClient.get("/notes");
}

const create = data => {
    return httpClient.post("/notes" , JSON.stringify(data))
}

const getById = id =>{
    return httpClient.get(`notes/${id}`)
}

const remove = id =>{
    return httpClient.delete(`/notes/${id}`)
}

const update = data =>{
    return httpClient.put('/notes', data);
}

export default { getAll , create, getById, remove, update };