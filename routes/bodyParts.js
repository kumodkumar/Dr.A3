const express = require('express');
const router = express.Router();
const internalApi = require('../api/apiInternal');  // Corrected path
const externalApi = require('../api/apiExternal');  // Corrected path

// Route to display diseases for a specific body part
router.get('/internal/:part', (req, res) => {
    const part = req.params.part.toLowerCase();
    const diseases = internalApi.getDiseasesByPart(part);

    if (diseases) {
        res.render('internal', { part, diseases });
    } else {
        res.status(404).send('Body part not found');
    }
});

router.get('/external/:part', (req, res) => {
    const part = req.params.part.toLowerCase();
    const diseases = externalApi.getDiseasesByPart(part);

    if (diseases) {
        res.render('external', { part, diseases });
    } else {
        res.status(404).send('Body part not found');
    }
});

// Route to handle individual disease pages (Internal)
router.get('/disease/internal/:disease', (req, res) => {
    const diseaseName = req.params.disease.toLowerCase();
    const disease = internalApi.getDiseaseDetails(diseaseName);

    if (disease) {
        res.render('disease', { disease });
    } else {
        res.status(404).send('Disease not found');
    }
});

// Route to handle individual disease pages (External)
router.get('/disease/external/:disease', (req, res) => {
    const diseaseName = req.params.disease.toLowerCase();
    const disease = externalApi.getDiseaseDetails(diseaseName);

    if (disease) {
        res.render('disease', { disease });
    } else {
        res.status(404).send('Disease not found');
    }
});

module.exports = router;
