import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CheckSquare } from "lucide-react";
import SignInButton from "@/components/auth/SignInButton";

export default async function SignInPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/todos");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <CheckSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-2 text-3xl font-bold text-foreground">
          TaskMaster
        </h2>
        <p className="mt-2 text-sm text-muted">
          The elegant productivity app for your daily tasks
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-subtle sm:rounded-lg sm:px-10">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}