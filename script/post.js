const postContainer = document.querySelector(".container");

// get the saved post from localStorage
const selectedPost = JSON.parse(localStorage.getItem("selectedPost"));

if (selectedPost) {
  postContainer.innerHTML = `
    <div></div>
    <article class="post">
      <div class="image-container">
        <img src="database/images/${selectedPost.image}" />
      </div>
      <div class="post-content">
        <h2>${selectedPost.title}</h2>
        <h4>${selectedPost.author}</h4>
        <p>${selectedPost.article}</p>
      </div>
    </article>
    <div></div>
  `;
} else {
  postContainer.innerHTML = `<p>Post not found.</p>`;
}