const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../conexion");

const MensajesGrupo = sequelize.define("mensajesGrupo", {
  id_mensaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mensaje: {
    type: DataTypes.STRING(200),
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
    tableName: "mensajesGrupo",
    timestamps: true,
}
);

module.exports = MensajesGrupo;
