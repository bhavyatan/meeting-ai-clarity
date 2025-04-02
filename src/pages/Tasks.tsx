import React, { useState } from 'react';
import { CheckCircle, Filter, SortAsc, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '@/utils/toast';

interface Task {
  id: string;
  text: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
  meetingId: string;
  meetingTitle: string;
}

// Mock data
const mockTasks: Task[] = [
  { 
    id: '1', 
    text: "Sarah to prepare proposal for increased PPC budget", 
    assignee: "Sarah M.", 
    dueDate: "Nov 17, 2023", 
    completed: false,
    meetingId: '1',
    meetingTitle: 'Q1 Marketing Strategy Planning'
  },
  { 
    id: '2', 
    text: "David to share content calendar draft", 
    assignee: "David L.", 
    dueDate: "Nov 16, 2023", 
    completed: true,
    meetingId: '1',
    meetingTitle: 'Q1 Marketing Strategy Planning'
  },
  { 
    id: '3', 
    text: "Sarah to coordinate meeting about conference strategy", 
    assignee: "Sarah M.", 
    dueDate: "Nov 16, 2023", 
    completed: false,
    meetingId: '1',
    meetingTitle: 'Q1 Marketing Strategy Planning'
  },
  { 
    id: '4', 
    text: "Team to review content calendar", 
    assignee: "All", 
    dueDate: "Nov 19, 2023", 
    completed: false,
    meetingId: '1',
    meetingTitle: 'Q1 Marketing Strategy Planning'
  },
  { 
    id: '5', 
    text: "Emily to demo the latest product features", 
    assignee: "Emily C.", 
    dueDate: "Nov 20, 2023", 
    completed: false,
    meetingId: '2',
    meetingTitle: 'Product Team Weekly Standup'
  },
  { 
    id: '6', 
    text: "Michael to update the roadmap with new priorities", 
    assignee: "Michael T.", 
    dueDate: "Nov 17, 2023", 
    completed: false,
    meetingId: '2',
    meetingTitle: 'Product Team Weekly Standup'
  },
  { 
    id: '7', 
    text: "Ryan to fix critical bug in production", 
    assignee: "Ryan S.", 
    dueDate: "Nov 15, 2023", 
    completed: true,
    meetingId: '2',
    meetingTitle: 'Product Team Weekly Standup'
  },
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
    
    toast(completed ? "Task marked as completed" : "Task marked as pending", {
      description: "Your task status has been updated.",
    });
  };

  const handleExport = (platform: string) => {
    toast.success(`Tasks exported to ${platform}`, {
      description: "Your tasks have been successfully exported.",
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Task Management</h1>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filter === 'all'}
                  onCheckedChange={() => setFilter('all')}
                >
                  All Tasks
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 'pending'}
                  onCheckedChange={() => setFilter('pending')}
                >
                  Pending Tasks
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 'completed'}
                  onCheckedChange={() => setFilter('completed')}
                >
                  Completed Tasks
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort Tasks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  By Due Date
                </DropdownMenuItem>
                <DropdownMenuItem>
                  By Meeting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  By Assignee
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Export Tasks
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Choose platform</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport('Notion')}>
                  Export to Notion
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('Trello')}>
                  Export to Trello
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('Jira')}>
                  Export to Jira
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('CSV')}>
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-4 md:p-6">
                    <div className="flex items-center h-6 mr-4">
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 rounded-sm"
                        checked={task.completed}
                        onChange={(e) => handleTaskComplete(task.id, e.target.checked)}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <p className={task.completed ? "line-through text-muted-foreground" : ""}>
                        {task.text}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-primary/5">
                          {task.assignee}
                        </Badge>
                        <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800">
                          Due: {task.dueDate}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">
                          {task.meetingTitle}
                        </Badge>
                      </div>
                    </div>
                    
                    {task.completed && (
                      <div className="ml-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <div className="mb-4 p-4 rounded-full bg-muted inline-block">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No tasks found</h3>
            <p className="text-muted-foreground mt-2">
              {filter === 'all' 
                ? "You don't have any tasks yet" 
                : filter === 'completed' 
                  ? "You don't have any completed tasks" 
                  : "You don't have any pending tasks"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
