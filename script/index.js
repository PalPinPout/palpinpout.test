const blogContainer = document.querySelector(".blog-container");

let HTML = "";
article.forEach((post) => {
  HTML += `
    <article class="post">
        <div class="image-container">
            <img src="database/images/${post.image}" />
        </div>
        <div class="post-content">
            <h3>${post.title}</h3>
            <h5>${post.author}</h5>
            <p>${post.article}</p><br>
            <a href="post.html" class="read-more" data-title-id="${post.titleId}">Read More</a>
        </div>
    </article>
    `;
});
blogContainer.innerHTML = HTML;

const readMoreBtn = document.querySelectorAll(".read-more");
readMoreBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const titleId = button.dataset.titleId;

    const selectedPost = article.find((post) => post.titleId === titleId);

    localStorage.setItem("selectedPost", JSON.stringify(selectedPost));

    window.location.href = "post.html";
  });
});

// Smooth reveal animation for posts on scroll
const posts = document.querySelectorAll(".post");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Animate once only
    }
  });
}, { threshold: 0.2 });

posts.forEach((post) => observer.observe(post));
