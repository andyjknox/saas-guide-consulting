const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); 

app.post('/submit-audit', (req, res) => {
    // These names now match the "name" attributes in your index.html
    const { name, email, company, bottleneck } = req.body;
    
    const data = `${new Date().toISOString()} | ${name} | ${email} | ${company} | ${bottleneck}\n`;
    
    try {
        // Appends to leads.txt in the root
        fs.appendFileSync('leads.txt', data);
        res.send('Audit request received. We will contact you shortly.');
    } catch (err) {
        console.error('Error writing to file', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
