document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");
  
    questions.forEach((question) => {
      question.addEventListener("click", function () {
        const answer = this.nextElementSibling;
        const icon = this.querySelector(".toggle-icon");
  
        // Toggle visibility
        answer.classList.toggle("show");
  
        // Change + to −
        if (icon.classList.contains("fa-plus")) {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
        } else {
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
        }
      });
    });
  });
  