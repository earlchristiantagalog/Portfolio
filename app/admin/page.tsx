"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolio } from "@/app/components/PortfolioContext";
import type { PortfolioData, HeroData, AboutData, ProjectsData, ContactData, SocialData } from "@/app/data/portfolio-data";

type Tab = "hero" | "about" | "projects" | "contact" | "social";

const tabs: { key: Tab; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
  { key: "social", label: "Social" },
];

export default function AdminPage() {
  const { data, updateSection, resetData } = usePortfolio();
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all content to defaults?")) {
      resetData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Portfolio Editor
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              View Portfolio
            </Link>
            <button
              onClick={handleReset}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Reset Defaults
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Saved indicator */}
        {saved && (
          <div className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Changes saved! View them on the{" "}
            <Link href="/" className="underline">
              portfolio page
            </Link>
            .
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "hero" && (
          <HeroEditor data={data} update={updateSection} onSave={handleSave} />
        )}
        {activeTab === "about" && (
          <AboutEditor data={data} update={updateSection} onSave={handleSave} />
        )}
        {activeTab === "projects" && (
          <ProjectsEditor data={data} update={updateSection} onSave={handleSave} />
        )}
        {activeTab === "contact" && (
          <ContactEditor data={data} update={updateSection} onSave={handleSave} />
        )}
        {activeTab === "social" && (
          <SocialEditor data={data} update={updateSection} onSave={handleSave} />
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
    />
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
    >
      Save Changes
    </button>
  );
}

/* ───── Hero Editor ───── */
function HeroEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<HeroData>({ ...data.hero });

  const save = () => {
    update("hero", local);
    onSave();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Hero Section</h2>
      <div className="space-y-4">
        <Field label="Your Name">
          <Input value={local.name} onChange={(v) => setLocal({ ...local, name: v })} />
        </Field>
        <Field label="Logo Text (navbar)">
          <Input value={local.title} onChange={(v) => setLocal({ ...local, title: v })} />
        </Field>
        <Field label="Tagline">
          <TextArea value={local.tagline} onChange={(v) => setLocal({ ...local, tagline: v })} />
        </Field>
        <Field label="Availability Badge">
          <Input value={local.availability} onChange={(v) => setLocal({ ...local, availability: v })} />
        </Field>
      </div>
      <div className="mt-6">
        <SaveButton onClick={save} />
      </div>
    </div>
  );
}

