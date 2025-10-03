const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bonos', {
    id_bono: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monto: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    cantidad_pacientes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    periodo_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    periodo_final: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    medicos_id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicos',
        key: 'id_medico'
      }
    }
  }, {
    sequelize,
    tableName: 'bonos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_bono" },
        ]
      },
      {
        name: "fk_bonos_medicos1_idx",
        using: "BTREE",
        fields: [
          { name: "medicos_id_medico" },
        ]
      },
    ]
  });
};
