const express = require("express");
const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    
    if (!firstName || !lastName){
        throw new Error("Please Enter valid Name");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("Invalid EmailId");
    }
    else if (!password || !validator.isStrongPassword(password)){
        throw new Error("Your Password is not Strong");
    }
}
module.exports = {validateSignUpData};