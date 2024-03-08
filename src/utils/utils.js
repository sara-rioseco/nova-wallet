export function utils() {
  const arePasswordsEqual = (input, confirm) => input === confirm;

  const isPasswordValid = p =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(p);

  const isEmailValid = e =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e);

  const cap = s =>
    typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : null;

  return {
    arePasswordsEqual,
    isPasswordValid,
    isEmailValid,
    cap,
  };
}
