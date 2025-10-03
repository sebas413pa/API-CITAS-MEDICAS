'use strict'
const { models, sequelize} = require('../db');
const { Op, fn, col } = require('sequelize');
const citas = require('../models/citas');
const Bono = models.bonos;
const Medico = models.medicos;
const Citas = models.citas;

module.exports = {
    async listarBonos(req,res){
        try{
            const bonos = await Bono.findAll();
            res.status(200).json({
            success: true,
            message: "Bonos listados exitosamente",
            data: bonos
        });
        }catch(error){
            console.log("error", error);
            res.status(500).json({
                success: false,
                message: "No se pudieron listar los bonos"
            });
        }
    },
    async crearBono(req,res){
        try{
            const today = new Date();
            const dayOfWeek = today.getDay(); 
            const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
            const monday = new Date(today);
            monday.setDate(today.getDate() - mondayOffset);
            monday.setHours(0, 0, 0, 0); 

            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            const results = await Citas.findAll({
                attributes: [
                    'medicos_id_medico',
                    [fn('COUNT', fn('DISTINCT', col('pacientes_id_paciente'))), 'pacientes_count']
                ],
                where: {
                    fecha: {
                        [Op.gte]: monday,
                        [Op.lte]: endDate
                    },
                    estado: 'completada' 
                },
                group: ['medicos_id_medico'],
                having: sequelize.where(fn('COUNT', fn('DISTINCT', col('pacientes_id_paciente'))), Op.gt, 50)
            });
            res.status(200).json({
                success: true,
                message: "Bonos creados exitosamente",
                data: results
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
                success: false,
                message: "No se pudo crear el bono"
            });
        }
    }
}