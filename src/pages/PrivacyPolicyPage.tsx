import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Information We Collect',
      content: `We do not collect any personal data from users of the Project Management System. Our system is designed to function without gathering any personal information from you.`
    },
    {
      title: 'Use of Information',
      content: `Since we do not collect personal information, we do not use or process personal data for any purpose.`
    },
    {
      title: 'Third-Party Services',
      content: `Our system does not use third-party services that collect, monitor, or analyze personal information.`
    },
    {
      title: 'Data Security',
      content: `Even though we do not collect personal information, we prioritize the security of all data within our system. We use appropriate security measures to protect the system from unauthorized access and ensure a safe user experience.`
    },
    {
      title: `Children’s Privacy`,
      content: `Our system does not knowingly collect any information from children under the age of 13. As we do not collect personal data, we adhere to regulations concerning children’s privacy.`
    },
    {
      title: 'Changes to This Privacy Policy',
      content: `We may update our Privacy Policy from time to time. Any changes will be posted within the system. We encourage you to review this Privacy Policy periodically for any updates.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <MobileHeader />
      
      <div className="p-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 text-sm">
            Last updated: December 05, 2024
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {section.title}
              </h2>
              <div className="text-gray-600 text-sm whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-600 text-sm">
            For any privacy-related queries or concerns, please contact our Data Protection Officer:
          </p>
          <div className="mt-2 text-sm">
            <p className="text-gray-900">Email: privacy@pms.gov.in</p>
            <p className="text-gray-900">Phone: +91 1800-XXX-XXXX</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}