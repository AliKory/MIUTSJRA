
const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");


const Administrativo = sequelize.define(
	"administrativo", 
	{
  expediente: {
    type: DataTypes.STRING(40),
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
	tableName: "Administrativo",
	timestamps: true,
});


module.exports = Administrativo;
