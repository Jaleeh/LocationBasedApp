/* Does entered text conform to a valid email address? */
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/* Password must contain upper, lower, digit, special characters */
const passwordReg =
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

/*
 * Validate input
 * @param {string} input - input to validate
 * @param {string} type - type of validation
 * @param {boolean} required - input is required or not
 * @return {boolean} - true if valid, false if not
 */
export function validate(text, type, required) {
  if (required && !text) {
    return null;
  }

  if (type === 'email') {
    return emailReg.test(text) ? null : 'Invalid email address';
  } else if (type === 'password') {
    return passwordReg.test(text)
      ? null
      : 'Password must contain upper, lower, digit, special characters';
  }
  return null;
}

export default validate;
