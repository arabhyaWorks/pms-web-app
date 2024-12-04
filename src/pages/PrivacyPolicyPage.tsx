import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Information Collection',
      content: `We collect information that you provide directly to us, including:
        • Name and contact information
        • Government ID and professional details
        • Project-related data and documentation
        • System usage information and logs`
    },
    {
      title: 'Data Usage',
      content: `Your information is used for:
        • Project management and tracking
        • Communication with relevant departments
        • Performance analysis and reporting
        • Compliance with government regulations`
    },
    {
      title: 'Data Protection',
      content: `We implement robust security measures:
        • End-to-end encryption for sensitive data
        • Regular security audits and updates
        • Access controls and authentication
        • Secure data backup and recovery systems`
    },
    {
      title: 'Data Sharing',
      content: `Information may be shared with:
        • Authorized government departments
        • Project stakeholders and administrators
        • Regulatory authorities when required
        • Third-party service providers under strict confidentiality`
    },
    {
      title: 'User Rights',
      content: `You have the right to:
        • Access your personal information
        • Request data corrections
        • Receive data usage reports
        • File complaints about data handling`
    },
    {
      title: 'Data Retention',
      content: `We retain your information:
        • Throughout your active project involvement
        • As required by government regulations
        • For historical and audit purposes
        • Subject to periodic review and updates`
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
            Last updated: March 15, 2024
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
        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
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
        </div>
      </div>
    </div>
  );
}