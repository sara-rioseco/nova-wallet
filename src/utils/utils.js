export function utils() {
  const arePasswordsEqual = (input, confirm) => input === confirm;

  const isPasswordValid = password =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

  const isEmailValid = email =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  return {
    arePasswordsEqual,
    isPasswordValid,
    isEmailValid,
  };
}