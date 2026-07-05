import { Mail } from 'lucide-react';

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Delete Your Laxhan AI Account
        </h1>

        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <p className="text-gray-700 mb-8 leading-relaxed">
            You can request deletion of your Laxhan AI account and associated data at any time. Please follow the steps below.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Send an email</h3>
                <p className="text-gray-700">
                  Send an email from the email address linked to your account to{' '}
                  <a href="mailto:santhoshkrishna958@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    santhoshkrishna958@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Subject line</h3>
                <p className="text-gray-700">
                  Use the subject line:{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">Account Deletion Request</code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Include identification</h3>
                <p className="text-gray-700">
                  Include your registered email or username in the body of the email.
                </p>
              </div>
            </div>
          </div>

          <a
            href="mailto:santhoshkrishna958@gmail.com?subject=Account%20Deletion%20Request"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Mail className="w-5 h-5" />
            Request Account Deletion
          </a>

          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What gets deleted</h3>
              <p className="text-gray-700">
                Your profile information, trading preferences, watchlists, and any personal data linked to your account will be permanently deleted within 7 business days of a verified request.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What may be retained</h3>
              <p className="text-gray-700">
                Certain data may be retained where required by law (e.g., transaction records for regulatory compliance), but will not be linked to your identity beyond the legally required period.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions?</h3>
              <p className="text-gray-700">
                For any questions about this process, contact us at{' '}
                <a href="mailto:santhoshkrishna958@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  santhoshkrishna958@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
