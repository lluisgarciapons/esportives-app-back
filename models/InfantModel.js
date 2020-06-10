const mongoose = require("mongoose");

const InfantSchema = new mongoose.Schema({
    nom: { type: String },
    nomResponsable: { type: String },
    DNIResponsable: { type: String },
    naixement: { type: String },
    curs: { type: String },
    escola: { type: String },
    telefon: { type: Number },
    adreça: { type: String },
    poblacio: { type: String },
    codiPostal: { type: String },
    tallaSamarreta: { type: String },
    email: { type: String },
    setmana1: { type: Boolean, default: false },
    setmana2: { type: Boolean, default: false },
    setmana3: { type: Boolean, default: false },
    setmana4: { type: Boolean, default: false },
    temperatures: [{
        dia: { type: Number },
        temperatura: { type: Number }
    }],
    nedar: { type: Boolean, default: false },
    impediments: { type: Boolean, default: false },
    detallImpediment: { type: String, default: "-" },
    decisio: { type: Boolean, default: false },
    tornarSol: { type: Boolean, default: false },
    dretImatge: { type: Boolean, default: false },
    difusioWeb: { type: Boolean, default: false },
    difusioSocial: { type: Boolean, default: false },
    difusioPublicacio: { type: Boolean, default: false }

});

module.exports = mongoose.model("Infant", InfantSchema);
