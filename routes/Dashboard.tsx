
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import type { User, StatCardData, StreamDataPoint, AudioReportItem, PaymentHistoryItem } from '../types';
import { MOCK_USER, MOCK_STATS, MOCK_STREAM_TRENDS, MOCK_AUDIO_REPORTS, MOCK_PAYMENT_HISTORY, CompanyLogo, ArrowDownIcon, DownloadIcon, ChevronDownIcon, ChevronUpIcon, SortIcon } from '../constants';
import { Card, Dropdown, SkeletonLoader } from '../components/ui';
import { useClickOutside } from '../hooks/useClickOutside';
import { SettingsModal } from './main/components/SettingsModal';

const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } = (window as any).Recharts;

// Header Component
const Header: React.FC<{ onLogout: () => void; user: User; }> = ({ onLogout, user }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const dropdownRef = useClickOutside<HTMLDivElement>(() => setDropdownOpen(false));

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 cursor-pointer">
                            <CompanyLogo />
                        </div>
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                                <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="User avatar" />
                                <span className="hidden md:inline text-sm font-medium text-brand-black">{user.email}</span>
                                <ArrowDownIcon className="h-4 w-4 text-gray-500" />
                            </button>
                            {isDropdownOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
                                    <a href="#" onClick={(e)=>{e.preventDefault(); setSettingsOpen(true); setDropdownOpen(false);}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Switch Publisher</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} user={user} />
        </>
    );
};


// Stat Card Component
const StatCard: React.FC<{ data: StatCardData }> = ({ data }) => {
    const isIncrease = data.changeType === 'increase';
    return (
        <Card className="flex-1">
            <h3 className="text-gray-500 text-sm font-medium">{data.title}</h3>
            <p className="text-3xl font-bold text-brand-black mt-2">{data.value}</p>
            <div className={`flex items-center mt-2 text-sm ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                {isIncrease ? '▲' : '▼'} {data.change}% vs last period
            </div>
        </Card>
    );
};

// Overview Block
const OverviewBlock: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState('This Month');
    const [year, setYear] = useState('2023');

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <div className="flex space-x-2">
                    <Dropdown options={['This Month', 'Last Month']} selected={month} onSelect={setMonth} />
                    <Dropdown options={['2023', '2022', '2021']} selected={year} onSelect={setYear} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                {loading ? (
                    <>
                        <SkeletonLoader className="h-36 flex-1" />
                        <SkeletonLoader className="h-36 flex-1" />
                        <SkeletonLoader className="h-36 flex-1" />
                    </>
                ) : (
                    MOCK_STATS.map(stat => <StatCard key={stat.title} data={stat} />)
                )}
            </div>
        </div>
    );
};

// Streaming Trends Block
const StreamingTrendsBlock: React.FC = () => {
    const [year, setYear] = useState('2023');
    return (
        <Card className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Streaming Trends</h2>
                <Dropdown options={['2023', '2022', '2021']} selected={year} onSelect={setYear} />
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart data={MOCK_STREAM_TRENDS} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgba(255, 81, 118, 0.8)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="rgba(255, 81, 118, 0.8)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgba(102, 51, 153, 0.8)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="rgba(102, 51, 153, 0.8)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ededed" />
                        <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <YAxis yAxisId="left" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Area yAxisId="left" type="monotone" dataKey="minutes" name="Minutes Streamed" stroke="rgb(255, 81, 118)" fillOpacity={1} fill="url(#colorMinutes)" />
                        <Area yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="rgb(102, 51, 153)" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

// Audio Streaming Report Block
const AudioStreamingReportBlock: React.FC = () => {
    const [month, setMonth] = useState('This Month');
    const [year, setYear] = useState('2023');
    const [sortConfig, setSortConfig] = useState<{ key: keyof AudioReportItem; direction: 'ascending' | 'descending' } | null>({ key: 'revenue', direction: 'descending' });
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const sortedData = useMemo(() => {
        let sortableItems = [...MOCK_AUDIO_REPORTS];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const requestSort = (key: keyof AudioReportItem) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const toggleRow = (id: number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const TrendArrow: React.FC<{ trend: number }> = ({ trend }) => (
        <span className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
        </span>
    );

    const headers: { key: keyof AudioReportItem, label: string }[] = [
        { key: 'title', label: 'Title' },
        { key: 'timeStreamed', label: 'Time Streamed' },
        { key: 'revenue', label: 'Revenue' },
        { key: 'trend', label: 'Trend' },
        { key: 'published', label: 'Published' },
    ];
    
    return (
        <Card className="mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div className="flex items-center space-x-2">
                    <Dropdown options={['This Month', 'Last Month']} selected={month} onSelect={setMonth} />
                    <Dropdown options={['2023', '2022']} selected={year} onSelect={setYear} />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                    <DownloadIcon />
                    <span>Download CSV</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-12"></th>
                            {headers.map(header => (
                                <th key={header.key} onClick={() => requestSort(header.key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">
                                        {header.label}
                                        <SortIcon className="ml-2" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.map(item => (
                            <React.Fragment key={item.id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {item.parts && (
                                            <button onClick={() => toggleRow(item.id)}>
                                                {expandedRows.has(item.id) ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-black">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.timeStreamed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.revenue.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><TrendArrow trend={item.trend} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.published}</td>
                                </tr>
                                {expandedRows.has(item.id) && item.parts?.map((part, index) => (
                                    <tr key={`${item.id}-${index}`} className="bg-gray-50 hover:bg-gray-100">
                                        <td className="px-6 py-4"></td>
                                        <td className="pl-12 pr-6 py-4 whitespace-nowrap text-sm text-gray-700">{part.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.timeStreamed}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${part.revenue.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><TrendArrow trend={part.trend} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.published}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

// Payment History Block
const PaymentHistoryBlock: React.FC = () => {
    const [month, setMonth] = useState('This Month');
    const [year, setYear] = useState('2023');

    const statusColor = (status: PaymentHistoryItem['status']) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
        }
    };

    return (
        <Card>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <h2 className="text-xl font-bold">Payment History</h2>
                <div className="flex items-center space-x-2">
                    <Dropdown options={['This Month', 'Last Month']} selected={month} onSelect={setMonth} />
                    <Dropdown options={['2023', '2022']} selected={year} onSelect={setYear} />
                    <Dropdown options={['Download CSV', 'Download XLS']} selected="Download" onSelect={() => {}} className="w-32" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_PAYMENT_HISTORY.map(payment => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-black">${payment.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(payment.status)}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};


// Main Dashboard Page
export const DashboardPage: React.FC<{ onLogout: () => void; }> = ({ onLogout }) => {
    return (
        <div>
            <Header onLogout={onLogout} user={MOCK_USER} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <OverviewBlock />
                <StreamingTrendsBlock />
                <AudioStreamingReportBlock />
                <PaymentHistoryBlock />
            </main>
        </div>
    );
};
