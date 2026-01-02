import { Timer, Target, Users, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Pomodoro Timer",
  description: "Learn about our free Pomodoro Timer tool and the team behind it.",
};

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Pomodoro Timer</h1>
            <p className="text-xl text-gray-600">
              Helping you focus better and achieve more
            </p>
          </div>

          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Timer className="w-6 h-6 text-red-600" />
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              We believe that everyone deserves access to effective productivity tools. 
              Our Pomodoro Timer is designed to help you work smarter, not harder, by 
              implementing the proven Pomodoro Technique.
            </p>
            <p className="text-gray-600">
              Whether you&apos;re a student studying for exams, a professional tackling 
              complex projects, or anyone looking to improve their focus, our timer 
              is here to help you achieve your goals.
            </p>
          </div>

          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-600" />
              The Pomodoro Technique
            </h2>
            <p className="text-gray-600 mb-4">
              The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s. 
              It uses a timer to break work into intervals, traditionally 25 minutes in length, 
              separated by short breaks.
            </p>
            <p className="text-gray-600">
              The technique has been proven to improve focus, reduce mental fatigue, 
              and increase productivity. By working in focused bursts with regular breaks, 
              you can maintain high levels of concentration throughout the day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <Users className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Forever</h3>
              <p className="text-gray-600">
                Our Pomodoro Timer is completely free to use with no hidden costs or premium features.
              </p>
            </div>
            <div className="card">
              <Heart className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600">
                All your data is stored locally in your browser. We don&apos;t track or collect any personal information.
              </p>
            </div>
          </div>

          <div className="card bg-red-50 border-red-200">
            <h2 className="text-xl font-bold text-red-800 mb-2">Start Focusing Today</h2>
            <p className="text-red-700 mb-4">
              Ready to boost your productivity? Try our Pomodoro Timer now and experience 
              the difference focused work can make.
            </p>
            <a href="/#tool" className="btn-primary inline-flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Start Timer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
