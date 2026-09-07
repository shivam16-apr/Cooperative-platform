import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import WorkersView from './components/WorkersView';
import CustomersView from './components/CustomersView';
import BookingsView from './components/BookingsView';
import PaymentsView from './components/PaymentsView';
import ComplaintsView from './components/ComplaintsView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import AIOperationsView from './components/AIOperationsView';
import WorkerWelfareView from './components/WorkerWelfareView';
import Toast from './components/Toast';

// Modals
import AddWorkerModal from './components/Modals/AddWorkerModal';
import AddCustomerModal from './components/Modals/AddCustomerModal';
import AddBookingModal from './components/Modals/AddBookingModal';
import ResolveComplaintModal from './components/Modals/ResolveComplaintModal';
import InvoiceModal from './components/Modals/InvoiceModal';
import CustomerDetailModal from './components/Modals/CustomerDetailModal';
import LogoutModal from './components/Modals/LogoutModal';
import ReloginOverlay from './components/Modals/ReloginOverlay';
import ReviewClaimModal from './components/Modals/ReviewClaimModal';
import WorkerWelfareModal from './components/Modals/WorkerWelfareModal';

// Initial Mock Data
import {
  initialWorkers,
  initialCustomers,
  initialBookings,
  initialPayments,
  initialComplaints,
  initialNotifications,
  initialWelfareOverview,
  initialInsurancePolicies,
  initialWelfareBenefits,
  initialClaims,
  initialAiDemandData
} from './data/mockData';

