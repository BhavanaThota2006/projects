document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const ilist = document.querySelector('.ilist');

    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('active');
        ilist.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuIcon.contains(event.target) && !ilist.contains(event.target)) {
            menuIcon.classList.remove('active');
            ilist.classList.remove('active');
        }
    });
}); 
// Show the button when user scrolls down
window.addEventListener('scroll', function() {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (window.scrollY > 300) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
});

// Smooth scroll to top when clicked
document.querySelector('.scroll-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// To refresh the page when click me btn in skill 
function refresh(){
  location.reload();
}


