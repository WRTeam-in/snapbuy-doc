import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import clsx from "clsx";

function IconStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <path d="M5 9v10h14V9" />
      <path d="M9.5 19v-6h5v6" />
    </svg>
  );
}

function IconSmartphone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function IconBike() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M12 17.5V10l-3-4h6M5.5 17.5 10 9h5l3.5 8.5" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M19.5 19v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

const SECTIONS = [
  {
    title: "Admin Panel",
    description:
      "Manage products, orders, delivery boys, users, payments, and all platform settings from one powerful dashboard.",
    to: "/docs/admin/overview",
    icon: IconStore,
    accent: "#0E9623",
    meta: "Start here",
  },
  {
    title: "Customer App",
    description:
      "Configure and publish the customer-facing Flutter app for Android and iOS with full shopping experience.",
    to: "/docs/app-customer/prerequisites",
    icon: IconSmartphone,
    accent: "#0E9623",
    meta: "Android & iOS",
  },
  {
    title: "Delivery Boy App",
    description:
      "Set up and publish the Delivery Boy Flutter app for Android and iOS to manage order pickups and deliveries.",
    to: "/docs/app-delivery/prerequisites",
    icon: IconBike,
    accent: "#0E9623",
    meta: "Android & iOS",
  },
  {
    title: "Web Portal",
    description:
      "Set up and deploy the Snapbuy web portal for customers to browse and shop online seamlessly.",
    to: "/docs/web/",
    icon: IconGlobe,
    accent: "#0E9623",
    meta: "VPS deploy",
  },
  {
    title: "Support",
    description:
      "Whether you're setting up for the first time or need help with advanced features, our support team is here.",
    to: "/docs/support",
    icon: IconHeadset,
    accent: "#0E9623",
    meta: "Mon–Fri, IST",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Set up the Admin Panel",
    text: "Install the backend first — every app and the website read their data from it.",
    to: "/docs/admin/overview",
  },
  {
    n: "02",
    title: "Configure your apps",
    text: "Point the Customer and Delivery apps at your panel, then brand and build them.",
    to: "/docs/app-customer/prerequisites",
  },
  {
    n: "03",
    title: "Deploy the Web Portal",
    text: "Put the storefront live on a VPS with PM2, Apache or Nginx, and HTTPS.",
    to: "/docs/web/deployment",
  },
];

function HeroWave() {
  return (
    <div className={styles.heroWave} aria-hidden="true">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"
          className={styles.wavePath}
        />
      </svg>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={clsx("container", styles.heroContent)}>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link
            className={clsx("button button--lg", styles.btnWhite)}
            to="/docs/intro"
          >
            Get Started
          </Link>
        </div>
      </div>
      <HeroWave />
    </header>
  );
}

function DocCard({ title, description, to, icon: Icon, accent, meta }) {
  return (
    <div className={clsx("col", styles.docCard)}>
      <Link to={to} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div
              className={styles.cardIconWrap}
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              <Icon />
            </div>
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{description}</p>
          <span className={styles.cardFoot}>
            <span className={styles.cardArrow}>
              Explore
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            {meta && <span className={styles.cardMeta}>{meta}</span>}
          </span>
        </div>
      </Link>
    </div>
  );
}

function QuickStart() {
  return (
    <section className={styles.steps}>
      <div className="container">
        <p className={styles.sectionEyebrow}>Quick start</p>
        <h2 className={styles.sectionTitle}>Three steps to go live</h2>
        <p className={styles.sectionDesc}>
          Follow them in order — each stage depends on the one before it.
        </p>
        <div className={styles.stepsGrid}>
          {STEPS.map((s) => (
            <Link key={s.n} to={s.to} className={styles.step}>
              <span className={styles.stepNum}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Complete documentation for the Snapbuy delivery & shopping platform ecosystem"
    >
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <p className={styles.sectionEyebrow}>Documentation</p>
            <h2 className={styles.sectionTitle}>Everything in one place</h2>
            <p className={styles.sectionDesc}>
              Step-by-step guides for every part of the Snapbuy ecosystem — from
              server setup to store publishing.
            </p>
            <div className={clsx("row", styles.cardsRow)}>
              {SECTIONS.map((s) => (
                <DocCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        <QuickStart />

        <section className={styles.ctaBand}>
          <div className="container">
            <div className={styles.ctaBox}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={styles.ctaInner}>
                <div className={styles.ctaMain}>
                  <span className={styles.ctaEyebrow}>Get started</span>
                  <h2 className={styles.ctaTitle}>
                    Everything you need, documented.
                  </h2>
                  <p className={styles.ctaText}>
                    The introduction walks you through the full Snapbuy
                    ecosystem and the recommended setup order — start there.
                  </p>
                  <div className={styles.ctaActions}>
                    <Link className={styles.ctaBtn} to="/docs/intro">
                      Read the Introduction
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      className={styles.ctaBtnGhost}
                      href="https://api.whatsapp.com/send?phone=918200323468&text=Hello%20Jignesh%2C%20I%20want%20to%20know%20more%20about%20the%20installation%20service%20for%20Snapbuy."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
                      </svg>
                    Call Us
                    </Link>
                
                  </div>
                </div>

                <div className={styles.ctaAside}>
                  <div className={styles.ctaAsideCard}>
                    <IconHeadset />
                    <div>
                      <p className={styles.ctaAsideTitle}>Need a hand?</p>
                      <p className={styles.ctaAsideText}>
                        Dedicated specialists for the panel, apps, and web
                        portal — Mon–Fri, 9–6&nbsp;IST.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
