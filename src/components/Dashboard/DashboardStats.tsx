import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atomic/Card';
import { useCampaigns } from '@/hooks/useCampaigns';
import { GiSwordsPower } from 'react-icons/gi';
import { FaTrophy, FaUsers, FaClock } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import './DashboardStats.css';

export const DashboardStats: React.FC = () => {
  const { campaigns, sessions, npcs, locations } = useCampaigns();

  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active').length;
  const completedSessions = sessions.filter(session => session.status === 'completed').length;
  const upcomingSessions = sessions.filter(session => session.status === 'planned').length;
  const totalPlayTime = sessions
    .filter(session => session.status === 'completed')
    .reduce((total, session) => total + session.duration, 0);

  const stats = [
    {
      title: 'Active Campaigns',
      value: activeCampaigns,
      total: campaigns.length,
      icon: GiSwordsPower,
      modifier: 'campaigns'
    },
    {
      title: 'Sessions Completed',
      value: completedSessions,
      total: sessions.length,
      icon: FaTrophy,
      modifier: 'sessions'
    },
    {
      title: 'NPCs Created',
      value: npcs.length,
      total: npcs.length,
      icon: FaUsers,
      modifier: 'npcs'
    },
    {
      title: 'Locations Mapped',
      value: locations.length,
      total: locations.length,
      icon: MdLocationOn,
      modifier: 'locations'
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="dashboard-stats__grid">
        {stats.map((stat) => (
          <Card key={stat.title} className={`dashboard-stats__card dashboard-stats__card--${stat.modifier}`} variant="elevated">
            <CardHeader className="dashboard-stats__header">
              <CardTitle className="dashboard-stats__title">
                {stat.title}
              </CardTitle>
              <div className={`dashboard-stats__icon dashboard-stats__icon--${stat.modifier}`}>
                <stat.icon className="dashboard-stats__icon-svg" />
              </div>
            </CardHeader>
            <CardContent className="dashboard-stats__content">
              <div className="dashboard-stats__value">{stat.value}</div>
              {stat.total !== stat.value && (
                <p className="dashboard-stats__total">
                  of {stat.total} total
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="dashboard-stats__activity" variant="elevated">
        <CardHeader className="dashboard-stats__header">
          <CardTitle className="dashboard-stats__title dashboard-stats__title--activity">
            <FaClock className="dashboard-stats__activity-icon" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="dashboard-stats__content">
          <div className="dashboard-stats__activity-content">
            <div className="dashboard-stats__playtime">
              <p className="dashboard-stats__playtime-value">
                {Math.round(totalPlayTime / 60)} hours
              </p>
              <p className="dashboard-stats__playtime-label">Total play time</p>
            </div>
            <div className="dashboard-stats__upcoming">
              <span className={`dashboard-stats__badge dashboard-stats__badge--${upcomingSessions > 0 ? 'active' : 'inactive'}`}>
                {upcomingSessions} upcoming session{upcomingSessions !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
