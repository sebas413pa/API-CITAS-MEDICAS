'use strict'
const {models} = require('../db')
const Cita = models.citas;
const Medico = models.medicos;
const Paciente = models.pacientes;

module.exports = {
    async listarCitas (req, res) {
        try
        {
            const citas = await Cita.findAll();
            res.status(200).json({
                success: true,
                mensaje: "Citas obtenidas correctamente",
                data: citas
            });
        }
        catch(error)
        {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    },
    async obtenerCitaPorId (req, res) {
        const { id_cita } = req.params;
        try {
            const cita = await Cita.findByPk(id_cita);
            if (!cita) {
                return res.status(404).json({
                    success: false,
                    mensaje: "Cita no encontrada",
                });
            }
            res.status(200).json({
                success: true,
                mensaje: "Cita obtenida correctamente",
                data: cita
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    },
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