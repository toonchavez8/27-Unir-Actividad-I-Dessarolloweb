import { useCampaigns } from "@/hooks/useCampaigns";
import { UpcomingSessions } from "@/components/UpcomingSessions";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";


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
        <UpcomingSessions sessions={upcomingSessions} />
      </section>
 
    </div>
  );
}

export default LandingPage;
