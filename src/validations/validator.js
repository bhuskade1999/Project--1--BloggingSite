

const isValid = (value) => {
      if (typeof value === "undefined" || value === null) {
            return false
      }
      if (typeof value === "string" && value.trim().length > 0) {
            return true
      }
}

const isValidEmail = (value) => { //Sanhilrai143@gmail.com.org
      const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/
      return emailRegex.test(value)
}
//   (/^
// (?=.*\d)                //should contain at least one digit
// (?=.*[a-z])             //should contain at least one lower case
// (?=.*[A-Z])             //should contain at least one upper case
// [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

// $/)


const isValidPassword = (value) => {
      const passRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/
      return passRegex.test(value)
}


module.exports = {isValidEmail, isValidPassword , isValid}

