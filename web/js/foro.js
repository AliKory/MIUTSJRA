window.onload = getAllPosts();

// GET ALL POST AND SHOW IN POST-LIST
function getAllPosts() {
    // GET REQUEST: /api/getPosts
    axios
        .get("/api/getPosts")
        // Return a promise
        .then(function (response) {
            // Get response data
            const posts = response.data;
            // Get post-list element
            const postList = document.getElementById("post-list");
            // For each post create a list item and append to post-list
            posts.forEach(function (post) {
                // Create list item of post to append to post-list
                const itemTitle = document.createElement("li");
                const itemContent = document.createElement("li");
                const itemRating = document.createElement("li");
                // Set list item text to post title
                itemTitle.textContent = "TITLE: " + post.title;
                // Set list item text to post content
                itemContent.textContent = "CONTENT: " + post.content;
                // Set list item text to post rating
                itemRating.textContent = "RATING: " + post.rating;
                // Append list item to post-list
                postList.appendChild(itemTitle);
                postList.appendChild(itemContent);
                postList.appendChild(itemRating);
            });
        })
        .catch(function (error) {
            // Return empty posts and request state at false
            console.error(error);
        });
}
