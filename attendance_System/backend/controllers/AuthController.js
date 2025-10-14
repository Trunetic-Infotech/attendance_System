import user from "../config/db.js";
import admin from "../config/db.js";

export const AuthRegister = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phonenumber,
      email,
      role,
      gender,
      subject,
      aadharcard,
      experience,
      date_of_birth,
      address,
      teacher_id,
    } = req.body;

    console.log(req.body);
    // 1️⃣ Validate required fields
    if (
      !firstname ||
      !lastname ||
      !phonenumber ||
      !email ||
      !gender ||
      !subject ||
      !aadharcard ||
      !experience ||
      !date_of_birth ||
      !address
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "Inavlid Email -  please enter correct Email",
      });
    }

    // 3️⃣ Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      return res.status(400).send({
        success: false,
        message: "Invalid phone number (must be 10 digits)",
      });
    }

    // 4️⃣ Check if user already exists
    const [existingUser] = await user.execute(
      "SELECT * FROM user WHERE email = ? OR phonenumber = ?",
      [email, phonenumber]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    // 5️⃣ Insert user (final step)
    const [result] = await user.execute(
      `INSERT INTO user 
      (firstname, lastname, phonenumber, email, role, gender, subject, aadharcard, experience, date_of_birth, address, teacher_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        phonenumber,
        email,
        role,
        gender,
        subject,
        aadharcard,
        experience,
        date_of_birth,
        address,
        teacher_id,
      ]
    );

    // 6️⃣ Success response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};

//* Admin Register Controller---------------------------------------------------------------
export const AdminRegister = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phonenumber,
      email,
      gender,
      aadharcard,
      date_of_birth,
      address,
    } = req.body;

    // 1️⃣ Validate required fields
    if (
      !firstname ||
      !lastname ||
      !phonenumber ||
      !email ||
      !gender ||
      !aadharcard ||
      !date_of_birth ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "Inavlid Email -  please enter correct Email",
      });
    }

    // 3️⃣ Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      return res.status(400).send({
        success: false,
        message: "Invalid phone number (must be 10 digits)",
      });
    }

    // 4️⃣ Check if user already exists
    const [existingUser] = await admin.execute(
      "SELECT * FROM admin WHERE email = ? OR phonenumber = ?",
      [email, phonenumber]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    // 5️⃣ Insert user (final step)
    const [result] = await admin.execute(
      `INSERT INTO admin 
      (firstname, lastname, phonenumber, email, gender, aadharcard, date_of_birth, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        phonenumber,
        email,
        gender,
        aadharcard,
        date_of_birth,
        address,
      ]
    );

    // 6️⃣ Success response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};

//* Teacher Login Controller----------------------------------------------------------
export const TeacherLogin = async () => {
  try {
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};
