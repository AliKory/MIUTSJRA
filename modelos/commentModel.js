const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Comment = sequelize.define(
	"Comment",
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		tableName: "Comment",
		timestamps: true,
	}
);

module.exports = Comment;
