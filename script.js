// Obtener elemento de la lista de discusiones
const discussionList = document.getElementById("discussion-list");

function createDiscussionItem(title, content) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  discussionList.appendChild(listItem);
}

function loadDiscussions() {
  let discussions = JSON.parse(localStorage.getItem("discussions")) || [];
  discussions.forEach((discussion) => {
    createDiscussionItem(discussion.title, discussion.content);
  });
}

function clearDiscussionForm() {
  document.getElementById("discussion-title").value = "";
  document.getElementById("discussion-content").value = "";
}

function handleDiscussionFormSubmit(event) {
  event.preventDefault();

  const discussionTitle = document.getElementById("discussion-title").value;
  const discussionContent = document.getElementById("discussion-content").value;

  // Agregar la discusión al almacenamiento local
  let discussions = JSON.parse(localStorage.getItem("discussions")) || [];
  discussions.push({ title: discussionTitle, content: discussionContent });
  localStorage.setItem("discussions", JSON.stringify(discussions));

  createDiscussionItem(discussionTitle, discussionContent);
  clearDiscussionForm();

  // Redirigir a la página "discussions.html"
  window.location.href = "views\discussions.ejs";
}

// Llamar a la función para cargar las discusiones al cargar la página
window.onload = loadDiscussions;

// Agregar evento submit al formulario
document.getElementById("discussion-form").addEventListener("submit", handleDiscussionFormSubmit);