export default function App() {
  const navigate = useNavigate();

  // State
  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('sevapulse_workers');
    return saved ? JSON.parse(saved) : initialWorkers;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('sevapulse_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('sevapulse_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('sevapulse_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('sevapulse_complaints');
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sevapulse_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem('sevapulse_claims');
    return saved ? JSON.parse(saved) : initialClaims;
  });

  const [welfareOverview, setWelfareOverview] = useState(() => {
    const saved = localStorage.getItem('sevapulse_welfare_overview');
    return saved ? JSON.parse(saved) : initialWelfareOverview;
  });

  const [aiDemandData, setAiDemandData] = useState(() => {
    const saved = localStorage.getItem('sevapulse_ai_demand');
    return saved ? JSON.parse(saved) : initialAiDemandData;
  });

  const [adminName, setAdminName] = useState(() => {
    return localStorage.getItem('sevapulse_admin_name') || 'Rajeshwar Rao';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toasts, setToasts] = useState([]);

  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sevapulse_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sevapulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sevapulse_workers', JSON.stringify(workers));
  }, [workers]);
  useEffect(() => {
    localStorage.setItem('sevapulse_customers', JSON.stringify(customers));
  }, [customers]);
  useEffect(() => {
    localStorage.setItem('sevapulse_bookings', JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem('sevapulse_payments', JSON.stringify(payments));
  }, [payments]);
  useEffect(() => {
    localStorage.setItem('sevapulse_complaints', JSON.stringify(complaints));
  }, [complaints]);
  useEffect(() => {
    localStorage.setItem('sevapulse_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('sevapulse_claims', JSON.stringify(claims));
  }, [claims]);
  useEffect(() => {
    localStorage.setItem('sevapulse_welfare_overview', JSON.stringify(welfareOverview));
  }, [welfareOverview]);
  useEffect(() => {
    localStorage.setItem('sevapulse_ai_demand', JSON.stringify(aiDemandData));
  }, [aiDemandData]);
  useEffect(() => {
    localStorage.setItem('sevapulse_admin_name', adminName);
  }, [adminName]);

  // Toast helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals state
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedClaimForReview, setSelectedClaimForReview] = useState(null);
  const [selectedWorkerForWelfare, setSelectedWorkerForWelfare] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Welfare & Claims Actions
  const handleApproveClaim = (claimId, payoutAmount, notes) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          return {
            ...c,
            status: 'Approved',
            amountApproved: payoutAmount,
            adminNotes: notes
          };
        }
        return c;
      })
    );

    setWelfareOverview((prev) => ({
      ...prev,
      claims: {
        ...prev.claims,
        pending: Math.max(0, prev.claims.pending - 1),
        approved: prev.claims.approved + 1,
        totalDisbursedMonth: prev.claims.totalDisbursedMonth + payoutAmount
      }
    }));

    showToast(`Claim ${claimId} approved! ₹${payoutAmount.toLocaleString('en-IN')} disbursed via UPI Direct Benefit Transfer.`, 'success');
  };

  const handleRejectClaim = (claimId, reason) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          return {
            ...c,
            status: 'Rejected',
            rejectReason: reason
          };
        }
        return c;
      })
    );

    setWelfareOverview((prev) => ({
      ...prev,
      claims: {
        ...prev.claims,
        pending: Math.max(0, prev.claims.pending - 1),
        rejected: prev.claims.rejected + 1
      }
    }));

    showToast(`Claim ${claimId} marked as Rejected. Notice sent to worker.`, 'warning');
  };

  const handleToggleWelfareEnrollment = (workerId) => {
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === workerId) {
          const newEnrolled = !w.welfareEnrolled;
          showToast(`${w.name} ${newEnrolled ? 'enrolled into' : 'removed from'} Welfare Board registry`, 'info');
          return {
            ...w,
            welfareEnrolled: newEnrolled,
            benefitsActive: newEnrolled
          };
        }
        return w;
      })
    );
  };

  // AI Rebalance Action
  const handleApplyRebalance = (allocationId) => {
    setAiDemandData((prev) => {
      const updatedRecs = prev.recommendedReallocations.map((r) => {
        if (allocationId === 'ALL' || r.id === allocationId) {
          return { ...r, applied: true };
        }
        return r;
      });

      return {
        ...prev,
        recommendedReallocations: updatedRecs,
        metadata: {
          ...prev.metadata,
          netShortage: allocationId === 'ALL' ? -12 : Math.min(0, prev.metadata.netShortage + 10)
        }
      };
    });

    showToast(
      allocationId === 'ALL'
        ? 'All AI Rebalancing actions executed! Field workers alerted with transit bonuses.'
        : `AI Rebalancing recommendation ${allocationId} deployed!`,
      'success'
    );
  };

  // AI Surge Simulator
  const handleSimulateSurge = (scenario) => {
    if (scenario === 'Delhi 42°C Heatwave') {
      setAiDemandData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          totalForecastedDemand: 460,
          netShortage: -75
        },
        zones: prev.zones.map((z) =>
          z.id === 'ZN-DEL-SOUTH'
            ? { ...z, currentDemand: 105, gap: -57, surgeFactor: '1.8x', weatherAlert: 'Critical Heatwave 44°C • Severe AC breakdown spike' }
            : z
        )
      }));
      showToast('AI Simulation: Heatwave AC breakdown surge deployed!', 'warning');
    } else if (scenario === 'Monsoon Waterlogging') {
      setAiDemandData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          totalForecastedDemand: 430,
          netShortage: -55
        },
        zones: prev.zones.map((z) =>
          z.id === 'ZN-NOIDA-62'
            ? { ...z, currentDemand: 92, gap: -28, surgeFactor: '1.6x', weatherAlert: 'Monsoon Alert • Heavy drain clogging' }
            : z
        )
      }));
      showToast('AI Simulation: Monsoon plumbing emergency surge deployed!', 'info');
    } else {
      setAiDemandData(initialAiDemandData);
      showToast('AI Model reset to standard operational baseline.', 'info');
    }
  };

  // Worker Actions
  const handleAddWorker = (newWorker) => {
    setWorkers((prev) => [newWorker, ...prev]);
    showToast(`Technician ${newWorker.name} onboarded successfully!`, 'success');
  };

  const handleToggleWorkerStatus = (id) => {
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextStatus = w.status === 'Active' ? 'On Duty' : w.status === 'On Duty' ? 'Offline' : 'Active';
          showToast(`Updated status of ${w.name} to ${nextStatus}`, 'info');
          return { ...w, status: nextStatus };
        }
        return w;
      })
    );
  };

  const handleDeleteWorker = (id) => {
    const worker = workers.find((w) => w.id === id);
    if (!worker) return;
    if (confirm(`Remove technician ${worker.name} from active roster?`)) {
      setWorkers((prev) => prev.filter((w) => w.id !== id));
      showToast(`Removed technician ${worker.name}`, 'warning');
    }
  };

  const handleSendPraise = (id) => {
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const newTips = (w.tips || 0) + 100;
          showToast(`Shabaashi sent to ${w.name}! ₹100 tip credited 👏`, 'success');
          return { ...w, tips: newTips };
        }
        return w;
      })
    );
  };

  // Customer Actions
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
    showToast(`Customer ${newCustomer.name} registered successfully!`, 'success');
  };

  // Booking Actions
  const handleAddBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Also add to payments
    const newPayment = {
      id: `TXN-UPI-${Math.floor(910 + Math.random() * 80)}`,
      bookingId: newBooking.id,
      customerName: newBooking.customerName,
      service: newBooking.service,
      date: new Date().toISOString().slice(0, 10),
      amount: newBooking.amount,
      method: 'UPI (PhonePe)',
      status: 'Paid'
    };
    setPayments((prev) => [newPayment, ...prev]);

    showToast(`Booking ${newBooking.id} confirmed & assigned to ${newBooking.workerName}!`, 'success');
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    showToast(`Booking ${id} status changed to ${newStatus}`, 'info');
  };

  // Complaint Actions
  const handleResolveComplaint = (ticketId, compensation, notes) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === ticketId
          ? { ...c, status: 'Resolved', resolutionNotes: notes, compensation }
          : c
      )
    );
    showToast(`Complaint ${ticketId} resolved with care & apology voucher sent!`, 'success');
  };

  // Notifications
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  // Motivation banner
  const handleSendTeamMotivation = () => {
    showToast('Sent broadcast to all 24 technicians: "Bahut badhiya kaam team! Bharat loves your service 🙏"', 'success');
  };

  const handleSendMithaiBonus = (name) => {
    showToast(`₹200 Mithai Bonus & appreciation badge credited to ${name}! 🍬`, 'success');
  };

  // CSV Export
  const handleExportCSV = (type) => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let filename = '';

    if (type === 'payment') {
      csvContent += 'Transaction ID,Booking ID,Customer,Service,Date,Amount (INR),Method,Status\n';
      payments.forEach((p) => {
        csvContent += `"${p.id}","${p.bookingId}","${p.customerName}","${p.service}","${p.date}",${p.amount},"${p.method}","${p.status}"\n`;
      });
      filename = `SevaPulse_Payments_${new Date().toISOString().slice(0, 10)}.csv`;
    } else {
      csvContent += 'Metric,Value\n';
      csvContent += `"Total Indian Workers",${workers.length}\n`;
      csvContent += `"Total Customers",${customers.length}\n`;
      csvContent += `"Active Bookings",${bookings.length}\n`;
      csvContent += `"Open Complaints",${complaints.filter((c) => c.status !== 'Resolved').length}\n`;
      filename = `SevaPulse_Overview_${new Date().toISOString().slice(0, 10)}.csv`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filename} successfully!`, 'success');
  };

  // Counts for sidebar badges
  const sidebarCounts = {
    workers: workers.length,
    customers: customers.length,
    pendingBookings: bookings.filter((b) => b.status === 'Pending' || b.status === 'Confirmed').length,
    openComplaints: complaints.filter((c) => c.status !== 'Resolved').length,
    pendingClaims: claims.filter((c) => c.status === 'Pending').length,
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] dark:bg-charcoal-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Toast Alert Engine */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Main App Container */}
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          counts={sidebarCounts}
          adminName={adminName}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
        />

        {/* Content Wrapper */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {/* Header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            theme={theme}
            toggleTheme={toggleTheme}
            notifications={notifications}
            markAllNotificationsRead={handleMarkAllNotificationsRead}
            onNewBookingClick={() => setIsAddBookingOpen(true)}
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
          />

          {/* Main View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              {/* Home & Overview */}
              <Route
                path="/"
                element={
                  <OverviewView
                    workers={workers}
                    bookings={bookings}
                    complaints={complaints}
                    payments={payments}
                    claims={claims}
                    welfareOverview={welfareOverview}
                    aiDemandData={aiDemandData}
                    theme={theme}
                    onSendTeamMotivation={handleSendTeamMotivation}
                    onSendMithaiBonus={handleSendMithaiBonus}
                    onExportCSV={handleExportCSV}
                  />
                }
              />
              <Route path="/overview" element={<Navigate to="/" replace />} />

              {/* Workers */}
              <Route
                path="/workers"
                element={
                  <WorkersView
                    workers={workers}
                    onAddWorkerClick={() => setIsAddWorkerOpen(true)}
                    onToggleStatus={handleToggleWorkerStatus}
                    onDeleteWorker={handleDeleteWorker}
                    onSendPraise={handleSendPraise}
                    onViewWorkerWelfare={(w) => setSelectedWorkerForWelfare(w)}
                    globalSearch={globalSearch}
                  />
                }
              />

              {/* Customers */}
              <Route
                path="/customers"
                element={
                  <CustomersView
                    customers={customers}
                    onAddCustomerClick={() => setIsAddCustomerOpen(true)}
                    onViewCustomer={(c) => setSelectedCustomer(c)}
                    globalSearch={globalSearch}
                  />
                }
              />
              <Route path="/customer" element={<Navigate to="/customers" replace />} />

              {/* Bookings */}
              <Route
                path="/bookings"
                element={
                  <BookingsView
                    bookings={bookings}
                    onAddBookingClick={() => setIsAddBookingOpen(true)}
                    onUpdateStatus={handleUpdateBookingStatus}
                    globalSearch={globalSearch}
                  />
                }
              />
              <Route path="/booking" element={<Navigate to="/bookings" replace />} />

              {/* Payments */}
              <Route
                path="/payments"
                element={
                  <PaymentsView
                    payments={payments}
                    onShowReceipt={(p) => setSelectedPayment(p)}
                    onExportCSV={handleExportCSV}
                    globalSearch={globalSearch}
                  />
                }
              />
              <Route path="/payment" element={<Navigate to="/payments" replace />} />

              {/* Complaints */}
              <Route
                path="/complaints"
                element={
                  <ComplaintsView
                    complaints={complaints}
                    onResolveTicket={(c) => setSelectedComplaint(c)}
                    globalSearch={globalSearch}
                  />
                }
              />
              <Route path="/complaint" element={<Navigate to="/complaints" replace />} />

              {/* 🤖 AI & Operations Routes */}
              <Route
                path="/operations"
                element={
                  <AIOperationsView
                    demandData={aiDemandData}
                    onApplyRebalance={handleApplyRebalance}
                    onSimulateSurge={handleSimulateSurge}
                    theme={theme}
                    initialTab="demand-forecast"
                  />
                }
              />
              <Route
                path="/operations/demand-forecast"
                element={
                  <AIOperationsView
                    demandData={aiDemandData}
                    onApplyRebalance={handleApplyRebalance}
                    onSimulateSurge={handleSimulateSurge}
                    theme={theme}
                    initialTab="demand-forecast"
                  />
                }
              />
              <Route
                path="/operations/workforce-allocation"
                element={
                  <AIOperationsView
                    demandData={aiDemandData}
                    onApplyRebalance={handleApplyRebalance}
                    onSimulateSurge={handleSimulateSurge}
                    theme={theme}
                    initialTab="workforce-allocation"
                  />
                }
              />

              {/* 🛡️ Worker Welfare Routes */}
              <Route
                path="/welfare"
                element={
                  <WorkerWelfareView
                    workers={workers}
                    claims={claims}
                    welfareOverview={welfareOverview}
                    insurancePolicies={initialInsurancePolicies}
                    welfareBenefits={initialWelfareBenefits}
                    onReviewClaim={(c) => setSelectedClaimForReview(c)}
                    onViewWorkerWelfare={(w) => setSelectedWorkerForWelfare(w)}
                    onToggleEnrollment={handleToggleWelfareEnrollment}
                    globalSearch={globalSearch}
                    initialTab="insurance"
                  />
                }
              />
              <Route
                path="/welfare/insurance"
                element={
                  <WorkerWelfareView
                    workers={workers}
                    claims={claims}
                    welfareOverview={welfareOverview}
                    insurancePolicies={initialInsurancePolicies}
                    welfareBenefits={initialWelfareBenefits}
                    onReviewClaim={(c) => setSelectedClaimForReview(c)}
                    onViewWorkerWelfare={(w) => setSelectedWorkerForWelfare(w)}
                    onToggleEnrollment={handleToggleWelfareEnrollment}
                    globalSearch={globalSearch}
                    initialTab="insurance"
                  />
                }
              />
              <Route
                path="/welfare/benefits"
                element={
                  <WorkerWelfareView
                    workers={workers}
                    claims={claims}
                    welfareOverview={welfareOverview}
                    insurancePolicies={initialInsurancePolicies}
                    welfareBenefits={initialWelfareBenefits}
                    onReviewClaim={(c) => setSelectedClaimForReview(c)}
                    onViewWorkerWelfare={(w) => setSelectedWorkerForWelfare(w)}
                    onToggleEnrollment={handleToggleWelfareEnrollment}
                    globalSearch={globalSearch}
                    initialTab="benefits"
                  />
                }
              />
              <Route
                path="/welfare/claims"
                element={
                  <WorkerWelfareView
                    workers={workers}
                    claims={claims}
                    welfareOverview={welfareOverview}
                    insurancePolicies={initialInsurancePolicies}
                    welfareBenefits={initialWelfareBenefits}
                    onReviewClaim={(c) => setSelectedClaimForReview(c)}
                    onViewWorkerWelfare={(w) => setSelectedWorkerForWelfare(w)}
                    onToggleEnrollment={handleToggleWelfareEnrollment}
                    globalSearch={globalSearch}
                    initialTab="claims"
                  />
                }
              />

              {/* Reports */}
              <Route
                path="/reports"
                element={
                  <ReportsView
                    theme={theme}
                    onExportCSV={handleExportCSV}
                  />
                }
              />

              {/* Settings */}
              <Route
                path="/settings"
                element={
                  <SettingsView
                    adminName={adminName}
                    setAdminName={setAdminName}
                    theme={theme}
                    setTheme={setTheme}
                    onSaveSettings={(newName) => {
                      setAdminName(newName);
                      showToast('Settings saved successfully in Indian region preferences!', 'success');
                    }}
                    onRevokeSessions={() => {
                      showToast('All other sessions revoked successfully!', 'warning');
                    }}
                  />
                }
              />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Modals & Overlays */}
      <AddWorkerModal
        isOpen={isAddWorkerOpen}
        onClose={() => setIsAddWorkerOpen(false)}
        onAdd={handleAddWorker}
      />

      <AddCustomerModal
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
        onAdd={handleAddCustomer}
      />

      <AddBookingModal
        isOpen={isAddBookingOpen}
        onClose={() => setIsAddBookingOpen(false)}
        onAdd={handleAddBooking}
        workers={workers}
        customers={customers}
      />

      <ResolveComplaintModal
        isOpen={!!selectedComplaint}
        ticket={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onResolve={handleResolveComplaint}
      />

      <InvoiceModal
        isOpen={!!selectedPayment}
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />

      <CustomerDetailModal
        isOpen={!!selectedCustomer}
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />

      <ReviewClaimModal
        isOpen={!!selectedClaimForReview}
        claim={selectedClaimForReview}
        onClose={() => setSelectedClaimForReview(null)}
        onApprove={handleApproveClaim}
        onReject={handleRejectClaim}
      />

      <WorkerWelfareModal
        isOpen={!!selectedWorkerForWelfare}
        worker={selectedWorkerForWelfare}
        onClose={() => setSelectedWorkerForWelfare(null)}
        onToggleWelfareEnrollment={handleToggleWelfareEnrollment}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          setIsLocked(true);
          showToast('Signed out of SevaPulse Admin session.', 'info');
        }}
      />

      <ReloginOverlay
        isOpen={isLocked}
        adminName={adminName}
        onRelogin={() => {
          setIsLocked(false);
          navigate('/');
          showToast('Namaste! Welcome back to SevaPulse Admin Dashboard 🙏', 'success');
        }}
      />
    </div>
  );
}
