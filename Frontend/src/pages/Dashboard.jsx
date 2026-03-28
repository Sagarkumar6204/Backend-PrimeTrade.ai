import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUserByAdmin, getAllTasksAdmin, deleteTaskByAdmin } from '../services/adminService';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('users'); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 🌟 Live Stats Calculation
    const totalUsers = users.length;
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;

    const fetchData = async () => {
        try {
            setLoading(true);
            const uRes = await getAllUsers();
            const tRes = await getAllTasksAdmin();
            setUsers(uRes.users || []);
            setAllTasks(tRes.tasks || []);
        } catch (error) {
            toast.error("Data Sync Failed!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm("User aur unka saara data delete karein?")) return;
        try {
            await deleteUserByAdmin(id);
            toast.success("User Terminated!");
            setUsers(users.filter(u => u._id !== id));
            setAllTasks(allTasks.filter(t => t.user?._id !== id));
        } catch (e) { toast.error("Delete failed"); }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm("Admin power: Delete this task?")) return;
        try {
            await deleteTaskByAdmin(id);
            toast.success("Task Removed!");
            setAllTasks(allTasks.filter(t => t._id !== id));
        } catch (e) { toast.error("Task delete failed"); }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-72 bg-slate-950 text-white flex flex-col shadow-2xl">
                <div className="p-8 text-2xl font-black border-b border-slate-800 text-blue-500">PRIME CORE</div>
                <nav className="flex-1 p-6 space-y-3">
                    <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-900 text-slate-400'}`}>
                        <span>👥</span> Manage Users
                    </button>
                    <button onClick={() => setActiveTab('tasks')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tasks' ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-900 text-slate-400'}`}>
                        <span>📊</span> Global Tasks
                    </button>
                </nav>
                <button onClick={async () => { await logoutUser(); navigate('/login'); }} className="m-6 p-3 bg-red-600/20 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all">Logout Session</button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white border-b p-6 flex justify-between items-center shadow-sm">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">{activeTab} Monitor</h2>
                        <p className="text-xs text-gray-400 font-bold">LIVE DATABASE STATUS</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-blue-50 border border-blue-100 px-5 py-2 rounded-2xl text-center">
                            <p className="text-[10px] font-black text-blue-400 uppercase">Users</p>
                            <p className="text-xl font-black text-blue-700">{totalUsers}</p>
                        </div>
                        <div className="bg-orange-50 border border-orange-100 px-5 py-2 rounded-2xl text-center">
                            <p className="text-[10px] font-black text-orange-400 uppercase">Pending</p>
                            <p className="text-xl font-black text-orange-700">{pendingTasks}</p>
                        </div>
                        <div className="bg-green-50 border border-green-100 px-5 py-2 rounded-2xl text-center">
                            <p className="text-[10px] font-black text-green-400 uppercase">Done</p>
                            <p className="text-xl font-black text-green-700">{completedTasks}</p>
                        </div>
                    </div>
                </header>

                <main className="p-8 overflow-y-auto flex-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-full text-blue-500 animate-bounce font-bold">Syncing...</div>
                    ) : activeTab === 'users' ? (
                        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">User Identity</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Role</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {users.map(u => (
                                        <tr key={u._id} className="hover:bg-gray-50 transition-all group">
                                            <td className="px-8 py-5 font-bold text-gray-800">{u.username}<br/><span className="text-xs text-gray-400 font-normal">{u.email}</span></td>
                                            <td className="px-8 py-5 uppercase text-[10px] font-black tracking-widest">{u.role}</td>
                                            <td className="px-8 py-5 text-right">
                                                {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u._id)} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-500 hover:text-white transition-all">Terminate</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {allTasks.map(t => (
                                <div key={t._id} className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all relative">
                                    <div className={`absolute top-0 left-0 w-full h-1.5 ${t.status === 'completed' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-[10px] font-black uppercase p-1 bg-gray-100 rounded">{t.status}</span>
                                        <button onClick={() => handleDeleteTask(t._id)} className="text-red-400 hover:text-red-600 text-xs font-bold">Delete</button>
                                    </div>
                                    <h4 className="font-black text-gray-800 text-lg">{t.title}</h4>
                                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">{t.description}</p>
                                    <div className="pt-4 border-t flex justify-between items-center">
                                        <p className="text-xs font-bold text-blue-600 italic">By: {t.user?.username || 'Unknown'}</p>
                                        <p className="text-[10px] text-gray-300 font-bold">{new Date(t.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;