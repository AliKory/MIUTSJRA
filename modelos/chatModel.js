const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../conexion");

const Mensaje = sequelize.define("mensajesu", {
  id_mensaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
    tableName: "mensajesu",
    timestamps: true,
}
);

module.exports = Mensaje;
