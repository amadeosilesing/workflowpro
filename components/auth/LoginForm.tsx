"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      window.location.href = "/dashboard";
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <ErrorMessage message={error} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />
      <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      <Button onClick={handleSubmit} disabled={loading} fullWidth>
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
      <p className="text-center text-gray-500 text-sm">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
          Regístrate
        </Link>
      </p>
    </div>
  );
}