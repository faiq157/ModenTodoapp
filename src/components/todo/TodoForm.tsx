import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Calendar, Clock } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
      setDueDate('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="todo-text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Calendar size={16} className="absolute left-3 top-3 text-muted" />
          <Input
            id="due-date"
            type="date"
            placeholder="Due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex-1">
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          type="submit" 
          disabled={!text.trim()}
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;