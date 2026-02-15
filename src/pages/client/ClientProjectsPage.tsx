import React, { useEffect, useState } from 'react';
import { FolderKanban, Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { supabase } from '../../lib/supabase';

interface Project {
  id: string;
  project_name: string;
  status: string;
  progress_percentage: number;
  due_date: string | null;
  start_date: string | null;
  project_type: string | null;
  description: string | null;
  created_at: string;
}

interface Milestone {
  id: string;
  title: string;
  status: string;
  due_date: string | null;
  project_id: string;
}

const ClientProjectsPage = () => {
  const { clientUser } = useClientAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (clientUser?.client_id) loadProjects();
  }, [clientUser?.client_id]);

  const loadProjects = async () => {
    const [projectsRes, milestonesRes] = await Promise.all([
      supabase
        .from('projects')
        .select('*')
        .eq('client_id', clientUser!.client_id)
        .order('created_at', { ascending: false }),
      supabase
        .from('milestones')
        .select('id, title, status, due_date, project_id')
        .order('due_date', { ascending: true }),
    ]);

    setProjects(projectsRes.data || []);
    setMilestones(milestonesRes.data || []);
    setLoading(false);
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; bg: string; border: string }> = {
      planning: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
      in_progress: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
      review: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
      completed: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
      on_hold: { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
    };
    return configs[status] || configs.on_hold;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Projects</h1>
        <p className="text-gray-400">Track progress and milestones for all your projects</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
          <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-400">Your projects will appear here once they are created.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, i) => {
            const status = getStatusConfig(project.status);
            const projectMilestones = milestones.filter((m) => m.project_id === project.id);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-white/[0.03] transition-colors"
                  onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{project.project_name}</h3>
                      {project.project_type && (
                        <span className="text-sm text-gray-400 capitalize">{project.project_type.replace('_', ' ')}</span>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color} ${status.bg} ${status.border}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">{project.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-cyan-400 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${project.progress_percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-400 pt-2">
                      {project.start_date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.due_date && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Due: {new Date(project.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedProject?.id === project.id && (
                  <div className="border-t border-white/10 p-6 bg-white/[0.02]">
                    {project.description && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                      </div>
                    )}

                    {projectMilestones.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-3">Milestones</h4>
                        <div className="space-y-2">
                          {projectMilestones.map((ms) => (
                            <div key={ms.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                              <div className="flex items-center space-x-3">
                                {ms.status === 'completed' ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                                ) : (
                                  <Clock className="w-5 h-5 text-gray-400" />
                                )}
                                <span className={`text-sm ${ms.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'}`}>
                                  {ms.title}
                                </span>
                              </div>
                              {ms.due_date && (
                                <span className="text-xs text-gray-500">{new Date(ms.due_date).toLocaleDateString()}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {projectMilestones.length === 0 && !project.description && (
                      <p className="text-gray-500 text-sm">No additional details available yet.</p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientProjectsPage;
