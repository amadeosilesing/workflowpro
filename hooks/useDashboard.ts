"use client";

import { useState, useEffect } from "react";

interface RecentTask {
  idTasks: number;
  title: string;
  status: string;
  projectName: string;
}

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  inProgressTasks: number;
  doneTasks: number;
  recentTasks: RecentTask[];
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects:  0,
    totalTasks:     0,
    inProgressTasks: 0,
    doneTasks:      0,
    recentTasks:    [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Error al cargar stats");
        const data = await res.json();
        setStats(data);
      } catch {
        console.error("Error fetching dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}