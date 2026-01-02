import { HelpCircle, Timer } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Pomodoro Timer",
  description: "Frequently asked questions about the Pomodoro Technique and our timer tool.",
};

const faqs = [
  {
    question: "What is the Pomodoro Technique?",
    answer: "The Pomodoro Technique is a time management method developed by Francesco Cirillo. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This technique helps improve focus and productivity.",
  },
  {
    question: "Why is it called 'Pomodoro'?",
    answer: "Pomodoro is Italian for 'tomato'. The technique was named after the tomato-shaped kitchen timer that Francesco Cirillo used as a university student when he first developed the method.",
  },
  {
    question: "How long should a Pomodoro session be?",
    answer: "The traditional Pomodoro session is 25 minutes of focused work followed by a 5-minute break. After completing 4 pomodoros, you take a longer break of 15-30 minutes. However, you can customize these durations in our timer settings.",
  },
  {
    question: "What should I do during breaks?",
    answer: "During short breaks, step away from your work. Stretch, walk around, grab a drink, or do something relaxing. Avoid checking emails or social media as these can extend your break and disrupt your focus.",
  },
  {
    question: "Is my data saved?",
    answer: "Yes, all your settings and session history are saved locally in your browser using localStorage. Your data never leaves your device, ensuring complete privacy.",
  },
  {
    question: "Can I customize the timer durations?",
    answer: "Absolutely! Click the settings icon to customize work duration, short break length, long break duration, and other options like auto-start and sound notifications.",
  },
  {
    question: "What if I get interrupted during a Pomodoro?",
    answer: "If the interruption is urgent, handle it and restart your Pomodoro. For non-urgent interruptions, write them down to address later and continue working. The goal is to protect your focus time.",
  },
  {
    question: "How many Pomodoros should I complete per day?",
    answer: "This varies by person and task type. Most people complete 8-12 pomodoros in a productive day. Start by tracking your natural rhythm and adjust from there.",
  },
  {
    question: "Does the timer work offline?",
    answer: "Yes! Once the page is loaded, the timer works completely offline. Your settings and history are stored locally in your browser.",
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes, our Pomodoro Timer is completely free with no hidden costs, subscriptions, or premium features. All functionality is available to everyone.",
  },
];

export default function FAQPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about the Pomodoro Technique
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="card bg-red-50 border-red-200 mt-8">
            <h2 className="text-xl font-bold text-red-800 mb-2">Still have questions?</h2>
            <p className="text-red-700 mb-4">
              The best way to learn is by doing. Try the Pomodoro Technique yourself and 
              discover how it can transform your productivity.
            </p>
            <a href="/#tool" className="btn-primary inline-flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Try It Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
