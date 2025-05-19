document.addEventListener("DOMContentLoaded", function () {
  // On form submit: disable the button and show spinner
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const submitBtn = form.querySelector(".prevent-multi-submit");
      if (!submitBtn) return;

      // Prevent second submission
      if (submitBtn.disabled) {
        e.preventDefault();
        return;
      }

      // Disable and show spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
			  <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
			`;
    });
  });
});

// Re-enable the button when user navigates back (from browser cache)
window.addEventListener("pageshow", () => {
  document.querySelectorAll(".prevent-multi-submit").forEach((btn) => {
    btn.disabled = false;
    // btn.innerHTML = ""; // Reset the button text
  });
});
