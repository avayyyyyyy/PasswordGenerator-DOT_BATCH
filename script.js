const passwordDisplay = document.getElementById("password");
const copyPass = document.getElementById("copyPass");
const isCopied = document.getElementById("isCopied");
const rangevalue = document.getElementById("rangevalue");
const rangeSelect = document.getElementById("rangeSelect");
const includeUpper = document.getElementById("includeUpper");
const includeLower = document.getElementById("includeLower");
const includeNumber = document.getElementById("includeNumber");
const includeSymbol = document.getElementById("includeSymbol");
const strengthColor = document.getElementById("strengthColor");
const generatePassword = document.getElementById("generatePassword");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let checkCount = 1;

setStrengthColor = function (color) {
  strengthColor.style.backgroundColor = color;
  strengthColor.style.boxShadow = color;
};

getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

generateRandomInteger = () => {
  return getRandomInteger(0, 10);
};
generateLowerCase = () => {
  return String.fromCharCode(getRandomInteger(97, 123));
};
generateUpperCase = () => {
  return String.fromCharCode(getRandomInteger(65, 91));
};
generateSymbol = () => {
  const getRnd = getRandomInteger(0, symbols.length);
  return symbols.charAt(getRnd);
};

getStrength = () => {
  let hasUpper = includeUpper.checked;
  let hasLower = includeLower.checked;
  let hasNumber = includeNumber.checked;
  let hasSymbol = includeSymbol.checked;

  if (
    hasUpper &&
    hasLower &&
    (hasNumber || hasSymbol) &&
    rangevalue.value <= 8
  ) {
    setStrengthColor("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasSymbol || hasNumber) &&
    rangevalue.value >= 6
  ) {
    setStrengthColor("#ff0");
  } else {
    setStrengthColor("#f00");
  }
};

rangeSelect.addEventListener("input", () => {
  rangevalue.value = rangeSelect.value;
  rangevalue.innerText = rangeSelect.value;

  if (rangevalue.value < 4 && checkCount > 0) {
    rangevalue.value = 4;
    rangevalue.innerText = "4";
  }
});

function passCopiedf() {
  if (passwordDisplay.innerText !== "PASSWORD") {
    async function passCopied() {
      let cb = passwordDisplay.innerText;
      await navigator.clipboard.writeText(cb);
      isCopied.innerText = "Copied";
    }
    passCopied();
  } else {
    isCopied.innerText = "Select Options First!!";
  }
}

setInterval(() => {
  isCopied.innerText = "";
  isCopied.style.opacity = "1";
}, 2000);

function handleCheckboxChanged() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckboxChanged);
});

generatePassword.addEventListener("click", () => {
  const length = parseInt(rangevalue.value);
  if (isNaN(length) || length < 1 || length > 20) {
    rangevalue.value = 10; 
    passwordDisplay.innerText = "Invalid Length";
    return;
  }

  if (checkCount <= 0) return;

  password = "";

  const funcArr = [];

  if (includeUpper.checked) {
    funcArr.push(generateUpperCase);
  }
  if (includeLower.checked) {
    funcArr.push(generateLowerCase);
  }
  if (includeNumber.checked) {
    funcArr.push(generateRandomInteger);
  }
  if (includeSymbol.checked) {
    funcArr.push(generateSymbol);
  }

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  const remainingChars = length - password.length;

  for (let i = 0; i < remainingChars; i++) {
    let randIndex = getRandomInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  password = passwordShuffle();
  
  passwordDisplay.innerText = password; 
});

function passwordShuffle() {
  const passwordArray = password.split("");

  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
}
