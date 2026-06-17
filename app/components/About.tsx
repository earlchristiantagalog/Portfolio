import Image from "next/image";

const skills = [
  "JavaScript",
  "HTML/CSS",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "Git",
];

export default function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          About Me
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-500 dark:text-gray-400">
          Get to know me a little better
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio */}
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              I&apos;m a first-year college student pursuing a Bachelor of
              Science in Information Technology at the University of Cebu. I have
              a strong passion for web development and enjoy learning new
              technologies to build modern, user-friendly applications.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Outside of coding, I enjoy exploring new tools, collaborating with
              fellow developers, and continuously improving my skills to grow in
              the tech industry.
            </p>

            {/* Skills */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center justify-center bg-white px-6 py-6">
                <Image
                  src="/uc-logo-bg-160x83.c24343b851e5b064daf9.png"
                  alt="University of Cebu Logo"
                  width={120}
                  height={63}
                  unoptimized
                />
              </div>
              <div className="px-6 py-5">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
UNIVERSITY OF CEBU - BANILAD
                </h4>
                <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
                </p>
                <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  First Year Student
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Currently learning the fundamentals of IT, programming, and
                  web development. Eager to apply classroom knowledge to
                  real-world projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
