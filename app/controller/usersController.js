const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { userObject, userObjectsArray } = require("../model");

module.exports = {
    register: async (name, lastName, email, password) => {
        let user = new userObject(name, lastName, email, await bcrypt.hash(password, 10))
        userObjectsArray.push(user)

        let token = await jwt.sign(
            {
                email: user.email,
                password: user.password
            },
            process.env.JWT_KEY,
            {
                expiresIn: "30s" // "1m", "1d", "24h"
            }
        );

        return(token)
    },
    confirmUser: async (token) => {
        let decoded = await jwt.verify(token, process.env.JWT_KEY)
        for(let i = 0; i < userObjectsArray.length; i++){
            if(userObjectsArray[i].email == decoded.email){
                userObjectsArray[i].confirmed = true
            }
        }
    },
    logIn: async (email, password) => {
        for(let i = 0; i < userObjectsArray.length; i++){
            if(userObjectsArray[i].email == email && userObjectsArray[i].confirmed == true && await bcrypt.compare(password, userObjectsArray[i].password)){
                let token = await jwt.sign(
                    {
                        email: userObjectsArray[i].email,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h" // "1m", "1d", "24h"
                    }
                );
        
                return(token)
            }
        }
    },
    get: () => {
        return(userObjectsArray)
    }
}