'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-3xl shadow-xl p-6">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-extrabold">Application Metrics Dashboard</CardTitle>
          <p className="text-muted-foreground text-lg">
            Monitor your infrastructure using InfluxDB + AI-powered summaries.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Technology Icons Section */}
          <div className="flex justify-center gap-10 items-center py-4 flex-wrap">
            <div className="flex flex-col items-center space-y-2">
              <img src="/cpu-icon.png" alt="CPU" className="w-12 h-12" />
              <p className="text-sm text-gray-600">CPU Metrics</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <img src="/docker-icon.png" alt="Docker" className="w-12 h-12" />
              <p className="text-sm text-gray-600">Docker Containers</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <img src="/k8s-icon.png" alt="Kubernetes" className="w-12 h-12" />
              <p className="text-sm text-gray-600">Kubernetes Clusters</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center gap-6">
            <Button size="lg" asChild>
              <a href="/signin">Sign In</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/signup">Sign Up</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
