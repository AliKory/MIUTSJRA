const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Usuario = sequelize.define(
	"usuario",
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
	},
	{
		tableName: "usuario",
		timestamps: true,
	}
);

module.exports = Usuario;
