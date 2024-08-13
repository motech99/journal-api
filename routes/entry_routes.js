import { Router } from 'express';
import { Entry } from '../db.js';

const router = Router();

// Get list of entries
router.get('/entries', async (req, res) =>
  res.send(await Entry.find())
);

// Get one entry
router.get('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id).populate('category');
    if (entry) {
      res.send(entry);
    } else {
      res.status(404).send({ error: 'Entry not found' });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Create a new entry
router.post('/entries', async (req, res) => {
  try {
    // Get the body of the request
    // console.log(req.body)
    // TODO: Validate the data
    // Create a new entry object
    // Push the entry to the array
    // entries.push(req.body)
    const newEntry = await Entry.create(req.body);
    // Respond to the client with the new entry and 201 code
    res.status(201).send(newEntry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Update an entry
router.put('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    }).populate('category');
    if (entry) {
      res.send(entry);
    } else {
      res.status(404).send({ error: 'Entry not found' });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Delete an entry
router.delete('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (entry) {
      res.sendStatus(200);
    } else {
      res.status(404).send({ error: 'Entry not found' });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
