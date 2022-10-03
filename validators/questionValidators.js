const { z } = require("zod");

module.exports.questionSchema = z.object({
  category: z.string({ required_error: "Category is required" }),
  question: z.string({ required_error: "Question is required" }),
  level: z.enum(["easy", "medium", "hard"], {
    required_error: "Level is required",
  }),
  options: z.array(z.array(z.string()), {
    required_error: "Options is required",
  }),
  correctAnswer: z.string({ required_error: "CorrectAnswer is required" }),
  price: z.number({ required_error: "Price is required" }),
  prize: z.number({ required_error: "Prize is required" }),
});
