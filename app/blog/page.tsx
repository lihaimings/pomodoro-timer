import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Pomodoro Timer",
  description: "Tips, guides, and insights about the Pomodoro Technique and productivity.",
};

const posts = [
  {
    slug: "getting-started",
    title: "Getting Started with the Pomodoro Technique",
    excerpt: "Learn the basics of the Pomodoro Technique and how to implement it in your daily routine for maximum productivity.",
    date: "2026-01-02",
    readTime: "5 min read",
  },
  {
    slug: "maximize-focus",
    title: "5 Ways to Maximize Focus During Pomodoros",
    excerpt: "Discover proven strategies to eliminate distractions and make the most of your focused work sessions.",
    date: "2026-01-01",
    readTime: "4 min read",
  },
  {
    slug: "break-activities",
    title: "Best Activities for Your Pomodoro Breaks",
    excerpt: "What you do during breaks matters. Learn the best activities to recharge and maintain productivity.",
    date: "2025-12-30",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600">
              Tips and insights for better productivity
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="card hover:shadow-xl transition-shadow cursor-pointer group">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                    <span className="text-red-600 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
