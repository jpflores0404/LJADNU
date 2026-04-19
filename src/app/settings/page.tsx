export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-2">System preferences and configuration.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">General</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Facility Name</p>
              <p className="text-sm text-slate-500">Displayed on all printed records</p>
            </div>
            <input type="text" defaultValue="ADNU Maternity & Birthing Home" className="p-2.5 rounded-lg border border-slate-300 w-80 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Default Nationality</p>
              <p className="text-sm text-slate-500">Pre-filled on new patient forms</p>
            </div>
            <input type="text" defaultValue="Filipino" className="p-2.5 rounded-lg border border-slate-300 w-80 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">About</h2>
        <div className="text-sm text-slate-600 space-y-2">
          <p><span className="font-medium text-slate-800">Version:</span> 1.0.0</p>
          <p><span className="font-medium text-slate-800">Database:</span> SQLite (local)</p>
          <p><span className="font-medium text-slate-800">Framework:</span> Next.js + Prisma ORM</p>
        </div>
      </div>
    </div>
  );
}
