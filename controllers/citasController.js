'use strict'
const { where } = require('sequelize');
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
        const medico = req.body.medicos_id_medico;
        const paciente = req.body.pacientes_id_paciente;
        const cita_inicial = req.body.cita_inicial;
        const tipo = req.body.tipo;

        const _medico = await Medico.findOne({
            where: {
                id_medico: medico
            }
        });

        if(!_medico){
            return res.status(404).json({
                success: false,
                mensaje: "No existe el medico en el sistema",
                data: null
            });
        }

        const _paciente = await Paciente.findOne({
            where: {
                id_paciente: paciente
            }
        });

        if(!_paciente){
            return res.status(404).json({
                success: false,
                mensaje: "No existe el paciente en el sistema",
                data: null
            });
        }

        if(tipo === "reconsulta") {
            if(!cita_inicial) {
                return res.status(400).json({
                    success: false,
                    mensaje: "No se ingresó la cita inicial para la reconsulta",
                    data: null
                });
            }
            const _cita = await Cita.findOne({
                where : {
                    id_cita: cita_inicial
                }   
            })

            if(!_cita) {
                return res.status(404).json({
                success: false,
                mensaje: "No existe la cita en el sistema",
                data: null
            });
            }
        } else {
            if(cita_inicial){
                return res.status(400).json({
                    success: false,
                    mensaje: "No se puede ingresar la primera cita porque no es reconsulta",
                    data: null
                });
            }
        }
        try {
            const cita = await Cita.create(body);
            res.status(201).json({
                success: true,
                mensaje: "Cita creada correctamente",
                data: cita
            });
        }
        catch(error) {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    },
    async crearVariasCitas (req, res) {
        const citasData = req.body; 
        const errores = [];
        const citasValidas = [];

        for (const [i, body] of citasData.entries()) {
            const medico = body.medicos_id_medico;
            const paciente = body.pacientes_id_paciente;
            const cita_inicial = body.cita_inicial;
            const tipo = body.tipo;

            const _medico = await Medico.findOne({ where: { id_medico: medico } });
            if (!_medico) {
                errores.push({
                    index: i,
                    mensaje: "No existe el medico en el sistema",
                    cita: body
                });
                continue;
            }

            const _paciente = await Paciente.findOne({ where: { id_paciente: paciente } });
            if (!_paciente) {
                errores.push({
                    index: i,
                    mensaje: "No existe el paciente en el sistema",
                    cita: body
                });
                continue;
            }

            if (tipo === "reconsulta") {
                if (!cita_inicial) {
                    errores.push({
                        index: i,
                        mensaje: "No se ingresó la cita inicial para la reconsulta",
                        cita: body
                    });
                    continue;
                }
                const _cita = await Cita.findOne({ where: { id_cita: cita_inicial } });
                if (!_cita) {
                    errores.push({
                        index: i,
                        mensaje: "No existe la cita inicial en el sistema",
                        cita: body
                    });
                    continue;
                }
            } else {
                if (cita_inicial) {
                    errores.push({
                        index: i,
                        mensaje: "No se puede ingresar la primera cita porque no es reconsulta",
                        cita: body
                    });
                    continue;
                }
            }

            citasValidas.push(body);
        }

        if (citasValidas.length === 0) {
            return res.status(400).json({
                success: false,
                mensaje: "No se pudo crear ninguna cita",
                errores
            });
        }

        try {
            const citas = await Cita.bulkCreate(citasValidas);
            res.status(201).json({
                success: true,
                mensaje: "Citas creadas correctamente",
                data: citas,
                errores: errores.length ? errores : undefined
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                mensaje: "Hubo un error",
                data: error
            });
        }
    },

    async cambiarEstado(req, res) {
        const nuevoEstado = req.params.nuevoEstado;
        const idCita = req.params.idCita;
        try
        {
            const citaActualizada = await Cita.update({estado: nuevoEstado},{
                where:{
                    id_cita:idCita
                }
            })
            res.status(200).json({
                success: true,
                mensaje: "Cita actualizada"
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
    }
}