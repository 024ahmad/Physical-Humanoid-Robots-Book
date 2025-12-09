import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import { Code2, Brain, Compass } from 'lucide-react';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Master the Future of Humanoid Robotics
        </Heading>
        <p className="hero__subtitle">From Digital Intelligence to Embodied Reality</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get the Textbook
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className={clsx('col', 'col--4', styles.featureCard)}>
      <div className={styles.featureCardInner}>
        <div className={styles.featureCardIcon}>
          <Icon size={48} />
        </div>
        <h3 className={styles.featureCardTitle}>{title}</h3>
        <p className={styles.featureCardDescription}>{description}</p>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <FeatureCard
            icon={Code2}
            title="Implementation Focus"
            description="Code examples and practical walkthroughs for real-world robotics"
          />
          <FeatureCard
            icon={Brain}
            title="AI Integration"
            description="Machine learning, neural networks, and intelligent decision-making"
          />
          <FeatureCard
            icon={Compass}
            title="Advanced Topics"
            description="Motion planning, vision, and navigation"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics Textbook`}
      description="Master the future of humanoid robotics - from digital intelligence to embodied reality">
      <HomepageHeader />
      <main>
        <FeaturesSection />
      </main>
    </Layout>
  );
}
