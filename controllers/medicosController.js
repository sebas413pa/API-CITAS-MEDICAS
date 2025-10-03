'use strict'
const { models } = require('../db');
const Medico = models.medicos;

module.exports = {
    async crearMedico (req, res) {
        try {
            const medico = await Medico.create(req.body);
            res.status(201).json({
                success: true,
                mensaje: "Medico creado correctamente",
                data: medico
            })
        }catch(error){
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            })
        }
    },
    async crearVariosMedicos (req, res) {
        try {
            const medicos = await Medico.bulkCreate(req.body);
            res.status(201).json({
                success: true,
                mensaje: "Medicos creados correctamente",
                data: medicos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    },
    async listarMedicos (req, res) {
        try
        {
            const medicos = await Medico.findAll({
                include: [
                    { model: models.bonos, as: "bonos" }
                ]
            });
            res.status(201).json({
                success: true,
                mensaje: "Medicos guardados",
                data: medicos
            })
        }
        catch (error)
        {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            })
        }
    },
    async listarUnMedico (req, res){
        const idMedico = req.params.idMedico
        try
        {
            const medico = await Medico.findOne({
                where: {
                    id_medico: idMedico
                },
                include: [
                    { model: models.bonos, as: "bonos" }
                ]
            });
            res.status(201).json({
                success: true,
                mensaje: "Medico encontrado",
                data: medico
            })
        }
        catch (error)
        {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            })
        }
    },

    async actualizarMedico(req, res) {
        const idMedico = req.params.idMedico;

        try {
            await Medico.update(req.body, {
                where: 
                { 
                    id_medico: idMedico 
                }
            });
            const medicoActualizado = await Medico.findOne({ where: { id_medico: idMedico } });
            res.status(200).json({
                success: true,
                mensaje: "Medico actualizado correctamente",
                data: medicoActualizado
            });
        } catch(error) {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    }
}