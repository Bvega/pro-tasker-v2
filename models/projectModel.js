const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    // This links the project to a specific user (the owner)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Establishes a relationship with the 'User' model
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;