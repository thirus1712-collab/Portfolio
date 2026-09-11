const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [String],
  demoUrl: String,
  githubUrl: String,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  category: { type: String, enum: ['frontend', 'backend'], required: true },
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: String,
  description: { type: String, required: true },
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: String,
  status: String,
}, { timestamps: true });

const MongoContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submitted_date: String,
  submitted_time: String,
}, { timestamps: true });

module.exports = {
  Project: mongoose.models.Project || mongoose.model('Project', ProjectSchema),
  Service: mongoose.models.Service || mongoose.model('Service', ServiceSchema),
  Skill: mongoose.models.Skill || mongoose.model('Skill', SkillSchema),
  Experience: mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema),
  Education: mongoose.models.Education || mongoose.model('Education', EducationSchema),
  MongoContact: mongoose.models.MongoContact || mongoose.model('MongoContact', MongoContactSchema),
};
