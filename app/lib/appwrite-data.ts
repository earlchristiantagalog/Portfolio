import { Databases, ID, Query } from "appwrite";
import { defaultData, type PortfolioData } from "@/app/data/portfolio-data";

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

export const COLLECTIONS = {
  hero: "hero",
  aboutBio: "about_bio",
  skills: "skills",
  education: "education",
  projects: "projects",
  projectTags: "project_tags",
  projectsConfig: "projects_config",
  contact: "contact",
  social: "social",
  meta: "meta",
} as const;

const PROJECT_CATEGORIES = ["All", "School Projects", "Personal Projects"];

async function listDocs(db: Databases, collectionId: string) {
  if (!DATABASE_ID) return [];
  const res = await db.listDocuments(DATABASE_ID, collectionId, [
    Query.orderAsc("position"),
    Query.limit(100),
  ]);
  return res.documents;
}

async function getSingle(db: Databases, collectionId: string, documentId: string) {
  if (!DATABASE_ID) return null;
  try {
    return await db.getDocument(DATABASE_ID, collectionId, documentId);
  } catch {
    return null;
  }
}

export async function readAll(db: Databases): Promise<PortfolioData | null> {
  if (!DATABASE_ID) return null;

  try {
    const heroDoc = await getSingle(db, COLLECTIONS.hero, "hero");
    const educationDoc = await getSingle(db, COLLECTIONS.education, "education");
    const contactDoc = await getSingle(db, COLLECTIONS.contact, "contact");
    const socialDoc = await getSingle(db, COLLECTIONS.social, "social");
    const metaDoc = await getSingle(db, COLLECTIONS.meta, "meta");
    const projectsConfigDoc = await getSingle(db, COLLECTIONS.projectsConfig, "projects_config");

    const bioDocs = await listDocs(db, COLLECTIONS.aboutBio);
    const skillDocs = await listDocs(db, COLLECTIONS.skills);
    const projectDocs = await listDocs(db, COLLECTIONS.projects);
    const tagDocs = await listDocs(db, COLLECTIONS.projectTags);

    if (!heroDoc) return null;

    const projects = projectDocs.map((doc: any) => ({
      id: doc.$id,
      title: doc.title ?? "",
      description: doc.description ?? "",
      image: doc.image ?? "",
      tags: tagDocs
        .filter((t: any) => t.project_id === doc.$id)
        .map((t: any) => t.tag),
      github: doc.github ?? "",
      live: doc.live ?? "",
      category: doc.category ?? "Personal Projects",
    }));

    return {
      hero: {
        name: heroDoc.name ?? defaultData.hero.name,
        title: heroDoc.title ?? defaultData.hero.title,
        tagline: heroDoc.tagline ?? defaultData.hero.tagline,
        availability: heroDoc.availability ?? defaultData.hero.availability,
      },
      about: {
        bio: bioDocs.map((d: any) => d.paragraph),
        skills: skillDocs.map((d: any) => d.skill),
        education: {
          school: educationDoc?.school ?? defaultData.about.education.school,
          degree: educationDoc?.degree ?? defaultData.about.education.degree,
          status: educationDoc?.status ?? defaultData.about.education.status,
          description:
            educationDoc?.description ?? defaultData.about.education.description,
          logo: educationDoc?.logo ?? defaultData.about.education.logo,
        },
      },
      projects: {
        heading: projectsConfigDoc?.heading ?? defaultData.projects.heading,
        subtitle: projectsConfigDoc?.subtitle ?? defaultData.projects.subtitle,
        categories: PROJECT_CATEGORIES,
        items: projects,
      },
      contact: {
        heading: contactDoc?.heading ?? defaultData.contact.heading,
        subtitle: contactDoc?.subtitle ?? defaultData.contact.subtitle,
      },
      social: {
        github: socialDoc?.github ?? defaultData.social.github,
        linkedin: socialDoc?.linkedin ?? defaultData.social.linkedin,
        email: socialDoc?.email ?? defaultData.social.email,
      },
      meta: {
        title: metaDoc?.title ?? defaultData.meta.title,
        description: metaDoc?.description ?? defaultData.meta.description,
      },
    };
  } catch {
    return null;
  }
}

async function clearCollection(db: Databases, collectionId: string) {
  if (!DATABASE_ID) return;
  let docs = (await db.listDocuments(DATABASE_ID, collectionId, [Query.limit(100)])).documents;
  while (docs.length > 0) {
    for (const doc of docs) {
      await db.deleteDocument(DATABASE_ID, collectionId, doc.$id);
    }
    docs = (await db.listDocuments(DATABASE_ID, collectionId, [Query.limit(100)])).documents;
  }
}

async function createDoc(db: Databases, collectionId: string, documentId: string, data: Record<string, any>) {
  if (!DATABASE_ID) return;
  await db.createDocument(DATABASE_ID, collectionId, documentId, data);
}

export async function writeAll(db: Databases, data: PortfolioData) {
  if (!DATABASE_ID) return;

  // Hero
  await clearCollection(db, COLLECTIONS.hero);
  await createDoc(db, COLLECTIONS.hero, "hero", {
    name: data.hero.name,
    title: data.hero.title,
    tagline: data.hero.tagline,
    availability: data.hero.availability,
  });

  // About: bio + skills + education
  await clearCollection(db, COLLECTIONS.aboutBio);
  for (let i = 0; i < data.about.bio.length; i++) {
    await createDoc(db, COLLECTIONS.aboutBio, ID.unique(), {
      paragraph: data.about.bio[i],
      position: i,
    });
  }

  await clearCollection(db, COLLECTIONS.skills);
  for (let i = 0; i < data.about.skills.length; i++) {
    await createDoc(db, COLLECTIONS.skills, ID.unique(), {
      skill: data.about.skills[i],
      position: i,
    });
  }

  await clearCollection(db, COLLECTIONS.education);
  await createDoc(db, COLLECTIONS.education, "education", {
    school: data.about.education.school,
    degree: data.about.education.degree,
    status: data.about.education.status,
    description: data.about.education.description,
    logo: data.about.education.logo,
  });

  // Projects + tags + config
  await clearCollection(db, COLLECTIONS.projects);
  await clearCollection(db, COLLECTIONS.projectTags);
  for (let i = 0; i < data.projects.items.length; i++) {
    const project = data.projects.items[i];
    await createDoc(db, COLLECTIONS.projects, project.id, {
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      github: project.github,
      live: project.live,
      position: i,
    });
    for (const tag of project.tags) {
      await createDoc(db, COLLECTIONS.projectTags, ID.unique(), {
        project_id: project.id,
        tag,
      });
    }
  }

  await clearCollection(db, COLLECTIONS.projectsConfig);
  await createDoc(db, COLLECTIONS.projectsConfig, "projects_config", {
    heading: data.projects.heading,
    subtitle: data.projects.subtitle,
  });

  // Contact
  await clearCollection(db, COLLECTIONS.contact);
  await createDoc(db, COLLECTIONS.contact, "contact", {
    heading: data.contact.heading,
    subtitle: data.contact.subtitle,
  });

  // Social
  await clearCollection(db, COLLECTIONS.social);
  await createDoc(db, COLLECTIONS.social, "social", {
    github: data.social.github,
    linkedin: data.social.linkedin,
    email: data.social.email,
  });

  // Meta
  await clearCollection(db, COLLECTIONS.meta);
  await createDoc(db, COLLECTIONS.meta, "meta", {
    title: data.meta.title,
    description: data.meta.description,
  });
}
