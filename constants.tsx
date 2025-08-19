
import React from 'react';
import type { StatCardData, StreamDataPoint, AudioReportItem, PaymentHistoryItem } from './types';

export const MOCK_USER = {
  email: 'front@owlab.com',
  avatarUrl: 'https://picsum.photos/100/100'
};

export const MOCK_STATS: StatCardData[] = [
  { title: 'Total Minutes Streamed', value: '1,234,567', change: 12.5, changeType: 'increase' },
  { title: 'Active Titles', value: '8,921', change: 2.1, changeType: 'decrease' },
  { title: 'Total Revenue', value: '$98,765', change: 25.8, changeType: 'increase' },
];

export const MOCK_STREAM_TRENDS: StreamDataPoint[] = [
  { month: 'Jan', minutes: 4000, revenue: 2400 },
  { month: 'Feb', minutes: 3000, revenue: 1398 },
  { month: 'Mar', minutes: 2000, revenue: 9800 },
  { month: 'Apr', minutes: 2780, revenue: 3908 },
  { month: 'May', minutes: 1890, revenue: 4800 },
  { month: 'Jun', minutes: 2390, revenue: 3800 },
  { month: 'Jul', minutes: 3490, revenue: 4300 },
  { month: 'Aug', minutes: 3200, revenue: 4100 },
  { month: 'Sep', minutes: 2900, revenue: 3500 },
  { month: 'Oct', minutes: 3800, revenue: 4500 },
  { month: 'Nov', minutes: 3600, revenue: 4200 },
  { month: 'Dec', minutes: 4100, revenue: 5100 },
];

export const MOCK_AUDIO_REPORTS: AudioReportItem[] = [
  { id: 1, title: 'Epic Adventure Soundtrack', timeStreamed: '120,456 min', revenue: 1204.56, trend: 15, published: '2023-01-15',
    parts: [
      { title: 'Part 1: The Call', timeStreamed: '60,123 min', revenue: 601.23, trend: 10, published: '2023-01-15'},
      { title: 'Part 2: The Journey', timeStreamed: '60,333 min', revenue: 603.33, trend: 20, published: '2023-01-15'},
    ]
  },
  { id: 2, title: 'Lo-Fi Chill Beats', timeStreamed: '98,765 min', revenue: 987.65, trend: -5, published: '2023-02-20' },
  { id: 3, title: 'Morning Coffee Acoustics', timeStreamed: '76,543 min', revenue: 765.43, trend: 8, published: '2022-11-10',
    parts: [
      { title: 'Sunrise', timeStreamed: '40,000 min', revenue: 400.00, trend: 5, published: '2022-11-10'},
      { title: 'First Sip', timeStreamed: '36,543 min', revenue: 365.43, trend: 12, published: '2022-11-10'},
    ]
  },
  { id: 4, title: 'Workout Pumper', timeStreamed: '210,987 min', revenue: 2109.87, trend: 22, published: '2023-03-01' },
];

export const MOCK_PAYMENT_HISTORY: PaymentHistoryItem[] = [
  { id: 'pay_1', date: '2023-03-01', amount: 1250.75, method: 'Bank Transfer', status: 'Paid', notes: 'Feb 2023 Earnings' },
  { id: 'pay_2', date: '2023-02-01', amount: 1100.50, method: 'PayPal', status: 'Paid', notes: 'Jan 2023 Earnings' },
  { id: 'pay_3', date: '2023-01-01', amount: 980.00, method: 'Bank Transfer', status: 'Pending', notes: 'Dec 2022 Earnings' },
  { id: 'pay_4', date: '2022-12-01', amount: 1500.25, method: 'Bank Transfer', status: 'Failed', notes: 'Nov 2022 Earnings' },
];

// SVG Icons
export const CompanyLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-brand-red rounded-full"></div>
    <span className="font-bold text-xl text-brand-black">AudioDash</span>
  </div>
);

export const ArrowDownIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

export const ChevronDownIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export const ChevronUpIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const SortIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path></svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);
