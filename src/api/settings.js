import { wayneAxios } from "../utils/axios";

export const getPlan = async () => {
  const response = await wayneAxios().get("v1.0/payments/subscriptions");
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  // const response = {
  //   data: {
  //     identifier: "46d006ac-2e6a-4e3e-8276-4d10ebe0db60",
  //     success: true,
  //     message: null,
  //     errors: null,
  //     data: {
  //       amount: "0",
  //       billing_cycle: "month",
  //       plan_name: "Basic Plan",
  //       plan_description: "Free Plan",
  //     },
  //   },
  // };
  return response;
};

export const getUsage = async () => {
  const response = await wayneAxios().get("v1.0/statistics/usage");
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  // return {
  //   data: [
  //     {
  //       id: "1f003e30-5494-6476-b9eb-edfa18109167",
  //       name: "not-allowed-endpoints",
  //       description: "Limits the free plan users for endpoints",
  //       enabled: true,
  //       current_value: 0,
  //       request_limit: null,
  //       usage_percentage: 0,
  //       reset_period: null,
  //     },
  //     {
  //       id: "1f003e87-5b4c-6cb2-83cf-a5479adbe775",
  //       name: "free plan allowed models",
  //       description: "LLM Models allowed for free plans",
  //       enabled: false,
  //       current_value: 0,
  //       request_limit: 20,
  //       usage_percentage: 0,
  //       reset_period: null,
  //     },
  //     {
  //       id: "1f003e37-2d5f-6b38-b5f8-bf63815329f2",
  //       name: "free plan allowed models",
  //       description: "LLM Models allowed for free plans",
  //       enabled: true,
  //       current_value: 0,
  //       request_limit: 500,
  //       usage_percentage: 0,
  //       reset_period: "hourly",
  //     },
  //   ],
  // };
  return response;
};

export const getInvoices = async () => {
  const response = await wayneAxios().get("v1.0/payments/invoices");
  return response;
};
