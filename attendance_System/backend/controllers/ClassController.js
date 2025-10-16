import classtable from "../config/db.js";
export const AddClass = async (req, res) => {
  try {
    const { class_name, teacher_id, admin_id } = req.body;

    // 1️⃣ Validate required fields
    if (!class_name || !teacher_id || !admin_id) {
      return res.status(400).json({
        success: false,
        message: "All fields (class_name, teacher_id, admin_id) are required",
      });
    }

    // 2️⃣ Check if admin exists
    const [adminExists] = await classtable.execute(
      "SELECT id FROM admin WHERE id = ?",
      [admin_id]
    );
    if (adminExists.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin_id — admin not found",
      });
    }

    // 3️⃣ Check if teacher exists
    const [teacherExists] = await classtable.execute(
      "SELECT id FROM user WHERE id = ? AND role = 'teacher'",
      [teacher_id]
    );
    if (teacherExists.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher_id — teacher not found",
      });
    }

    // 4️⃣ Check if class name already exists
    const [existingClass] = await classtable.execute(
      "SELECT * FROM classTable WHERE class_name = ?",
      [class_name]
    );
    if (existingClass.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Class name already exists",
      });
    }

    // 5️⃣ Insert new class
    const [result] = await classtable.execute(
      `INSERT INTO classTable (class_name, teacher_id, admin_id)
       VALUES (?, ?, ?)`,
      [class_name, teacher_id, admin_id]
    );

    // 6️⃣ Success response
    return res.status(201).json({
      success: true,
      message: "Class added successfully",
      classId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding class:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding class",
      error: error.message,
    });
  }
};
