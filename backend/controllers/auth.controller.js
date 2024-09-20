export const register = (req, res) => res.send("hoal")
    // const { username, email, password } = req.body;

    // pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    //     if (err) {
    //         return res.status(500).send({ message: "Error checking user" });
    //     }
    //     if (results.length > 0) {
    //         return res.status(400).send({ message: "User already exists" });
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
    //         [username, email, hashedPassword], (err, results) => {
    //             if (err) {
    //                 return res.status(500).send({ message: "Error registering user" });
    //             }
    //             res.status(201).send({ message: "User registered successfully!" });
    //         }
    //     );
    // });

export const login = (req, res) => {
    console.log("we are in the register")
}