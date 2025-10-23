import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const OverviewValue = () => {
  const nodes = [
    { id: 1, x: 10, y: 20, label: 'Input' },
    { id: 2, x: 30, y: 10, label: 'Process' },
    { id: 3, x: 30, y: 30, label: 'Analyze' },
    { id: 4, x: 50, y: 20, label: 'AI Engine' },
    { id: 5, x: 70, y: 10, label: 'Route' },
    { id: 6, x: 70, y: 30, label: 'Execute' },
    { id: 7, x: 90, y: 20, label: 'Output' }
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
    { from: 5, to: 7 },
    { from: 6, to: 7 }
  ];

  return (
    <section className="py-16 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
              Every Automation Built Around Your Needs
            </h2>
            <div className="space-y-3 text-base text-slate-300 leading-relaxed">
              <p>
                Every automation we build is unique — engineered to fit your exact workflows, tools, and goals. From single-task automations for sole traders to fully integrated AI ecosystems for SMEs.
              </p>
              <p>
                We analyze your processes, design intelligent workflows, and build custom solutions that evolve with your business.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <svg className="w-full h-64" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
                    <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
                  </linearGradient>
                </defs>

                {connections.map((conn, idx) => {
                  const fromNode = nodes.find(n => n.id === conn.from);
                  const toNode = nodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <motion.line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="url(#lineGradient)"
                      strokeWidth="0.3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                    />
                  );
                })}

                {nodes.map((node, idx) => (
                  <g key={node.id}>
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="3"
                      fill="rgba(168, 85, 247, 0.2)"
                      stroke="rgba(168, 85, 247, 0.8)"
                      strokeWidth="0.3"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.3 }}
                    />
                    <motion.text
                      x={node.x}
                      y={node.y - 5}
                      textAnchor="middle"
                      fill="rgba(255, 255, 255, 0.8)"
                      fontSize="3"
                      fontWeight="500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.5, duration: 0.3 }}
                    >
                      {node.label}
                    </motion.text>
                  </g>
                ))}
              </svg>

              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500/30 border border-purple-500"></div>
                  <span className="text-xs text-slate-400">Data Flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span className="text-xs text-slate-400">Processing Path</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OverviewValue;
