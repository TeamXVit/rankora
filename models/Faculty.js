import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  facultyId: {
    type: Number,
    required: true,
    unique: true,
    min: 1000,
    max: 9999,
  },
  ratings: {
    teaching: {type: Number, default: 0},
    attendance: { type: Number, default: 0 },
    theory: { type: Number, default: 0 },
    lab: { type: Number, default: 0 },
    project: { type: Number, default: 0 },
  },
  ratedBy: [{ type: String }], // emails of people who rated
});

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
