import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProjects, fetchTasks, createProject, createTask, updateTask, fetchUsers, fetchMyTasks, fetchVisibleTasks, fetchActivities, deleteTask, deleteProject, deleteUser } from '../api'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import {
  LayoutDashboard,
  FolderPlus,
  LogOut,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Calendar,
  Users,
  Search,
  Settings,
  ChevronRight,
  Target,
  Bell,
  Activity,
  Filter,
  ArrowUpRight,
  UserPlus,
  Trash2
} from 'lucide-react'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({ name: '', description: '', members: [] })
  const [users, setUsers] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium', assignedTo: '', status: 'To Do', dueDate: '', project: '' })
  const [showMyTasksOnly, setShowMyTasksOnly] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard', 'projects', 'calendar', 'settings'
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system')
  const [activities, setActivities] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    if (!newTask.dueDate) return;
    const daysUntilDue = Math.ceil((new Date(newTask.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    let suggestedPriority = newTask.priority;
    if (daysUntilDue <= 2) suggestedPriority = 'High';
    else if (daysUntilDue <= 7) suggestedPriority = 'Medium';
    else suggestedPriority = 'Low';

    if (newTask.priority !== suggestedPriority) {
      setNewTask(prev => ({ ...prev, priority: suggestedPriority }));
    }
  }, [newTask.dueDate]);

  useEffect(() => {
    const applyTheme = (themeValue) => {
      let resolvedTheme = themeValue;
      if (themeValue === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/login')
    } else {
      setUser(JSON.parse(storedUser))
      loadData()
      loadUsers()
      loadActivities()
    }
  }, [])

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadActivities = async () => {
    try {
      const { data } = await fetchActivities()
      setActivities(data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      const { data: projectsData } = await fetchProjects()
      setProjects(projectsData)

      if (currentView === 'calendar' || currentView === 'dashboard') {
        const { data: allTasks } = await fetchVisibleTasks()
        setTasks(allTasks)
        if (storedUser?.role === 'Member') {
          setSelectedProject({ name: 'Your Tasks', _id: 'all' })
        } else if (!selectedProject) {
          setSelectedProject({ name: 'Overview', _id: 'all' })
        }
      } else if (storedUser?.role === 'Member') {
        setSelectedProject({ name: 'Your Tasks', _id: 'all' })
        const { data: myTasks } = await fetchMyTasks()
        setTasks(myTasks)
      } else if (projectsData.length > 0 && !selectedProject) {
        handleSelectProject(projectsData[0])
      }
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  const handleSelectProject = async (project) => {
    if (!project) return;
    console.log('Selecting project:', project.name)
    setSelectedProject(project)
    try {
      if (project._id === 'all') {
        const { data } = await fetchMyTasks()
        setTasks(data)
      } else {
        const { data } = await fetchTasks(project._id)
        setTasks(data)
      }
    } catch (err) {
      console.error('Error loading tasks:', err)
      setTasks([])
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    try {
      await createProject(newProject)
      setShowAddProject(false)
      setNewProject({ name: '', description: '', members: [] })
      loadData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create project')
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    try {
      const projectId = newTask.project || selectedProject?._id;
      if (!projectId || projectId === 'all') {
        alert('Please select a project for this task');
        return;
      }
      await createTask({ ...newTask, project: projectId })
      setShowAddTask(false)
      setNewTask({ title: '', description: '', priority: 'Medium', assignedTo: '', status: 'To Do', dueDate: '', project: '' })
      if (selectedProject) handleSelectProject(selectedProject)
      else loadData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(taskId);
      if (selectedProject) handleSelectProject(selectedProject);
      else loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project and all its tasks?')) return;
    try {
      await deleteProject(projectId);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this member?')) return;
    try {
      await deleteUser(userId);
      loadUsers();
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete member');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-rose-400 bg-rose-400/10 border-rose-400/20'
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
      case 'Low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20'
    }
  }

  const projectProgress = tasks.length > 0
    ? Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100)
    : 0

  const overdueTasks = tasks.filter(t => t.status !== 'Completed' && t.dueDate && new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0)))

  return (
    <div className="flex h-screen bg-dark-bg text-zinc-100 overflow-hidden font-sans">
      {/* Slim Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 lg:w-64 glass border-r border-white/5 flex flex-col z-30 transition-all duration-500"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center glow-primary shrink-0">
            <Target className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden lg:block">Taskify <span className="text-primary text-[10px] ml-1 opacity-50">v1.0</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-4 mb-4 hidden lg:block">Workspace</h3>
            <div className="space-y-1">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
                { icon: CheckCircle2, label: 'Tasks', id: 'tasks' },
                { icon: Target, label: 'Projects', id: 'projects', adminOnly: true },
                { icon: Calendar, label: 'Calendar', id: 'calendar' },
                { icon: Users, label: 'Team', id: 'team', adminOnly: true },
                { icon: Activity, label: 'Analytics', id: 'analytics', adminOnly: true },
                { icon: Settings, label: 'Settings', id: 'settings' },
              ].filter(item => !item.adminOnly || user?.role === 'Admin').map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.id === 'tasks') {
                      setCurrentView('tasks');
                      loadData();
                    } else if (item.id === 'projects') {
                      setCurrentView('projects');
                    } else if (item.id === 'dashboard') {
                      setCurrentView('dashboard');
                      loadData();
                    } else if (item.id === 'calendar') {
                      setCurrentView('calendar');
                      loadData();
                    } else if (item.id === 'team') {
                      setCurrentView('team');
                    } else if (item.id === 'analytics') {
                      setCurrentView('analytics');
                    } else if (item.id === 'settings') {
                      setCurrentView('settings');
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${currentView === item.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300 border border-transparent'
                    }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {user?.role === 'Admin' && (
            <div>
              <div className="flex items-center justify-between px-4 mb-4">
                <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] hidden lg:block">Your Projects</h3>
                <button onClick={() => setShowAddProject(true)} className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-600 hover:text-primary">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {projects.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => {
                      handleSelectProject(p);
                      setCurrentView('dashboard');
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${selectedProject?._id === p._id && currentView === 'dashboard'
                        ? 'bg-white/10 text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedProject?._id === p._id ? 'bg-primary' : 'bg-zinc-700'}`} />
                    <span className="text-sm font-medium hidden lg:block truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-card rounded-3xl p-4 flex flex-col items-center lg:items-stretch gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name?.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-white truncate w-24">{user?.name}</p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{user?.role}</p>
                <p className="text-[8px] text-primary/50 font-mono truncate w-24">{user?.id}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="lg:w-full p-2 lg:px-4 lg:py-2 bg-white/5 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 rounded-2xl transition-all flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" /> <span className="text-xs font-bold hidden lg:block">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Board Section */}
        <main className="flex-1 flex flex-col bg-dark-bg relative z-10 border-r border-white/5">
          <header className="h-24 px-8 flex items-center justify-between border-b border-white/5 glass sticky top-0 z-20">
            <div className="flex items-center gap-6 flex-1">
              <h2 className="text-2xl font-black text-white tracking-tight hidden md:block">
                {selectedProject?.name || 'Overview'}
              </h2>
              <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/30 transition-all text-white placeholder-zinc-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-2xl px-4 py-2.5 text-[12px] font-bold text-zinc-400 hover:text-white transition-all focus:outline-none cursor-pointer hidden md:block"
              >
                <option value="All">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => setShowMyTasksOnly(!showMyTasksOnly)} className={`p-2.5 rounded-2xl border transition-all ${showMyTasksOnly ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'}`}>
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/5 border border-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </button>
              {user?.role === 'Admin' && (
                <button onClick={() => setShowAddTask(true)} className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
                  <Plus className="w-4 h-4" /> Create Task
                </button>
              )}
            </div>
          </header>

          <div className="flex-1 flex flex-col min-h-0 p-8 overflow-y-auto custom-scrollbar">
            {currentView === 'tasks' ? (
              <div className="animate-premium-in">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Your Tasks</h2>
                    <p className="text-zinc-500 mt-2">Manage and track your specific assignments.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5 text-[10px] font-bold text-zinc-500 px-4">
                    <Filter className="w-3 h-3" /> LIST VIEW
                  </div>
                </div>

                <div className="glass-card rounded-[2.5rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="px-8 py-5 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Task</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Project</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Status</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Priority</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Due Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {tasks.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-8 py-20 text-center text-zinc-600 italic">No tasks found.</td>
                          </tr>
                        ) : (
                          tasks.map((task) => (
                            <tr key={task._id} className="hover:bg-white/[0.02] transition-colors group">
                              <td className="px-8 py-6">
                                <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{task.title}</p>
                                <p className="text-[10px] text-zinc-600 mt-1 line-clamp-1 max-w-xs">{task.description}</p>
                              </td>
                              <td className="px-8 py-6">
                                <span className="px-3 py-1 rounded-lg bg-white/5 text-zinc-400 text-[10px] font-bold border border-white/5 uppercase tracking-wider">
                                  {task.project?.name || 'General'}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <select
                                  value={task.status}
                                  onChange={async (e) => {
                                    try {
                                      await updateTask(task._id, { status: e.target.value })
                                      loadData()
                                    } catch (err) { console.error(err) }
                                  }}
                                  className="bg-transparent text-xs font-bold text-zinc-400 focus:outline-none cursor-pointer hover:text-white transition-colors"
                                >
                                  <option value="To Do">To Do</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                              <td className="px-8 py-6">
                                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${getPriorityColor(task.priority)} uppercase tracking-wider`}>
                                  {task.priority}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : currentView === 'analytics' ? (
              <div className="animate-premium-in">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Performance Analytics</h2>
                    <p className="text-zinc-500 mt-2">Deep insights into your workspace productivity.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    {['7 Days', '30 Days', 'All Time'].map(p => (
                      <button key={p} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${p === 'All Time' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-zinc-300'}`}>{p}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Productivity Score */}
                  <div className="lg:col-span-1 glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[100px] -z-10" />
                    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="70" className="stroke-white/5 fill-none stroke-[8]" />
                        <motion.circle
                          cx="80" cy="80" r="70"
                          className="stroke-primary fill-none stroke-[8]"
                          strokeDasharray="440"
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * (projectProgress / 100)) }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-white">{projectProgress}%</span>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Efficiency</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Workspace Health</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">Your team is performing at peak efficiency this month.</p>
                  </div>

                  {/* Task Distribution Charts */}
                  <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] flex flex-col gap-8">
                    <h3 className="text-lg font-bold text-white mb-2">Task Insights</h3>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Status Pie Chart */}
                      <div className="h-48 w-full flex flex-col items-center">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">By Status</span>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, color: '#34d399' },
                                { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: '#6366f1' },
                                { name: 'To Do', value: tasks.filter(t => t.status === 'To Do').length, color: '#fbbf24' },
                              ]}
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="none"
                            >
                              {[
                                { color: '#34d399' },
                                { color: '#6366f1' },
                                { color: '#fbbf24' }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '12px', fontWeight: 'bold' }}
                              itemStyle={{ color: '#fff' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Priority Bar Chart */}
                      <div className="h-48 w-full flex flex-col items-center">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">By Priority</span>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'High', count: tasks.filter(t => t.priority === 'High').length, fill: '#fb7185' },
                            { name: 'Medium', count: tasks.filter(t => t.priority === 'Medium').length, fill: '#fbbf24' },
                            { name: 'Low', count: tasks.filter(t => t.priority === 'Low').length, fill: '#34d399' },
                          ]} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                              contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Area Chart */}
                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                  <h3 className="text-lg font-bold text-white mb-6">Upcoming Deadlines</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={Object.values(tasks.reduce((acc, t) => {
                          if (!t.dueDate) return acc;
                          const date = new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          if (!acc[date]) acc[date] = { date, count: 0 };
                          acc[date].count += 1;
                          return acc;
                        }, {})).sort((a, b) => new Date(a.date + ' 2026') - new Date(b.date + ' 2026'))}
                        margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Team Performance Leaderboard - Only for Admins */}
                {user?.role === 'Admin' && (
                  <div className="glass-card p-8 rounded-[2.5rem]">
                    <h3 className="text-lg font-bold text-white mb-8">Team Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {users.slice(0, 4).map((u, i) => {
                        const userTasks = tasks.filter(t => t.assignedTo?._id === u._id);
                        const completed = userTasks.filter(t => t.status === 'Completed').length;
                        const rate = userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0;

                        return (
                          <div key={u._id} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:bg-white/[0.05] transition-all">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">{u.name.charAt(0)}</div>
                              <div>
                                <p className="text-sm font-bold text-white">{u.name}</p>
                                <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">{u.role}</p>
                              </div>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-2xl font-black text-white">{rate}%</p>
                                <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Success Rate</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-primary">{completed}</p>
                                <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Done</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : currentView === 'team' ? (
              <div className="animate-premium-in">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Team Members</h2>
                    <p className="text-zinc-500 mt-2">Manage your workspace collaborators and their roles.</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={loadUsers} className="p-3 bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-500 hover:text-white rounded-2xl transition-all">
                      <Activity className="w-5 h-5" />
                    </button>
                    {user?.role === 'Admin' && (
                      <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
                        <UserPlus className="w-4 h-4" /> Invite Member
                      </button>
                    )}
                  </div>
                </div>
                {users.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                      <Users className="w-10 h-10 text-zinc-700" />
                    </div>
                    <p className="text-zinc-500">No team members found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {users.map((u) => (
                      <div key={u._id} className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-2xl font-black text-white mb-4 group-hover:scale-110 transition-transform relative">
                          {u.name.charAt(0)}
                          {user?.role === 'Admin' && u._id !== user.id && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteUser(u._id); }}
                              className="absolute -top-2 -right-2 p-1.5 bg-rose-500/10 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{u.name}</h3>
                        <p className="text-xs text-zinc-500 mb-4">{u.email}</p>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.role === 'Admin' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/5 text-zinc-500 border border-white/5'}`}>
                          {u.role}
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/5 w-full flex items-center justify-around">
                          <div className="text-center">
                            <p className="text-xs font-bold text-white">{tasks.filter(t => t.assignedTo?._id === u._id).length}</p>
                            <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">Tasks</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-bold text-emerald-400">{tasks.filter(t => t.assignedTo?._id === u._id && t.status === 'Completed').length}</p>
                            <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">Done</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : currentView === 'calendar' ? (
              <div className="animate-premium-in flex-1 flex flex-col min-h-[700px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <span className="text-sm font-bold text-white min-w-[120px] text-center">
                      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 glass-card rounded-[2.5rem] overflow-hidden flex flex-col">
                  <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="py-4 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-r border-white/5 last:border-0">{day}</div>
                    ))}
                  </div>
                  <div className="flex-1 grid grid-cols-7">
                    {Array.from({ length: 42 }).map((_, i) => {
                      const day = i - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1;
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const dayTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === date.toDateString());

                      return (
                        <div
                          key={i}
                          className={`min-h-[120px] p-3 border-r border-b border-white/5 relative group hover:bg-white/[0.02] transition-all cursor-pointer ${!isCurrentMonth ? 'opacity-20' : ''}`}
                          onClick={() => {
                            if (isCurrentMonth) {
                              setNewTask({
                                ...newTask,
                                dueDate: date.toISOString().split('T')[0],
                                project: selectedProject?._id !== 'all' ? selectedProject?._id : '',
                                assignedTo: user?.role === 'Member' ? user.id : ''
                              });
                              setShowAddTask(true);
                            }
                          }}
                        >
                          <span className={`text-xs font-bold ${isToday ? 'w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white' : 'text-zinc-500'}`}>{date.getDate()}</span>
                          <div className="mt-2 space-y-1">
                            {dayTasks.map(t => {
                              const isTaskOverdue = t.status !== 'Completed' && new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
                              return (
                                <div key={t._id} className={`text-[9px] px-2 py-1 rounded-lg truncate font-bold border ${isTaskOverdue ? 'bg-rose-500/20 text-rose-500 border-rose-500/20' : 'bg-primary/20 text-primary border-primary/20'}`}>
                                  {t.title}
                                </div>
                              );
                            })}
                          </div>
                          {isCurrentMonth && (
                            <Plus className="absolute bottom-3 right-3 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : currentView === 'settings' ? (
              <div className="animate-premium-in">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Settings</h2>
                    <p className="text-zinc-500 mt-2">Personalize your workspace and account preferences.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass-card p-8 rounded-[2.5rem]">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-primary/10 rounded-3xl">
                        <Settings className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Appearance</h3>
                        <p className="text-xs text-zinc-500">Choose how the interface looks for you.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <div>
                          <p className="text-sm font-bold text-white">Theme Mode</p>
                          <p className="text-[10px] text-zinc-600 mt-1 uppercase font-bold tracking-widest">{theme} Mode Active</p>
                        </div>
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 overflow-x-auto custom-scrollbar">
                          <button
                            onClick={() => setTheme('light')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all shrink-0 ${theme === 'light' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
                          >
                            Light
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all shrink-0 ${theme === 'dark' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
                          >
                            Dark
                          </button>
                          <button
                            onClick={() => setTheme('system')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all shrink-0 ${theme === 'system' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
                          >
                            System
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-8 rounded-[2.5rem]">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-primary/10 rounded-3xl">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Account Info</h3>
                        <p className="text-xs text-zinc-500">Manage your profile and security.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-white">{user?.name}</p>
                        <p className="text-xs text-zinc-500 mt-1">{user?.email}</p>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Role</p>
                        <p className="text-sm font-bold text-primary">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentView === 'projects' ? (
              <div className="animate-premium-in">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Projects Overview</h2>
                    <p className="text-zinc-500 mt-2">Manage and monitor all your active workspaces.</p>
                  </div>
                  {user?.role === 'Admin' && (
                    <button onClick={() => setShowAddProject(true)} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
                      <Plus className="w-4 h-4" /> New Project
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        handleSelectProject(p);
                        setCurrentView('dashboard');
                      }}
                      className="glass-card glass-card-hover p-8 rounded-[2rem] cursor-pointer group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:scale-150 transition-all" />
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Target className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-2">
                          {user?.role === 'Admin' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteProject(p._id); }}
                              className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="text-sm text-zinc-500 line-clamp-2 mb-6">{p.description}</p>
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                          <Users className="w-3 h-3" /> {p.members?.length || 1} Members
                        </div>
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest">View Board</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : selectedProject ? (
              <div className="animate-premium-in">
                {/* Performance Analytics for Members or Stats for Admins */}
                {user?.role === 'Member' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-1 glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[100px] -z-10" />
                      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="64" cy="64" r="58" className="stroke-white/5 fill-none stroke-[6]" />
                          <motion.circle
                            cx="64" cy="64" r="58"
                            className="stroke-primary fill-none stroke-[6]"
                            strokeDasharray="364"
                            initial={{ strokeDashoffset: 364 }}
                            animate={{ strokeDashoffset: 364 - (364 * (projectProgress / 100)) }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-white">{projectProgress}%</span>
                          <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Efficiency</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">Your Performance</h3>
                      <p className="text-[10px] text-zinc-500 leading-relaxed px-4">Based on your recent completions.</p>
                    </div>
                    <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem]">
                      <h3 className="text-sm font-bold text-white mb-6">Task Distribution</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Completed', count: tasks.filter(t => t.status === 'Completed').length, color: 'bg-emerald-400' },
                          { label: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length, color: 'bg-primary' },
                          { label: 'To Do', count: tasks.filter(t => t.status === 'To Do').length, color: 'bg-amber-400' },
                        ].map(item => (
                          <div key={item.label}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{item.label}</span>
                              <span className="text-xs font-bold text-white">{item.count}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${(item.count / (tasks.length || 1)) * 100}%` }} className={`h-full ${item.color}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                      { label: 'Total Tasks', value: tasks.length, color: 'indigo' },
                      { label: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, color: 'emerald' },
                      { label: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: 'primary' },
                      { label: 'Team Members', value: users.length, color: 'purple' },
                    ].map((stat) => (
                      <div key={stat.label} className="glass-card p-6 rounded-[2rem] relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 blur-3xl transition-all group-hover:scale-150`} />
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-black text-white">{stat.value}</h4>
                      </div>
                    ))}
                  </div>
                )}

                {/* Overdue Warning Banner */}
                {overdueTasks.length > 0 && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-[2rem] mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <AlertCircle className="w-6 h-6 text-rose-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-rose-400 font-bold text-lg mb-1">Overdue Tasks Alert</h3>
                      <p className="text-rose-400/70 text-sm">You have {overdueTasks.length} task{overdueTasks.length > 1 ? 's' : ''} past due. Please review them.</p>
                    </div>
                  </div>
                )}

                {/* Progress Overview & Activity Log */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Project Progress</h3>
                      <p className="text-sm text-zinc-500 mb-6">Tracking overall completion across all milestones.</p>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${projectProgress}%` }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <div className="text-5xl font-black text-gradient mb-1">{projectProgress}%</div>
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Completion</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 glass-card p-8 rounded-[2rem] flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[120px]">
                      {activities.slice(0, 5).map(act => (
                        <div key={act._id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-primary">{act.user?.name?.charAt(0) || '?'}</span>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-300"><span className="font-bold text-white">{act.user?.name?.split(' ')[0] || 'Unknown'}</span> {act.action} <span className="text-zinc-500">{act.details}</span></p>
                            <p className="text-[9px] text-zinc-600 mt-1">{new Date(act.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {activities.length === 0 && <p className="text-xs text-zinc-500">No recent activity.</p>}
                    </div>
                  </div>
                </div>

                {/* Kanban Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {[
                    { label: 'To Do', icon: <Clock className="w-4 h-4 text-amber-400" /> },
                    { label: 'In Progress', icon: <Target className="w-4 h-4 text-primary" /> },
                    { label: 'Completed', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> }
                  ].map((column) => (
                    <div key={column.label} className="space-y-6">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-zinc-300 text-sm tracking-tight">{column.label}</h3>
                          <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[10px] text-zinc-600 font-bold border border-white/5">
                            {tasks.filter(t => t.status === column.label && (!showMyTasksOnly || t.assignedTo?._id === user.id)).length}
                          </span>
                        </div>
                        <Plus className="w-4 h-4 text-zinc-700 cursor-pointer hover:text-zinc-400" />
                      </div>

                      <div className="space-y-4">
                        {tasks
                          .filter(t => t.status === column.label && (user?.role === 'Member' || !showMyTasksOnly || t.assignedTo?._id === user?.id))
                          .filter(t => statusFilter === 'All' || t.status === statusFilter)
                          .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description?.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((task, idx) => (
                            <motion.div
                              key={task._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="glass-card glass-card-hover p-6 rounded-3xl group"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-2">
                                  <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${getPriorityColor(task.priority)} uppercase tracking-wider`}>
                                    {task.priority}
                                  </span>
                                  {task.status !== 'Completed' && task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && (
                                    <span className="text-[9px] font-bold px-2.5 py-1 rounded-full border text-rose-500 bg-rose-500/10 border-rose-500/20 uppercase tracking-wider flex items-center gap-1">
                                      <AlertCircle className="w-3 h-3" /> Overdue
                                    </span>
                                  )}
                                </div>
                                <select
                                  value={task.status}
                                  onChange={async (e) => {
                                    try {
                                      await updateTask(task._id, { status: e.target.value })
                                      handleSelectProject(selectedProject)
                                    } catch (err) { console.error(err) }
                                  }}
                                  className="text-[10px] bg-transparent text-zinc-600 hover:text-zinc-400 focus:outline-none cursor-pointer"
                                >
                                  <option value="To Do">To Do</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                                {(user?.role === 'Admin' || task.assignedTo?._id === user?.id) && (
                                  <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="ml-2 text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                              <h4 className={`font-bold mb-2 leading-snug transition-colors ${task.status !== 'Completed' && task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0)) ? 'text-rose-400 group-hover:text-rose-300' : 'text-zinc-200 group-hover:text-white'}`}>{task.title}</h4>
                              <p className="text-xs text-zinc-500 mb-6 line-clamp-2 leading-relaxed">{task.description}</p>

                              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary/40 to-secondary/40 border border-white/10 flex items-center justify-center text-[8px] font-bold text-white uppercase">
                                    {task.assignedTo?.name?.charAt(0) || '?'}
                                  </div>
                                  <span className="text-[10px] text-zinc-600 font-bold">{task.assignedTo?.name?.split(' ')[0] || 'Unassigned'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-zinc-600">
                                  <Calendar className="w-3 h-3" />
                                  <span className="text-[10px] font-bold">
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mb-8 rotate-12">
                  <Target className="w-16 h-16 text-zinc-800" />
                </div>
                <h2 className="text-3xl font-black text-white mb-3">Welcome, {user?.name?.split(' ')?.[0] || ''}</h2>
                <p className="text-zinc-500 max-w-sm mb-8">
                  {user?.role === 'Admin'
                    ? "Select a project from the sidebar to start tracking your team's progress and productivity."
                    : "You don't have any assigned tasks yet. Once your admin assigns you work, it will appear here."}
                </p>
                {user?.role === 'Admin' && (
                  <button onClick={() => setShowAddProject(true)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
                    Create First Project
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals - Reuse existing logic but with improved UI */}
      <AnimatePresence>
        {showAddProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddProject(false)} className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg glass-card rounded-[3rem] p-10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[100px] -mr-24 -mt-24" />
              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 bg-primary/10 rounded-3xl"><FolderPlus className="w-8 h-8 text-primary" /></div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">New Project</h2>
                  <p className="text-sm text-zinc-500">Kickstart your next major milestone.</p>
                </div>
              </div>
              <form onSubmit={handleAddProject} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Project Title</label>
                  <input type="text" required value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" placeholder="e.g. Phoenix Launch" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Brief Description</label>
                  <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} rows="4" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all resize-none font-medium" placeholder="What are we building?" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Add Team Members</label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                    {users.map(u => (
                      <button
                        key={u._id}
                        type="button"
                        onClick={() => {
                          const isMember = newProject.members.includes(u._id);
                          const updatedMembers = isMember
                            ? newProject.members.filter(id => id !== u._id)
                            : [...newProject.members, u._id];
                          setNewProject({ ...newProject, members: updatedMembers });
                        }}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${newProject.members.includes(u._id)
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/10'
                          }`}
                      >
                        {u.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowAddProject(false)} className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all uppercase tracking-widest text-xs">Dismiss</button>
                  <button type="submit" className="flex-1 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all glow-primary uppercase tracking-widest text-xs">Create Project</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddTask && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddTask(false)} className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg glass-card rounded-[3rem] p-10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[100px] -mr-24 -mt-24" />
              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 bg-primary/10 rounded-3xl"><Plus className="w-8 h-8 text-primary" /></div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">New Task</h2>
                  <p className="text-sm text-zinc-500">Assign responsibilities to the team.</p>
                </div>
              </div>
              <form onSubmit={handleAddTask} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Project</label>
                  <select
                    required
                    value={newTask.project || (selectedProject?._id !== 'all' ? selectedProject?._id : '')}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Task Name</label>
                  <input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" placeholder="e.g. Implement OAuth" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Assignment</label>
                  <select required value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer font-medium">
                    <option value="">Choose Member</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Priority</label>
                    <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none cursor-pointer font-medium">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Deadline</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none font-medium"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setShowAddTask(false)} className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all uppercase tracking-widest text-xs">Dismiss</button>
                  <button type="submit" className="flex-1 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all glow-primary uppercase tracking-widest text-xs">Commit Task</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

