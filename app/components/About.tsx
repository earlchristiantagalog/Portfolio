"use client";

import Image from "next/image";
import { usePortfolio } from "./PortfolioContext";

export default function About() {
  const { data } = usePortfolio();
  const { about } = data;

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
            {about.bio.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {paragraph}
              </p>
            ))}

            {/* Skills */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
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
                  src={about.education.logo}
                  alt={`${about.education.school} Logo`}
                  width={120}
                  height={63}
                  unoptimized
                />
              </div>
              <div className="px-6 py-5">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {about.education.school}
                </h4>
                <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {about.education.degree}
                </p>
                <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {about.education.status}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {about.education.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
