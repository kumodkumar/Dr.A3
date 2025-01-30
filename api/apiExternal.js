const externalDiseases = {
    head: [
        { name: "Scalp Psoriasis", description: "Skin disorder", symptoms: ["Red patches", "Itching"], emergencyCure: "Apply medicated shampoo", doctor: "Dermatologist", image: "/images/scalp_psoriasis.jpg" }
    ]
};

exports.getDiseasesByPart = (part) => externalDiseases[part] || [];

exports.getDiseaseDetails = (diseaseName) => {
    for (const part in externalDiseases) {
        const disease = externalDiseases[part].find(d => d.name.toLowerCase() === diseaseName);
        if (disease) return disease;
    }
    return null;
};
