import React, { useState } from "react";
import StepBar from "../../components/stepbar";

const steps = ["Start", "Details", "Confirmation", "Complete"];

const StepPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="mx-auto bg-gray-0 text-white">
      <h1 className="text-2xl font-bold mb-4">Step Progress</h1>
      
      <StepBar steps={steps} currentStep={currentStep} />

      {/* コントロールボタン */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-black rounded-md disabled:opacity-50"
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepPage;
