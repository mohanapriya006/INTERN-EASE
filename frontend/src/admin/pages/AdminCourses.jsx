import React, { useState } from "react";
import "../styles/AdminPages.css";

const AdminCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Full-Stack Development", description: "Learn front-end and back-end development.", duration: "6 months" },
    { id: 2, name: "Data Science", description: "Master Python, ML, and data visualization.", duration: "4 months" },
    { id: 3, name: "Cloud Computing", description: "AWS, Azure, and GCP certification prep.", duration: "5 months" }
  ]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: ""
  });

  const [editing, setEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  // Add new course
  const addCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.duration) {
      setCourses([...courses, { id: Date.now(), ...newCourse }]);
      setNewCourse({ name: "", description: "", duration: "" });
    }
  };

  // Delete course
  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  // Edit course
  const editCourse = (course) => {
    setEditing(true);
    setCurrentCourse(course);
    setNewCourse({
      name: course.name,
      description: course.description,
      duration: course.duration
    });
  };

  // Save course after editing
  const saveCourse = () => {
    const updatedCourses = courses.map((course) =>
      course.id === currentCourse.id
        ? { ...course, ...newCourse }
        : course
    );
    setCourses(updatedCourses);
    setEditing(false);
    setNewCourse({ name: "", description: "", duration: "" });
  };

  return (
    <div className="container">
      <h2>Admin Courses</h2>

      {/* Form to Add/Edit Courses */}
      <div className="form-container">
        <input
          type="text"
          name="name"
          value={newCourse.name}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <input
          type="text"
          name="description"
          value={newCourse.description}
          onChange={handleChange}
          placeholder="Course Description"
        />
        <input
          type="text"
          name="duration"
          value={newCourse.duration}
          onChange={handleChange}
          placeholder="Duration"
        />

        <button
          onClick={editing ? saveCourse : addCourse}
          className={editing ? "btn save" : "btn add"}
        >
          {editing ? "Save Changes" : "Add Course"}
        </button>
      </div>

      {/* Display Courses */}
      <div className="card-container">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p><strong>Duration:</strong> {course.duration}</p>

            <div className="btn-group">
              <button
                className="btn edit"
                onClick={() => editCourse(course)}
              >
                Edit
              </button>
              <button
                className="btn delete"
                onClick={() => deleteCourse(course.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
