// bmmg.js

document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');
  
    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
  
        // Toggle visibility
        if (answer.style.display === 'block') {
          answer.style.display = 'none';
          button.querySelector('i').classList.remove('fa-chevron-up');
          button.querySelector('i').classList.add('fa-chevron-down');
        } else {
          answer.style.display = 'block';
          button.querySelector('i').classList.remove('fa-chevron-down');
          button.querySelector('i').classList.add('fa-chevron-up');
        }
      });
    });
  });
  