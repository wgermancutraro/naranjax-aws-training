function calculateAge(birthday) {
  const birthDate = new Date(birthday); // birthday is a string in format YYYYMMDD
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = calculateAge;
