document.addEventListener("DOMContentLoaded", function () {
  //I used mine, so if it's a new devloper reading this comment,  contact me for help! {kabelosamkelo19@gmail.com}
  emailjs.init("Ek4O3pznjchURi7UR"); //  public key 

  const form = document.getElementById("subscribeForm");
  const emailInput = form.querySelector('input[type="email"]');
  const messageEl = document.getElementById("subscribeMessage");

  let submittedEmails = new Set();
  let lastSubmissionTime = 0;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const now = Date.now();

    if (now - lastSubmissionTime < 10000) {
      messageEl.textContent = "Please wait a few seconds before subscribing again.";
      messageEl.style.color = "orange";
      return;
    }

    if (!validateEmail(email)) {
      messageEl.textContent = "Please enter a valid email address.";
      messageEl.style.color = "red";
      return;
    }

    if (submittedEmails.has(email)) {
      messageEl.textContent = `You're already subscribed, ${email}. God bless you!🙏🏽`;
      messageEl.style.color = "blue";
      return;
    }

    emailjs.send("service_w9nn1gl", "template_pmhmw0q", {
      subscriber_email: email,
      email: email,
    }).then(() => {
      submittedEmails.add(email);
      lastSubmissionTime = now;
      // Success message and confetti burst
      messageEl.style.color = '#27ae60';
      messageEl.innerHTML = '🎉 You\'re on the list! Watch your inbox for joyful updates! <span style="font-size:1.2em;">🥳</span>';
      // Confetti burst effect
      let burst = document.createElement('div');
      burst.className = 'confetti-burst';
      burst.innerHTML = '🎊🎉✨🎈';
      burst.style.position = 'absolute';
      burst.style.left = '50%';
      burst.style.top = '30%';
      burst.style.transform = 'translate(-50%, -50%) scale(1.2)';
      burst.style.fontSize = '2.2em';
      burst.style.pointerEvents = 'none';
      burst.style.animation = 'burstFade 1.2s forwards';
      const subscribeSection = document.querySelector('.subscribe-section');
      if (subscribeSection) {
      subscribeSection.appendChild(burst);
      setTimeout(() => burst.remove(), 1200);
      }
      emailInput.value = "";
      setTimeout(() => {
      form.reset();
      }, 900);
    }).catch((error) => {
      console.error("EmailJS error:", error);
      // Error message with shake animation
      messageEl.textContent = "Oops! Something went wrong, but it's not your fault. Please try again.";
      messageEl.style.color = "red";
      messageEl.style.animation = "shake 0.4s";
      // Add a sad emoji animation
      let sadFace = document.createElement('span');
      sadFace.textContent = "😢";
      sadFace.style.display = "inline-block";
      sadFace.style.marginLeft = "8px";
      sadFace.style.animation = "bounce 0.8s";
      messageEl.appendChild(sadFace);
      // Remove animation after it finishes
      setTimeout(() => {
      messageEl.style.animation = "";
      sadFace.remove();
      }, 800);
    });

    // Add keyframes for animations if not already present
    if (!document.getElementById('subscribe-animations')) {
      const style = document.createElement('style');
      style.id = 'subscribe-animations';
      style.textContent = `
      @keyframes burstFade {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1.2);}
        80% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(2);}
      }
      @keyframes shake {
        0% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-8px); }
        80% { transform: translateX(8px); }
        100% { transform: translateX(0); }
      }
      @keyframes bounce {
        0% { transform: translateY(0);}
        30% { transform: translateY(-10px);}
        50% { transform: translateY(0);}
        70% { transform: translateY(-6px);}
        100% { transform: translateY(0);}
      }
      `;
      document.head.appendChild(style);
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
