import Course from "../models/course.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

export const enrollCourse = (req, res) => {
  if (!req.body.name || !req.body.courseCode || !req.body.student) {
    return res.status(400).json({
      message: "All fields are required: name, courseCode, student",
    });
  }

  Course.findOne({ courseCode: req.body.courseCode })
    .then((existingCourse) => {
      if (existingCourse) {
        return res.status(409).json({
          message: "Course with the same courseCode already enrolled",
        });
      }

      const course = new Course({
        name: req.body.name,
        courseCode: req.body.courseCode,
        student: req.body.student,
      });

      course
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            message: "Error while enrolling in the course",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error while checking if the course is already enrolled",
        error: err.message,
      });
    });
};
