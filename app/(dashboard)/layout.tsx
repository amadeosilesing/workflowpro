import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-8">
          <h2 className="text-gray-400 text-sm">
            Bienvenido a <span className="text-white font-semibold">WorkFlowPro</span>
          </h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}