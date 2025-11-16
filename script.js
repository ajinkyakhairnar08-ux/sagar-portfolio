// Scroll reveal animation
window.addEventListener('scroll', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });
});

// Smooth scroll to contact
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Contact form popup
document.querySelector(".contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Message sent successfully!");
  this.reset();
});

// Hamburger menu toggle
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
