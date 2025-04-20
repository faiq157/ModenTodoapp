import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggleComplete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div 
      className={`todo-item group ${todo.completed ? 'bg-surface/30' : ''}`}
      style={{animationDelay: `${parseInt(todo.id) * 50}ms`}}
    >
      <div className="flex items-center">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="flex-shrink-0"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="ml-2 flex-grow px-2 py-1 rounded border-border focus:ring-1 focus:ring-primary focus:outline-none"
            autoFocus
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`ml-2 flex-grow cursor-pointer transition-all ${
              todo.completed ? 'todo-item-checked' : ''
            }`}
          >
            {todo.text}
          </label>
        )}

        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsEditing(true);
                setEditText(todo.text);
              }}
              aria-label="Edit todo"
            >
              <Pencil size={16} className="text-muted hover:text-foreground" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            <Trash2 size={16} className="text-error" />
          </Button>
        </div>
      </div>
      
      {todo.completed && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-success">
          <CheckCircle size={16} className="opacity-70" />
        </span>
      )}
    </div>
  );
};

export default TodoItem;