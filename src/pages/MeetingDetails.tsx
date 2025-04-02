
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CalendarClock, Clock, ClipboardList, 
  Lightbulb, MessageSquare, Download, Copy, 
  Share2, Users, ChevronDown
} from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Meeting } from '../components/MeetingCard';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';

// Mock data
const meetingData: Record<string, Meeting> = {
  '1': {
    id: '1',
    title: 'Q1 Marketing Strategy Planning',
    date: 'Today, 2:30 PM',
    duration: '45 minutes',
    status: 'completed',
    participants: ['John D.', 'Sarah M.', 'David L.', 'Amy P.']
  },
  '2': {
    id: '2',
    title: 'Product Team Weekly Standup',
    date: 'Yesterday, 10:00 AM',
    duration: '30 minutes',
    status: 'completed',
    participants: ['Emily C.', 'Michael T.', 'Ryan S.']
  },
  '3': {
    id: '3',
    title: 'Customer Feedback Session',
    date: 'Nov 15, 2023',
    duration: '1 hour 20 minutes',
    status: 'processing',
    participants: ['James M.', 'Nina K.', 'Robert F.', 'Tina H.', 'George P.']
  },
};

const mockTranscript = `
[00:00:05] John: Welcome everyone to our Q1 Marketing Strategy Planning session. Let's start by reviewing our Q4 results.

[00:01:15] Sarah: Thanks John. Looking at the numbers, our social media campaign performed 20% better than expected, but email open rates declined by about 5%.

[00:02:45] David: I think we should focus more on video content this quarter. The analytics show higher engagement rates.

[00:03:50] Amy: I agree with David. Also, can we discuss budget allocation? I believe we need to increase our PPC spending.

[00:05:10] John: Good point Amy. Let's plan to allocate an additional $5,000 to PPC campaigns. Sarah, can you prepare a proposal for this?

[00:06:25] Sarah: Sure, I'll have that ready by Friday. Also, we should discuss our content calendar for the quarter.

[00:08:40] David: I've already started working on the content calendar. I'll share a draft tomorrow for everyone to review.

[00:10:15] John: Excellent. Any other topics we need to cover today?

[00:11:30] Amy: We should also touch on our event strategy for Q1. We have the industry conference in February.

[00:12:45] John: Right. Let's allocate time next week to specifically discuss the conference strategy. Sarah, can you coordinate that meeting?

[00:13:50] Sarah: Yes, I'll send out calendar invites tomorrow.

[00:14:25] John: Great. I think we've covered everything for today. Thank you all for your input!
`;

const mockSummary = [
  "Reviewed Q4 results: Social media performed 20% above target, email open rates declined by 5%",
  "Team agreed to focus more on video content in Q1 due to higher engagement rates",
  "Decision to increase PPC budget by $5,000",
  "David is working on the Q1 content calendar, draft to be shared tomorrow",
  "Team will have a separate meeting to discuss strategy for February industry conference"
];

const mockTasks = [
  { id: '1', text: "Sarah to prepare proposal for increased PPC budget", assignee: "Sarah M.", dueDate: "Nov 17, 2023", completed: false },
  { id: '2', text: "David to share content calendar draft", assignee: "David L.", dueDate: "Nov 16, 2023", completed: true },
  { id: '3', text: "Sarah to coordinate meeting about conference strategy", assignee: "Sarah M.", dueDate: "Nov 16, 2023", completed: false },
  { id: '4', text: "Team to review content calendar", assignee: "All", dueDate: "Nov 19, 2023", completed: false },
];

const mockInsights = {
  speakingTime: [
    { name: "John", percentage: 35 },
    { name: "Sarah", percentage: 25 },
    { name: "David", percentage: 20 },
    { name: "Amy", percentage: 20 },
  ],
  keyTopics: ["budget allocation", "content calendar", "video content", "social media", "industry conference"],
  sentimentScore: 85, // 0-100 scale
  meetingEfficiency: 90, // 0-100 scale
};

const MeetingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && meetingData[id]) {
      // Simulate API call
      setTimeout(() => {
        setMeeting(meetingData[id]);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <div className="flex gap-2 mb-8">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-[600px] w-full" />
        </div>
      </Layout>
    );
  }

  if (!meeting) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-2">Meeting not found</h2>
          <p className="text-muted-foreground">The meeting you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{meeting.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <div className="flex items-center gap-1 text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                <span className="text-sm">{meeting.date}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{meeting.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">{meeting.participants.length} participants</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="transcript" className="mt-6">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="transcript">
              <MessageSquare className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
            <TabsTrigger value="summary">
              <ClipboardList className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <ClipboardList className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Lightbulb className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transcript" className="bg-card p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Transcript</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="bg-background rounded-md p-4 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {mockTranscript}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Meeting Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockSummary.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 min-w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Action Items</CardTitle>
                <Button>Export Tasks</Button>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {mockTasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-3 p-3 border rounded-md">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        checked={task.completed}
                        readOnly
                      />
                      <div className="flex-1">
                        <p className={task.completed ? "line-through text-muted-foreground" : ""}>{task.text}</p>
                        <div className="flex gap-3 mt-2">
                          <Badge variant="outline">{task.assignee}</Badge>
                          <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800">
                            Due: {task.dueDate}
                          </Badge>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Speaking Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockInsights.speakingTime.map((person) => (
                    <div key={person.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{person.name}</span>
                        <span className="text-muted-foreground">{person.percentage}%</span>
                      </div>
                      <Progress value={person.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Meeting Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sentiment Score</span>
                      <span className="text-green-600 font-medium">Positive</span>
                    </div>
                    <Progress value={mockInsights.sentimentScore} className="h-2 bg-gray-100 dark:bg-gray-800">
                      <div 
                        className="h-full rounded-full transition-all" 
                        style={{ 
                          width: `${mockInsights.sentimentScore}%`,
                          background: `linear-gradient(90deg, #f43f5e 0%, #fcd34d 50%, #22c55e 100%)`,
                        }}
                      />
                    </Progress>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Meeting Efficiency</span>
                      <span className="text-green-600 font-medium">{mockInsights.meetingEfficiency}%</span>
                    </div>
                    <Progress value={mockInsights.meetingEfficiency} className="h-2" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Key Topics Discussed</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockInsights.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Improving meeting efficiency</AccordionTrigger>
                    <AccordionContent>
                      <p>Consider setting a more structured agenda with time limits for each topic. The discussion about the content calendar took longer than necessary and could have been more focused.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Task distribution</AccordionTrigger>
                    <AccordionContent>
                      <p>Tasks appear to be concentrated on Sarah. Consider more evenly distributing action items among team members to improve overall productivity and avoid potential bottlenecks.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Follow-up suggestions</AccordionTrigger>
                    <AccordionContent>
                      <p>Schedule a brief check-in before the next full meeting to ensure the PPC proposal and content calendar drafts are on track. This could help keep momentum going between meetings.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MeetingDetails;
