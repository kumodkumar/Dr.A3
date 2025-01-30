const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const internalApi = require('./api/apiInternal');
const externalApi = require('./api/apiExternal');
const bodyPartsRouter = require('./routes/bodyParts');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', bodyPartsRouter);

// Route for internal diseases list
app.get('/internal/:part', async (req, res) => {
    const part = req.params.part;
    const diseases = internalApi.getDiseasesByPart(part);
    
    if (!diseases) {
        return res.status(404).send('Body part not found');
    }
    
    res.render('internal', { part, diseases });
});

// Route for external diseases list
app.get('/external/:part', async (req, res) => {
    const part = req.params.part;
    const diseases = externalApi.getDiseasesByPart(part);
    
    if (!diseases) {
        return res.status(404).send('Body part not found');
    }
    
    res.render('external', { part, diseases });
});

// Route for disease details (both internal and external)
app.get('/disease/:name', async (req, res) => {
    const diseaseName = req.params.name.replace(/-/g, ' ');
    const disease = internalApi.getDiseaseDetails(diseaseName) || externalApi.getDiseaseDetails(diseaseName);
    
    if (!disease) {
        return res.status(404).send('Disease not found');
    }
    
    res.render('disease', { disease });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
