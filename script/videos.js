const vdGallery = document.querySelector(".video-grid");

let vdHtml = "";
videos.forEach((videoUrl) => {
  vdHtml += `<iframe src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`;
});
vdGallery.innerHTML = vdHtml;