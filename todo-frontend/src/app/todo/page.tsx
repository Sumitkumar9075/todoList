'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { setTodos, updateTodo } from '../store/todoSlice';

export default function TodoPage() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);
  const { token } = useSelector((state: RootState) => state.user);
  const { username } = useSelector((state: RootState) => state.user);

  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [updatedTaskName, setUpdatedTaskName] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/todo?username=${username}`);
      dispatch(setTodos(response.data));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(
        'http://localhost:3000/todo/add',
        { task, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask('');
      fetchTodos();
      console.log("token" , token );
      
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (_id: string, isCompleted: boolean) => {
    try {
      await axios.patch(
        `http://localhost:3000/todo/update?id=${_id}`,
        { isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateTodo({ _id, isCompleted }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const editTask = (todoId: string, taskName: string) => {
    setEditTaskId(todoId);
    setUpdatedTaskName(taskName);
  };

  const saveTask = async (_id: string) => {
    try {
      await axios.patch(
        `http://localhost:3000/todo/update?id=${_id}`,
        { task: updatedTaskName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodos();
      setEditTaskId(null);
      setUpdatedTaskName('');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const deleteTask = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete?id=${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">To-Do List</h1>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
            >
              {editTaskId === todo._id ? (
                <input
                  type="text"
                  value={updatedTaskName}
                  onChange={(e) => setUpdatedTaskName(e.target.value)}
                  className="text-lg w-full border-b-2 mb-2 text-black" 
                />
              ) : (
                <span
                  style={{
                    textDecoration: todo.isCompleted ? 'line-through' : 'none',
                    color: 'black',
                  }}
                  className="text-lg"
                >
                  {todo.task}
                </span>
              )}

              <div className="flex items-center space-x-2">
                {editTaskId === todo._id ? (
                  <button
                    onClick={() => saveTask(todo._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => editTask(todo._id, todo.task)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => toggleTask(todo._id, !todo.isCompleted)}
                  className={`px-4 py-2 rounded-md text-white transition ${
                    todo.isCompleted ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {todo.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                </button>

                <button
                  onClick={() => deleteTask(todo._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
