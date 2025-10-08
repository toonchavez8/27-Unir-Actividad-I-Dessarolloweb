import { useCampaigns } from "@/hooks/useCampaigns";
import { UpcomingSessions } from "@/components/UpcomingSessions";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { RecentCampaigns } from "@/components/Dashboard/RecentCampaigns";


function LandingPage() {
const {sessions} = useCampaigns();

const upcomingSessions = sessions.filter(session => session.status === "planned").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);

  return (
    <div className="page-container">
      <div className="page-header">
         <h1 className="page-title">Campaign Dashboard</h1>
        <p className="page-description">
          Your ultimate companion for managing D&D campaigns
        </p>
      </div>
      
      <section className="page-content">
        <DashboardStats />
        
        <div className="dashboard-grid">
          <div className="dashboard-grid__sidebar">
            <QuickActions />
            <UpcomingSessions sessions={upcomingSessions} />
          </div>
          
          <div className="dashboard-grid__main">
            <RecentCampaigns />
          </div>
        </div>
      </section>
 
    </div>
  );
}

export default LandingPage;
