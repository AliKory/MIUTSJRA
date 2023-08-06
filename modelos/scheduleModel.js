const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../conexion");

const Horario = sequelize.define(
    "horario", 
    {
  // Propiedades y tipos de datos del modelo "Horario"
  clase: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  edificio: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  salon: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  dia: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
createdAt: {
 type: DataTypes.DATE,
 allowNull: true,
},
updatedAt: {
 type: DataTypes.DATE,
 allowNull: true,
},
});

// Exportar el modelo "Horario"
module.exports = Horario;

  
  
  
  