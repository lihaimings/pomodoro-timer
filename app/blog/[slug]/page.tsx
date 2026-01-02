import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Timer } from "lucide-react";
import type { Metadata } from "next";

const posts: Record<string, { title: string; date: string; readTime: string; content: string }> = {
  "getting-started": {
    title: "Getting Started with the Pomodoro Technique",
    date: "2026-01-02",
    readTime: "5 min read",
    content: `
The Pomodoro Technique is one of the most effective time management methods ever created. Developed by Francesco Cirillo in the late 1980s, this simple yet powerful technique has helped millions of people improve their focus and productivity.

## What is the Pomodoro Technique?

The technique uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a "pomodoro," the Italian word for tomato, named after the tomato-shaped kitchen timer Cirillo used as a university student.

## The Basic Steps

1. **Choose a task** - Select one task you want to work on
2. **Set the timer** - Start a 25-minute timer
3. **Work on the task** - Focus completely until the timer rings
4. **Take a short break** - Rest for 5 minutes
5. **Repeat** - After 4 pomodoros, take a longer 15-30 minute break

## Why It Works

The Pomodoro Technique works because it:

- **Creates urgency** - A ticking timer motivates you to focus
- **Prevents burnout** - Regular breaks keep your mind fresh
- **Builds awareness** - You learn how long tasks actually take
- **Reduces distractions** - Knowing a break is coming helps you resist interruptions

## Getting Started

Start with the traditional 25/5 timing. Don't worry about optimizing yet - just focus on completing your first few pomodoros. As you get comfortable, you can adjust the durations to match your natural rhythm.

The key is consistency. Make the Pomodoro Technique a daily habit, and you'll see significant improvements in your productivity and focus.
    `,
  },
  "maximize-focus": {
    title: "5 Ways to Maximize Focus During Pomodoros",
    date: "2026-01-01",
    readTime: "4 min read",
    content: `
Getting the most out of your Pomodoro sessions requires more than just setting a timer. Here are five proven strategies to maximize your focus during each work interval.

## 1. Eliminate Digital Distractions

Before starting your pomodoro:
- Put your phone on silent or in another room
- Close unnecessary browser tabs
- Turn off email and chat notifications
- Use website blockers if needed

## 2. Prepare Your Environment

Your physical space affects your mental focus:
- Clear your desk of clutter
- Ensure good lighting
- Have water nearby
- Use noise-canceling headphones if needed

## 3. Start with a Clear Intention

Before each pomodoro, write down exactly what you want to accomplish. This gives your brain a clear target and prevents wandering.

## 4. Handle Interruptions Properly

When something pops into your head during a pomodoro:
- Write it down quickly on a notepad
- Return immediately to your task
- Address the note during your break

## 5. Respect the Timer

The timer is sacred. When it's running:
- Don't check "just one thing"
- Don't extend the session
- Don't skip breaks

Trust the process. The structure is what makes the technique effective.

## Bonus: Track Your Progress

Keep a log of completed pomodoros. Seeing your progress builds momentum and motivation. Our timer automatically tracks your sessions, making this easy.
    `,
  },
  "break-activities": {
    title: "Best Activities for Your Pomodoro Breaks",
    date: "2025-12-30",
    readTime: "3 min read",
    content: `
What you do during your Pomodoro breaks is just as important as what you do during work sessions. The right break activities help you recharge and maintain productivity throughout the day.

## Short Break Activities (5 minutes)

### Physical Movement
- Stand up and stretch
- Walk around the room
- Do a few jumping jacks
- Practice deep breathing

### Eye Rest
- Look out a window at distant objects
- Close your eyes and relax
- Practice the 20-20-20 rule

### Quick Refreshment
- Get a glass of water
- Make a cup of tea
- Have a healthy snack

## Long Break Activities (15-30 minutes)

### Active Recovery
- Take a short walk outside
- Do a quick workout
- Practice yoga or meditation

### Mental Reset
- Listen to music
- Chat with a colleague
- Read something unrelated to work

## What to Avoid

During breaks, avoid activities that:
- Require mental effort (checking email, social media)
- Are hard to stop (watching videos, gaming)
- Keep you at your desk (browsing the web)

## The Science Behind Breaks

Research shows that breaks:
- Restore motivation and focus
- Improve memory consolidation
- Reduce decision fatigue
- Prevent physical strain

Make your breaks count. They're not wasted time - they're an essential part of sustainable productivity.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} - Pomodoro Timer Blog`,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            <div className="prose prose-gray max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={index} className="list-disc list-inside text-gray-600 space-y-1 my-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i}>{item.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  return (
                    <ol key={index} className="list-decimal list-inside text-gray-600 space-y-1 my-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i}>{item.replace(/^\d\.\s\*\*(.+)\*\*\s-\s/, "$1 - ")}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={index} className="text-gray-600 my-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          <div className="card bg-red-50 border-red-200 mt-12">
            <h2 className="text-xl font-bold text-red-800 mb-2">Ready to try it?</h2>
            <p className="text-red-700 mb-4">
              Put these tips into practice with our free Pomodoro Timer.
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
