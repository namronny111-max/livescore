import React, { useState, useEffect } from 'react';
import { Heart, Activity, Users, TrendingUp, Award, Stethoscope, Droplet, CheckCircle } from 'lucide-react';
import type { CSRStats } from '../types';

interface CSRSectionProps {
  csrStats: CSRStats;
}

export const CSRSection: React.FC<CSRSectionProps> = ({ csrStats }) => {
  const [animatedStats, setAnimatedStats] = useState({
    peopleScreened: 0,
    donationsCollected: 0,
    healthChecksCompleted: 0,
    wellnessParticipants: 0
  });

  // Animate counters on component mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        peopleScreened: Math.round(csrStats.peopleScreened * easeOutQuart),
        donationsCollected: Math.round(csrStats.donationsCollected * easeOutQuart),
        healthChecksCompleted: Math.round(csrStats.healthChecksCompleted * easeOutQuart),
        wellnessParticipants: Math.round(csrStats.wellnessParticipants * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(csrStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [csrStats]);

  const wellnessServices = [
    {
      title: 'Free Health Screenings',
      description: 'Blood pressure, BMI, and basic health checks',
      icon: Stethoscope,
      color: 'bg-blue-500',
      participants: animatedStats.peopleScreened
    },
    {
      title: 'Blood Donation Drive',
      description: 'Help save lives with voluntary blood donation',
      icon: Droplet,
      color: 'bg-red-500',
      participants: Math.round(animatedStats.donationsCollected / 1000)
    },
    {
      title: 'Wellness Activities',
      description: 'Yoga, meditation, and fitness sessions',
      icon: Activity,
      color: 'bg-green-500',
      participants: animatedStats.wellnessParticipants
    },
    {
      title: 'Health Education',
      description: 'Learn about nutrition and healthy living',
      icon: Award,
      color: 'bg-purple-500',
      participants: animatedStats.healthChecksCompleted
    }
  ];

  const impactMetrics = [
    {
      title: 'People Screened',
      value: animatedStats.peopleScreened,
      target: 500,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Donations Raised',
      value: animatedStats.donationsCollected,
      target: 50000,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      format: 'currency'
    },
    {
      title: 'Health Checks',
      value: animatedStats.healthChecksCompleted,
      target: 200,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Wellness Participants',
      value: animatedStats.wellnessParticipants,
      target: 600,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">🌱 Wellness & CSR</h1>
        <p className="text-green-100">Making a positive impact together</p>
      </div>

      {/* Impact Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        {impactMetrics.map((metric) => {
          const IconComponent = metric.icon;
          const progress = (metric.value / metric.target) * 100;
          const formattedValue = metric.format === 'currency' 
            ? `₹${metric.value.toLocaleString()}` 
            : metric.value.toLocaleString();
          
          return (
            <div key={metric.title} className={`${metric.bgColor} rounded-xl p-4 border border-gray-100`}>
              <div className="flex items-center space-x-2 mb-3">
                <IconComponent className={`${metric.color}`} size={20} />
                <span className="font-semibold text-sm text-gray-700">{metric.title}</span>
              </div>
              
              <div className="mb-2">
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {formattedValue}
                </div>
                <div className="text-xs text-gray-500">
                  of {metric.format === 'currency' ? '₹' : ''}{metric.target.toLocaleString()} target
                </div>
              </div>
              
              <div className="w-full bg-white/60 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${metric.color.replace('text-', 'bg-')}`}
                  style={{ width: `${Math.min(100, progress)}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-600 mt-1">
                {Math.round(progress)}% achieved
              </div>
            </div>
          );
        })}
      </div>

      {/* Wellness Services */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg flex items-center">
            <Activity className="mr-2 text-green-500" size={20} />
            Wellness Services Available
          </h3>
        </div>
        
        <div className="p-4 space-y-4">
          {wellnessServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center`}>
                  <IconComponent className="text-white" size={20} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-700">{service.participants}</div>
                  <div className="text-xs text-gray-500">participants</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Impact Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold flex items-center">
            <TrendingUp className="mr-2 text-blue-500" size={20} />
            Live Impact Feed
          </h3>
        </div>
        
        <div className="p-4 space-y-3">
          {[
            { time: '2 min ago', text: 'Sarah completed her health screening', icon: '✅' },
            { time: '5 min ago', text: '₹2,500 donated for community health programs', icon: '💝' },
            { time: '8 min ago', text: 'Mike participated in yoga session', icon: '🧘‍♂️' },
            { time: '12 min ago', text: 'Blood donation milestone: 25 units collected!', icon: '🩸' },
            { time: '15 min ago', text: 'Free BMI check completed for Lisa', icon: '📊' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white text-center">
        <Heart size={32} className="mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-2">Join Our Wellness Mission</h3>
        <p className="mb-4 opacity-90">
          Volunteer for health screenings, donate blood, or participate in wellness activities
        </p>
        <div className="flex space-x-3 justify-center">
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Volunteer Now
          </button>
          <button className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Recognition Board */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} />
            Wellness Champions Today
          </h3>
        </div>
        
        <div className="p-4 grid grid-cols-1 gap-3">
          {[
            { name: 'Team Alpha Corp', achievement: 'Most Blood Donations', count: '12 donations' },
            { name: 'Jessica Kumar', achievement: 'Health Screening Advocate', count: 'Helped 25 people' },
            { name: 'Wellness Warriors', achievement: 'Most Active Participants', count: '45 activities' }
          ].map((champion, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                {index === 0 ? '🏆' : index === 1 ? '🥇' : '⭐'}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{champion.name}</div>
                <div className="text-sm text-gray-600">{champion.achievement}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-600">{champion.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};