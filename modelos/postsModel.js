const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Post = sequelize.define(
	"Post",
	{
		id_po: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: true,
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
		tableName: "Posts",
		timestamps: true,
	}
);

module.exports = Post;
