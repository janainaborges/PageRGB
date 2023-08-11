$(document).ready(function () {
  loadImages();
  loadPages();
});

function loadImages() {
  $.ajax({
    url: "http://localhost:8000/items",
    method: "GET",
    dataType: "json",
    success: function (data) {
      const itemsHTML = data
        .map(
          (item) =>
            `<div class="box-image" data-title="Nome do Álbum ${item.title}" data-likes="Likes: ${item.numberLike}" data-tweets="Tweets: ${item.numberTwitter}">
              <img src="/assets/photo.jpeg" alt="" class="image-on-card">
            </div>`
        )
        .join("");
      $("#items-list").html(itemsHTML);
    },
    error: function (err) {
      console.error("Erro ao buscar dados:", err);
    },
  });
  
  $(document).on("click", ".box-image", function () {
    const title = $(this).data('title');
    const likes = $(this).data('likes');
    const tweets = $(this).data('tweets');
    
    const details = `${title}<br>${likes}<br>${tweets}`;
    $("#imageDetails").html(details);
    $("#imageModal").css("display", "block");
  });

  $("#closeModal").click(function () {
    $("#imageModal").css("display", "none");
  });

  $(window).click(function (event) {
    if (event.target == document.getElementById("imageModal")) {
      $("#imageModal").css("display", "none");
    }
  });
}

function loadPages() {
  const pages = [
    "Página 1",
    "Página 2",
    "Página 3",
    "Página 4",
    "Página 5",
    "Página 6",
    "Página 7",
  ];

  const listElement = document.getElementById("dynamic-list");

  pages.forEach((page) => {
    const li = document.createElement("li");
    li.textContent = page;
    listElement.appendChild(li);
  });
}
