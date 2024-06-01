import express from "express";
import axios from "axios";
import mongoose from "mongoose";

const router = express.Router();


const PlanetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    population: { type: String, required: true }
});
const Planet = mongoose.model('Planet', PlanetSchema);


const PeopleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    height: { type: String, required: true },
    mass: { type: String, required: true },
    hair_color: { type: String, required: true },
    skin_color: { type: String, required: true },
    eye_color: { type: String, required: true },
    birth_year: { type: String, required: true },
    gender: { type: String, required: true }
});
const People = mongoose.model('People', PeopleSchema);


const StarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    cost_in_credits: { type: String, required: true },
    length: { type: String, required: true },
    max_atmosphering_speed: { type: String, required: true },
    crew: { type: String, required: true },
    passengers: { type: String, required: true },
    cargo_capacity: { type: String, required: true }
});
const Starship = mongoose.model('Starship', StarshipSchema);



router.get('/', (req, res) => {
    res.send('Hello, Star Wars!');
});

const fetchData = async (url, Model, fields) => {
    try {
        const response = await axios.get(url);
        const data = response.data.results;

        const savedItems = [];
        for (const item of data) {
            const query = {};
            fields.forEach(field => query[field] = item[field]);

            const existingItem = await Model.findOne(query);
            if (!existingItem) {
                const newItem = new Model(item);
                savedItems.push(await newItem.save());
            }
        }

        return savedItems;
    } catch (error) {
        throw new Error('Server error');
    }
};

router.get('/fetch-planets', async (req, res) => {
    try {
        const savedPlanets = await fetchData('https://swapi.dev/api/planets/', Planet, ['name']);
        res.json(savedPlanets);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/fetch-people', async (req, res) => {
    try {
        const savedPeople = await fetchData('https://swapi.dev/api/people/', People, ['name']);
        res.json(savedPeople);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/fetch-starships', async (req, res) => {
    try {
        const savedStarships = await fetchData('https://swapi.dev/api/starships/', Starship, ['name']);
        res.json(savedStarships);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


const getItems = async (Model, name, res) => {
    try {
        let items;
        if (name) {
            items = await Model.find({ name: { $regex: new RegExp(name, "i") } });
        } else {
            items = await Model.find();
        }
        res.json(items);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

router.get('/planets', async (req, res) => {
    const { name } = req.query;
    await getItems(Planet, name, res);
});

router.get('/people', async (req, res) => {
    const { name } = req.query;
    await getItems(People, name, res);
});

router.get('/starships', async (req, res) => {
    const { name } = req.query;
    await getItems(Starship, name, res);
});


const searchItems = async (Model, keyword, res) => {
    try {
        if (!keyword) {
            return res.status(400).send('Keyword parameter is required');
        }

        const items = await Model.find({
            $or: [
                { name: { $regex: new RegExp(keyword, "i") } },
                { climate: { $regex: new RegExp(keyword, "i") } },
                { terrain: { $regex: new RegExp(keyword, "i") } },
                { population: { $regex: new RegExp(keyword, "i") } },
                { height: { $regex: new RegExp(keyword, "i") } },
                { mass: { $regex: new RegExp(keyword, "i") } },
                { hair_color: { $regex: new RegExp(keyword, "i") } },
                { skin_color: { $regex: new RegExp(keyword, "i") } },
                { eye_color: { $regex: new RegExp(keyword, "i") } },
                { birth_year: { $regex: new RegExp(keyword, "i") } },
                { gender: { $regex: new RegExp(keyword, "i") } },
                { model: { $regex: new RegExp(keyword, "i") } },
                { manufacturer: { $regex: new RegExp(keyword, "i") } },
                { cost_in_credits: { $regex: new RegExp(keyword, "i") } },
                { length: { $regex: new RegExp(keyword, "i") } },
                { max_atmosphering_speed: { $regex: new RegExp(keyword, "i") } },
                { crew: { $regex: new RegExp(keyword, "i") } },
                { passengers: { $regex: new RegExp(keyword, "i") } },
                { cargo_capacity: { $regex: new RegExp(keyword, "i") } }
            ]
        });
        res.json(items);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

router.get('/planets/search', async (req, res) => {
    const { keyword } = req.query;
    await searchItems(Planet, keyword, res);
});

router.get('/people/search', async (req, res) => {
    const { keyword } = req.query;
    await searchItems(People, keyword, res);
});

router.get('/starships/search', async (req, res) => {
    const { keyword } = req.query;
    await searchItems(Starship, keyword, res);
});


const deleteItem = async (Model, name, res) => {
    try {
        const deletedItem = await Model.findOneAndDelete({ name });
        if (!deletedItem) {
            return res.status(404).send('Item not found');
        }
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

router.delete('/planets/:name', async (req, res) => {
    const { name } = req.params;
    await deleteItem(Planet, name, res);
});

router.delete('/people/:name', async (req, res) => {
    const { name } = req.params;
    await deleteItem(People, name, res);
});

router.delete('/starships/:name', async (req, res) => {
    const { name } = req.params;
    await deleteItem(Starship, name, res);
});


export default router;
