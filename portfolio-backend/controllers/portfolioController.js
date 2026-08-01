const heroQ = require('../db/queries/hero');
const aboutQ = require('../db/queries/about');
const skillsQ = require('../db/queries/skills');
const projectsQ = require('../db/queries/projects');
const contactQ = require('../db/queries/contact');
const socialQ = require('../db/queries/social');
const metaQ = require('../db/queries/meta');
const messagesQ = require('../db/queries/messages');

const CATEGORIES = ['All', 'School Projects', 'Personal Projects'];

exports.getPortfolio = async (req, res, next) => {
  try {
    const [hero, bio, skills, education, projects, projectsConfig, contact, social, meta] = await Promise.all([
      heroQ.getHero(),
      aboutQ.getAboutBio(),
      skillsQ.getSkills(),
      aboutQ.getEducation(),
      projectsQ.getAllProjects(),
      projectsQ.getProjectsConfig(),
      contactQ.getContact(),
      socialQ.getSocial(),
      metaQ.getMeta(),
    ]);

    if (!hero) return res.json({ data: null });

    res.json({
      data: {
        hero,
        about: { bio, skills, education },
        projects: {
          heading: projectsConfig?.heading || 'Projects',
          subtitle: projectsConfig?.subtitle || '',
          categories: CATEGORIES,
          items: projects,
        },
        contact: { heading: contact?.heading || 'Get In Touch', subtitle: contact?.subtitle || '' },
        social: { github: social?.github || '', linkedin: social?.linkedin || '', email: social?.email || '' },
        meta: { title: meta?.title || '', description: meta?.description || '' },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateHero = async (req, res, next) => {
  try {
    const hero = await heroQ.updateHero(req.body);
    res.json({ data: hero });
  } catch (err) {
    next(err);
  }
};

exports.updateEducation = async (req, res, next) => {
  try {
    const edu = await aboutQ.updateEducation(req.body);
    res.json({ data: edu });
  } catch (err) {
    next(err);
  }
};

exports.updateAboutBio = async (req, res, next) => {
  try {
    const bio = await aboutQ.replaceAboutBio(req.body.bio);
    res.json({ data: bio });
  } catch (err) {
    next(err);
  }
};

exports.addSkill = async (req, res, next) => {
  try {
    const skill = await skillsQ.addSkill(req.body.skill);
    res.json({ data: skill });
  } catch (err) {
    next(err);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const result = await skillsQ.deleteSkill(req.params.id);
    if (!result) return res.status(404).json({ error: 'Skill not found' });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};

exports.replaceSkills = async (req, res, next) => {
  try {
    const skills = await skillsQ.replaceSkills(req.body.skills);
    res.json({ data: skills });
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await projectsQ.getAllProjects();
    res.json({ data: projects });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await projectsQ.createProject(req.body);
    res.status(201).json({ data: project });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await projectsQ.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ data: project });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const result = await projectsQ.deleteProject(req.params.id);
    if (!result) return res.status(404).json({ error: 'Project not found' });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};

exports.updateProjectsConfig = async (req, res, next) => {
  try {
    const config = await projectsQ.updateProjectsConfig(req.body);
    res.json({ data: config });
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const contact = await contactQ.updateContact(req.body);
    res.json({ data: contact });
  } catch (err) {
    next(err);
  }
};

exports.updateSocial = async (req, res, next) => {
  try {
    const social = await socialQ.updateSocial(req.body);
    res.json({ data: social });
  } catch (err) {
    next(err);
  }
};

exports.updateMeta = async (req, res, next) => {
  try {
    const meta = await metaQ.updateMeta(req.body);
    res.json({ data: meta });
  } catch (err) {
    next(err);
  }
};

exports.updatePortfolio = async (req, res, next) => {
  try {
    const data = req.body;

    await Promise.all([
      heroQ.updateHero(data.hero),
      aboutQ.replaceAboutBio(data.about.bio),
      skillsQ.replaceSkills(data.about.skills),
      aboutQ.updateEducation(data.about.education),
      projectsQ.updateProjectsConfig({ heading: data.projects.heading, subtitle: data.projects.subtitle }),
      contactQ.updateContact(data.contact),
      socialQ.updateSocial(data.social),
      metaQ.updateMeta(data.meta),
    ]);

    await projectsQ.replaceAllProjects(data.projects.items);

    const portfolio = await exports.getPortfolioDirect();
    res.json({ data: portfolio });
  } catch (err) {
    next(err);
  }
};

exports.getPortfolioDirect = async () => {
  const [hero, bio, skills, education, projects, projectsConfig, contact, social, meta] = await Promise.all([
    heroQ.getHero(),
    aboutQ.getAboutBio(),
    skillsQ.getSkills(),
    aboutQ.getEducation(),
    projectsQ.getAllProjects(),
    projectsQ.getProjectsConfig(),
    contactQ.getContact(),
    socialQ.getSocial(),
    metaQ.getMeta(),
  ]);

  if (!hero) return null;

  return {
    hero,
    about: { bio, skills, education },
    projects: {
      heading: projectsConfig?.heading || 'Projects',
      subtitle: projectsConfig?.subtitle || '',
      categories: CATEGORIES,
      items: projects,
    },
    contact: { heading: contact?.heading || 'Get In Touch', subtitle: contact?.subtitle || '' },
    social: { github: social?.github || '', linkedin: social?.linkedin || '', email: social?.email || '' },
    meta: { title: meta?.title || '', description: meta?.description || '' },
  };
};

exports.submitMessage = async (req, res, next) => {
  try {
    const msg = await messagesQ.createMessage(req.body);
    res.status(201).json({ data: msg });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const msgs = await messagesQ.getMessages();
    res.json({ data: msgs });
  } catch (err) {
    next(err);
  }
};

exports.markMessageRead = async (req, res, next) => {
  try {
    const msg = await messagesQ.markAsRead(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    res.json({ data: msg });
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const result = await messagesQ.deleteMessage(req.params.id);
    if (!result) return res.status(404).json({ error: 'Message not found' });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};
