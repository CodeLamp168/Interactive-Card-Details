
const cardHolderNameInput = document.getElementById('cardholderName');
const cardNumberInput = document.getElementById('cardNumber');
const expMonthInput = document.getElementById('expMonth');
const expYearInput = document.getElementById('expYear');
const cvcInput = document.getElementById('cvc');

const cardDisplayName = document.getElementById('credit-card-holder');
const cardDisplayNumber = document.getElementById('credit-card-number');
const cardDisplayMonth = document.getElementById('exp-m');
const cardDisplayYear = document.getElementById('exp-y');
const cardDisplayCVC = document.getElementById('credit-card-cvc');

const cardHolderValidation = /^[A-Za-z\s]+$/
const cardNumberValidation = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/
const cardMonthValidation = /^(0[1-9]|1[0-2])$/
const cardYearValidation = /^\d{2}$/
const cardCVCValidation = /^\d{3}$/

const form = document.getElementById('cardForm');
const completeContent = document.getElementById('thank-you-display')
const submitButton = document.getElementById('submitButton');
const continueButton = document.getElementById('continue-btn')

const errorDiv = document.createElement('div')
errorDiv.className = 'error-notification'






function validation(inputElement, cardDisplay, regexPattern, errorText) {
    const value = inputElement.value.trim();
    const cardDisplayOriginalHTML = cardDisplay.innerHTML;
    inputElement.parentElement.appendChild(errorDiv);

    

    if (value === '') {
        inputElement.classList.remove('valid', 'invalid');
        errorDiv.classList.add('notification-hide')
        inputElement.classList.add('empty');
        cardDisplay.textContent = cardDisplayOriginalHTML;

    }
    else if (regexPattern.test(value)) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorDiv.classList.remove('invalid-notification')
        errorDiv.classList.add('notification-hide')
        cardDisplay.textContent = value;

    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        errorDiv.classList.remove('notification-hide')
        errorDiv.classList.add('invalid-notification')
        cardDisplay.textContent = cardDisplayOriginalHTML;
        errorDiv.textContent = errorText
    }

    inputElement.setAttribute('data-true-value', value);

}

function formatCardNumber(inputElement) {
    const value = inputElement.value.replace(/\s/g, '');
    const formattedValue = [];

    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue.push(' '); 
        }
        formattedValue.push(value[i]);
    }

    inputElement.value = formattedValue.join('');

    inputElement.setAttribute('data-true-value', value);
}



cardHolderNameInput.addEventListener('input', () => {
    validation(cardHolderNameInput, cardDisplayName, cardHolderValidation, 'Please enter alphabetic characters only');
});

cardNumberInput.addEventListener('input', () => {
    formatCardNumber(cardNumberInput); 
    validation(cardNumberInput, cardDisplayNumber, cardNumberValidation, 'Please enter 16 numeric digits only'); 
    resetFunction(cardNumberInput)
    const trueValue = cardNumberInput.getAttribute('data-true-value');
});

expMonthInput.addEventListener('input', () => {
    validation(expMonthInput, cardDisplayMonth, cardMonthValidation, 'Must be filled');
    resetFunction(cardNumberInput)
});

expYearInput.addEventListener('input', () => {
    validation(expYearInput, cardDisplayYear, cardYearValidation, 'Must be filled');
});

cvcInput.addEventListener('input', () => {
    validation(cvcInput, cardDisplayCVC, cardCVCValidation, 'Must be filled');
});



function areAllInputsValid() {
    const inputs = form.querySelectorAll('input:not([type="submit"])');
    for (const input of inputs) {
        if (!input.classList.contains('valid')) {
            return false;
        }
    }
    return true;
}


form.addEventListener('input', () => {
    if (areAllInputsValid()) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'true');
    }
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.style.display = 'none'
    completeContent.style.display = 'flex'
    console.log('Form submitted successfully!');
});

continueButton.addEventListener('click', () => {
    location.reload();
    console.log('button pressed');
});

window.addEventListener('load', function () {
    cardHolderNameInput.value = '';
    cardNumberInput.value = '';
    expMonthInput.value = '';
    expYearInput.value = '';
    cvcInput.value = '';
  });