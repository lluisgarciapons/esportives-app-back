const express = require("express");
const infantRouter = express.Router();
const { asyncMiddleware, checkToken } = require("../middleware");

const Infant = require("../models/InfantModel");

infantRouter.get("/", checkToken, asyncMiddleware(async (req, res) => {
    const infants = await Infant.find({});
    return res.json({ success: true, infants });
}));

infantRouter.post("/", checkToken, asyncMiddleware(async (req, res, next) => {
    const { nouInfant } = req.body;
    // const { nom, nomResponsable, DNIResponsable, naixement, curs, escola, telefon, adreça, poblacio, codiPostal, tallaSamarreta, email, setmana1, setmana2, setmana3, setmana4, nedar, impediments, detallImpediment, decisio, tornarSol, dretImatge, difusioWeb, difusioSocial, difusioPublicacio } = req.body;

    const infant = await Infant.findOne({ nom: nouInfant.nom });
    if (infant) {
        return next({
            status: 403,
            message: "Aquest infant ja ha estat introduït"
        });
    }

    const infantCreat = await new Infant(nouInfant).save();
    // const nouInfant = await new Infant({ nom, nomResponsable, DNIResponsable, naixement, curs, escola, telefon, adreça, poblacio, codiPostal, tallaSamarreta, email, setmana1, setmana2, setmana3, setmana4, nedar, impediments, detallImpediment, decisio, tornarSol, dretImatge, difusioWeb, difusioSocial, difusioPublicacio }).save();

    return res.json({
        success: true,
        infant: infantCreat
    });

}));

infantRouter.get("/:id", checkToken, asyncMiddleware(async (req, res) => {
    const infant = await Infant.findById(req.params.id);
    return res.json({
        success: true,
        infant
    });
}));

infantRouter.delete("/:id", checkToken, asyncMiddleware(async (req, res, next) => {
    const infant = await Infant.findById(req.params.id);
    if (!infant) {
        return next({
            status: 403,
            message: "Aquest infant no existeix."
        });
    }
    await infant.delete();
    return res.json({
        success: true,
        message: "Infant eliminat correctament."
    });
}));

infantRouter.put("/temperatura/:id", checkToken, asyncMiddleware(async (req, res, next) => {
    const { temp } = req.body;
    const rightNow = new Date();
    const today = new Date(rightNow.getFullYear(), rightNow.getMonth(), rightNow.getDate());
    const localTime = today.getTime();
    const localOffset = today.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const infant = await Infant.findById(req.params.id);
    const repetit = infant.temperatures.some(t => t.dia == utc);
    if (repetit) {
        return next({
            status: 403,
            message: `${utc}, ${today}: Ja s'ha pres la temperatura avui.`
        });
    }
    infant.temperatures.push({ dia: utc, temperatura: temp });
    const updatedInfant = await infant.save();
    return res.json({
        success: true,
        infant: updatedInfant
    });
}));

module.exports = infantRouter;