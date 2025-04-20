import { getServerSession } from "next-auth";
import Link from "next/link";
import { CheckSquare, ArrowRight, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:py-24 lg:py-32 bg-gradient-to-br from-background via-surface to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">Get more done with</span>
              <span className="block text-primary mt-2">TaskMaster</span>
            </h1>
            <p className="max-w-md mx-auto mt-6 text-lg text-muted">
              The elegant productivity app that helps you organize your tasks, focus on what matters, and achieve more every day.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              {!session ? (
                <>
                  <Link href="/auth/signin">
                    <Button size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/todos">
                  <Button size="lg">
                    View My Tasks
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Designed for productivity</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              TaskMaster combines beautiful design with powerful features to help you stay organized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-subtle">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Intuitive Task Management</h3>
              <p className="text-muted">
                Create, organize and prioritize your tasks with our beautifully designed interface.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-subtle">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Stay Focused</h3>
              <p className="text-muted">
                Filter your tasks by status and easily track your progress throughout the day.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-subtle">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-medium mb-2">Seamless Experience</h3>
              <p className="text-muted">
                Enjoy a consistent experience across all your devices with our responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}