// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// const cards = document.querySelectorAll(".posts-card");

// cards.forEach((card, index) => {
//   setTimeout(() => {
//     card.classList.add("post-card-visible");
//   }, index * 400); // 200ms delay between each card
// });

const counter = document.getElementById("countUp");
const max = parseInt(counter.getAttribute("data-amount"));
let current = 0;

if (max > 50) {
  const interval = setInterval(() => {
    if (current >= max) {
      clearInterval(interval);
    } else {
      current++;
      counter.textContent = current;
    }
  }, 40); // 100ms interval (adjust as needed)
}
