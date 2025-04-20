'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:py-24 lg:py-32 bg-gradient-to-br from-background via-surface to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Get more done with</span>
            <span className="block text-primary mt-2">TaskMaster</span>
          </h1>
          <p className="max-w-md mx-auto mt-6 text-lg text-muted">
            The elegant productivity app that helps you organize your tasks, focus on what matters, and achieve more every day.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button onClick={() => router.push('/register')} size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={() => router.push('/login')} size="lg" variant="outline">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold">Designed for productivity</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            TaskMaster combines beautiful design with powerful features to help you stay organized.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Intuitive Task Management",
                desc: "Create, organize and prioritize your tasks with our beautifully designed interface.",
                color: "primary",
              },
              {
                title: "Stay Focused",
                desc: "Filter your tasks by status and easily track your progress throughout the day.",
                color: "secondary",
              },
              {
                title: "Seamless Experience",
                desc: "Enjoy a consistent experience across all your devices with our responsive design.",
                color: "accent",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-background p-6 rounded-lg shadow-subtle">
                <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                  <CheckCircle className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Ready to boost your productivity?</h2>
              <p className="mt-2 text-muted max-w-md">
                Join thousands of users who have transformed their daily workflow with TaskMaster.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button onClick={() => router.push('/register')}>
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
