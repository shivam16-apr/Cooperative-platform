import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import AvailableJobs from './components/AvailableJobs';
import ActiveJobs from './components/ActiveJobs';
import CompletedJobs from './components/CompletedJobs';
import EarningsSection from './components/EarningsSection';
import VerificationSection from './components/VerificationSection';
import RatingsReviews from './components/RatingsReviews';
import WelfareSection from './components/WelfareSection';
import SettingsSection from './components/SettingsSection';
import NotificationsModal from './components/NotificationsModal';

import { 
  DEMO_WORKERS, 
  INITIAL_AVAILABLE_JOBS, 
  INITIAL_ACTIVE_JOBS, 
  INITIAL_COMPLETED_JOBS, 
  NOTIFICATIONS_LIST 
} from './data/mockData';

export default function App() {
  // Worker Auth State (Checks localStorage, defaults to null to display Login Page)
  const [worker, setWorker] = useState(() => {
    try {
      const saved = localStorage.getItem('fixmate_worker');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data States
  const [availableJobs, setAvailableJobs] = useState(() => {
  const saved = localStorage.getItem('fixmate_available_jobs');
  return saved ? JSON.parse(saved) : INITIAL_AVAILABLE_JOBS;
});
  const [activeJobs, setActiveJobs] = useState(() => {
  const saved = localStorage.getItem('fixmate_active_jobs');
  return saved ? JSON.parse(saved) : INITIAL_ACTIVE_JOBS;
});
  const [completedJobs, setCompletedJobs] = useState(() => {
  const saved = localStorage.getItem('fixmate_completed_jobs');
  return saved ? JSON.parse(saved) : INITIAL_COMPLETED_JOBS;
});
  const [notifications, setNotifications] = useState(NOTIFICATIONS_LIST);
  useEffect(() => {
  localStorage.setItem('fixmate_active_jobs', JSON.stringify(activeJobs));
}, [activeJobs]);

useEffect(() => {
  localStorage.setItem('fixmate_completed_jobs', JSON.stringify(completedJobs));
}, [completedJobs]);

useEffect(() => {
  localStorage.setItem('fixmate_available_jobs', JSON.stringify(availableJobs));
}, [availableJobs]);

  // UI Modals & Theme
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Handle Dark Class on html root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handlers
  const handleLogin = (workerData) => {
    setWorker(workerData);
    try {
      localStorage.setItem('fixmate_worker', JSON.stringify(workerData));
    } catch (e) {
      console.error(e);
    }
    setActiveTab('overview');
    showToast(`Welcome back, ${workerData.name}! Branch: ${workerData.expertiseTitle}`);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('fixmate_worker');
    } catch (e) {
      console.error(e);
    }
    setWorker(null);
  };

  // Toggle Online/Offline Status
  const handleToggleOnlineStatus = () => {
    if (!worker) return;
    const updatedOnlineState = !worker.isOnline;
    const updatedWorker = {
      ...worker,
      isOnline: updatedOnlineState
    };
    setWorker(updatedWorker);
    try {
      localStorage.setItem('fixmate_worker', JSON.stringify(updatedWorker));
    } catch (e) {}

    if (updatedOnlineState) {
      showToast('⚡ You are now ONLINE & receiving job dispatches!');
    } else {
      showToast('💤 You are now OFFLINE. Job requests paused.');
    }
  };

  // Accept Available Job -> Move to Active Jobs
  const handleAcceptJob = (job) => {
    if (!worker?.isOnline) {
      showToast('⚠️ You are currently OFFLINE! Turn your status ONLINE in the top header to accept jobs.');
      return;
    }
    setAvailableJobs(prev => prev.filter(j => j.id !== job.id));
    const newActiveJob = {
      ...job,
      status: 'In Progress',
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stepsCompleted: 1,
      totalSteps: 3
    };
    setActiveJobs(prev => [newActiveJob, ...prev]);
    setActiveTab('active');
    showToast(`Accepted "${job.title}". Job is now active in your queue.`);
  };

  // Reject Available Job -> Remove from queue with feedback
  const handleRejectJob = (jobId) => {
    setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
    showToast(`Job #${jobId} declined and dismissed.`);
  };

  // Complete Active Job -> Move to Completed Jobs & Add Payout to Earnings
  const handleCompleteJob = (completedJobData) => {
    setActiveJobs(prev => prev.filter(j => j.id !== completedJobData.id));
    
    const finishedJobRecord = {
      ...completedJobData,
      date: 'Just now',
      paymentStatus: 'Paid (Wallet)',
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setCompletedJobs(prev => [finishedJobRecord, ...prev]);

    // Update Worker Earnings & Wallet
    setWorker(prev => {
      const updated = {
        ...prev,
        totalEarnings: prev.totalEarnings + completedJobData.payout,
        walletBalance: prev.walletBalance + completedJobData.payout,
        completedJobsCount: prev.completedJobsCount + 1
      };
      try {
        localStorage.setItem('fixmate_worker', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setActiveTab('completed');
    showToast(`Job Completed! +₹${completedJobData.payout} added to wallet balance.`);
  };

  // Withdraw Money from Wallet
  const handleWithdraw = (amount) => {
    setWorker(prev => {
      const updated = {
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - amount)
      };
      try {
        localStorage.setItem('fixmate_worker', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast(`Successfully transferred ₹${amount.toLocaleString('en-IN')} to linked bank account!`);
  };

  // Update Worker Profile
  const handleUpdateWorker = (updatedWorker) => {
    setWorker(updatedWorker);
    try {
      localStorage.setItem('fixmate_worker', JSON.stringify(updatedWorker));
    } catch (e) {}
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // If user is not logged in, show LoginPage
  if (!worker) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* Top Navbar */}
      <Header
        worker={worker}
        onToggleOnlineStatus={handleToggleOnlineStatus}
        unreadNotificationCount={unreadNotificationsCount}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogout={handleLogout}
      />

      {/* Main Body with Sidebar + Tab Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeJobsCount={activeJobs.length}
          availableJobsCount={availableJobs.length}
          onLogout={handleLogout}
          worker={worker}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-x-hidden">
          
          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="mb-4 p-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg animate-in slide-in-from-top-2 duration-150 flex items-center justify-between">
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-white font-bold px-2">✕</button>
            </div>
          )}

          {/* Active Tab Router */}
          {activeTab === 'overview' && (
            <DashboardOverview
              worker={worker}
              availableJobs={availableJobs}
              activeJobs={activeJobs}
              completedJobs={completedJobs}
              setActiveTab={setActiveTab}
              onAcceptJob={handleAcceptJob}
              onRejectJob={handleRejectJob}
            />
          )}

          {activeTab === 'available' && (
            <AvailableJobs
              worker={worker}
              availableJobs={availableJobs}
              onAcceptJob={handleAcceptJob}
              onRejectJob={handleRejectJob}
            />
          )}

          {activeTab === 'active' && (
            <ActiveJobs
              activeJobs={activeJobs}
              onCompleteJob={handleCompleteJob}
            />
          )}

          {activeTab === 'completed' && (
            <CompletedJobs
              completedJobs={completedJobs}
              worker={worker}
            />
          )}

          {activeTab === 'earnings' && (
            <EarningsSection
              worker={worker}
              onWithdraw={handleWithdraw}
            />
          )}

          {activeTab === 'verification' && (
            <VerificationSection
              worker={worker}
            />
          )}

          {activeTab === 'ratings' && (
            <RatingsReviews
              worker={worker}
            />
          )}

          {activeTab === 'welfare' && (
            <WelfareSection
              worker={worker}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsSection
              worker={worker}
              onUpdateWorker={handleUpdateWorker}
              onLogout={handleLogout}
            />
          )}

        </main>
      </div>

      {/* Modals */}
      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotificationsModal(false)}
          onMarkAllRead={handleMarkAllNotificationsRead}
        />
      )}

    </div>
  );
}
