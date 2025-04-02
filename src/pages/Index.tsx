
import React, { useState } from 'react';
import { ArrowDown, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';
import MeetingCard, { Meeting } from '../components/MeetingCard';

const recentMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Q1 Marketing Strategy Planning',
    date: 'Today, 2:30 PM',
    duration: '45 minutes',
    status: 'completed',
    participants: ['John D.', 'Sarah M.', 'David L.', 'Amy P.']
  },
  {
    id: '2',
    title: 'Product Team Weekly Standup',
    date: 'Yesterday, 10:00 AM',
    duration: '30 minutes',
    status: 'completed',
    participants: ['Emily C.', 'Michael T.', 'Ryan S.']
  },
  {
    id: '3',
    title: 'Customer Feedback Session',
    date: 'Nov 15, 2023',
    duration: '1 hour 20 minutes',
    status: 'processing',
    participants: ['James M.', 'Nina K.', 'Robert F.', 'Tina H.', 'George P.']
  },
  {
    id: '4',
    title: 'Design Review: New Website',
    date: 'Nov 14, 2023',
    duration: '55 minutes',
    status: 'completed',
    participants: ['Lisa R.', 'Tom P.', 'Emma S.']
  }
];

const Index: React.FC = () => {
  const [meetings] = useState<Meeting[]>(recentMeetings);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              AI-Powered Meeting Assistant
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
              Never Miss Key Details from Your Meetings Again
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Upload your meeting recordings and let AI extract transcripts, summaries, tasks, and insights.
            </p>
            
            <div className="flex items-center justify-center mt-6 animate-bounce">
              <ArrowDown className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <FileUpload />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Recent Meetings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map(meeting => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
          
          {meetings.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4 p-4 rounded-full bg-muted inline-block">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No meetings yet</h3>
              <p className="text-muted-foreground mt-2">
                Upload your first meeting recording to get started
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
