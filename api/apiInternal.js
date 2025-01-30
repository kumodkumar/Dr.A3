const internalDiseases = {
    head: [
        { name: "Migraine", description: "Severe headaches", symptoms: ["Nausea", "Sensitivity to light"], emergencyCure: "Rest in a dark room", doctor: "Neurologist", image: "/images/migraine.jpg" },
        { name: "Hypertension", description: "High blood pressure", symptoms: ["Headache", "Dizziness"], emergencyCure: "Relaxation techniques", doctor: "Cardiologist", image: "/images/hypertension.jpg" }
    ]
};

exports.getDiseasesByPart = (part) => internalDiseases[part] || [];

exports.getDiseaseDetails = (diseaseName) => {
    for (const part in internalDiseases) {
        const disease = internalDiseases[part].find(d => d.name.toLowerCase() === diseaseName);
        if (disease) return disease;
    }
    return null;
};
