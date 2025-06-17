window.onload = function () {
  console.log("Page is fully loaded");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for your message! 🚀 I’ll get back to you soon.");
  this.reset();
});

  const profileToggle = document.getElementById("profileToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  console.log("profileToggle:", profileToggle);
  console.log("dropdownMenu:", dropdownMenu);

  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!profileToggle.contains(e.target)) {
      dropdownMenu.style.display = "none";
    }
  });
};
