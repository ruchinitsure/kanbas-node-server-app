import db from "../Database/index.js";

function AssignmentRoutes(app) {
//   app.post("/api/courses/:cid/assignments", (req, res) => {
//     const { cid } = req.params;
//     const newAssignment = {
//       ...req.body,
//       course: cid,
//       _id: new Date().getTime().toString(),
//     };
//     db.assignments.push(newAssignment);
//     res.send(newAssignment);
//   });

//   app.delete("/api/assignments/:aid", (req, res) => {
//     const { aid } = req.params;
//     db.assignments = db.assignments.filter((assignment) => assignment._id !== aid);
//     res.sendStatus(200);
//   });

app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (a) => a._id === aid);
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body
    };
    res.sendStatus(204);
  });

app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((assignment) => assignment._id !== aid);
    res.sendStatus(200);
  });

app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignmentsForCourse = db.assignments.filter(
      (assignment) => assignment.course === cid
    );
    res.send(assignmentsForCourse);
  });
}

export default AssignmentRoutes;