"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { PlusCircle, X, CheckSquare, List } from "lucide-react";
import Button from "../ui/Button";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  priority: string;
}

export default function TodoList() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (session?.user) {
      loadTodos();
    }
  }, [session]);

  const loadTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const addTodo = async (text: string, dueDate?: string, priority: string = "medium") => {
    if (text.trim() && session?.user) {
      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, dueDate, priority }),
        });
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
        setIsFormOpen(false);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        const response = await fetch(`/api/todos/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !todo.completed }),
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const editTodo = async (id: string, newText: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const completedTodoCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="max-w-2xl w-full mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-muted text-sm">
            {activeTodoCount} active, {completedTodoCount} completed
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="rounded-full"
          aria-label="Add new task"
        >
          <PlusCircle size={16} className="mr-2" />
          New Task
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-6 card animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium">Add New Task</h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-muted hover:text-foreground"
              aria-label="Close form"
            >
              <X size={18} />
            </button>
          </div>
          <TodoForm onAddTodo={addTodo} />
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="flex border-b border-border mb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              filter === "all"
                ? "text-primary border-b-2 border-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            <List size={16} className="mr-2" />
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              filter === "active"
                ? "text-primary border-b-2 border-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            <PlusCircle size={16} className="mr-2" />
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              filter === "completed"
                ? "text-primary border-b-2 border-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            <CheckSquare size={16} className="mr-2" />
            Completed
          </button>
        </div>

        {filteredTodos.length > 0 ? (
          <div className="animate-fade-in">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onToggleComplete={toggleComplete}
                onEdit={editTodo}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted animate-fade-in">
            {filter === "all"
              ? "You don't have any tasks yet. Add one to get started!"
              : filter === "active"
              ? "You don't have any active tasks."
              : "You don't have any completed tasks."}
          </div>
        )}
      </div>
    </div>
  );
}