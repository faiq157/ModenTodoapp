import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TodoList from "@/components/todo/TodoList";

export default async function TodoPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <TodoList />
    </div>
  );
}