

const isValidNames = (value) => {
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


module.exports = {isValidEmail , isValidNames}

