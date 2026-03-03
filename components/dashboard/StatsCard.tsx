interface StatsCardProps {
  label: string;
  value: number;
  color: string;
}

export default function StatsCard({ label, value, color }: StatsCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className={`w-2 h-2 rounded-full ${color} mb-3`} />
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
}