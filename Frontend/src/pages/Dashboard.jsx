import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUserByAdmin, getAllTasksAdmin, deleteTaskByAdmin } from '../services/adminService';
import { logoutUser } from '../services/authService';
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast'
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('users'); 
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null); 
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const uRes = await getAllUsers();
            const tRes = await getAllTasksAdmin();
            setUsers(uRes.users || []);
            setAllTasks(tRes.tasks || []);
            toast.success(tRes.message);
        } catch (error) { 
            toast.error(error); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Kya aap sach mein is user ko terminate karna chahte hain?")) return;
        try {
           const result= await deleteUserByAdmin(userId);
            
           
            setUsers((prev) => prev.filter((u) => u._id !== userId));
            setAllTasks((prev) => prev.filter((t) => t.user?._id !== userId));
            toast.success(result.message);
            toast.success("User Terminated Successfully! 💥");
        } catch (error) {
            toast.error(error);
        }
    };

  
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
           const result= await api.put(`/admin/task/${editingTask._id}`, {
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status
            });

            
            setAllTasks((prevTasks) => 
                prevTasks.map((t) => t._id === editingTask._id ? { ...t, ...editingTask } : t)
            );

            toast.success(result.message);
            setEditingTask(null); 
        } catch (error) {
            toast.error(error);
        }
    };

   
    const handleDeleteTask = async (id) => {
        if (!window.confirm("Delete karein?")) return;
        try {
            const result=await deleteTaskByAdmin(id);
            setAllTasks((prev) => prev.filter(t => t._id !== id));
            toast.success(result.message);
        } catch (e) { toast.error(e); }
    };

    const handleLogout = async () => {
      const result=  await logoutUser();
        toast.success(result.message);
        navigate('/');

    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse text-xl tracking-tighter">PRIME CORE: SYNCING...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-950 text-white flex flex-col shadow-2xl">
                <div className="p-8 text-xl font-black border-b border-slate-800 text-blue-500">PRIME ADMIN</div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('users')} className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${activeTab === 'users' ? 'bg-blue-600 shadow-lg shadow-blue-900/40' : 'hover:bg-slate-900 text-slate-400'}`}>👥 Manage Users</button>
                    <button onClick={() => setActiveTab('tasks')} className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${activeTab === 'tasks' ? 'bg-blue-600 shadow-lg shadow-blue-900/40' : 'hover:bg-slate-900 text-slate-400'}`}>📊 Global Tasks</button>
                </nav>
                <button onClick={handleLogout} className="m-4 p-4 bg-red-600 rounded-2xl font-bold hover:bg-red-700 transition-all text-sm shadow-lg shadow-red-900/20">Logout Session</button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-y-auto">
                <header className="mb-10 flex justify-between items-center">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{activeTab} Monitor</h1>
                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-slate-200">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Live Connections</p>
                            <p className="text-xl font-black text-blue-600">{activeTab === 'users' ? users.length : allTasks.length}</p>
                        </div>
                    </div>
                </header>

                {activeTab === 'users' ? (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <th className="p-8">User Identity</th>
                                    <th className="p-8 text-right">Operational Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map(u => (
                                    <tr key={u._id} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="p-8">
                                            <p className="font-black text-slate-800 text-lg">{u.username}</p>
                                            <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                                        </td>
                                        <td className="p-8 text-right">
                                            {u.role !== 'admin' ? (
                                                <button 
                                                    onClick={() => handleDeleteUser(u._id)} 
                                                    className="bg-red-50 text-red-500 px-6 py-2 rounded-xl text-xs font-black hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    TERMINATE
                                                </button>
                                            ) : (
                                                <span className="bg-slate-100 text-slate-400 px-4 py-2 rounded-xl text-[10px] font-black">SYSTEM ADMIN</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {allTasks.map(t => (
                            <div key={t._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all relative group overflow-hidden">
                                <div className={`absolute top-0 left-0 w-full h-2 ${t.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'}`}></div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-tighter ${t.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {t.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingTask(t)} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        <button onClick={() => handleDeleteTask(t._id)} className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">{t.title}</h3>
                                <p className="text-sm text-slate-400 line-clamp-3 mb-8 font-medium">{t.description || "Operational intelligence not provided."}</p>
                                <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-blue-500">{t.user?.username?.charAt(0).toUpperCase()}</div>
                                        <span className="text-slate-500 uppercase tracking-widest">{t.user?.username}</span>
                                    </div>
                                    <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* EDIT MODAL */}
                {editingTask && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[100] p-6 animate-in fade-in duration-300">
                        <div className="bg-white p-12 rounded-[3rem] w-full max-w-md shadow-2xl border border-white/20">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter text-center">Update Task</h2>
                            <form onSubmit={handleUpdateSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Header</label>
                                    <input className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-700" value={editingTask.title} onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Core Intelligence</label>
                                    <textarea className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-700" rows="3" value={editingTask.description} onChange={(e) => setEditingTask({...editingTask, description: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lifecycle Status</label>
                                    <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-black text-slate-900" value={editingTask.status} onChange={(e) => setEditingTask({...editingTask, status: e.target.value})}>
                                        <option value="pending">PENDING</option>
                                        <option value="completed">COMPLETED</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="flex-1 bg-blue-600 text-white p-5 rounded-[1.5rem] font-black shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">Commit Update</button>
                                    <button type="button" onClick={() => setEditingTask(null)} className="flex-1 bg-slate-100 text-slate-400 p-5 rounded-[1.5rem] font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">Abort</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;