
export interface User {
  email: string;
  avatarUrl: string;
}

export interface StatCardData {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface StreamDataPoint {
  month: string;
  minutes: number;
  revenue: number;
}

export interface AudioReportItem {
  id: number;
  title: string;
  timeStreamed: string;
  revenue: number;
  trend: number;
  published: string;
  parts?: Omit<AudioReportItem, 'parts' | 'id'>[];
}

export interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'Paid' | 'Pending' | 'Failed';
  notes: string;
}
