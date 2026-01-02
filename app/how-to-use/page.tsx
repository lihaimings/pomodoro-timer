import { Timer, Brain, Coffee, Zap, Target, CheckCircle, Settings } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use - Pomodoro Timer",
  description: "Learn how to use the Pomodoro Technique effectively with our step-by-step guide.",
};

export default function HowToUsePage() {
  const steps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Choose Your Task",
      description: "Select a single task you want to focus on. Break larger projects into smaller, manageable tasks.",
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Set the Timer",
      description: "Start the 25-minute timer. This is your focused work period - no distractions allowed!",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Work with Focus",
      description: "Concentrate solely on your task until the timer rings. If a distraction pops up, write it down and return to work.",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Take a Short Break",
      description: "When the timer rings, take a 5-minute break. Stand up, stretch, grab a drink.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Repeat the Cycle",
      description: "After 4 pomodoros, take a longer 15-30 minute break to recharge.",
    },
  ];

  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Use Pomodoro Timer</h1>
            <p className="text-xl text-gray-600">
              Master the Pomodoro Technique in 5 simple steps
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="card flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6 text-red-600" />
              Customizing Your Timer
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-600">Adjust work duration (default: 25 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-600">Set short break length (default: 5 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-600">Configure long break duration (default: 15 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-600">Enable auto-start for breaks and work sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-600">Toggle sound notifications on/off</span>
              </li>
            </ul>
          </div>

          <div className="card bg-red-50 border-red-200">
            <h2 className="text-xl font-bold text-red-800 mb-2">Pro Tips</h2>
            <ul className="text-red-700 space-y-2">
              <li>• Put your phone on silent during focus sessions</li>
              <li>• Close unnecessary browser tabs and apps</li>
              <li>• Use breaks to move around and rest your eyes</li>
              <li>• Track your daily pomodoros to see your progress</li>
              <li>• Start with the default 25/5 timing before customizing</li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <a href="/#tool" className="btn-primary inline-flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Start Your First Pomodoro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
