import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
  try {
    const [hero, bioRows, skillRows, education, projects, projectsConfig, contact, social, meta] =
      await Promise.all([
        pool.query("SELECT * FROM hero WHERE id = $1", ["hero"]),
        pool.query("SELECT * FROM about_bio ORDER BY position ASC"),
        pool.query("SELECT * FROM skills ORDER BY position ASC"),
        pool.query("SELECT * FROM education WHERE id = $1", ["education"]),
        pool.query("SELECT * FROM projects ORDER BY position ASC"),
        pool.query("SELECT * FROM projects_config WHERE id = $1", ["projects_config"]),
        pool.query("SELECT * FROM contact WHERE id = $1", ["contact"]),
        pool.query("SELECT * FROM social WHERE id = $1", ["social"]),
        pool.query("SELECT * FROM meta WHERE id = $1", ["meta"]),
      ]);

    const heroRow = hero.rows[0];
    if (!heroRow) return NextResponse.json({ data: null });

    const tagsResult = await pool.query("SELECT * FROM project_tags");
    const tags = tagsResult.rows;

    const CATEGORIES = ["All", "School Projects", "Personal Projects"];

    const data = {
      hero: heroRow,
      about: {
        bio: bioRows.rows.map((r: { paragraph: string }) => r.paragraph),
        skills: skillRows.rows.map((r: { skill: string }) => r.skill),
        education: education.rows[0]
          ? {
              school: education.rows[0].school,
              degree: education.rows[0].degree,
              status: education.rows[0].status,
              description: education.rows[0].description,
              logo: education.rows[0].logo,
            }
          : null,
      },
      projects: {
        heading: projectsConfig.rows[0]?.heading || "Projects",
        subtitle: projectsConfig.rows[0]?.subtitle || "",
        categories: CATEGORIES,
        items: projects.rows.map(
          (p: {
            id: string;
            title: string;
            description: string;
            image: string;
            category: string;
            github: string;
            live: string;
          }) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            image: p.image,
            category: p.category,
            github: p.github,
            live: p.live,
            tags: tags
              .filter((t: { project_id: string }) => t.project_id === p.id)
              .map((t: { tag: string }) => t.tag),
          })
        ),
      },
      contact: {
        heading: contact.rows[0]?.heading || "Get In Touch",
        subtitle: contact.rows[0]?.subtitle || "",
      },
      social: {
        github: social.rows[0]?.github || "",
        linkedin: social.rows[0]?.linkedin || "",
        email: social.rows[0]?.email || "",
      },
      meta: {
        title: meta.rows[0]?.title || "",
        description: meta.rows[0]?.description || "",
      },
    };

    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET /api/portfolio error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
