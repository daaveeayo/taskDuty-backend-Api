require('dotenv/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 8989;
const connect = require('./config/db');
const morgan = require('morgan')
const TASKS = require('./model/taskModel')
const cors = require('cors')

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// API's
// Poat request, C -- for creating CRUD

app.post('/api/task', async (req, res) => {
    const {title, description, tags} = req.body
    if (!title || !description || !tags){
        res.status(400).json({sucess:true, message :""})
    }

    try {
        await TASKS.create(req.body)
        res.status(201).json({ success: true, message: 'task created successfully' })
    } catch (error) {
        res.status(500).json({ message: error })
    }

})


// Get request, R -- for reading CRUD

app.get('/api/task', async (req, res) => {
    try {
        const tasks = await TASKS.find({});

        if (tasks.lenght < 1) {
            return res.status(404).json({ success: false, message: 'No tasks found' })
        }

        res.status(200).json({ success: 'true', message: "all task(s)", tasks })
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update request, U -- for updating in CRUD
app.patch('api/task/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
        await TASKS.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true
        });
        res
            .status(200)
            .json({ success: "true", message: "task updated successfully" });

    } catch (error) {
        res.status(500).json(error);
    }

})


// Delete request, D -- for delete in Crud operations 

app.delete('api/task/:taskId',async(req,res)=>{
    const {taskId}= req.params
    try {
        await TASKS.findOneAndDelete({_id:taskId})
        res.status(200).json({success: "true", message: "task successfully deleted"})
    } catch (error) {
        res.status(500).json(error)
    }

})

// Params for single task 

app.get('app/task/:taskId', async(req,res)=>{
    const { taskID } = re.params
   
})






//server and DB
connect()
    .then(() => {
        try {
            app.listen(port, () => console.log(`server is connected to http://localhost:${port}`));

        } catch (error) {
            console.log('cannot connect to the server');

        }

    })
    .catch((error) => {
        console.log('Invalid database connection..!', error);
    })


//routes


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

app.use((req, res) => {
    res.send('404 not found')
})
