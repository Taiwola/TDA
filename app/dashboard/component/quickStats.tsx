const StatsCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) => (
  <div
    className={`p-4 rounded-lg shadow-md bg-${color}-50 border border-${color}-100`}
  >
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
  </div>
);

export const QuickStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <StatsCard title="Total Sales" value="$12,345" color="amber" />
    <StatsCard title="Pending Orders" value="15" color="red" />
  </div>
);
