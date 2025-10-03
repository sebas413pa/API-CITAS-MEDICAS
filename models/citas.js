const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('citas', {
    id_cita: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo: {
      type: DataTypes.ENUM('primera','reconsulta'),
      allowNull: false,
      defaultValue: "primera"
    },
    estado: {
      type: DataTypes.ENUM('pendiente','cancelada','completada'),
      allowNull: true,
      defaultValue: "pendiente"
    },
    medicos_id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicos',
        key: 'id_medico'
      }
    },
    pacientes_id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'id_paciente'
      }
    },
    cita_inicial: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'citas',
        key: 'id_cita'
      }
    }
  }, {
    sequelize,
    tableName: 'citas',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cita" },
        ]
      },
      {
        name: "fk_citas_medicos_idx",
        using: "BTREE",
        fields: [
          { name: "medicos_id_medico" },
        ]
      },
      {
        name: "fk_citas_pacientes1_idx",
        using: "BTREE",
        fields: [
          { name: "pacientes_id_paciente" },
        ]
      },
      {
        name: "fk_citas_citas1_idx",
        using: "BTREE",
        fields: [
          { name: "cita_inicial" },
        ]
      },
    ]
  });
};
