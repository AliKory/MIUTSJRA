const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const Usuario = require("../modelos/usuarioModel");
const Administrativo = require("../modelos/administrativoModel");
const MensajesGrupo = require("../modelos/messageModel");
const Mensaje = require("../modelos/chatModel");
const Post = require("../modelos/postsModel");

// Renderizar login
router.get("/", (req, res) => {
	res.render("login");
});

router.get("/foro", (req, res) => {
	res.render("foro");
});

router.get("/error", (req, res) => {
	res.render("error");
});

// ! NO PONER 2 RUTAS CON EL MISMO NOMBRE PORQUE AGHARRA LA PRIMERA
// router.get("/discussions", (req, res) => {
// 	res.render("discussions");
// });

router.get("/chat", (req, res) => {
	res.render("chat");
});

// Renderizar inicio

router.get("/inicio", async (req, res) => {
	try {
		// Si el usuario está autenticado, buscar si tiene entrada en la tabla "administrativos"
		if (req.session.usuario) {
			const usuario = req.session.usuario;

			// Buscar al usuario en la tabla "administrativos" por su expediente
			const administrativo = await Administrativo.findOne({
				where: { expediente: usuario.expediente },
			});

			// Variable booleana que indica si el usuario es un administrativo
			const esAdministrativo = administrativo !== null;

			// Buscar el mensajeGrupo desde la base de datos
			const mensajeGrupo = await MensajesGrupo.findOne();

			// Renderizar la vista "inicio" and pass the user's name to the template
			res.render("inicio", {
				esAdministrativo,
				mensajeGrupo,
				usuario: usuario.nombre,
			});
		} else {
			res.redirect("/error");
		}
	} catch (error) {
		console.error(
			"Error al buscar el usuario o el mensaje en la tabla 'administrativos' o 'mensajesgrupo':",
			error
		);
		res.redirect("/error");
	}
});

// Renderizar logout
router.get("/logout", (req, res) => {
	// Destruir sesion
	req.session.destroy();
	res.redirect("/");
});

// Ruta post para manejar inicio de sesion
router.post("/login", async (req, res) => {
	// Destructurar req.body y obtener expediente, y password
	const { expediente, password } = req.body;
	try {
		// Buscar que el expediente exista y este activo
		// == SELECT * FROM usuarios WHERE expediente = expediente AND status = 1
		const usuario = await Usuario.findOne({
			where: { expediente, status: 1 },
		});

		// Usuario no encontrado
		if (!usuario) res.redirect("/");

		// Comparar contraseña enviada por usuario con almacenada en la bd
		const contraseñaValida = await bcryptjs.compare(
			password,
			usuario.password
		);

		if (contraseñaValida) {
			// Crear sesion con datos del usuario
			req.session.usuario = usuario;
			res.redirect("/inicio");
		} else {
			// Contraseña incorrecta
			console.log("contraseña incorrecta");
			res.redirect("/");
		}
	} catch (error) {
		// Manejar error al autenticar usuario
		console.error("Error al autenticar usuario:", error.sqlMessage);
		res.redirect("/");
	}
});

// Ruta post para manejar registro de usuario
router.post("/register", async (req, res) => {
	// Destructura el objeto req.body
	const { expediente, nombre, password } = req.body;
	try {
		// Buscar si el expediente existe
		const administrativoExistente = await Administrativo.findOne({
			where: {
				expediente: expediente,
			},
			// Traer unicamente el campo expediente
			attributes: ["expediente"],
		});

		const usuarioExistente = await Usuario.findOne({
			where: {
				expediente: expediente,
			},
			// Traer unicamente el campo expediente
			attributes: ["expediente"],
		});

		// Si el expediente existe redirigir a inicio
		if (usuarioExistente) res.redirect("/inicio");
		if (administrativoExistente) res.redirect("/inicio");

		// Establecer saltRounds para hash de contraseña
		const saltRounds = 10;
		// Generar password hashed
		const hashedPassword = await bcryptjs.hash(password, saltRounds);

		// Crear nuevo usuario con: expediente, nombre, password (hashed), status en true
		const nuevoUsuario = await Usuario.create({
			expediente,
			nombre,
			password: hashedPassword,
			status: 1,
		});
		// Verificar si el usuario debe registrarse en la tabla Administrativos
		const debeRegistrarseEnAdministrativos = expediente.startsWith("11");

		if (debeRegistrarseEnAdministrativos) {
			await Administrativo.create({
				expediente,
				nombre,
				password: hashedPassword,
				status: 1,
			});
			console.log("Usuario registrado en la tabla Administrativo");
		}

		// Si el usuario fue creado correctamente
		console.log("Usuario Creado");
		res.redirect("/");
	} catch (e) {
		// Manejar error al crear usuario
		console.log(`Error al crear usuario: ${e}`);
		res.redirect("/");
	}
});

// Ruta para guardar o editar el mensaje
router.post("/editar-mensaje", async (req, res) => {
	const { mensaje } = req.body;
	try {
		// Verificar si ya existe un mensaje en la tabla
		let mensajeGrupo = await MensajesGrupo.findOne();

		if (mensajeGrupo) {
			// Si ya existe un mensaje, actualizarlo
			mensajeGrupo.mensaje = mensaje;
			await mensajeGrupo.save();
		} else {
			// Si no existe un mensaje, crear uno nuevo
			mensajeGrupo = await MensajesGrupo.create({
				mensaje: mensaje,
			});
		}

		res.redirect("/inicio");
	} catch (error) {
		console.error("Error al guardar o editar el mensaje:", error);
		res.redirect("/error");
	}
});

// Ruta para guardar o editar el mensaje
router.post("/enviar-mensaje", async (req, res) => {
	
	const mensajeTexto = req.body.mensaje; // Asegurarse de que el mensaje no tenga espacios en blanco extra
	console.error(req.body);
	let { mensaje } = req.body;

	try {
		if (mensaje!="") {
			console.error("el mensaje:...... "+mensajeTexto);
			// Si no existe un mensaje, crear uno nuevo
			mensaje = await Mensaje.create({
				mensaje: mensajeTexto,
			});
		}
		else{
			console.error("Error al enviar el mensaje:...... "+mensajeTexto+" ............ "+mensaje);
		}

		res.redirect("/chat");
	} catch (error) {
		console.error("Error al enviar el mensaje:", error);
		res.redirect("/error");
	}
});

router.post("/newPost", async (req, res) => {
	try {
		// Destructurar req.body y obtener title, y content
		const { title, content, rating } = req.body;
		// Validar que title, content no estén vacíos
		if (!title || !content || !rating) {
			return res.redirect("/foro"); // Redireccionar a la página de formulario de creación con un mensaje de error
		}
		// Crear nuevo post
		const post = await Post.create({ title, content, rating });
		// Redireccionar a la página de discusiones después de guardar el post
		res.redirect("/discussions");
	} catch (error) {
		// Manejar error al crear post
		console.error("Error creating post:", error);
		res.status(500).json({ error: "Failed to create post" });
	}
});

router.get("/discussions", async (req, res) => {
	try {
		// Obtener todos los posts de la base de datos
		const posts = await Post.findAll();

		// Renderizar la vista "discussions" y enviar los posts al template
		console.log(posts);
		res.render("discussions", { posts });
	} catch (error) {
		console.error("Error al obtener los posts:", error);
		res.redirect("/error");
	}
});

module.exports = router;

