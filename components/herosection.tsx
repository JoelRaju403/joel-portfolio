export function HeroSection() {
  const NAME = "Joel Raju";
  const TAGLINE =
    "I'm currently in my 4th year at the University of Western Australia majoring in Software Engineering. I have a passion for building innovative solutions that make a difference. Currently I am conducting my honours research investigating techniques to improve Training-Phase Backdoor Detection in Deep Neural Networks.";
  const GITHUB = "https://github.com/JoelRaju403";
  const LINKEDIN = "https://www.linkedin.com/in/joel-raju-36z/";
  const RESUME_PATH = "/resume.pdf";

  return (
    <section className="relative z-[1] flex min-h-[calc(100vh-0px)] items-center justify-center px-4 py-24">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
        <h1 className="bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl leading-tight pb-2 md:pb-3  ">
          {NAME}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-relaxed text-white/90 md:text-lg">
          {TAGLINE}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-6">
          {/* Resume CTA */}
          <a
            href={RESUME_PATH}
            download
            className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 ring-1 ring-white/10 transition hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="Download résumé"
          >
            Resumé
          </a>

          {/* GitHub */}
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white/90 transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            aria-label="GitHub profile"
          >
            {/* GitHub icon (inline SVG) */}
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white/90 transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            aria-label="LinkedIn profile"
          >
            {/* LinkedIn icon (inline SVG) */}
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V23h-4v-6.6c0-1.57-.03-3.6-2.19-3.6-2.2 0-2.53 1.7-2.53 3.48V23h-4V8.5z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