/* ───── About Editor ───── */
function AboutEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<AboutData>({
    bio: [...data.about.bio],
    skills: [...data.about.skills],
    education: { ...data.about.education },
  });
  const [newSkill, setNewSkill] = useState("");

  const save = () => {
    update("about", local);
    onSave();
  };

  const updateBio = (index: number, value: string) => {
    const bio = [...local.bio];
    bio[index] = value;
    setLocal({ ...local, bio });
  };

  const addBio = () => setLocal({ ...local, bio: [...local.bio, ""] });
  const removeBio = (i: number) => setLocal({ ...local, bio: local.bio.filter((_, idx) => idx !== i) });

  const addSkill = () => {
    if (newSkill.trim()) {
      setLocal({ ...local, skills: [...local.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };
  const removeSkill = (i: number) => setLocal({ ...local, skills: local.skills.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6">
      {/* Bio */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Bio</h2>
        <div className="space-y-4">
          {local.bio.map((paragraph, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <TextArea value={paragraph} onChange={(v) => updateBio(i, v)} />
              </div>
              <button
                onClick={() => removeBio(i)}
                className="self-start rounded-lg p-2.5 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button onClick={addBio} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
            + Add paragraph
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {local.skills.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800">
              {skill}
              <button onClick={() => removeSkill(i)} className="ml-1 text-gray-400 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={newSkill} onChange={setNewSkill} placeholder="New skill..." />
          <button onClick={addSkill} className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
        </div>
      </div>

      {/* Education */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Education</h2>
        <div className="space-y-4">
          <Field label="School Name">
            <Input value={local.education.school} onChange={(v) => setLocal({ ...local, education: { ...local.education, school: v } })} />
          </Field>
          <Field label="Degree">
            <Input value={local.education.degree} onChange={(v) => setLocal({ ...local, education: { ...local.education, degree: v } })} />
          </Field>
          <Field label="Status">
            <Input value={local.education.status} onChange={(v) => setLocal({ ...local, education: { ...local.education, status: v } })} />
          </Field>
          <Field label="Description">
            <TextArea value={local.education.description} onChange={(v) => setLocal({ ...local, education: { ...local.education, description: v } })} />
          </Field>
          <Field label="Logo Path (in /public)">
            <Input value={local.education.logo} onChange={(v) => setLocal({ ...local, education: { ...local.education, logo: v } })} />
          </Field>
        </div>
      </div>

      <SaveButton onClick={save} />
    </div>
  );
}

/* ───── Projects Editor ───── */
function ProjectsEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<ProjectsData>({
    heading: data.projects.heading,
    subtitle: data.projects.subtitle,
    categories: [...data.projects.categories],
    items: data.projects.items.map((p) => ({ ...p, tags: [...p.tags] })),
  });
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");

  const save = () => {
    update("projects", local);
    onSave();
  };

  const updateProject = (id: string, field: string, value: string) => {
    setLocal({
      ...local,
      items: local.items.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };

  const updateProjectTags = (id: string, tags: string[]) => {
    setLocal({
      ...local,
      items: local.items.map((p) => (p.id === id ? { ...p, tags } : p)),
    });
  };

  const updateProjectCategory = (id: string, category: "School Projects" | "Personal Projects") => {
    setLocal({
      ...local,
      items: local.items.map((p) => (p.id === id ? { ...p, category } : p)),
    });
  };

  const addProject = () => {
    const id = Date.now().toString();
    const newProject = {
      id,
      title: "New Project",
      description: "Project description",
      image: "/file.svg",
      tags: [],
      github: "https://github.com",
      live: "https://vercel.com",
      category: "Personal Projects" as const,
    };
    setLocal({ ...local, items: [...local.items, newProject] });
    setEditingProject(id);
  };

  const removeProject = (id: string) => {
    setLocal({ ...local, items: local.items.filter((p) => p.id !== id) });
    if (editingProject === id) setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Section Header</h2>
        <div className="space-y-4">
          <Field label="Heading">
            <Input value={local.heading} onChange={(v) => setLocal({ ...local, heading: v })} />
          </Field>
          <Field label="Subtitle">
            <Input value={local.subtitle} onChange={(v) => setLocal({ ...local, subtitle: v })} />
          </Field>
        </div>
      </div>

      {/* Projects */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects ({local.items.length})</h2>
          <button onClick={addProject} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">+ Add Project</button>
        </div>

        <div className="space-y-3">
          {local.items.map((project) => (
            <div key={project.id} className="rounded-xl border border-gray-200 dark:border-gray-700">
              {/* Project header */}
              <div
                className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${project.category === "School Projects" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                    {project.category === "School Projects" ? "School" : "Personal"}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{project.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); removeProject(project.id); }} className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <svg className={`h-4 w-4 text-gray-400 transition-transform ${editingProject === project.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded editor */}
              {editingProject === project.id && (
                <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-700">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title">
                        <Input value={project.title} onChange={(v) => updateProject(project.id, "title", v)} />
                      </Field>
                      <Field label="Category">
                        <select
                          value={project.category}
                          onChange={(e) => updateProjectCategory(project.id, e.target.value as "School Projects" | "Personal Projects")}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="School Projects">School Projects</option>
                          <option value="Personal Projects">Personal Projects</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Description">
                      <TextArea value={project.description} onChange={(v) => updateProject(project.id, "description", v)} />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="GitHub URL">
                        <Input value={project.github} onChange={(v) => updateProject(project.id, "github", v)} />
                      </Field>
                      <Field label="Live URL">
                        <Input value={project.live} onChange={(v) => updateProject(project.id, "live", v)} />
                      </Field>
                    </div>
                    <Field label="Image Path (in /public)">
                      <Input value={project.image} onChange={(v) => updateProject(project.id, "image", v)} />
                    </Field>
                    <Field label="Tags">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800">
                            {tag}
                            <button
                              onClick={() => updateProjectTags(project.id, project.tags.filter((_, idx) => idx !== i))}
                              className="ml-1 text-gray-400 hover:text-red-500"
                            >&times;</button>
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Input value={newTag} onChange={setNewTag} placeholder="Add tag..." />
                        <button
                          onClick={() => {
                            if (newTag.trim()) {
                              updateProjectTags(project.id, [...project.tags, newTag.trim()]);
                              setNewTag("");
                            }
                          }}
                          className="shrink-0 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          Add
                        </button>
                      </div>
                    </Field>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SaveButton onClick={save} />
    </div>
  );
}

/* ───── Contact Editor ───── */
function ContactEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<ContactData>({ ...data.contact });

  const save = () => {
    update("contact", local);
    onSave();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Contact Section</h2>
      <div className="space-y-4">
        <Field label="Heading">
          <Input value={local.heading} onChange={(v) => setLocal({ ...local, heading: v })} />
        </Field>
        <Field label="Subtitle">
          <TextArea value={local.subtitle} onChange={(v) => setLocal({ ...local, subtitle: v })} />
        </Field>
      </div>
      <div className="mt-6">
        <SaveButton onClick={save} />
      </div>
    </div>
  );
}

/* ───── Social Editor ───── */
function SocialEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<SocialData>({ ...data.social });

  const save = () => {
    update("social", local);
    onSave();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Social Links</h2>
      <div className="space-y-4">
        <Field label="GitHub URL">
          <Input value={local.github} onChange={(v) => setLocal({ ...local, github: v })} />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={local.linkedin} onChange={(v) => setLocal({ ...local, linkedin: v })} />
        </Field>
        <Field label="Email Address">
          <Input value={local.email} onChange={(v) => setLocal({ ...local, email: v })} />
        </Field>
      </div>
      <div className="mt-6">
        <SaveButton onClick={save} />
      </div>
    </div>
  );
}
