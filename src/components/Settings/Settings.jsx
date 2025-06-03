import React, { useState, useEffect } from "react";
import {
  IconCurrencyDollar,
  IconChartBar,
  IconZoomCancel,
  IconInfoCircle,
} from "@tabler/icons-react";
import Navbar from "../Navbar/Navbar";
import { logPageView } from "../../utils/analytics";
import { getPlan, getUsage } from "../../api/settings";
import { Loader } from "@mantine/core";
import { PLANS_PRICING_ROUTE } from "../../utils/contants";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [activePlan, setActivePlan] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [activeTab, setActiveTab] = useState("billing"); // 'billing' or 'usage'
  const [usage, setUsage] = useState([]);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    logPageView();
  }, []);

  const fetchActivePlan = async () => {
    try {
      setLoadingPlan(true);
      const plan = await getPlan();
      setActivePlan(plan.data.data);
      setLoadingPlan(false);
    } catch (error) {
      console.error("Error fetching active plan:", error);
    } finally {
      setLoadingPlan(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      setLoadingUsage(true);
      const invoices = await getUsage();
      setUsage(invoices.data);
    } catch (error) {
      console.error("Error fetching usage:", error);
    } finally {
      setLoadingUsage(false);
    }
  };

  useEffect(() => {
    fetchActivePlan();
    fetchInvoices();
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
                    <h4 className="text-sm text-textDimmedColor mb-1">
                      Current Active Plan
                    </h4>
                    {loadingPlan ? (
                      <div className="space-y-2 mt-2">
                        <Loader
                          type="dots"
                          color="var(--pagination-tabs-bg-active-color)"
                        />
                      </div>
                    ) : activePlan ? (
                      <>
                        <p className="text-3xl font-semibold text-textDefault">
                          {activePlan.plan_name}
                        </p>
                        <p className="text-textDimmedColor mt-1">
                          ${activePlan.amount}/{activePlan.billing_cycle}
                        </p>
                      </>
                    ) : (
                      <p className="text-textDefault">
                        Could not load plan details.
                      </p>
                    )}
                  </div>
                  <div className="bg-bgBodyColor p-3 rounded-lg text-sm max-w-sm flex items-start space-x-3 border border-borderDefault">
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
                      <button
                        className="bg-textPurple hover:bg-textLightPurple text-textDefault font-semibold py-2 px-4 rounded-md text-sm w-full transition-colors duration-150"
                        onClick={() => {
                          navigate(PLANS_PRICING_ROUTE);
                        }}
                      >
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
                          <Loader
                            type="dots"
                            color="var(--pagination-tabs-bg-active-color)"
                            className="mx-auto w-full"
                          />
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
                            {invoice.created_at}
                          </td>
                          <td className="py-4 px-3 text-textDimmedColor">
                            {invoice.amount}
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                invoice.status === "active"
                                  ? "bg-green-500/20 text-green-400"
                                  : invoice.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-textDimmedColor">
                            {invoice.reset_period}
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
              <div className="bg-bgCardColor p-8 rounded-xl shadow-lg border border-borderDefault text-center">
                {loadingUsage ? (
                  <Loader
                    type="dots"
                    color="var(--pagination-tabs-bg-active-color)"
                    className="mx-auto w-full"
                  />
                ) : usage && usage.length > 0 ? (
                  usage.map((item, index) => {
                    const percentage =
                      item.request_limit > 0
                        ? (item.current_value / item.request_limit) * 100
                        : 0;

                    return (
                      <div
                        key={index} // Assuming items don't have a unique ID, using index. Prefer item.id if available.
                        className="bg-bgCardColor p-6 rounded-xl shadow-lg border border-borderDefault"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-lg font-semibold text-textDefault">
                            {item.name || "Usage Metric"}
                          </p>
                          <p className="text-sm text-textDimmedColor">
                            {percentage.toFixed(0)}%
                          </p>
                        </div>
                        <p className="text-sm text-textDimmedColor mb-1 flex">
                          {item.current_value} / {item.request_limit} used
                        </p>
                        <p className="text-xs text-textDimmedColor mb-3 flex">
                          {item.description ||
                            "Description of this usage metric."}
                        </p>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-textPurple h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-bgCardColor p-8 rounded-xl shadow-lg border border-borderDefault text-center">
                    <IconZoomCancel
                      size={72}
                      className="mx-auto text-textPurple opacity-70 mb-3"
                      strokeWidth={1.5}
                    />
                    <p className="text-xl font-semibold text-textDimmedColor">
                      No Usage Data Found
                    </p>
                    <p className="text-sm text-textDimmedColor mt-1">
                      There is no usage data to display at this time.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default Settings;
