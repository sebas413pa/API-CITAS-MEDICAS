const {models} = require('../db');
const {pacientes} = models;

module.exports = {
    listar: async (req, res) => {
        try {
            const listaPacientes = await pacientes.findAll();
            res.json(listaPacientes);
        } catch (error) {
            console.error('Error al listar pacientes:', error);
            res.status(500).json({ error: 'Error al listar pacientes' });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevoPaciente = await pacientes.create(req.body);
            res.status(201).json(nuevoPaciente);
        } catch (error) {
            console.error('Error al crear paciente:', error);
            res.status(500).json({ error: 'Error al crear paciente' });
        }
    },
    actualizar: async (req, res) => {
        try {
            const { id_paciente } = req.params;
            const clienteActualizar = await pacientes.findOne({ where: { id_paciente, estado: 1 } });
            if (!clienteActualizar || clienteActualizar.estado === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'El paciente no existe o ya fue eliminado'
                });
            }
            const pacienteActualizado = await clienteActualizar.update(req.body, {
                where: { id_paciente }
            });
            res.status(200).json({
                success: true,
                message: 'Paciente actualizado correctamente',
                data: pacienteActualizado
            });
        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            res.status(500).json({ error: 'Error al actualizar paciente' });
        }
    }

}