import attendanceimage from "../config/db.js";
// import { uploaded } from "../utils/multer.js";
export const AttendanceImage = async (req, res) => {
  try {
    const { class_id, subclass_id, teacher_id, admin_id } = req.body;
    console.log(req.body);

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = file.path;

    // ✅ Insert into DB
    const query = `
      INSERT INTO attendanceimage (class_id, subclass_id, teacher_id, admin_id, image_url, uploaded_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    await attendanceimage.query(query, [
      class_id,
      subclass_id,
      teacher_id,
      admin_id,
      imageUrl,
    ]);

    res.status(201).json({
      success: true,
      message: "Image uploaded and saved successfully",
      data: {
        class_id,
        subclass_id,
        teacher_id,
        admin_id,
        image_url: imageUrl,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
};
