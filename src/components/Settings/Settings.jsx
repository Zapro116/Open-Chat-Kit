import React, { useState, useEffect } from "react";
import {
  IconCurrencyDollar,
  IconChartBar,
  IconZoomCancel,
  IconInfoCircle,
} from "@tabler/icons-react";
import Navbar from "../Navbar/Navbar";

// Mock API call functions
const fetchActivePlan = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        planName: "Basic Plan",
        price: "$0/monthly",
        usage: "limited",
      });
    }, 1000);
  });
};

const fetchInvoices = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate having one invoice for demonstration if needed, or keep empty
      resolve([
        // {
        //   id: '1',
        //   date: 'Oct 12, 2023',
        //   amount: '$50.00',
        //   status: 'Paid',
        //   renewalDate: 'Nov 12, 2023',
        // },
      ]);
    }, 1500);
  });
};

function Settings() {
  const [activePlan, setActivePlan] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [activeTab, setActiveTab] = useState("billing"); // 'billing' or 'usage'

  useEffect(() => {
    setLoadingPlan(true);
    fetchActivePlan().then((data) => {
      setActivePlan(data);
      setLoadingPlan(false);
    });

    setLoadingInvoices(true);
    fetchInvoices().then((data) => {
      setInvoices(data);
      setLoadingInvoices(false);
    });
  }, []);

  return (
    <div className="flex h-screen bg-bgCardColor">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto mt-[72px]">
        <header className="mb-10">
          <h1 className="text-xs text-slate-500 uppercase tracking-wider">
            Home / Settings
          </h1>
          <h2 className="text-4xl font-bold text-textDefault mt-1">Settings</h2>
        </header>

        <div className="flex gap-3 w-full">
          <aside className="w-72 bg-bgCardColor h-fit border border-borderDefault rounded p-6 flex flex-col">
            <nav className="space-y-3 flex-grow">
              <button
                onClick={() => setActiveTab("billing")}
                className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeTab === "billing"
                    ? "bg-bgSelectedColor text-textDefault shadow-md"
                    : "text-textDefault hover:bg-bgSelectedColor/60 hover:text-textDefault"
                }`}
              >
                <IconCurrencyDollar size={22} />
                <span>Billing</span>
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeTab === "usage"
                    ? "bg-bgSelectedColor text-textDefault shadow-md"
                    : "text-textDefault hover:bg-bgSelectedColor/60 hover:text-textDefault"
                }`}
              >
                <IconChartBar size={22} />
                <span>Usage</span>
              </button>
            </nav>
          </aside>

          {activeTab === "billing" && (
            <section className="space-y-8 flex-1">
              <h3 className="text-xs font-semibold text-textDefault uppercase tracking-wider mb-2">
                ORGANIZATION / BILLING
              </h3>

              {/* Current Active Plan */}
              <div className="bg-bgCardColor p-6 rounded-xl shadow-lg border border-borderDefault !mt-4">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-grow">
                    <h4 className="text-sm text-textDefault mb-1">
                      Current Active Plan
                    </h4>
                    {loadingPlan ? (
                      <div className="space-y-2 mt-2">
                        <div className="h-8 bg-bgCardColor rounded w-3/4 animate-pulse"></div>
                        <div className="h-6 bg-bgCardColor rounded w-1/2 animate-pulse"></div>
                      </div>
                    ) : activePlan ? (
                      <>
                        <p className="text-3xl font-semibold text-textDefault">
                          {activePlan.planName}
                        </p>
                        <p className="text-textDefault mt-1">
                          {activePlan.price}
                        </p>
                      </>
                    ) : (
                      <p className="text-textDefault">
                        Could not load plan details.
                      </p>
                    )}
                  </div>
                  <div className="bg-bgCardColor/80 p-5 rounded-lg text-sm max-w-sm flex items-start space-x-3 border border-borderDefault">
                    <IconInfoCircle
                      size={24}
                      className="text-textDefault flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-textDefault mb-1.5">
                        Your Current Plan has limited usage!
                      </p>
                      <p className="text-xs text-textDimmedColor mb-4">
                        Performance might reduce when your plan exceeds its
                        quota. To work seamlessly, upgrade to an enterprise
                        plan.
                      </p>
                      <button className="bg-textPurple hover:bg-textLightPurple text-white font-semibold py-2 px-4 rounded-md text-sm w-full transition-colors duration-150">
                        Upgrade Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice History */}
              <div className="bg-bgCardColor p-6 rounded-xl shadow-lg border border-borderDefault">
                <h4 className="text-xl font-semibold text-textDefault mb-1.5">
                  Invoice History
                </h4>
                <p className="text-sm text-textDimmedColor mb-6">
                  As an org owner, you can view and download the previous
                  invoices
                </p>

                <table className="w-full text-sm">
                  <thead className="border-b border-borderDefault">
                    <tr className="text-left text-textDimmedColor">
                      <th className="py-3 px-3 font-medium">Invoice Date</th>
                      <th className="py-3 px-3 font-medium">Amount</th>
                      <th className="py-3 px-3 font-medium">Status</th>
                      <th className="py-3 px-3 font-medium">Renewal Date</th>
                      <th className="py-3 px-3 font-medium text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingInvoices ? (
                      <tr>
                        <td colSpan={5} className="text-center py-16">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-textPurple mx-auto"></div>
                          <p className="mt-3 text-textDimmedColor">
                            Loading invoices...
                          </p>
                        </td>
                      </tr>
                    ) : invoices.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-16">
                          <IconZoomCancel
                            size={72}
                            className="mx-auto text-textPurple opacity-70 mb-3"
                            strokeWidth={1.5}
                          />
                          <p className="text-xl font-semibold text-textDimmedColor">
                            No Data Found
                          </p>
                          <p className="text-sm text-textDimmedColor mt-1">
                            There are no invoices to display at this time.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      invoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b border-borderDefault/50 hover:bg-bgSelectedColor/30 transition-colors duration-100"
                        >
                          <td className="py-4 px-3 text-textDimmedColor">
                            {invoice.date}
                          </td>
                          <td className="py-4 px-3 text-textDimmedColor">
                            {invoice.amount}
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                invoice.status === "Paid"
                                  ? "bg-green-500/20 text-green-400"
                                  : invoice.status === "Pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-textDimmedColor">
                            {invoice.renewalDate}
                          </td>
                          <td className="py-4 px-3 text-right">
                            <button className="text-textPurple hover:text-textLightPurple font-medium hover:underline">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "usage" && (
            <section className="space-y-8 flex-1">
              <h3 className="text-xs font-semibold text-textDefault uppercase tracking-wider mb-5">
                ORGANIZATION / USAGE
              </h3>
              <div className="bg-bgCardColor p-8 rounded-xl shadow-lg border border-borderDefault">
                <p className="text-xl text-textDefault">Usage Information</p>
                <p className="text-textDefault mt-2">
                  Details about your organization's usage will be displayed
                  here.
                </p>
                {/* Placeholder for usage charts/data */}
                <div className="mt-6 border border-dashed border-borderDefault rounded-lg p-10 text-center">
                  <p className="text-textDefault">
                    Usage data visualization coming soon.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default Settings;
