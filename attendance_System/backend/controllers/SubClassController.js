import subclasstable from "../config/db.js";

export const createSubClass = async (req, res) => {
  try {
    const { subclass_name, class_id, teacher_id, admin_id } = req.body;

    // Check all required fields
    if (!subclass_name || !class_id || !teacher_id || !admin_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
      INSERT INTO subclasstable (subclass_name, class_id, teacher_id, admin_id)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await subclasstable.execute(query, [
      subclass_name,
      class_id,
      teacher_id,
      admin_id,
    ]);

    res.status(201).json({
      message: "Subclass created successfully",
      subclass_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating subclass:", error);
    res.status(500).json({ message: "Database error" });
  }
};
