/**
 * Function to get all post
 * @param {string} path
 * @returns {array} posts
 */
axios
	.get("/api/posts")
	.then(function (response) {
		const posts = response.data;
		const postList = document.getElementById("post-list");

		posts.forEach(function (post) {
			const listItem = document.createElement("li");
			listItem.textContent = post.title;
			postList.appendChild(listItem);
		});
	})
	.catch(function (error) {
		console.error("Error al obtener las publicaciones:", error);
	});

    // *** FUNCION Q HIZO PI EN UN INTENTO DE DESESPERACION AYUDA!!!
//     /**
//  * Function to get all post
//  * @returns {array} posts
//  */
// export async function getAllPosts() {
// 	// GET REQUEST: /api/getPosts
// 	await axios
// 		.get("/api/getPosts")
// 		// Return a promise
// 		.then(function (response) {
// 			// Return posts and request state
// 			return { posts: response, state: true };
// 		})
// 		.catch(function (error) {
// 			// Return empty posts and request state at false
// 			return { post: error, state: false };
// 		});
// }

// Obtener comentarios para una publicación específica
axios
	.get("/api/posts/1/comments")
	.then(function (response) {
		const comments = response.data;
		const commentList = document.getElementById("comment-list");

		comments.forEach(function (comment) {
			const listItem = document.createElement("li");
			listItem.textContent = comment.content;
			commentList.appendChild(listItem);
		});
	})
	.catch(function (error) {
		console.error("Error al obtener los comentarios:", error);
	});
