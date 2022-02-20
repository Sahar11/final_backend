const express = require('express');
const router = express.Router();


module.exports = ({ getUserByEmail }) => {
    router.post("/", (req, res) => {
        const { email, password } = req.body;
        console.log("email", email);
        const errors = {
            email: "Enter Email",
            password: "Enter Password",
        };
        if (!email) {
            res.status(400).send(errors.email);
            return;
        } else if (!password) {
            res.status(400).send(errors.password);
            return;
        }

        getUserByEmail(email)
            .then((user) => {
                if (!user) {
                    return res.status(400).send("User with this email doesnot exist");
                }
                if (user.password === password) {
                    req.session.user_id = user.id;
                    res.status(200).send("Login Successful");
                } else {
                    res.status(400).send("Unsucessful Login");
                }
            })
            .catch((err) => err);
    });

    return router;
};