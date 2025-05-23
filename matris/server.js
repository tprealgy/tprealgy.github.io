const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve data.json from root folder
app.get('/data.json', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8');
    res.type('json').send(data);
  } catch (err) {
    res.status(500).send({ error: 'Failed to read data.json' });
  }
});

// Serve assignments.json from root folder
app.get('/assignments.json', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'assignments.json'), 'utf-8');
    res.type('json').send(data);
  } catch (err) {
    // If file doesn't exist, send empty array
    if (err.code === 'ENOENT') {
      res.json([]);
    } else {
      res.status(500).send({ error: 'Failed to read assignments.json' });
    }
  }
});

// Save assignments (overwrite assignments.json)
app.post('/save-assignments', async (req, res) => {
  try {
    await fs.writeFile(
      path.join(__dirname, 'assignments.json'),
      JSON.stringify(req.body, null, 2),
      'utf-8'
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save assignments' });
  }
});

// Add new assignment
app.post('/save-assignment', async (req, res) => {
  try {
    const { name, connectedValues } = req.body;
    if (!name || !Array.isArray(connectedValues)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Read current assignments
    let assignments = [];
    try {
      const assignmentsRaw = await fs.readFile(path.join(__dirname, 'assignments.json'), 'utf-8');
      assignments = JSON.parse(assignmentsRaw);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
      // else no assignments file yet
    }

    // Prevent duplicates by name
    if (assignments.some(a => a.name === name)) {
      return res.status(400).json({ error: 'Assignment name already exists' });
    }

    // Create new assignment object with colors defaulted to grey per column
    const newAssignment = {
      name,
      connectedValues,
      locked: false,
      cellColors: {} // will be set on frontend later
    };

    assignments.push(newAssignment);

    await fs.writeFile(
      path.join(__dirname, 'assignments.json'),
      JSON.stringify(assignments, null, 2),
      'utf-8'
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save assignment' });
  }
});

// Delete assignment by index
app.post('/delete-assignment', async (req, res) => {
  try {
    const { index } = req.body;
    if (typeof index !== 'number') {
      return res.status(400).json({ error: 'Invalid index' });
    }

    let assignments = [];
    try {
      const assignmentsRaw = await fs.readFile(path.join(__dirname, 'assignments.json'), 'utf-8');
      assignments = JSON.parse(assignmentsRaw);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    if (index < 0 || index >= assignments.length) {
      return res.status(400).json({ error: 'Index out of bounds' });
    }

    assignments.splice(index, 1);

    await fs.writeFile(
      path.join(__dirname, 'assignments.json'),
      JSON.stringify(assignments, null, 2),
      'utf-8'
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
