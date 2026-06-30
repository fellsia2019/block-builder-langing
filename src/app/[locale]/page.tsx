import Hero from '@/components/Hero';
import WhatIs from '@/components/WhatIs';
import GitHubNpmBlock from '@/components/GitHubNpmBlock';
import Features from '@/components/Features';
import Architecture from '@/components/Architecture';
import CodeExamples from '@/components/CodeExamples';
import Installation from '@/components/Installation';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhatIs />
      <Features />
      <CodeExamples />
      <Architecture />
      <Installation />
      <GitHubNpmBlock />
      <Footer />
    </main>
  );
}

