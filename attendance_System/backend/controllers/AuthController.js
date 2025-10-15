import user from "../config/db.js";
import admin from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//* TEACHER REGISTER CONTROLLER LOGIC CODE
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
      password,
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
      !address ||
      !password
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

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Insert user (final step)
    const [result] = await user.execute(
      `INSERT INTO user 
      (firstname, lastname, phonenumber, email, role, gender, subject, aadharcard, experience, date_of_birth, address, teacher_id, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        hashedPassword,
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

//* ADMIN REGISTER CONTROLLER LOGIC CODE
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
      password,
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
      !address ||
      !password
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Insert user (final step)
    const [result] = await admin.execute(
      `INSERT INTO admin 
      (firstname, lastname, phonenumber, email, gender, aadharcard, date_of_birth, address, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        phonenumber,
        email,
        gender,
        aadharcard,
        date_of_birth,
        address,
        hashedPassword,
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

//* TEACHER LOGIN CONTROLLER LOGIC CODE
export const TeacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check if teacher exists
    const [existingTeacher] = await user.execute(
      "SELECT * FROM user WHERE email = ? AND role = 'teacher'",
      [email]
    );
    if (existingTeacher.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found or not registered as teacher",
      });
    }
    const teacher = existingTeacher[0];

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      {
        id: teacher.id,
        email: teacher.email,
        role: teacher.role,
        teacher_id: teacher.teacher_id,
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    // 5️⃣ Respond success
    res.status(200).json({
      success: true,
      message: "Teacher login successful",
      token,
      teacher: {
        id: teacher.id,
        teacher_id: teacher.teacher_id,
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        email: teacher.email,
        role: teacher.role,
        subject: teacher.subject,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while logging in teacher",
    });
  }
};

//* ADMIN LOGIN CONTROLLER LOGIC CODE
export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate Inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check if Admin Exists
    const [existingAdmin] = await admin.execute(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (existingAdmin.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const adminData = existingAdmin[0];

    // 3️⃣ Compare Password
    const isMatch = await bcrypt.compare(password, adminData.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 4️⃣ Generate JWT Token
    const token = jwt.sign(
      {
        id: adminData.id,
        email: adminData.email,
        role: adminData.role,
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "2h" }
    );

    // 5️⃣ Success Response
    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: adminData.id,
        firstname: adminData.firstname,
        lastname: adminData.lastname,
        email: adminData.email,
        role: adminData.role,
        phonenumber: adminData.phonenumber,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging in admin",
    });
  }
};
