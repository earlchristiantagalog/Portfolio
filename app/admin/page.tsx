"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/app/components/PortfolioContext";
import type { PortfolioData, HeroData, AboutData, ProjectsData, ContactData, SocialData, MetaData, SiteContent } from "@/app/data/portfolio-data";

type Tab = "hero" | "about" | "projects" | "contact" | "social" | "meta" | "content";

const tabs: { key: Tab; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "content", label: "Site Content" },
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
  { key: "social", label: "Social" },
  { key: "meta", label: "Meta Tags" },
];

export default function AdminPage() {
  const { data, loading, updateSection, resetData } = usePortfolio();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [saved, setSaved] = useState(false);
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Sign out failed");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      alert("Unable to sign out. Please try again.");
    }
  };
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    if (confirm("Reset all content to defaults?")) {
      if (!(await resetData())) alert("Reset failed. Check your connection and permissions.");
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 shadow-sm shadow-black/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-foreground">
              Portfolio<span className="text-primary">.</span>
            </Link>
            <span className="hidden rounded-lg bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:inline">
              Admin
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
              <button onClick={handleSignOut} className="rounded-xl border border-card-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground hover:shadow-sm sm:px-4">
                Sign Out
              </button>
            <Link
              href="/"
              className="hidden rounded-xl border border-card-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground hover:shadow-sm sm:inline-block sm:px-4"
            >
              View Portfolio
            </Link>
            <button
              onClick={handleReset}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600 transition-all hover:-translate-y-0.5 hover:bg-red-500/20 dark:text-red-400 sm:px-4"
            >
              Reset Defaults
            </button>
          </div>
        </div>
      </header>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Loading state */}
          {loading && (
            <div className="mb-8 flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm">Loading portfolio data...</p>
              </div>
            </div>
          )}

          {!loading && (
            <>
              {/* Tabs */}
              <div className="mb-8 flex gap-1 overflow-x-auto rounded-xl border border-card-border bg-card p-1 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-primary text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Saved indicator */}
              {saved && (
                <div className="mb-6 animate-fade-up rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-3 text-sm text-green-700 dark:text-green-400">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Changes saved! View them on the{" "}
                    <Link href="/" className="underline underline-offset-2 hover:text-green-800 dark:hover:text-green-300">
                      portfolio page
                    </Link>
                    .
                  </div>
                </div>
              )}

              {/* Tab Content */}
              {activeTab === "hero" && (
                <HeroEditor data={data} update={updateSection} onSave={handleSave} />
              )}
              {activeTab === "content" && (
                <ContentEditor data={data.content} update={updateSection} onSave={handleSave} />
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
              {activeTab === "meta" && (
                <MetaEditor data={data} update={updateSection} onSave={handleSave} />
              )}
            </>
          )}
        </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
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
      className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
      className="w-full resize-none rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    />
  );
}

