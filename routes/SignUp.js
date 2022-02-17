const express = require('express');
const router = express.Router();
module.exports = ({ addUser, getUserByEmail }) => {
    router.post("/", (req, res) => {

        const { first_name, last_name, healthcard, dob, email } =
            req.body;
        console.log(req.body)
        const user = {
            first_name,
            last_name,
            healthcard,
            dob,
            email,

        };
        console.log(user)
        if (
            user.first_name === "" ||
            user.last_name === "" ||
            user.healthcard === "" ||
            user.dob === "" ||
            user.email === " " ||
    ) {
            return res.statusCode(400).send("Please fill in all the required fields");
        }

        getUserByEmail(user.email)
            .then((response) => {
                if (response) {
                    res.json({
                        msg: "Account with this email address already exists",
                    });
                } else {
                    return addUser(user);
                }
            })
            .then((newUser) => res.json(newUser))
            .catch((err) => res.json({ error: err.message }));

    });
    return router;
};