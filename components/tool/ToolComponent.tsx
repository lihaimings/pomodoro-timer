"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Play, Pause, RotateCcw, Settings, History, Volume2, VolumeX,
  Coffee, Brain, Trophy, Clock, Target, Zap
} from "lucide-react";

type TimerMode = "work" | "shortBreak" | "longBreak";

interface Session {
  mode: TimerMode;
  duration: number;
  completedAt: number;
}

interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartWork: false,
  soundEnabled: true,
};

export default function ToolComponent() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("pomodoro_settings");
    const savedSessions = localStorage.getItem("pomodoro_sessions");
    const savedPomodoros = localStorage.getItem("pomodoro_completed");
    
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setTimeLeft(parsed.workDuration * 60);
    }
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedPomodoros) setCompletedPomodoros(JSON.parse(savedPomodoros));
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem("pomodoro_settings", JSON.stringify(settings));
  }, [settings]);

  // Save sessions
  useEffect(() => {
    localStorage.setItem("pomodoro_sessions", JSON.stringify(sessions));
  }, [sessions]);

  // Save completed pomodoros
  useEffect(() => {
    localStorage.setItem("pomodoro_completed", JSON.stringify(completedPomodoros));
  }, [completedPomodoros]);


  // Play notification sound using Web Audio API
  const playSound = useCallback(() => {
    if (!settings.soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [settings.soundEnabled]);

  // Get duration for mode
  const getDuration = useCallback((m: TimerMode) => {
    switch (m) {
      case "work": return settings.workDuration * 60;
      case "shortBreak": return settings.shortBreakDuration * 60;
      case "longBreak": return settings.longBreakDuration * 60;
    }
  }, [settings]);

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    playSound();
    
    const session: Session = {
      mode,
      duration: getDuration(mode),
      completedAt: Date.now(),
    };
    setSessions(prev => [session, ...prev.slice(0, 99)]);

    if (mode === "work") {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      
      // Determine next break type
      const isLongBreak = newCount % settings.longBreakInterval === 0;
      const nextMode = isLongBreak ? "longBreak" : "shortBreak";
      setMode(nextMode);
      setTimeLeft(getDuration(nextMode));
      
      if (settings.autoStartBreaks) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    } else {
      setMode("work");
      setTimeLeft(getDuration("work"));
      
      if (settings.autoStartWork) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    }
  }, [mode, completedPomodoros, settings, playSound, getDuration]);

  // Timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, handleTimerComplete]);


  // Toggle timer
  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  // Reset timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  }, [mode, getDuration]);

  // Switch mode
  const switchMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
  }, [getDuration]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress
  const progress = ((getDuration(mode) - timeLeft) / getDuration(mode)) * 100;

  // Get mode colors
  const getModeColors = () => {
    switch (mode) {
      case "work":
        return {
          bg: "from-red-500 to-rose-600",
          ring: "ring-red-500/30",
          text: "text-red-600",
          light: "bg-red-50",
        };
      case "shortBreak":
        return {
          bg: "from-green-500 to-emerald-600",
          ring: "ring-green-500/30",
          text: "text-green-600",
          light: "bg-green-50",
        };
      case "longBreak":
        return {
          bg: "from-blue-500 to-indigo-600",
          ring: "ring-blue-500/30",
          text: "text-blue-600",
          light: "bg-blue-50",
        };
    }
  };

  const colors = getModeColors();

  // Clear history
  const clearHistory = useCallback(() => {
    setSessions([]);
    setCompletedPomodoros(0);
  }, []);

  // Today's stats
  const todayStats = sessions.filter(s => {
    const today = new Date();
    const sessionDate = new Date(s.completedAt);
    return sessionDate.toDateString() === today.toDateString();
  });

  const todayWorkMinutes = todayStats
    .filter(s => s.mode === "work")
    .reduce((acc, s) => acc + s.duration / 60, 0);

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="card">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => switchMode("work")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              mode === "work"
                ? "bg-white shadow-md text-red-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Brain className="w-4 h-4" />
            Focus
          </button>
          <button
            onClick={() => switchMode("shortBreak")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              mode === "shortBreak"
                ? "bg-white shadow-md text-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Coffee className="w-4 h-4" />
            Short Break
          </button>
          <button
            onClick={() => switchMode("longBreak")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              mode === "longBreak"
                ? "bg-white shadow-md text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Zap className="w-4 h-4" />
            Long Break
          </button>
        </div>
      </div>


      {/* Timer Display */}
      <div className="card text-center">
        <div className="relative inline-flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="w-64 h-64 transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={colors.text}
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-gray-900 font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className={`text-sm font-medium mt-2 ${colors.text}`}>
              {mode === "work" ? "Focus Time" : mode === "shortBreak" ? "Short Break" : "Long Break"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button
            onClick={toggleTimer}
            className={`p-6 rounded-full bg-gradient-to-r ${colors.bg} text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Pomodoro Counter */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: settings.longBreakInterval }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-colors ${
                i < (completedPomodoros % settings.longBreakInterval)
                  ? "bg-red-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {completedPomodoros} pomodoros completed
          </span>
        </div>
      </div>


      {/* Settings Panel */}
      {showSettings && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Timer Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Focus Duration (min)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.workDuration}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 25;
                  setSettings(prev => ({ ...prev, workDuration: val }));
                  if (mode === "work" && !isRunning) {
                    setTimeLeft(val * 60);
                  }
                }}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Break (min)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.shortBreakDuration}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 5;
                  setSettings(prev => ({ ...prev, shortBreakDuration: val }));
                  if (mode === "shortBreak" && !isRunning) {
                    setTimeLeft(val * 60);
                  }
                }}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Break (min)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.longBreakDuration}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 15;
                  setSettings(prev => ({ ...prev, longBreakDuration: val }));
                  if (mode === "longBreak" && !isRunning) {
                    setTimeLeft(val * 60);
                  }
                }}
                className="input"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={settings.autoStartBreaks}
                onChange={(e) => setSettings(prev => ({ ...prev, autoStartBreaks: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Auto-start breaks</p>
                <p className="text-xs text-gray-500">Automatically start break timer after focus session</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={settings.autoStartWork}
                onChange={(e) => setSettings(prev => ({ ...prev, autoStartWork: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Auto-start focus</p>
                <p className="text-xs text-gray-500">Automatically start focus timer after break</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <div className="flex items-center gap-2">
                {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-gray-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                <div>
                  <p className="text-sm font-medium text-gray-700">Sound notifications</p>
                  <p className="text-xs text-gray-500">Play sound when timer completes</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      )}


      {/* Today's Stats */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Progress</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-3xl font-bold text-red-600">
              {todayStats.filter(s => s.mode === "work").length}
            </div>
            <div className="text-sm text-gray-600">Pomodoros</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600">
              {Math.round(todayWorkMinutes)}
            </div>
            <div className="text-sm text-gray-600">Focus Minutes</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">
              {todayStats.filter(s => s.mode !== "work").length}
            </div>
            <div className="text-sm text-gray-600">Breaks Taken</div>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Session History</h3>
          </div>
          <div className="flex gap-2">
            {sessions.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              {showHistory ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sessions.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No sessions yet. Start your first pomodoro!</p>
            ) : (
              sessions.slice(0, 20).map((session, index) => (
                <div
                  key={session.completedAt}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    session.mode === "work" ? "bg-red-50" : session.mode === "shortBreak" ? "bg-green-50" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {session.mode === "work" ? (
                      <Brain className="w-5 h-5 text-red-600" />
                    ) : (
                      <Coffee className="w-5 h-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {session.mode === "work" ? "Focus Session" : session.mode === "shortBreak" ? "Short Break" : "Long Break"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.completedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.duration / 60} min</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card bg-red-50 border-red-200">
        <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Pomodoro Tips
        </h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Work in focused 25-minute intervals</li>
          <li>• Take short 5-minute breaks between sessions</li>
          <li>• After 4 pomodoros, take a longer 15-30 minute break</li>
          <li>• Eliminate distractions during focus time</li>
          <li>• Your progress is saved automatically</li>
        </ul>
      </div>
    </div>
  );
}