function SaveButton({ onClick, disabled = false }: { onClick: () => Promise<void>; disabled?: boolean }) {
  const [saving, setSaving] = useState(false);
  const handleClick = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await onClick();
    } finally {
      setSaving(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={saving || disabled}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative">{saving ? "Saving…" : "Save Changes"}</span>
    </button>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function ContentEditor({
  data,
  update,
  onSave,
}: {
  data: SiteContent;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<SiteContent>(() => structuredClone(data));
  const [principles, setPrinciples] = useState(() => data.principles.join("\n"));
  const [stacks, setStacks] = useState(() => data.expertise.map((item) => item.stack.join(", ")));
  const setField = (key: keyof SiteContent, value: string) => setLocal((current) => ({ ...current, [key]: value }));
  const save = async () => {
    const content = {
      ...local,
      principles: principles.split("\n").map((item) => item.trim()).filter(Boolean),
      expertise: local.expertise.map((item, index) => ({
        ...item,
        stack: (stacks[index] ?? "").split(",").map((entry) => entry.trim()).filter(Boolean),
      })),
    };
    if (await update("content", content)) onSave();
    else alert("Save failed. Check your connection and permissions.");
  };
  const fields: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
    { key: "role", label: "Professional role" },
    { key: "aboutIntro", label: "About page introduction", multiline: true },
    { key: "graduationYear", label: "Expected graduation (leave blank if not applicable)" },
    { key: "expertiseHeading", label: "Expertise heading" },
    { key: "expertiseDescription", label: "Expertise introduction", multiline: true },
    { key: "overviewHeading", label: "Overview heading" },
    { key: "overviewDescription", label: "Overview introduction", multiline: true },
    { key: "featuredHeading", label: "Featured projects heading" },
    { key: "featuredDescription", label: "Featured projects introduction", multiline: true },
    { key: "ctaHeading", label: "Contact call-to-action heading" },
    { key: "ctaDescription", label: "Contact call-to-action text", multiline: true },
    { key: "footerDescription", label: "Footer description", multiline: true },
    { key: "contactAvailability", label: "Contact availability description", multiline: true },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Site-wide content">
        <p className="mb-6 text-sm text-muted-foreground">Edit the text shown across the home, about, contact and footer sections. Save applies this whole tab.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map(({ key, label, multiline }) => (
            <Field key={key} label={label}>
              {multiline
                ? <TextArea value={local[key] as string} onChange={(value) => setField(key, value)} />
                : <Input value={local[key] as string} onChange={(value) => setField(key, value)} />}
            </Field>
          ))}
          <Field label="Operating principles (one per line)">
            <TextArea value={principles} onChange={setPrinciples} />
          </Field>
        </div>
      </SectionCard>
      <SectionCard title="Expertise cards">
        <div className="space-y-5">
          {local.expertise.map((item, index) => (
            <div key={index} className="space-y-4 border border-card-border p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">Card {index + 1}</h3>
                <button type="button" className="text-sm text-red-500" onClick={() => {
                  setLocal((current) => ({ ...current, expertise: current.expertise.filter((_, i) => i !== index) }));
                  setStacks((current) => current.filter((_, i) => i !== index));
                }}>Remove</button>
              </div>
              {(["title", "subtitle", "description"] as const).map((key) => (
                <Field key={key} label={key[0].toUpperCase() + key.slice(1)}>
                  <Input value={item[key]} onChange={(value) => setLocal((current) => ({
                    ...current,
                    expertise: current.expertise.map((entry, i) => i === index ? { ...entry, [key]: value } : entry),
                  }))} />
                </Field>
              ))}
              <Field label="Technologies (comma-separated)">
                <Input value={stacks[index] ?? ""} onChange={(value) => setStacks((current) => current.map((entry, i) => i === index ? value : entry))} />
              </Field>
            </div>
          ))}
          <button type="button" className="btn btn-ghost" onClick={() => {
            setLocal((current) => ({ ...current, expertise: [...current.expertise, { title: "", subtitle: "", description: "", stack: [] }] }));
            setStacks((current) => [...current, ""]);
          }}>Add expertise card</button>
        </div>
      </SectionCard>
      <SaveButton onClick={save} />
    </div>
  );
}

/* ───── Hero Editor ───── */
function HeroEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<HeroData>({ ...data.hero });

  useEffect(() => {
    setLocal({ ...data.hero });
  }, [data.hero]);

  const save = async () => {
    if (await update("hero", local)) onSave();
    else alert("Save failed. Check your connection and permissions.");
  };

  return (
    <SectionCard title="Hero Section">
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
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/50">
          <input
            type="checkbox"
            checked={local.availability}
            onChange={() => setLocal({ ...local, availability: !local.availability })}
            className="h-4 w-4 rounded border-card-border text-primary focus:ring-primary/20"
          />
          <span className="font-medium">Available for work</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            local.availability
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}>
            {local.availability ? "Available" : "Not Available"}
          </span>
        </label>
      </div>
      <div className="mt-6">
        <SaveButton onClick={save} />
      </div>
    </SectionCard>
  );
}

