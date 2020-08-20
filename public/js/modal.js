$(document).ready(function () {
  // Burger
  $("#nav-toggle").on("click", function (event) {
    event.preventDefault();
    $("#nav").toggleClass("active");
  });
  // Header--fixed
  window.onscroll = function showHeader() {
    let header = document.querySelector(".header");
    if (window.pageYOffset > 300) {
      header.classList.add("header--fixed");
    } else if (window.pageYOffset < 10) {
      header.classList.remove("header--fixed");
    }
  };
});
