const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );
  
  export function validateLoginForm(user) {
    const errors = {};
    if (!user.email) errors.email = "Email address is required";
    else if (!emailRegex.test(user.email)) errors.email = "Email address is not valid";
    if (!user.password) errors.password = "Password is required";
    return errors;
  }
  