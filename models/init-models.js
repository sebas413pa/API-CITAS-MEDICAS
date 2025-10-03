var DataTypes = require("sequelize").DataTypes;
var _bonos = require("./bonos");
var _citas = require("./citas");
var _medicos = require("./medicos");
var _pacientes = require("./pacientes");

function initModels(sequelize) {
  var bonos = _bonos(sequelize, DataTypes);
  var citas = _citas(sequelize, DataTypes);
  var medicos = _medicos(sequelize, DataTypes);
  var pacientes = _pacientes(sequelize, DataTypes);

  citas.belongsTo(citas, { as: "cita_inicial_cita", foreignKey: "cita_inicial"});
  citas.hasMany(citas, { as: "cita", foreignKey: "cita_inicial"});
  bonos.belongsTo(medicos, { as: "medicos_id_medico_medico", foreignKey: "medicos_id_medico"});
  medicos.hasMany(bonos, { as: "bonos", foreignKey: "medicos_id_medico"});
  citas.belongsTo(medicos, { as: "medicos_id_medico_medico", foreignKey: "medicos_id_medico"});
  medicos.hasMany(citas, { as: "cita", foreignKey: "medicos_id_medico"});
  citas.belongsTo(pacientes, { as: "pacientes_id_paciente_paciente", foreignKey: "pacientes_id_paciente"});
  pacientes.hasMany(citas, { as: "cita", foreignKey: "pacientes_id_paciente"});

  return {
    bonos,
    citas,
    medicos,
    pacientes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
