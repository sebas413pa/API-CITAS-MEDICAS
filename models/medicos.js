const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicos', {
    id_medico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres_medico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidos_medico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono_medico: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    salario_base: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_medico" },
        ]
      },
    ]
  });
};
