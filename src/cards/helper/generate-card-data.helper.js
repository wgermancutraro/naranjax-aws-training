function randomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function generateCardData() {
  const creditCardNumber = `${randomNumber(0000, 9999)}-${randomNumber(0000, 9999)}-${randomNumber(
    0000,
    9999
  )}-${randomNumber(0000, 9999)}`;
  const expirationDate = `${randomNumber(01, 12)}/${randomNumber(21, 35)}`;
  const securityCode = `${randomNumber(000, 999)}`;

  return {
    creditCardNumber,
    expirationDate,
    securityCode
  };
}

module.exports = generateCardData;
