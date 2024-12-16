const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

let todos = [];
let currentId = 1;

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})

app.get('/todos',function getAllTodo(req,res){
    res.json(todos);
});

app.post('/todos',function createTodo(req,res){
    const {task }= req.body

    if(!task){
        return res.status(400).json({
            error:"Task is required"
        })
    }
    else{
        const newTodo = {
            id:currentId++,
            task
        }
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }
});

app.delete('/todos/:id',function deleteTodobyId(req,res){
    const {id} = req.params;
    const todoIndex = todos.findIndex(todo=>todo.id == id);

    if(todoIndex!==-1){
        todos.splice(todoIndex,1);
        res.status(204).send()
    }
    else{
    res.status(404).send({
        message:"Todo is Not Found"
    })
}
})

app.listen(PORT,()=>{
    console.log(`server is  running on port ${PORT}`)
})