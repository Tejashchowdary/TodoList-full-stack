import mongoose from "mongoose";
import moment from "moment-timezone";

const Todoschema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },

  // Date object for queries (still IST shifted)
  createdAt: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata").toDate(),
  },

  // Human-readable IST string in 12-hour format
  createdAtIST: {
    type: String,
    default: () =>
      moment().tz("Asia/Kolkata").format("YYYY-MM-DD hh:mm:ss A"),
  },

  updatedAt: { type: Date },
  updatedAtIST: { type: String },
});

// Middleware to set IST timestamps on save
Todoschema.pre("save", function (next) {
  const nowIST = moment().tz("Asia/Kolkata");
  if (!this.createdAt) this.createdAt = nowIST.toDate();
  if (!this.createdAtIST)
    this.createdAtIST = nowIST.format("YYYY-MM-DD hh:mm:ss A");

  this.updatedAt = nowIST.toDate();
  this.updatedAtIST = nowIST.format("YYYY-MM-DD hh:mm:ss A");
  next();
});

// Middleware for updates
Todoschema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  const nowIST = moment().tz("Asia/Kolkata");
  this.set({
    updatedAt: nowIST.toDate(),
    updatedAtIST: nowIST.format("YYYY-MM-DD hh:mm:ss A"),
  });
  next();
});

const TodoModel = mongoose.model("todos", Todoschema);
export default TodoModel;
