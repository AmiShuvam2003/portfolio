document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Page loaded");

  // Inject reCAPTCHA safely after DOM loads
  const recaptchaDiv = document.getElementById("recaptcha-container");
  recaptchaDiv.innerHTML = `
    <div class="g-recaptcha" data-sitekey="${EMAILJS_CONFIG.RECAPTCHA_SITE_KEY}"></div>
  `;

  // Load reCAPTCHA render script if needed (just in case)
  if (!window.grecaptcha) {
    console.warn("⚠️ reCAPTCHA not ready yet, retrying...");
    setTimeout(() => location.reload(), 2000);
    return;
  }

  // Initialize EmailJS
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  // Add form submit handler
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    try {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert("⚠️ Please verify you're not a robot!");
        return;
      }

      // Send email using EmailJS
      emailjs
        .sendForm(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          this
        )
        .then(() => {
          alert("✅ Message sent successfully!");
          form.reset();
          grecaptcha.reset();
        })
        .catch((error) => {
          console.error("❌ Failed to send email:", error);
          alert("Something went wrong. Please try again!");
        });

    } catch (err) {
      alert("🔧 reCAPTCHA hasn’t fully loaded yet. Try again in a few seconds.");
      console.error("reCAPTCHA error:", err);
    }
  });
});
