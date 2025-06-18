// This script handles the FAQ section of the page, allowing users to click on questions to reveal answers.
// It also toggles the icon between a plus and minus sign to indicate whether the answer is shown or hidden.
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('i');

      btn.classList.toggle('active');
      answer.classList.toggle('show');
    });
  });
   window.addEventListener('scroll', () => {
    const motto = document.querySelector('.Motto');
    const mottoTop = motto.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (mottoTop < windowHeight - 100) {
      motto.classList.add('visible');
    }
  });

