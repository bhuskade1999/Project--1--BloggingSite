

const isValid = (value) => {
      if (typeof value === "undefined" || value === null || value === "") {
            return false
      }
      if (typeof value === "string" && value.trim().length > 0) {
            return true
      }
}

 //string validation
const isValidName = (value)=> {
      const nameRegex = /^[a-zA-Z]{1,20}$/
      return nameRegex.test(value)

}

  //email validation
const isValidEmail = (value) => { //Sanhilrai143@gmail.com.org
      const emailRegex = /^[a-z]{1}[a-z0-9]{1,50}@[1}[a-z]{2,20}[.]{1}[a-z.]{2,10}$/
      return emailRegex.test(value)
}




 //password validation
const isValidPassword = (value) => {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/  
      return passRegex.test(value)
}





//regix property

//   (/^

// (?=.*\d)                //should contain at least one digit
// (?=.*[a-z])             //should contain at least one lower case
// (?=.*[A-Z])             //should contain at least one upper case
// [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

// $/)






module.exports = { isValidName, isValidEmail, isValidPassword , isValid }

