import React from "react";
import clsx from "clsx";

type StepBarProps = {
  steps: string[]; // ステップ名のリスト
  currentStep: number; // 現在のステップ (0-indexed)
};

const StepBar: React.FC<StepBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center w-full bg-gray-900 p-4 rounded-lg">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          {/* ステップアイコン */}
          <div
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-full font-bold text-black transition",
              index < currentStep
                ? "bg-gray-300" // 完了済み
                : index === currentStep
                ? "bg-gray-50 animate-pulse" // 現在のステップ
                : "bg-gray-800" // 未来のステップ
            )}
          >
            {index + 1}
          </div>

          {/* ステップのラベル */}
          <div className="ml-2 text-sm font-semibold text-white">
            {step}
          </div>

          {/* ステップ間のライン */}
          {index < steps.length - 1 && (
            <div
              className={clsx(
                "flex-1 h-1 mx-2 transition-all",
                index < currentStep ? "bg-gray-300" : "bg-gray-800"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepBar;
