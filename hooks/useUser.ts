"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
      } catch {
        console.error("Error fetching user");
      }
    };

    fetchUser();
  }, []);

  return { user };
}