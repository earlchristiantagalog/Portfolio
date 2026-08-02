import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import pool from "@/app/lib/db";
import type { PortfolioData } from "@/app/data/portfolio-data";

export async function PUT(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data: PortfolioData = await request.json();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await Promise.all([
      client.query(
        `INSERT INTO hero (id, name, title, tagline, availability)
         VALUES ('hero', $1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE SET name=$1, title=$2, tagline=$3, availability=$4, updated_at=NOW()`,
        [data.hero.name, data.hero.title, data.hero.tagline, data.hero.availability]
      ),
      (async () => {
        await client.query("DELETE FROM about_bio");
        for (let i = 0; i < data.about.bio.length; i++) {
          await client.query("INSERT INTO about_bio (paragraph, position) VALUES ($1, $2)", [
            data.about.bio[i],
            i,
          ]);
        }
      })(),
      (async () => {
        await client.query("DELETE FROM skills");
        for (let i = 0; i < data.about.skills.length; i++) {
          await client.query("INSERT INTO skills (skill, position) VALUES ($1, $2)", [
            data.about.skills[i],
            i,
          ]);
        }
      })(),
      client.query(
        `INSERT INTO education (id, school, degree, status, description, logo)
         VALUES ('education', $1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE SET school=$1, degree=$2, status=$3, description=$4, logo=$5, updated_at=NOW()`,
        [
          data.about.education.school,
          data.about.education.degree,
          data.about.education.status,
          data.about.education.description,
          data.about.education.logo,
        ]
      ),
      client.query(
        `INSERT INTO projects_config (id, heading, subtitle)
         VALUES ('projects_config', $1, $2)
         ON CONFLICT (id) DO UPDATE SET heading=$1, subtitle=$2, updated_at=NOW()`,
        [data.projects.heading, data.projects.subtitle]
      ),
      client.query(
        `INSERT INTO contact (id, heading, subtitle)
         VALUES ('contact', $1, $2)
         ON CONFLICT (id) DO UPDATE SET heading=$1, subtitle=$2, updated_at=NOW()`,
        [data.contact.heading, data.contact.subtitle]
      ),
      client.query(
        `INSERT INTO social (id, github, linkedin, email)
         VALUES ('social', $1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET github=$1, linkedin=$2, email=$3, updated_at=NOW()`,
        [data.social.github, data.social.linkedin, data.social.email]
      ),
      client.query(
        `INSERT INTO meta (id, title, description)
         VALUES ('meta', $1, $2)
         ON CONFLICT (id) DO UPDATE SET title=$1, description=$2, updated_at=NOW()`,
        [data.meta.title, data.meta.description]
      ),
    ]);

    await client.query("DELETE FROM project_tags");
    await client.query("DELETE FROM projects");
    for (let i = 0; i < data.projects.items.length; i++) {
      const p = data.projects.items[i];
      const { rows } = await client.query(
        `INSERT INTO projects (title, description, image, category, github, live, position)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [p.title, p.description, p.image, p.category, p.github || "", p.live || "", i]
      );
      const projectId = rows[0].id;
      if (p.tags && p.tags.length > 0) {
        for (const tag of p.tags) {
          await client.query("INSERT INTO project_tags (project_id, tag) VALUES ($1, $2)", [
            projectId,
            tag,
          ]);
        }
      }
    }

    await client.query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("PUT /api/admin/portfolio error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    client.release();
  }
}
