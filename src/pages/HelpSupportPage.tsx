import React from 'react';
import { ArrowLeft, Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';
import SupportCard from '../components/SupportCard';

export default function HelpSupportPage() {
  const navigate = useNavigate();

  const supportInfo = {
    phone: '+91 7522863690',
    email: 'support@pmsbhadohi.gov.in',
    hours: '10:00 AM - 6:00 PM (Mon-Fri)',
  };

  const supportCards = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly at our helpline',
      value: supportInfo.phone,
      action: () => window.location.href = `tel:${supportInfo.phone}`,
      buttonText: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your queries via email',
      value: supportInfo.email,
      action: () => window.location.href = `mailto:${supportInfo.email}`,
      buttonText: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      description: 'Our team is available during',
      value: supportInfo.hours,
      showButton: false
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600 text-sm">
            Get assistance with your queries and issues
          </p>
        </div>

        {/* Support Cards */}
        <div className="space-y-4">
          {supportCards.map((card, index) => (
            <SupportCard key={index} {...card} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                How do I report an issue with a project?
              </h3>
              <p className="text-sm text-gray-600">
                Navigate to the Issues section and click on the "Create Issue" button to report a new issue.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                How can I track project milestones?
              </h3>
              <p className="text-sm text-gray-600">
                Visit the Milestones section to view and track the progress of project milestones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}