import Hero from '@/components/Hero';
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
      <Features />
      <CodeExamples />
      <Architecture />
      <Installation />
      <Footer />
    </main>
  );
}

