const { seedPortfolioData } = require('../utils/seedData');
const { Project, Service, Skill, Experience, Education } = require('../models/PortfolioModels');
const { getMongoStatus } = require('../config/mongodb');

/**
 * Returns complete portfolio information
 * Pulls from MongoDB collections if populated, else serves seedPortfolioData
 */
async function getPortfolioData(req, res) {
  try {
    const mongoStatus = getMongoStatus();

    if (mongoStatus.connected) {
      const [projects, services, skills, experiences, educations] = await Promise.all([
        Project.find().lean(),
        Service.find().lean(),
        Skill.find().lean(),
        Experience.find().lean(),
        Education.find().lean(),
      ]);

      if (projects.length > 0 || services.length > 0 || skills.length > 0) {
        const frontendSkills = skills.filter((s) => s.category === 'frontend');
        const backendSkills = skills.filter((s) => s.category === 'backend');

        return res.json({
          success: true,
          source: 'mongodb',
          data: {
            profile: seedPortfolioData.profile,
            techStackCards: seedPortfolioData.techStackCards,
            skills: {
              frontend: frontendSkills.length > 0 ? frontendSkills : seedPortfolioData.skills.frontend,
              backend: backendSkills.length > 0 ? backendSkills : seedPortfolioData.skills.backend,
            },
            experience: experiences.length > 0 ? experiences : seedPortfolioData.experience,
            education: educations.length > 0 ? educations : seedPortfolioData.education,
            services: services.length > 0 ? services : seedPortfolioData.services,
            projects: projects.length > 0 ? projects : seedPortfolioData.projects,
          },
        });
      }
    }

    // Default fallback to seed data
    return res.json({
      success: true,
      source: 'seed',
      data: seedPortfolioData,
    });
  } catch (error) {
    console.error('[Portfolio Data Error]:', error.message);
    return res.json({
      success: true,
      source: 'seed-fallback',
      data: seedPortfolioData,
    });
  }
}

/**
 * Endpoint to seed MongoDB with initial portfolio data
 */
async function seedPortfolioToMongo(req, res) {
  try {
    const mongoStatus = getMongoStatus();
    if (!mongoStatus.connected) {
      return res.status(400).json({
        success: false,
        message: 'MongoDB is not connected. Please set MONGODB_URI in environment variables.',
      });
    }

    // Clear existing
    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
    ]);

    // Insert Projects
    await Project.insertMany(seedPortfolioData.projects);
    // Insert Services
    await Service.insertMany(seedPortfolioData.services);
    // Insert Skills
    const allSkills = [
      ...seedPortfolioData.skills.frontend.map((s) => ({ ...s, category: 'frontend' })),
      ...seedPortfolioData.skills.backend.map((s) => ({ ...s, category: 'backend' })),
    ];
    await Skill.insertMany(allSkills);
    // Insert Experience
    await Experience.insertMany(seedPortfolioData.experience);
    // Insert Education
    await Education.insertMany(seedPortfolioData.education);

    return res.json({
      success: true,
      message: 'MongoDB portfolio collections successfully populated with seed data!',
    });
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  getPortfolioData,
  seedPortfolioToMongo,
};
