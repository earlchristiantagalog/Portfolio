const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/portfolioController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const {
  heroSchema,
  educationSchema,
  projectSchema,
  contactSchema,
  socialSchema,
  metaSchema,
  portfolioSchema,
} = require('../utils/validators');

router.put('/portfolio', validate(portfolioSchema), ctrl.updatePortfolio);

router.put('/hero', validate(heroSchema), ctrl.updateHero);
router.put('/education', validate(educationSchema), ctrl.updateEducation);

router.put('/about-bio', ctrl.updateAboutBio);

router.post('/skills', ctrl.addSkill);
router.delete('/skills/:id', ctrl.deleteSkill);
router.put('/skills', ctrl.replaceSkills);

router.get('/projects', ctrl.getProjects);
router.post('/projects', validate(projectSchema), ctrl.createProject);
router.put('/projects/:id', validate(projectSchema), ctrl.updateProject);
router.delete('/projects/:id', ctrl.deleteProject);
router.put('/projects-config', ctrl.updateProjectsConfig);

router.put('/contact', validate(contactSchema), ctrl.updateContact);
router.put('/social', validate(socialSchema), ctrl.updateSocial);
router.put('/meta', validate(metaSchema), ctrl.updateMeta);

router.get('/messages', ctrl.getMessages);
router.patch('/messages/:id/read', ctrl.markMessageRead);
router.delete('/messages/:id', ctrl.deleteMessage);

module.exports = router;
