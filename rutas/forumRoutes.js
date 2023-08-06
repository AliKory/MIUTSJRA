const express = require("express");
const router = express.Router();
const Post = require("../modelos/postsModel");
const Comment = require("../modelos/commentModel");

/**
 * Rutas para el foro
 * SE CREA API'S PARA CONSUTLAR DESDE AXIOS
 * SE UTILIZA /api PARA DIFERENCIAR DE LAS RUTAS DE LA APLICACION
 */

/**
 * DEFINICION DE STATUS
 * STATUS 201: Se creo un nuevo recurso
 * STATUS 500: Error del servidor
 */

// Crear nuevo post
// POST REQUEST: /api/newPost
router.post("/newPost", async (req, res) => {
    try {
        // Destructurar req.body y obtener title, y content
        const { title, content } = req.body;
        // Validar que title, content y rating no esten vacios
        if (!title || !content ) res.redirect("/inicio");
        // Crear nuevo post
		const post = await Post.create({ title, content });
        // Responder con el post creado
		res.status(201).json(post);
	} catch (error) {
        // Manejar error al crear post
		console.error("Error creating post:", error);
		res.status(500).json({ error: "Failed to create post" });
	}
});

// Crar nuevo comentario
// POST REQUEST: /api/posts/:postId/comments
router.post("/posts/:postId/comments", async (req, res) => {
	const { postId } = req.params;
	const { content } = req.body;
	try {
		const post = await Post.findByPk(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		const comment = await Comment.create({ content, postId });
		res.status(201).json(comment);
	} catch (error) {
		console.error("Error creating comment:", error);
		res.status(500).json({ error: "Failed to create comment" });
	}
});

// Traer todos los post
// GET REQUEST: /api/getPosts
router.get("/getPosts", async (req, res) => {
	try {
        // Buscar todos los post
		const posts = await Post.findAll();
        // Responder con los post
		res.status(200).json(posts);
	} catch (error) {
        // Manejar error al traer los post
		console.error("Error retrieving posts:", error);
		res.status(500).json({ error: "Failed to retrieve posts" });
	}
});

module.exports = router;