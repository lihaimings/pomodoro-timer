import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Pomodoro Timer",
  description: "Terms of service for using Pomodoro Timer.",
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 2, 2026
            </p>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Pomodoro Timer, you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not 
                use our service.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description of Service</h2>
              <p className="text-gray-600">
                Pomodoro Timer is a free online productivity tool that implements the 
                Pomodoro Technique. The service includes a customizable timer, session 
                tracking, and progress statistics.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Use of Service</h2>
              <p className="text-gray-600 mb-3">You agree to use the service only for lawful purposes and in accordance with these terms. You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Use the service in any way that violates applicable laws</li>
                <li>Attempt to interfere with the proper functioning of the service</li>
                <li>Copy, modify, or distribute the service without permission</li>
                <li>Use automated systems to access the service</li>
              </ul>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Intellectual Property</h2>
              <p className="text-gray-600">
                The service and its original content, features, and functionality are owned 
                by Pomodoro Timer and are protected by international copyright, trademark, 
                and other intellectual property laws.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Disclaimer</h2>
              <p className="text-gray-600">
                The service is provided &quot;as is&quot; without warranties of any kind. We do not 
                guarantee that the service will be uninterrupted, secure, or error-free. 
                Use of the service is at your own risk.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
              <p className="text-gray-600">
                In no event shall Pomodoro Timer be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of the service.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting. Your continued use of the service 
                constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="card bg-red-50 border-red-200">
              <h2 className="text-xl font-bold text-red-800 mb-2">Contact</h2>
              <p className="text-red-700">
                If you have any questions about these Terms of Service, please contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
