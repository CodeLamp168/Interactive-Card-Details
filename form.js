// Constants for DOM elements
const form = document.getElementById("cardForm");
const cardThankYou = document.getElementById("thank-you-display");
const continueBtn = document.getElementById('continue-btn');
const cardHolderDisplay = document.getElementById("credit-card-holder");
const cardNumberDisplay = document.getElementById("credit-card-number");
const cardMonthDisplay = document.getElementById("exp-m");
const cardYearDisplay = document.getElementById("exp-y");
const cardCvcDisplay = document.getElementById("credit-card-cvc");

// Constants for input elements
const usernameElement = document.getElementById("cardholderName");
const cardNumberElement = document.getElementById("cardNumber");
const expMonthElement = document.getElementById("expMonth");
const expYearElement = document.getElementById("expYear");
const cvcElement = document.getElementById("cvc");

// Validation regex patterns
const userNameValidation = /^[A-Za-z ]+$/;
const cardNumberValidation = /^\d{16}$/;
const monthValidation = /^(0[1-9]|1[0-2])$/;
const yearValidation = /^\d{2}$/;
const cvcValidation = /^\d{3}$/;

// Function to validate form submission
function validateForm(e) {
  e.preventDefault();
  const username = form.cardholderName.value;
  const cardnumber = form.cardNumber.value;
  const monthnumber = form.expMonth.value;
  const yearnumber = form.expYear.value;
  const cvcnumber = form.cvc.value;

  let allFieldsValid = true;

  if (!userNameValidation.test(username)) {
    allFieldsValid = false;
    console.log('Username not valid');
  }

  if (!cardNumberValidation.test(cardnumber)) {
    allFieldsValid = false;
  }

  if (!monthValidation.test(monthnumber)) {
    allFieldsValid = false;
  }

  if (!yearValidation.test(yearnumber)) {
    allFieldsValid = false;
  }

  if (!cvcValidation.test(cvcnumber)) {
    allFieldsValid = false;
  }

  if (allFieldsValid) {
    form.style.display = 'none';
    cardThankYou.style.display = 'flex';
  }
}

// Function to handle input changes
function handleInput(validationRegex, inputDisplay, inputData, defaultValue) {
  return function (e) {
    const inputValue = e.target.value;

    if (e.target === usernameElement) {
      inputDisplay.innerText = inputValue.length > 28 ? inputValue.slice(0, 28) + "..." : inputValue;
    } else if (e.target === cardNumberElement) {
      inputDisplay.innerText = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else {
      inputDisplay.innerText = inputValue;
    }

    if (inputValue === '') {
      inputDisplay.innerText = defaultValue;
    }

    if (validationRegex.test(inputValue)) {
      e.target.classList.add('valid-input');
      e.target.classList.remove('invalid-input');
      localStorage.setItem(inputData, inputValue);
    } else {
      e.target.classList.add('invalid-input');
      e.target.classList.remove('valid-input');
      localStorage.removeItem(inputData);
    }
  };
}

// Function to add data to input elements
function addDataToInput(inputData, inputDisplay, validationRegex, inputType, defaultValue) {
  const storedValue = localStorage.getItem(inputData);
  if (storedValue) {
    inputDisplay.innerText = storedValue;
    inputType.value = storedValue;
    inputType.classList.toggle('valid-input', validationRegex.test(storedValue));

    if (inputType === cardNumberElement) {
      inputDisplay.innerText = storedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    if (inputType === usernameElement) {
      inputDisplay.innerText = storedValue.length > 28 ? storedValue.slice(0, 28) + "..." : storedValue;
    }
  } else {
    inputDisplay.innerText = defaultValue;
  }
}

// Event listeners
form.addEventListener("submit", validateForm);

usernameElement.addEventListener("keyup", handleInput(userNameValidation, cardHolderDisplay, 'username-data', 'Jane Appleseed'));
cardNumberElement.addEventListener("keyup", handleInput(cardNumberValidation, cardNumberDisplay, 'cardnumber-data', '0000 0000 0000 0000'));
expMonthElement.addEventListener("keyup", handleInput(monthValidation, cardMonthDisplay, 'month-data', '00'));
expYearElement.addEventListener("keyup", handleInput(yearValidation, cardYearDisplay, 'year-data', '00'));
cvcElement.addEventListener("keyup", handleInput(cvcValidation, cardCvcDisplay, 'cvc-data', '000'));

window.onload = () => {
  addDataToInput('username-data', cardHolderDisplay, userNameValidation, usernameElement, 'Jane Appleseed');
  addDataToInput('cardnumber-data', cardNumberDisplay, cardNumberValidation, cardNumberElement, '0000 0000 0000 0000');
  addDataToInput('month-data', cardMonthDisplay, monthValidation, expMonthElement, '00');
  addDataToInput('year-data', cardYearDisplay, yearValidation, expYearElement, '00');
  addDataToInput('cvc-data', cardCvcDisplay, cvcValidation, cvcElement, '000');
};

continueBtn.addEventListener("click", () => {
  localStorage.removeItem('username-data');
  localStorage.removeItem('cardnumber-data');
  localStorage.removeItem('month-data');
  localStorage.removeItem('year-data');
  localStorage.removeItem('cvc-data');
  form.reset();
  window.location.reload();
});
