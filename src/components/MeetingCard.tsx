
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MoreVertical, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

export type MeetingStatus = 'processing' | 'completed' | 'failed';

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: MeetingStatus;
  participants: string[];
}

interface MeetingCardProps {
  meeting: Meeting;
}

const getStatusBadge = (status: MeetingStatus) => {
  switch (status) {
    case 'processing':
      return <Badge variant="outline" className="flex items-center gap-1">
        <Loader2 className="h-3 w-3 animate-spin" />
        Processing
      </Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Completed
      </Badge>;
    case 'failed':
      return <Badge variant="destructive">Failed</Badge>;
  }
};

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/meetings/${meeting.id}`);
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 cursor-pointer" onClick={handleClick}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg truncate pr-4">{meeting.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                navigate(`/meetings/${meeting.id}`);
              }}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                navigate(`/tasks?meeting=${meeting.id}`);
              }}>
                View tasks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                Download transcript
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{meeting.date}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{meeting.duration}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          {getStatusBadge(meeting.status)}
          
          <div className="flex -space-x-2 ml-auto">
            {meeting.participants.slice(0, 3).map((participant, index) => (
              <div 
                key={index}
                className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium border-2 border-background"
              >
                {participant.charAt(0).toUpperCase()}
              </div>
            ))}
            {meeting.participants.length > 3 && (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{meeting.participants.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
