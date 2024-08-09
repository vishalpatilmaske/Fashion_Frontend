// validate the data at client side
export const validation = () => {
  if (email.trim() === "") {
    toast.warn("Email can't be empty");
    return false;
  }
  if (password.trim() === "") {
    toast.warn("Password can't be empty");
    return false;
  }
  if (conPassword.trim() === "") {
    toast.warn("Confirm Password can't be empty");
    return false;
  }
  if (password !== conPassword) {
    toast.warn("Passwords do not match");
    return false;
  }
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (!specialCharacters.test(password)) {
    toast.warn("Password must contain at least one special character");
    return false;
  }
  if (!/\d/.test(password)) {
    toast.warn("Password must contain at least one number");
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    toast.warn("Password must contain at least one uppercase letter");
    return false;
  }
  if (!/[a-z]/.test(password)) {
    toast.warn("Password must contain at least one lowercase letter");
    return false;
  }
  return true;
};
