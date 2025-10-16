import studentTable from "../config/db.js";
export const AddStudent = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      gender,
      date_of_birth,
      address,
      aadharcard,
      class_id,
      subclass_id,
      admin_id,
    } = req.body;

    // 1️⃣ Check if all fields are present
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phonenumber ||
      !gender ||
      !date_of_birth ||
      !address ||
      !aadharcard ||
      !class_id ||
      !subclass_id ||
      !admin_id
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(req.file); // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 3️⃣ Check if student already exists
    const [existingStudent] = await studentTable.execute(
      "SELECT * FROM studentTable WHERE email = ? OR aadharcard = ?",
      [email, aadharcard]
    );

    if (existingStudent.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student already exists with this email or Aadhar card",
      });
    }

    const [result] = await studentTable.execute(
      `INSERT INTO studentTable 
        (firstname, lastname, email, phonenumber, gender, date_of_birth, address, aadharcard, class_id, subclass_id, admin_id, profileImage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        email,
        phonenumber,
        gender,
        date_of_birth,
        address,
        aadharcard,
        class_id,
        subclass_id,
        admin_id,
        req.file?.path || null,
      ]
    );

    // 5️⃣ Success response
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student_id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding student",
      error: error.message,
    });
  }
};
