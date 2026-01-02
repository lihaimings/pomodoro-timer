"use client";

import dynamic from "next/dynamic";
import { Timer, Brain, Coffee, Target, Zap, Clock, BarChart3, Bell } from "lucide-react";

const ToolComponent = dynamic(() => import("@/components/tool/ToolComponent"), {
  ssr: false,
  loading: () => (
    <div className="card animate-pulse">
      <div className="h-64 bg-gray-200 rounded-xl"></div>
    </div>
  ),
});

export default function Home() {
  const features = [
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Customizable Intervals",
      description: "Set your own work and break durations to match your workflow",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Sound Notifications",
      description: "Get audio alerts when your timer completes",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Track your daily pomodoros and focus time",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Session History",
      description: "Review your completed sessions and productivity patterns",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-red-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Boost Your Productivity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Focus Better with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                Pomodoro Timer
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The proven time management technique to improve focus and productivity. 
              Work in focused intervals, take regular breaks, and accomplish more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#tool" className="btn-primary flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Start Timer
              </a>
              <a href="/how-to-use" className="btn-secondary flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Learn the Technique
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="section bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <ToolComponent />
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Focused
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our Pomodoro timer comes with all the features you need to maximize your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How the Pomodoro Technique Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Choose a Task</h3>
              <p className="text-sm text-gray-600">Pick one task to focus on</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Work for 25 min</h3>
              <p className="text-sm text-gray-600">Focus without interruptions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Take a Break</h3>
              <p className="text-sm text-gray-600">Rest for 5 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">4. Repeat</h3>
              <p className="text-sm text-gray-600">Long break after 4 cycles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-red-500 to-rose-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Start using the Pomodoro Technique today and see the difference in your focus and output.
          </p>
          <a href="#tool" className="inline-flex items-center gap-2 bg-white text-red-600 font-semibold py-3 px-8 rounded-xl hover:bg-red-50 transition-colors">
            <Timer className="w-5 h-5" />
            Start Your First Pomodoro
          </a>
        </div>
      </section>
    </>
  );
}
