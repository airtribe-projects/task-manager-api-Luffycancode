// const app = require('./app');

const express=require('express')
const app=express()
const tasks = require('./task.json').tasks;
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.get('/',(req,res)=>
{
res.send("Yes running on 3000")
})

app.get('/tasks',(req,res)=>
{
    res.json(tasks)
})


app.get('/tasks/:id',(req,res)=>
{

const gettaskbyid = Number(req.params.id)
const taskdata = tasks.find((i)=>{ return i.id === gettaskbyid })

if(!taskdata)
{
return res.status(404).send('Invalid request')
}
res.json(taskdata)


})



//post request

// app.post('/tasks', (req, res) => {

//     const { title, description, completed } = req.body;

//     // validation
//     if (!title || !description || typeof completed !== 'boolean') {
//         return res.status(400).json({ message: "Invalid input" });
//     }

//     const newTask = {
//         id: tasks.length + 1,
//         title,
//         description,
//         completed
//     };

//     tasks.push(newTask);

//     res.status(201).json(newTask);
// });




app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {

    const { title, description, completed } = req.body;

    if (!title || !description || typeof completed !== 'boolean') {
        return res.status(400).json({ message: "Invalid input" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});




app.put('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);


    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, completed } = req.body;

    // 🧠 Updates only if values are provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});





app.delete('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    // find index of task
    const index = tasks.findIndex(t => t.id === id);

    // ❌ not found
    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    // remove task
    const deletedTask = tasks.splice(index, 1);

    res.json({
        message: "Task deleted",
        data: deletedTask[0]
    });
});