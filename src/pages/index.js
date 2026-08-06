import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import clsx from "clsx";
import DocBanner from "../components/doc-banner/DocBanner.jsx";

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
  },
  {
    title: "Customer App",
    description:
      "Configure and publish the customer-facing Flutter app for Android and iOS with full shopping experience.",
    to: "/docs/app-customer/prerequisites",
    icon: IconSmartphone,
    accent: "#0E9623",
  },
  {
    title: "Delivery Boy App",
    description:
      "Set up and publish the Delivery Boy Flutter app for Android and iOS to manage order pickups and deliveries.",
    to: "/docs/app-delivery/prerequisites",
    icon: IconBike,
    accent: "#0E9623",
  },
  {
    title: "Web Portal",
    description:
      "Set up and deploy the Snapbuy web portal for customers to browse and shop online seamlessly.",
    to: "/docs/web/overview",
    icon: IconGlobe,
    accent: "#0E9623",
  },
  {
    title: "Support",
    description:
      "Whether you're setting up for the first time or need help with advanced features, our support team is here.",
    to: "/docs/support",
    icon: IconHeadset,
    accent: "#085a15",
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

function DocCard({ title, description, to, icon: Icon, accent }) {
  return (
    <div className={clsx("col", styles.docCard)}>
      <Link to={to} className={styles.cardLink}>
        <div className={styles.card}>
          <div
            className={styles.cardIconWrap}
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <Icon />
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{description}</p>
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
        </div>
      </Link>
    </div>
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

        <section className={styles.ctaBand}>
          <div className="container">
            <div className={styles.ctaBox}>
              <span className={styles.ctaIcon}>🚀</span>
              <h2 className={styles.ctaTitle}>Ready to get started?</h2>
              <p className={styles.ctaText}>
                Begin with the introduction — it walks you through the full
                Snapbuy ecosystem and the recommended setup order.
              </p>
              <Link
                className={clsx("button button--lg", styles.ctaBtn)}
                to="/docs/intro"
              >
                Read the Introduction
              </Link>
            </div>
          </div>
          <DocBanner />
        </section>
      </main>
    </Layout>
  );
}
