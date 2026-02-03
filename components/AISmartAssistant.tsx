
import React, { useState } from 'react';
import { getSmartRecommendation } from '../services/ai';
import { Vehicle } from '../types';

interface Props {
  vehicles: Vehicle[];
}

const AISmartAssistant: React.FC<Props> = ({ vehicles }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await getSmartRecommendation(query, vehicles);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm sticky top-24">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Smart Assistant</h3>
          <p className="text-xs text-slate-500">AI-Powered Recommendations</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-emerald-50 rounded-xl p-3 text-sm text-emerald-800 italic border border-emerald-100">
          "I'm planning a trip to Entoto with my family of 5, what car is best?"
        </div>

        <textarea 
          className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-500 outline-none transition-all h-24 resize-none"
          placeholder="Tell me your needs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button 
          onClick={handleAsk}
          disabled={isLoading || !query}
          className="w-full bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all disabled:opacity-50"
        >
          {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Get Advice'}
        </button>

        {response && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed animate-in fade-in slide-in-from-top-4">
            <div className="font-bold text-emerald-600 mb-1 flex items-center">
              <i className="fas fa-sparkles mr-2 text-xs"></i>
              GashaDrift Recommendation:
            </div>
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISmartAssistant;
