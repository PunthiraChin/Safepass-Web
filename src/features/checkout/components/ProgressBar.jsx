import { role } from "daisyui";

export default function ProgressBar({ checkoutStep }) {
  const stepName = [
    "STEP 1 - SELECT SEATS",
    "STEP 2 - CONFIRM DETAILS AND PAYMENT",
    "STEP 3 - SUCCESSFUL PURCHASE",
  ];
  const activeTab = "bg-teal-500 text-white";
  return (
    <div className="w-full py-8">
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          className={`tab ${checkoutStep === 1 ? activeTab : null}`}
        >
          {stepName[0]}
        </a>
        <a
          role="tab"
          className={`tab ${checkoutStep === 2 ? activeTab : null}`}
        >
          {stepName[1]}
        </a>
        <a
          role="tab"
          className={`tab ${checkoutStep === 3 ? activeTab : null}`}
        >
          {stepName[2]}
        </a>
      </div>
    </div>
  );
}
