import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dbConnect from './utils/db.js';
import Students from './models/students.js';
import Tracking from './models/tracking.js';

const app = express();
const port = process.env.PORT;
const httpInstance = createServer(app);
const io = new Server(httpInstance, {
    cors: {
        origin: "*"
    }
});

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    try {

        


        

        if (!dataChanged) {
            const data = await Tracking.find();
            res.json(data);
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }
});

const incomingStream = Tracking.watch();

io.on('connection', (socket) => {
    console.log("A user connected")

    incomingStream.on('change', async () => {

        await Tracking.find({}, (err, data) => {
            if (err) throw err;

            console.log(data);
            dataChanged && socket.emit('tracking', data);

        })
    });

    socket.on('disconnect', () => {
        incomingStream.close();

    })

})



app.post('/', async (req, res) => {
    try {

        const data = await Tracking.create(req.body);

        res.status(200).json(data);

    } catch (err) {
        console.log(err);

    }
})


httpInstance.listen(port, () => {
    console.log('Server running');
});