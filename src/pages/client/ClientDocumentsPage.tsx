import React, { useEffect, useState } from 'react';
import { FileArchive, Download, FileText, Image, File, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { supabase } from '../../lib/supabase';

interface Document {
  id: string;
  file_name: string;
  file_type: string | null;
  file_url: string | null;
  description: string | null;
  uploaded_by: string | null;
  created_at: string;
}

const ClientDocumentsPage = () => {
  const { clientUser } = useClientAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientUser?.client_id) loadDocuments();
  }, [clientUser?.client_id]);

  const loadDocuments = async () => {
    const { data } = await supabase
      .from('documents')
      .select('*')
      .eq('client_id', clientUser!.client_id)
      .order('created_at', { ascending: false });

    setDocuments(data || []);
    setLoading(false);
  };

  const getFileIcon = (fileType: string | null) => {
    if (!fileType) return File;
    if (fileType.includes('image')) return Image;
    if (fileType.includes('pdf') || fileType.includes('doc')) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
        <p className="text-gray-400">Access files and documents shared with you</p>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
          <FileArchive className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Documents Yet</h3>
          <p className="text-gray-400">Documents shared with you will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, i) => {
            const FileIcon = getFileIcon(doc.file_type);

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                    <FileIcon className="w-6 h-6 text-teal-400" />
                  </div>
                  {doc.file_url && (
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Download className="w-4 h-4 text-gray-400" />
                    </a>
                  )}
                </div>

                <h3 className="text-white font-semibold text-sm mb-1 truncate">{doc.file_name}</h3>
                {doc.description && (
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{doc.description}</p>
                )}

                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientDocumentsPage;
