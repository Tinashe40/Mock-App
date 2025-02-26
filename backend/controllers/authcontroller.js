const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
      // Check if the email already exists
      const [existingUser] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

      if (existingUser.length > 0) {
          return res.status(400).json({ message: "Email already registered. Please log in." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      await db.promise().query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

      return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
      console.error("❌ Error registering user:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
