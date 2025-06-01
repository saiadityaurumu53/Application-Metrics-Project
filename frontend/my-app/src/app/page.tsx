// Landing page
export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Application Metrics!</h1>
      <p className="mb-8">Monitor your infrastructure easily using InfluxDB.</p>
      <div className="space-x-4">
        <a href="/signin" className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</a>
        <a href="/signup" className="px-4 py-2 border border-blue-600 text-blue-600 rounded">Sign Up</a>
      </div>
    </main>
  );
}