/* ───── About Editor ───── */
function AboutEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<AboutData>({
    bio: [...data.about.bio],
    skills: [...data.about.skills],
    education: { ...data.about.education },
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setLocal({
      bio: [...data.about.bio],
      skills: [...data.about.skills],
      education: { ...data.about.education },
    });
  }, [data.about]);

  const save = async () => {
    if (await update("about", local)) onSave();
    else alert("Save failed. Check your connection and permissions.");
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
      <SectionCard title="Bio">
        <div className="space-y-4">
          {local.bio.map((paragraph, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <TextArea value={paragraph} onChange={(v) => updateBio(i, v)} />
              </div>
              <button
                onClick={() => removeBio(i)}
                className="self-start rounded-xl p-2.5 text-red-500 transition-colors hover:bg-red-500/10"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button onClick={addBio} className="text-sm font-medium text-primary hover:text-primary-light">
            + Add paragraph
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Skills">
        <div className="mb-4 flex flex-wrap gap-2">
          {local.skills.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-xl border border-card-border bg-muted px-3 py-1.5 text-sm text-foreground">
              {skill}
              <button onClick={() => removeSkill(i)} className="ml-0.5 text-muted-foreground hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={newSkill} onChange={setNewSkill} placeholder="New skill..." />
          <button onClick={addSkill} className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-dark">Add</button>
        </div>
      </SectionCard>

      <SectionCard title="Education">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="School Name">
              <Input value={local.education.school} onChange={(v) => setLocal({ ...local, education: { ...local.education, school: v } })} />
            </Field>
            <Field label="Degree">
              <Input value={local.education.degree} onChange={(v) => setLocal({ ...local, education: { ...local.education, degree: v } })} />
            </Field>
          </div>
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
      </SectionCard>

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
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
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
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    setLocal({
      heading: data.projects.heading,
      subtitle: data.projects.subtitle,
      categories: [...data.projects.categories],
      items: data.projects.items.map((p) => ({ ...p, tags: [...p.tags] })),
    });
  }, [data.projects]);

  const save = async () => {
    if (await update("projects", local)) onSave();
    else alert("Save failed. Check your connection and permissions.");
  };

  const updateProject = (id: string, field: string, value: string) => {
    setLocal((current) => ({
      ...current,
      items: current.items.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const uploadImage = async (id: string, file: File) => {
    setUploadError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 3 * 1024 * 1024) {
      setUploadError("Choose a JPEG, PNG, or WebP image no larger than 3 MB.");
      return;
    }
    setUploading(id);
    try {
      const response = await fetch("/api/admin/project-images", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const result = await response.json();
      if (!response.ok || typeof result.url !== "string") throw new Error(result.error || "Upload failed.");
      updateProject(id, "image", result.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const toggleFinished = (id: string) => {
    setLocal({
      ...local,
      items: local.items.map((p) => (p.id === id ? { ...p, finished: !p.finished } : p)),
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
      image: "",
      tags: [],
      github: "https://github.com",
      live: "https://vercel.com",
      category: "Personal Projects" as const,
      finished: false,
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
      <SectionCard title="Section Header">
        <div className="space-y-4">
          <Field label="Heading">
            <Input value={local.heading} onChange={(v) => setLocal({ ...local, heading: v })} />
          </Field>
          <Field label="Subtitle">
            <Input value={local.subtitle} onChange={(v) => setLocal({ ...local, subtitle: v })} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title={`Projects (${local.items.length})`}>
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">Manage your school and personal projects</p>
          <button onClick={addProject} className="w-full shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary-dark sm:w-auto">+ Add Project</button>
        </div>

        <div className="space-y-3">
          {local.items.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-xl border border-card-border">
              <div
                className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.category === "School Projects"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}>
                    {project.category === "School Projects" ? "School" : "Personal"}
                  </span>
                  {!project.finished && (
                    <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                      W.I.P
                    </span>
                  )}
                  <span className="truncate font-medium text-foreground">{project.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); removeProject(project.id); }} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <svg className={`h-4 w-4 text-muted-foreground transition-transform ${editingProject === project.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {editingProject === project.id && (
                <div className="border-t border-card-border px-4 py-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title">
                        <Input value={project.title} onChange={(v) => updateProject(project.id, "title", v)} />
                      </Field>
                      <Field label="Category">
                        <select
                          value={project.category}
                          onChange={(e) => updateProjectCategory(project.id, e.target.value as "School Projects" | "Personal Projects")}
                          className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="School Projects">School Projects</option>
                          <option value="Personal Projects">Personal Projects</option>
                        </select>
                      </Field>
                    </div>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/50">
                      <input
                        type="checkbox"
                        checked={project.finished}
                        onChange={() => toggleFinished(project.id)}
                        className="h-4 w-4 rounded border-card-border text-primary focus:ring-primary/20"
                      />
                      <span className="font-medium">Finished Project</span>
                      {!project.finished && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                          W.I.P
                        </span>
                      )}
                    </label>
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
                    <div>
                      <label htmlFor={`project-image-${project.id}`} className="mb-1.5 block text-sm font-medium text-foreground">Project banner</label>
                      {project.image && (
                        <div className="relative mb-3 aspect-[16/7] overflow-hidden rounded-xl border border-card-border bg-muted">
                          <Image src={project.image} alt={`${project.title} banner preview`} fill unoptimized sizes="(min-width: 640px) 600px, 90vw" className="object-cover" />
                        </div>
                      )}
                      <input id={`project-image-${project.id}`} type="file" accept="image/jpeg,image/png,image/webp"
                        disabled={uploading !== null}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          event.target.value = "";
                          if (file) void uploadImage(project.id, file);
                        }}
                        className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-on-primary disabled:opacity-60" />
                      <p className="mt-2 text-xs text-muted-foreground">
                        {uploading === project.id ? "Uploading…" : "JPEG, PNG or WebP, up to 3 MB. Save Changes to publish the banner."}
                      </p>
                      {uploadError && editingProject === project.id && <p role="alert" className="mt-2 text-sm text-red-500">{uploadError}</p>}
                      {project.image && <button type="button" onClick={() => updateProject(project.id, "image", "")} className="mt-2 text-sm text-red-500">Remove banner</button>}
                      <div className="mt-3">
                        <Field label="Or enter an image URL or public path">
                          <Input value={project.image} onChange={(v) => updateProject(project.id, "image", v)} />
                        </Field>
                      </div>
                    </div>
                    <Field label="Tags">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center gap-1 rounded-xl border border-card-border bg-muted px-3 py-1.5 text-sm text-foreground">
                            {tag}
                            <button
                              onClick={() => updateProjectTags(project.id, project.tags.filter((_, idx) => idx !== i))}
                              className="ml-0.5 text-muted-foreground hover:text-red-500"
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
                          className="shrink-0 rounded-xl border border-card-border bg-muted px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card hover:text-primary"
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
      </SectionCard>

      <SaveButton onClick={save} disabled={uploading !== null} />
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
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<ContactData>({ ...data.contact });

  useEffect(() => {
    setLocal({ ...data.contact });
  }, [data.contact]);

  const save = async () => {
    if (await update("contact", local)) onSave();
    else alert("Save failed. Check your connection and permissions.");
  };

  return (
    <SectionCard title="Contact Section">
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
    </SectionCard>
  );
}

/* ───── Social Editor ───── */
function SocialEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<SocialData>({ ...data.social });

  useEffect(() => {
    setLocal({ ...data.social });
  }, [data.social]);

  const save = async () => {
    if (await update("social", local)) onSave();
    else alert("Save failed. Check your connection and permissions.");
  };

  return (
    <SectionCard title="Social Links">
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
    </SectionCard>
  );
}

/* ───── Meta Tag Editor ───── */
function MetaEditor({
  data,
  update,
  onSave,
}: {
  data: PortfolioData;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  onSave: () => void;
}) {
  const [local, setLocal] = useState<MetaData>({ ...data.meta });

  useEffect(() => {
    setLocal({ ...data.meta });
  }, [data.meta]);

  const save = async () => {
    if (await update("meta", local)) onSave();
    else alert("Save failed. Check your connection and permissions.");
  };

  return (
    <SectionCard title="Meta Tag Settings">
      <div className="space-y-4">
        <Field label="Site Title">
          <Input value={local.title} onChange={(v) => setLocal({ ...local, title: v })} />
        </Field>
        <Field label="Meta Description">
          <TextArea rows={4} value={local.description} onChange={(v) => setLocal({ ...local, description: v })} />
        </Field>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Used for the browser tab and search engine previews of the site.
      </p>
      <div className="mt-6">
        <SaveButton onClick={save} />
      </div>
    </SectionCard>
  );
}
