import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

// 🌟 NAYA: editTaskService ko import kiya
import { logoutUser } from '../services/authService';
import { getMyTasks, createTask, deleteTask, updateTaskStatus, editTaskService } from '../services/taskService';

const Home = () => {
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🌟 NAYA STATE: Edit mode track karne ke liye
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const data = await getMyTasks();
      setTasks(data.tasks); 
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🌟 UPDATE: Ye function ab Create aur Edit dono handle karega
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.warning("Task title is required!");
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (editingTaskId) {
        // Agar edit mode hai toh edit API call karo
        await editTaskService(editingTaskId, newTask);
        toast.success("Task updated successfully!");
        setEditingTaskId(null); // Edit mode band karo
      } else {
        // Normal Create task
        await createTask(newTask);
        toast.success("Task created successfully!");
      }
      
      setNewTask({ title: '', description: '' }); 
      fetchTasks(); 
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      toast.success("Task deleted!");
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      toast.error(error);
    }
  };

  // 🌟 NAYA FUNCTION: Edit button click handle karne ke liye
  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setNewTask({ title: task.title, description: task.description || '' });
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    try {
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
      
      await updateTaskStatus(taskId, newStatus);
      if (newStatus === 'completed') toast.success("Task completed! 🎉");
    } catch (error) {
      toast.error(error);
      fetchTasks(); 
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      setUserData(null);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed",error);
    }
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 tracking-tight">PrimeTrade</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600 hidden md:block">
            Welcome, <strong className="text-gray-900">{userData?.username || "User"}</strong>
          </span>
          <button onClick={handleLogout} className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-all">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <header className="mb-8 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-900">My Workspace</h2>
          <p className="text-gray-500 mt-1">Manage your daily tasks and notes efficiently.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Create/Edit Task Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <span>{editingTaskId ? "✏️" : "➕"}</span> {editingTaskId ? "Edit Task" : "Create New Task"}
              </h3>
              
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} placeholder="E.g., Complete React Assignment" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} placeholder="Add more details here..." rows="4" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
                </div>
                
                {/* 🌟 UPDATE: Button color aur text change hoga edit mode par */}
                <button type="submit" disabled={isSubmitting} className={`w-full py-2.5 rounded-lg text-white font-medium transition-all ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : editingTaskId ? "bg-yellow-500 hover:bg-yellow-600 shadow-md" : "bg-blue-600 hover:bg-blue-700 shadow-md"}`}>
                  {isSubmitting ? "Saving..." : editingTaskId ? "Update Task" : "Save Task"}
                </button>

                {/* 🌟 NAYA: Cancel Edit Button */}
                {editingTaskId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTaskId(null);
                      setNewTask({ title: '', description: '' });
                    }}
                    className="w-full mt-2 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium transition-all"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Task List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Your Tasks ({tasks.length})</h3>
                <div className="flex gap-3 text-sm font-medium">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">{pendingCount} Pending</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{completedCount} Completed</span>
                </div>
              </div>

              {loadingTasks ? (
                <div className="flex justify-center items-center h-40 text-gray-500">
                  <span className="animate-pulse">Loading tasks...</span>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                  <div className="text-4xl mb-3">📭</div>
                  <h4 className="text-gray-800 font-medium">No tasks found</h4>
                  <p className="text-gray-500 text-sm mt-1">Create your first task from the left panel!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task._id} className={`p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all flex justify-between items-start gap-4 ${task.status === 'completed' ? 'bg-gray-50 opacity-70' : 'bg-white'}`}>
                      
                      <div className="flex gap-4 flex-1 items-start">
                        <button 
                          onClick={() => handleToggleStatus(task._id, task.status)}
                          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                        >
                          {task.status === 'completed' && <span>✓</span>}
                        </button>

                        <div>
                          <h4 className={`font-bold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                          )}
                          <span className="text-xs font-medium text-gray-400 mt-3 inline-block bg-white px-2 py-1 rounded border shadow-sm">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* 🌟 UPDATE: Edit aur Delete button dono ek sath */}
                      <div className="flex flex-col gap-2">
                        {/* Edit Button */}
                        <button 
                          onClick={() => handleEditClick(task)} 
                          className="text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
                        >
                          Edit
                        </button>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDeleteTask(task._id)} 
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors" 
                          title="Delete Task"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;