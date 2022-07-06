import express from 'express';
import cors from 'cors';
import http from 'http';
import * as io from 'socket.io';
import dbConnect from './utils/db.js';


const app = express();
const port = process.env.PORT;
const httpInstance = http.Server(app);

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    try{

        res.send("Working Fine");

    } catch(err){
        console.log(err);
        res.status(500).json({msg: err.message});
    }
});






httpInstance.listen(port, () => {
    console.log('Server running');
})