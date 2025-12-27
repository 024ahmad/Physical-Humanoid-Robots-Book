import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

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

function FeatureCard({ title, to, icon }) {
  return (
    <div className={clsx('col', 'col--4', styles.featureCard)}>
      <Link to={to} className={styles.featureCardLink}>
        <div className={styles.featureCardInner}>
          <div className={styles.featureCardIcon}>
            {icon}
          </div>
          <h3 className={styles.featureCardTitle}>{title}</h3>
        </div>
      </Link>
    </div>
  );
}

function FeaturesSection() {
  // Define the mapping from category labels to emojis and routes
  const categoryRoutes = {
    '📘 Introduction': { emoji: '📘', route: '/docs/intro' },
    '🤖 Module 1: The Robotic Nervous System (ROS 2)': { emoji: '🤖', route: '/docs/modules/module-1/summary' },
    '🧠 Module 2: The Digital Twin (Gazebo & Unity)': { emoji: '🧠', route: '/docs/modules/module-2/summary' },
    '👁️ Module 3: The AI-Robot Brain (NVIDIA Isaac™)': { emoji: '👁️', route: '/docs/modules/module-3/summary' },
    '⚙️ Module 4: Vision-Language-Action (VLA)': { emoji: '⚙️', route: '/docs/modules/module-4/summary' },
    '📘 Conclusion: Course Wrap-up and Future Directions': { emoji: '📘', route: '/docs/conclusion' },
  };

  // Create feature cards based on the sidebar configuration
  const featureCards = Object.entries(categoryRoutes).map(([label, data]) => (
    <FeatureCard
      key={label}
      title={label}
      to={data.route}
      icon={<span className={styles.emojiIcon}>{data.emoji}</span>}
    />
  ));

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featureCards}
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
