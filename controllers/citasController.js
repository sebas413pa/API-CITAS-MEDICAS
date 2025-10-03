'use strict'
const {models} = require('../db')
const Cita = models.citas;
const Medico = models.medicos;
const Paciente = models.pacientes;

module.exports = {

    async crearCita( req, res) {
        const body = req.body;
        try
        {
            const cita = await Cita.create(body);
            res.status(201).json({
                success: true,
                mensaje: "Cita creada correctamente",
                data: cita
            });
        }
        catch(error)
        {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            })
        }
    },
    async crearVariasCitas (req, res) {
        try {
            const citas = await Cita.bulkCreate(req.body);
            res.status(201).json({
                success: true,
                mensaje: "Citas creadas correctamente",
                data: citas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    }
}