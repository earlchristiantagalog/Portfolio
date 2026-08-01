const Joi = require('joi');

const heroSchema = Joi.object({
  name: Joi.string().max(200).required(),
  title: Joi.string().max(200).required(),
  tagline: Joi.string().max(1000).required(),
  availability: Joi.string().max(100).required(),
});

const educationSchema = Joi.object({
  school: Joi.string().max(300).required(),
  degree: Joi.string().max(300).required(),
  status: Joi.string().max(100).required(),
  description: Joi.string().max(2000).required(),
  logo: Joi.string().max(500).allow('').required(),
});

const projectSchema = Joi.object({
  title: Joi.string().max(300).required(),
  description: Joi.string().max(2000).required(),
  image: Joi.string().max(500).allow('').required(),
  category: Joi.string().valid('School Projects', 'Personal Projects').required(),
  github: Joi.string().uri().allow('').optional(),
  live: Joi.string().uri().allow('').optional(),
  tags: Joi.array().items(Joi.string().max(100)).min(1).required(),
});

const contactSchema = Joi.object({
  heading: Joi.string().max(200).required(),
  subtitle: Joi.string().max(500).required(),
});

const socialSchema = Joi.object({
  github: Joi.string().uri().allow('').required(),
  linkedin: Joi.string().uri().allow('').required(),
  email: Joi.string().email().required(),
});

const metaSchema = Joi.object({
  title: Joi.string().max(300).required(),
  description: Joi.string().max(1000).required(),
});

const messageSchema = Joi.object({
  name: Joi.string().max(200).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(300).allow('').optional(),
  message: Joi.string().max(5000).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(200).required(),
});

const portfolioSchema = Joi.object({
  hero: heroSchema.required(),
  about: Joi.object({
    bio: Joi.array().items(Joi.string()).min(1).required(),
    skills: Joi.array().items(Joi.string()).min(1).required(),
    education: educationSchema.required(),
  }).required(),
  projects: Joi.object({
    heading: Joi.string().max(200).required(),
    subtitle: Joi.string().max(500).required(),
    categories: Joi.array().items(Joi.string()).optional(),
    items: Joi.array().items(projectSchema).required(),
  }).required(),
  contact: contactSchema.required(),
  social: socialSchema.required(),
  meta: metaSchema.required(),
});

module.exports = {
  heroSchema,
  educationSchema,
  projectSchema,
  contactSchema,
  socialSchema,
  metaSchema,
  messageSchema,
  loginSchema,
  portfolioSchema,
};
