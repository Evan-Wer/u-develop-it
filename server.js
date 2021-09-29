const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();

const inputCheck = require('./utils/inputCheck');
const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');
app.use('./apiRoutes', apiRoutes);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all parties
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get single party by id
app.get('/api/parties/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Delete a party
app.delete('/api/parties/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(500).json({ error: res.message });
        }
        
        res.json({
            message: 'successfully deleted',
            changes: this.changes
        });
    });
});

/*
// Default response for any other request(Not Found) - Catch all
app.use((req, res) => {
    res.status(404).end();
  }); */


// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});