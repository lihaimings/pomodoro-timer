import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Pomodoro Timer",
  description: "Privacy policy for Pomodoro Timer - Learn how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 2, 2026
            </p>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-600">
                Pomodoro Timer is committed to protecting your privacy. This policy explains 
                how we handle information when you use our service.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Data Collection</h2>
              <p className="text-gray-600 mb-3">
                We do not collect, store, or transmit any personal data. All information 
                including your timer settings and session history is stored locally in 
                your browser using localStorage.
              </p>
              <p className="text-gray-600">
                This means your data never leaves your device and is not accessible to us 
                or any third parties.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Local Storage</h2>
              <p className="text-gray-600 mb-3">
                We use browser localStorage to save:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Timer settings (work duration, break duration, etc.)</li>
                <li>Session history</li>
                <li>Completed pomodoro count</li>
              </ul>
              <p className="text-gray-600 mt-3">
                You can clear this data at any time by clearing your browser&apos;s local storage 
                or using the clear history function in the app.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies</h2>
              <p className="text-gray-600">
                We do not use cookies for tracking or analytics purposes.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Services</h2>
              <p className="text-gray-600">
                Our website does not integrate with any third-party analytics, advertising, 
                or tracking services.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this privacy policy from time to time. Any changes will be 
                posted on this page with an updated revision date.
              </p>
            </div>

            <div className="card bg-red-50 border-red-200">
              <h2 className="text-xl font-bold text-red-800 mb-2">Questions?</h2>
              <p className="text-red-700">
                If you have any questions about this privacy policy, please feel free to 
                contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
