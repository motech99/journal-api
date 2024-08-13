import { Router } from 'express';
import { Category } from '../db.js';
import { Entry } from '../db.js';

const router = Router();

router.get('/categories/:cat_id/entries', async (req, res) => {
  try {
    // Find the category by ID
    const category = await Category.findById(req.params.cat_id);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }

    // Find all entries belonging to the category and populate their category information
    const entries = await Entry.find({ category: req.params.cat_id });
    if (entries.length === 0) {
      return res
        .status(404)
        .send({ error: 'No entries found in this category' });
    }

    // Send all entries
    res.send(entries);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get list of categories
router.get('/categories', async (req, res) => res.send(await Category.find()));

// Get One Category
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ error: 'Category not found' });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).send(newCategory);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Update an category
router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ error: 'Category not found' });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Delete an category
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.sendStatus(200);
    } else {
      res.status(404).send({ error: 'Entry not found' });
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

export default router;
