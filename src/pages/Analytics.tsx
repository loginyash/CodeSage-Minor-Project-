import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Activity, Code, Users, Clock } from "lucide-react";

const data = [
    { name: "Mon", value: 4000, users: 2400 },
    { name: "Tue", value: 3000, users: 1398 },
    { name: "Wed", value: 2000, users: 9800 },
    { name: "Thu", value: 2780, users: 3908 },
    { name: "Fri", value: 1890, users: 4800 },
    { name: "Sat", value: 2390, users: 3800 },
    { name: "Sun", value: 3490, users: 4300 },
];

const activityData = [
    { name: "00:00", value: 20 },
    { name: "04:00", value: 10 },
    { name: "08:00", value: 50 },
    { name: "12:00", value: 80 },
    { name: "16:00", value: 90 },
    { name: "20:00", value: 60 },
    { name: "23:59", value: 30 },
];

const Analytics = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-2">
                        Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Real-time insights into your learning journey and system usage.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Code Lines", value: "12,450", icon: Code, color: "text-blue-400" },
                        { title: "Active Users", value: "1,234", icon: Users, color: "text-purple-400" },
                        { title: "Hours Spent", value: "45.2", icon: Clock, color: "text-orange-400" },
                        { title: "System Health", value: "98%", icon: Activity, color: "text-green-400" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 glass-card border-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-panel p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-lg font-semibold mb-6">Learning Activity</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-panel p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-lg font-semibold mb-6">Daily Usage</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
