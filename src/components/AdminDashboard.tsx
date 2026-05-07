import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Animated from './Animated';
import { 
  Mail, Users, CheckCircle, Clock, Trash2, 
  ChevronRight, LayoutDashboard, Settings, 
  LogOut, Bell, Search, Filter, Home,
  FileText, Activity, ShieldCheck, List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'messages' | 'users' | 'logs'>('applications');
  const [applications, setApplications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login');
        return;
      }
      // Fetch the profile to check for admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile && profile.role === 'admin') {
        setUser(session.user);
        setAuthChecked(true);
      } else {
        await supabase.auth.signOut();
        navigate('/admin-login');
      }
    };
    checkAuth();
  }, [navigate]);



  useEffect(() => {
    if (authChecked) {
      fetchData();
    }
  }, [activeTab, authChecked]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch everything simultaneously to populate stats cards
      const [appsRes, msgsRes, usersRes] = await Promise.all([
        supabase.from('applications').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false })
      ]);

      if (appsRes.error && appsRes.error.code !== 'PGRST116') {
        console.error("Apps fetch error:", appsRes.error);
      }
      if (msgsRes.error && msgsRes.error.code !== 'PGRST116') {
        console.error("Messages fetch error:", msgsRes.error);
      }
      if (usersRes.error && usersRes.error.code !== 'PGRST116') {
        console.error("Users fetch error:", usersRes.error);
      }

      setApplications(appsRes.data || []);
      setMessages(msgsRes.data || []);
      setUsers(usersRes.data || []);

      if (activeTab === 'logs') {
        const { data: logsData, error: logsError } = await supabase
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!logsError) setLogs(logsData || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string | number, table: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ffae1f]"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1117] border-r border-slate-800 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ffae1f] to-[#fe4f51] rounded-lg flex items-center justify-center">
            <ShieldCheck className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">PAWIN <span className="text-[#ffae1f]">Admin</span></span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-4 mb-4">Operations</p>
          
          <button 
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeTab === 'applications' ? 'bg-[#ffae1f]/10 text-[#ffae1f]' : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard className={`size-5 ${activeTab === 'applications' ? 'text-[#ffae1f]' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="font-semibold text-sm">Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeTab === 'users' ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'}`}
          >
            <Users className={`size-5 ${activeTab === 'users' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="font-semibold text-sm">Users</span>
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeTab === 'messages' ? 'bg-[#fe4f51]/10 text-[#fe4f51]' : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'}`}
          >
            <Mail className={`size-5 ${activeTab === 'messages' ? 'text-[#fe4f51]' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="font-semibold text-sm">Inquiries</span>
          </button>

          <div className="pt-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-4 mb-4">Security</p>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeTab === 'logs' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'}`}
            >
              <List className={`size-5 ${activeTab === 'logs' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-semibold text-sm">Audit Logs</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all group">
              <Settings className="size-5 text-slate-500 group-hover:text-slate-300" />
              <span className="font-semibold text-sm">Settings</span>
            </button>
          </div>

          <div className="pt-8">
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all group">
              <Home className="size-5 text-slate-500 group-hover:text-slate-300" />
              <span className="font-semibold text-sm">Back to Site</span>
            </button>
          </div>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800/50">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all group"
          >
            <LogOut className="size-5 text-slate-500 group-hover:text-red-400" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800 w-96 transition-all focus-within:border-[#ffae1f]/50">
            <Search className="size-4 text-slate-500" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full text-slate-300 placeholder:text-slate-600" />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-all relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#fe4f51] rounded-full border-2 border-[#0d1117]"></span>
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex items-center gap-3 pl-2 relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[#ffae1f] text-sm hover:border-[#ffae1f]/50 transition-all shadow-lg"
              >
                {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl z-50 p-2"
                    >
                      <div className="p-4 border-b border-slate-800/50 mb-2 bg-slate-900/50 rounded-t-xl">
                        <p className="text-sm font-bold text-white truncate">
                          {user?.user_metadata?.full_name || "Administrator"}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate mt-1">
                          {user?.email}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => { navigate('/'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all group"
                      >
                        <Home className="size-4 text-slate-600 group-hover:text-[#ffae1f]" />
                        Back to Website
                      </button>

                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                      >
                        <LogOut className="size-4 opacity-70" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Total Applications" 
              value={applications.length} 
              icon={<LayoutDashboard className="size-6" />}
              color="text-[#ffae1f]"
              bgColor="bg-[#ffae1f]/10"
            />
            <StatCard 
              title="Registered Users" 
              value={users.length} 
              icon={<Users className="size-6" />}
              color="text-blue-400"
              bgColor="bg-blue-500/10"
            />
            <StatCard 
              title="Support Inquiries" 
              value={messages.length} 
              icon={<Mail className="size-6" />}
              color="text-[#fe4f51]"
              bgColor="bg-[#fe4f51]/10"
            />
            <StatCard 
              title="System Health" 
              value="Stable" 
              icon={<Activity className="size-6" />}
              color="text-emerald-400"
              bgColor="bg-emerald-500/10"
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <Animated>
              <h2 className="text-2xl font-bold text-white capitalize">
                {activeTab === 'applications' ? 'Applications List' : 
                 activeTab === 'users' ? 'User Management' : 
                 activeTab === 'messages' ? 'Support Inquiries' : 'Audit Logs'}
              </h2>
              <p className="text-slate-500 text-sm">Database Control Panel</p>
            </Animated>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all"
              >
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-8 text-red-400 text-sm text-center">
              {error}
              {activeTab === 'users' && <p className="mt-2 opacity-60">Note: Ensure a 'profiles' table exists in Supabase.</p>}
              {activeTab === 'logs' && <p className="mt-2 opacity-60">Note: Ensure an 'audit_logs' table exists in Supabase.</p>}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-600">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ffae1f] mb-4"></div>
              <p className="text-sm font-medium tracking-widest uppercase">Syncing...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {/* Applications Tab */}
              {activeTab === 'applications' && (
                applications.length > 0 ? (
                  applications.map((app, idx) => (
                    <Animated key={app.id} delay={idx * 50} className="bg-[#0d1117] border border-slate-800/50 rounded-2xl p-6 transition-all group">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[#ffae1f] text-[10px] font-bold uppercase mb-1">{app.interest_type}</p>
                          <h3 className="text-lg font-bold text-white">{app.full_name}</h3>
                          <p className="text-slate-500 text-sm">{app.email}</p>
                        </div>
                        <button onClick={() => deleteItem(app.id, 'applications')} className="p-2 text-slate-600 hover:text-red-400">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </Animated>
                  ))
                ) : <EmptyState icon={<LayoutDashboard className="size-16" />} />
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                users.length > 0 ? (
                  <div className="bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-800">
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">User</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Username</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Role</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Joined</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-all">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold text-xs uppercase">
                                  {user.full_name?.charAt(0) || user.email?.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white">{user.full_name}</p>
                                  <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs font-bold text-slate-400">@{user.username || 'member'}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/10">
                                {user.role || 'Member'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-slate-500 hover:text-white transition-all">
                                <Settings className="size-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <EmptyState icon={<Users className="size-16" />} text="No profiles found. Sign up some users!" />
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                messages.length > 0 ? (
                  messages.map((msg) => (
                    <Animated key={msg.id} className="bg-[#0d1117] border border-slate-800 rounded-2xl p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-white font-bold mb-1">{msg.subject}</h3>
                          <p className="text-slate-400 text-sm mb-2">{msg.message}</p>
                          <p className="text-slate-600 text-xs">From: {msg.full_name} ({msg.email})</p>
                        </div>
                        <button onClick={() => deleteItem(msg.id, 'contact_messages')} className="text-slate-700 hover:text-red-400">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </Animated>
                  ))
                ) : <EmptyState icon={<Mail className="size-16" />} />
              )}

              {/* Logs Tab */}
              {activeTab === 'logs' && (
                logs.length > 0 ? (
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-300"><span className="text-white font-bold">{log.user_email}</span> {log.action}</p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">{new Date(log.created_at).toLocaleString()}</p>
                        </div>
                        <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">{log.status}</span>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState icon={<List className="size-16" />} text="System logs are clean" />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, bgColor }: { title: string, value: string | number, icon: React.ReactNode, color: string, bgColor: string }) => (
  <Animated className={`bg-[#0d1117] border border-slate-800 p-6 rounded-[2rem] shadow-xl hover:border-slate-700 transition-all`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${bgColor} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </Animated>
);

const EmptyState = ({ icon, text = "Nothing here yet" }: { icon: React.ReactNode, text?: string }) => (
  <div className="text-center py-32 text-slate-700 border-2 border-dashed border-slate-800/50 rounded-3xl">
    <div className="opacity-10 mb-4 flex justify-center">{icon}</div>
    <p className="text-sm font-medium">{text}</p>
  </div>
);

export default AdminDashboard;
