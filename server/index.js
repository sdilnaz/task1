import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors";
import planetsRoutes from './routes/planets.js'


const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config();

app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`connected to db and Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/api', planetsRoutes);