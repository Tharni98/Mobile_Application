import express, { json } from 'express';
import { Profile } from '../models/profile.js';

const profileRouter = express.Router();

profileRouter.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find();
        console.log(profiles);
        res.status(201).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

profileRouter.post('/', async (req, res) => {
    const profile = new Profile(req.body);

    try {
        const newProfile = await Profile.create(profile);
        return res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


profileRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const profile = req.body;

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, profile, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(201).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default profileRouter;