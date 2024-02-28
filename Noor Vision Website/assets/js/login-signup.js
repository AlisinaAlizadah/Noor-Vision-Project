const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});





// Form Validation 

// Select the input fields and form
const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');

// Add submit event listener to the form
form.addEventListener('submit', function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Validate the form fields
    let isValid = validateForm();

    // If the form is valid, submit the form
    if (isValid) {
        form.submit();
    }
});

// Utility functions for form validation
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};
const showError = (input, message) => {
    // Get the form-field element
    const formField = input.parentElement;

    // Remove the success class and add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // Show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    // Get the form-field element
    const formField = input.parentElement;

    // Remove the error class and add the success class
    formField.classList.remove('error');
    formField.classList.add('success');

    // Remove the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};
const validateForm = () => {
    let isValid = true;

    // Validate the username field
    if (!isRequired(usernameEl.value)) {
        showError(usernameEl, 'Username is required');
        isValid = false;
    } else {
        showSuccess(usernameEl);
    }

    // Validate the email field
    if (!isEmailValid(emailEl.value)) {
        showError(emailEl, 'Email is invalid');
        isValid = false;
    } else {
        showSuccess(emailEl);
    }

    // Validate the password field
    if (!isRequired(passwordEl.value)) {
        showError(passwordEl, 'Password is required');
        isValid = false;
    } else if (!isPasswordSecure(passwordEl.value)) {
        showError(passwordEl, 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character');
        isValid = false;
    } else {
        showSuccess(passwordEl);
    }

    // Validate the confirm password field
    if (!isRequired(confirmPasswordEl.value)) {
        showError(confirmPasswordEl, 'Confirm Password is required');
        isValid = false;
    } else if (passwordEl.value !== confirmPasswordEl.value) {
        showError(confirmPasswordEl, 'Passwords do not match');
        isValid = false;
    } else {
        showSuccess(confirmPasswordEl);
    }

    return isValid;
};