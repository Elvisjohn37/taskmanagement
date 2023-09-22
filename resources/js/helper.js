export const validateEmail = (email) => {
  var regEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(regEmail);
};

export const validateFullName = (fullname) => {
  var regFullName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return fullname.match(regFullName);
};
