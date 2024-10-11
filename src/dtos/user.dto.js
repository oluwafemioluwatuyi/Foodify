// const { Expose } = require('class-transformer');
// const USER_TYPES = require('./enumConstant/userTypes');

// class UserDTO {
//     @Expose()
//     firstName;

//     @Expose()
//     lastName;

//     @Expose()
//     email;
    
//     @Expose()
//     phone;

//     @Expose()
//     isEmailVerified;

//     @Expose()
//     emailVerificationToken;

//     @Expose()
//     passwordResetToken;

//     @Expose()
//     tokenExpirationDate;

//     @Expose()
//     user_type;
// }

// module.exports = UserDTO;
// src/dtos/user.dto.js

class UserDto {
  constructor({ 
    firstName, 
    lastName, 
    email, 
    phone, 
    dateOfBirth, 
    userType 
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.userType = userType; // e.g., customer, vendor, driver
    // Add other properties as needed
  }

  // Method to get user info as an object
  toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      userType: this.userType
    };
  }

  // Add more methods if needed, like formatting, validation, etc.
}

module.exports = UserDto;
