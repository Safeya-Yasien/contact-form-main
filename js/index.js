document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
    consent: document.getElementById("consent"),
    queryType: document.querySelectorAll('input[name="queryType"]'),
  };

  const errors = {
    firstName: document.getElementById("firstNameError"),
    lastName: document.getElementById("lastNameError"),
    email: document.getElementById("emailError"),
    message: document.getElementById("messageError"),
    consent: document.getElementById("consentError"),
    queryType: document.getElementById("queryTypeError"),
  };

  // Apply green border on focus
  Object.values(fields).forEach((field) => {
    if (NodeList.prototype.isPrototypeOf(field)) return; 
    field.addEventListener("focus", (e) => {
      e.target.style.borderColor = "hsl(169, 82%, 27%)";
    });
    field.addEventListener("blur", (e) => {
      e.target.style.borderColor = "hsl(186, 15%, 59%)";
    });

    // Detect if the user corrects the error
    field.addEventListener("input", (e) => {
      validateField(e.target);
    });
  });

  // Custom radio styles for queryType
  fields.queryType.forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".radio-box").forEach((box) => {
        box.style.borderColor = "hsl(186, 15%, 59%)"; // Reset to default
        box.style.backgroundColor = "transparent"; // Reset background
      });

      // Apply green border to the selected radio box
      const selected = radio.closest(".radio-box");
      selected.style.borderColor = "hsl(169, 82%, 27%)";
      selected.style.backgroundColor = "hsl(148, 38%, 91%)";

      // Hide the error when a selection is made
      errors.queryType.style.display = "none";
    });
  });

  // Form validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset all error states and borders
    Object.values(errors).forEach((err) => (err.style.display = "none"));
    document.querySelectorAll("input, textarea").forEach((el) => {
      el.style.borderColor = "hsl(186, 15%, 59%)";
    });

    // Validate all required fields
    ["firstName", "lastName", "email", "message"].forEach((key) => {
      const field = fields[key];
      if (field.value.trim() === "") {
        errors[key].style.display = "block";
        field.style.borderColor = "hsl(0, 66%, 54%)";
        isValid = false;
      }
    });

    // Email format validation
    const email = fields.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email.textContent = "Please enter a valid email address";
      errors.email.style.display = "block";
      fields.email.style.borderColor = "hsl(0, 66%, 54%)";
      isValid = false;
    }

    // Radio validation
    const selectedRadio = [...fields.queryType].some((r) => r.checked);
    if (!selectedRadio) {
      errors.queryType.style.display = "block";
      isValid = false;
    }

    // Consent checkbox
    if (!fields.consent.checked) {
      errors.consent.style.display = "block";
      isValid = false;
    }

    // If valid
    if (isValid) {
      document.getElementById("successMessage").classList.remove("hidden");
      form.reset();

      // Reset custom radio UI
      document.querySelectorAll(".radio-box").forEach((box) => {
        box.style.borderColor = "hsl(186, 15%, 59%)";
        box.style.backgroundColor = "transparent";
      });
    }
  });

  // Function to validate each field
  function validateField(field) {
    if (field.value.trim() === "") {
      field.style.borderColor = "hsl(0, 66%, 54%)";
      errors[field.id].style.display = "block";
    } else {
      field.style.borderColor = "hsl(169, 82%, 27%)";
      errors[field.id].style.display = "none";
    }
  }
});
