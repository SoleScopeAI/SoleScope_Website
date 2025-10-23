import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Activity, BarChart3, Clock, Target } from 'lucide-react';

interface MockupProps {
  className?: string;
}

export const BookingDashboardMockup: React.FC<MockupProps> = ({ className = "" }) => (
  <div className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Today's Schedule</h3>
            <p className="text-slate-400 text-xs">12 appointments</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">85%</div>
          <div className="text-xs text-green-400 flex items-center justify-end">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+12%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">This Week</div>
          <div className="text-white font-bold text-lg">48</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">Revenue</div>
          <div className="text-white font-bold text-lg">£2.4k</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">Rating</div>
          <div className="text-white font-bold text-lg">4.9</div>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { time: '09:00', name: 'Max - Grooming', color: 'from-pink-500 to-rose-500' },
          { time: '10:30', name: 'Bella - Bath & Trim', color: 'from-purple-500 to-pink-500' },
          { time: '12:00', name: 'Charlie - Full Service', color: 'from-blue-500 to-purple-500' },
        ].map((appointment, i) => (
          <div key={i} className="flex items-center space-x-3 bg-white/5 rounded-lg p-2 border border-white/10">
            <div className={`w-1 h-10 bg-gradient-to-b ${appointment.color} rounded-full`}></div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{appointment.name}</div>
              <div className="text-slate-400 text-xs">{appointment.time}</div>
            </div>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const AnalyticsDashboardMockup: React.FC<MockupProps> = ({ className = "" }) => (
  <div className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Performance Analytics</h3>
        <div className="text-xs text-slate-400">Last 30 days</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Users, label: 'Total Clients', value: '248', change: '+18%', color: 'from-blue-500 to-cyan-500' },
          { icon: TrendingUp, label: 'Revenue', value: '£12.5k', change: '+24%', color: 'from-green-500 to-emerald-500' },
          { icon: Activity, label: 'Completion', value: '98%', change: '+3%', color: 'from-purple-500 to-pink-500' },
          { icon: Target, label: 'Goals Met', value: '15/16', change: '+2', color: 'from-orange-500 to-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
            <div className="flex items-baseline justify-between">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          <span className="text-xs text-slate-400">Weekly trend</span>
        </div>
        <div className="flex items-end justify-between h-24 space-x-1">
          {[40, 65, 45, 80, 60, 85, 95].map((height, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  </div>
);

export const LeadDashboardMockup: React.FC<MockupProps> = ({ className = "" }) => (
  <div className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Lead Pipeline</h3>
        <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
          Live
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-3">
          <div className="text-orange-300 text-xs mb-1">New</div>
          <div className="text-white font-bold text-2xl">24</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-3">
          <div className="text-blue-300 text-xs mb-1">Qualified</div>
          <div className="text-white font-bold text-2xl">18</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-3">
          <div className="text-green-300 text-xs mb-1">Converted</div>
          <div className="text-white font-bold text-2xl">12</div>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { company: 'Acme Industries', score: 95, status: 'hot', color: 'from-red-500 to-orange-500' },
          { company: 'Tech Solutions', score: 82, status: 'warm', color: 'from-orange-500 to-yellow-500' },
          { company: 'Global Services', score: 68, status: 'cold', color: 'from-blue-500 to-cyan-500' },
        ].map((lead, i) => (
          <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${lead.color}`}></div>
              <div>
                <div className="text-white text-sm font-medium">{lead.company}</div>
                <div className="text-slate-400 text-xs capitalize">{lead.status} lead</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{lead.score}</div>
              <div className="text-xs text-slate-400">score</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-400" />
            <span className="text-white font-medium text-sm">Conversion Rate</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">67%</div>
            <div className="text-xs text-green-400">+15% this month</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ProgressTrackingMockup: React.FC<MockupProps> = ({ className = "" }) => (
  <div className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Client Progress</h3>
          <p className="text-slate-400 text-xs">Max - Advanced Training</p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { skill: 'Basic Commands', progress: 100, color: 'from-green-500 to-emerald-500' },
          { skill: 'Leash Training', progress: 85, color: 'from-blue-500 to-cyan-500' },
          { skill: 'Social Behavior', progress: 65, color: 'from-purple-500 to-pink-500' },
          { skill: 'Advanced Tricks', progress: 40, color: 'from-orange-500 to-red-500' },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{item.skill}</span>
              <span className="text-white font-semibold">{item.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">Sessions</div>
          <div className="text-white font-bold text-xl">24/30</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">Next Session</div>
          <div className="text-white font-bold text-xl">2 days</div>
        </div>
      </div>
    </div>
  </div>
);

export const RevenueTrackingMockup: React.FC<MockupProps> = ({ className = "" }) => (
  <div className={`relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 ${className}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Revenue Overview</h3>
            <p className="text-slate-400 text-xs">October 2024</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
        <div className="text-green-300 text-xs mb-1">Total Revenue</div>
        <div className="text-white font-bold text-3xl mb-2">£24,850</div>
        <div className="flex items-center text-sm text-green-400">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+24% from last month</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">Avg Order</div>
          <div className="text-white font-bold text-lg">£52</div>
          <div className="text-xs text-green-400">+8%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-slate-400 text-xs mb-1">Orders</div>
          <div className="text-white font-bold text-lg">478</div>
          <div className="text-xs text-green-400">+15%</div>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { label: 'Online Orders', value: '£18.2k', percent: 73 },
          { label: 'Walk-ins', value: '£6.6k', percent: 27 },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{item.label}</span>
              <span className="text-white font-semibold">{item.value}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
