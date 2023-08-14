const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../conexion");

const MensajeT = sequelize.define("mensajest", {
  id_mensajet: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mensajet: {
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
    tableName: "mensajest",
    timestamps: true,
}
);

module.exports = MensajeT;
