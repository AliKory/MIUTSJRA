const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const db = process.env.DB_MYSQL_REMOTO;
const usuario = process.env.USUARIO_MYSQL_REMOTO;
const password = process.env.PASSWORD_MYSQL_REMOTO;
const host = process.env.HOST_MYSQL_REMOTO;
const port = process.env.PORT_MYSQL_REMOTO;

const sequelize = new Sequelize(db, usuario, password, {
	host: host,
	port: port,
	dialect: "mysql",
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Conectado a MySQL");
	})
	.catch((err) => {
		console.error("Error al conectarse a MySQL: ", err);
	});

module.exports = sequelize;
