import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  message: string;
  sender_type: string;
  sender_name: string | null;
  created_at: string;
  is_read: boolean;
}

const ClientMessagesPage = () => {
  const { clientUser } = useClientAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clientUser?.client_id) loadMessages();
  }, [clientUser?.client_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from('communications')
      .select('id, message, sender_type, sender_name, created_at, is_read')
      .eq('client_id', clientUser!.client_id)
      .order('created_at', { ascending: true });

    setMessages(data || []);
    setLoading(false);

    await supabase
      .from('communications')
      .update({ is_read: true })
      .eq('client_id', clientUser!.client_id)
      .eq('sender_type', 'admin')
      .eq('is_read', false);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !clientUser?.client_id) return;
    setSending(true);

    const { data, error } = await supabase
      .from('communications')
      .insert({
        client_id: clientUser.client_id,
        message: newMessage.trim(),
        sender_type: 'client',
        sender_name: clientUser.full_name,
        communication_type: 'message',
      })
      .select()
      .maybeSingle();

    if (data) {
      setMessages([...messages, data]);
      setNewMessage('');
    }
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-gray-400">Communicate directly with our team</p>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Messages Yet</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                Send us a message and our team will respond as soon as possible.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isClient = msg.sender_type === 'client';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isClient ? 'order-2' : ''}`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      isClient
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-br-md'
                        : 'bg-white/10 text-white rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <div className={`flex items-center space-x-2 mt-1 ${isClient ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-gray-500">{msg.sender_name || (isClient ? 'You' : 'Team')}</span>
                      <span className="text-xs text-gray-600">{formatTime(msg.created_at)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-end space-x-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            <button
              onClick={handleSend}
              disabled={sending || !newMessage.trim()}
              className="p-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-xl transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMessagesPage;
