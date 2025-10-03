const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pacientes', {
    id_paciente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres_paciente: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidos_paciente: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono_paciente: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pacientes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_paciente" },
        ]
      },
    ]
  });
};
