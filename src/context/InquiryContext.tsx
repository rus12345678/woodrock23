import React, { createContext, useContext, useState, useEffect } from 'react';
import type { InquiryRecord, InquiryType } from '../types';

interface InquiryModalOptions {
  type?: InquiryType;
  productId?: string;
  productName?: string;
  solutionId?: string;
  solutionName?: string;
  comment?: string;
}

interface InquiryContextType {
  isOpen: boolean;
  options: InquiryModalOptions;
  openInquiry: (opts?: InquiryModalOptions) => void;
  closeInquiry: () => void;
  lastSubmission: InquiryRecord | null;
  setLastSubmission: (record: InquiryRecord | null) => void;
  demoSubmissions: InquiryRecord[];
  refreshDemoSubmissions: () => void;
  clearDemoSubmissions: () => void;
}

const defaultOptions: InquiryModalOptions = {
  type: 'general',
};

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<InquiryModalOptions>(defaultOptions);
  const [lastSubmission, setLastSubmission] = useState<InquiryRecord | null>(null);
  const [demoSubmissions, setDemoSubmissions] = useState<InquiryRecord[]>([]);

  const refreshDemoSubmissions = () => {
    try {
      const stored = localStorage.getItem('woodrock_demo_leads');
      if (stored) {
        setDemoSubmissions(JSON.parse(stored));
      } else {
        setDemoSubmissions([]);
      }
    } catch {
      setDemoSubmissions([]);
    }
  };

  useEffect(() => {
    refreshDemoSubmissions();
  }, []);

  const clearDemoSubmissions = () => {
    localStorage.removeItem('woodrock_demo_leads');
    setDemoSubmissions([]);
    setLastSubmission(null);
  };

  const openInquiry = (opts?: InquiryModalOptions) => {
    setOptions(opts || defaultOptions);
    setIsOpen(true);
  };

  const closeInquiry = () => {
    setIsOpen(false);
  };

  return (
    <InquiryContext.Provider
      value={{
        isOpen,
        options,
        openInquiry,
        closeInquiry,
        lastSubmission,
        setLastSubmission,
        demoSubmissions,
        refreshDemoSubmissions,
        clearDemoSubmissions,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export function useInquiry(): InquiryContextType {
  const ctx = useContext(InquiryContext);
  if (!ctx) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return ctx;
}
