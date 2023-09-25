const form = document.getElementById("cardForm");
const cardHolderDisplay = document.getElementById("credit-card-holder");
const cardNumberDisplay = document.getElementById("credit-card-number");
const cardMonthDisplay = document.getElementById("exp-m");
const cardYearDisplay = document.getElementById("exp-y");
const cardCvcDisplay = document.getElementById("credit-card-cvc");

const usernameElement = document.getElementById("cardholderName");
const cardNumberElement = document.getElementById("cardNumber");
const expMonthElement = document.getElementById("expMonth");
const expYearElement = document.getElementById("expYear");
const cvcElement = document.getElementById("cvc");

//validation
const userNameValidation = /^[A-Za-z ]+$/;
const cardNumberValidation = /^\d{16}$/;
const monthValidation = /^(0[1-9]|1[0-2])$/;
const yearValidation = /^\d{2}$/;
const cvcValidation = /^\d{3}$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = form.cardholderName.value;
  const cardnumber = form.cardNumber.value;
  const monthnumber = form.expMonth.value;
  const yearnumber = form.expYear.value;
  const cvcnumber = form.cvc.value;

  //TODO
  if (userNameValidation.test(username)) {
    console.log(`${username} is valid`);
  } else {
    console.log(`${username} is not valid`);
  }

  if (cardNumberValidation.test(cardnumber)) {
    console.log(`${cardnumber} is valid`);
  } else {
    console.log(`${cardnumber} is not valid`);
  }

  if (monthValidation.test(monthnumber)) {
    console.log(`${monthnumber} is valid`);
  } else {
    console.log(`${monthnumber} is not valid`);
  }

  if (yearValidation.test(yearnumber)) {
    console.log(`${yearnumber} is valid`);
  } else {
    console.log(`${yearnumber} is not valid`);
  }

  if (cvcValidation.test(cvcnumber)) {
    console.log(`${cvcnumber} is valid`);
  } else {
    console.log(`${cvcnumber} is not valid`);
  }
});



const handleInput = (validationRegex, inputDisplay, inputData) => (e) => {
    const inputValue = e.target.value;

    if(e.target === usernameElement){
        if (inputValue.length > 28) {
            inputDisplay.innerText = inputValue.slice(0, 28) + "...";
          } else {
            inputDisplay.innerText = inputValue;
        }
    }

    else if(e.target === cardNumberElement){
        inputDisplay.innerText = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    } 

    else {
      inputDisplay.innerText = inputValue
    }
    
        
    if (validationRegex.test(inputValue)) {
      e.target.classList.add('valid-input');
      e.target.classList.remove('invalid-input');
      localStorage.setItem(inputData, inputValue)
    } else {
      e.target.classList.add('invalid-input');
      e.target.classList.remove('valid-input');
      localStorage.removeItem(inputData)
    }


  };

  const addDataToInput = (inputData, inputDisplay) => {
    const storedValue = localStorage.getItem(inputData);
    if (storedValue) {
      inputDisplay.innerText = storedValue;
    }
  };
  
  window.onload = () => {
    addDataToInput('username-data', cardHolderDisplay);
    addDataToInput('cardnumber-data', cardNumberDisplay);
    addDataToInput('month-data', cardMonthDisplay);
    addDataToInput('year-data', cardYearDisplay);
    addDataToInput('cvc-data', cardCvcDisplay);
  };

  
  usernameElement.addEventListener("keyup", handleInput(userNameValidation, cardHolderDisplay, 'username-data'));
  cardNumberElement.addEventListener("keyup", handleInput(cardNumberValidation, cardNumberDisplay, 'cardnumber-data'));
  expMonthElement.addEventListener("keyup", handleInput(monthValidation, cardMonthDisplay, 'month-data'));
  expYearElement.addEventListener("keyup", handleInput(yearValidation, cardYearDisplay, 'year-data'));
  cvcElement.addEventListener("keyup", handleInput(cvcValidation, cardCvcDisplay, 'cvc-data'));
