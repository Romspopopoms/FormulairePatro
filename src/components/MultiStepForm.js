// src/components/MultiStepForm.js
import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = data => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(1);
  };

  switch (currentStep) {
    case 1:
      return <Step1 onNext={nextStep} />;
    case 2:
      return <Step2 onNext={nextStep} onPrev={prevStep} />;
    case 3:
      return <Step3 onNext={nextStep} onPrev={prevStep} onReset={resetForm} />;
    case 4:
      return <Step4 onNext={nextStep} onPrev={prevStep} />;
    case 5:
      return <Step5 onNext={nextStep} onPrev={prevStep} />;
    case 6:
      return <Step6 onNext={nextStep} onPrev={prevStep} />;
    case 7:
      return <Step7 onNext={nextStep} onPrev={prevStep} />;
    default:
      return <div>Unknown step</div>;
  }
};

export default MultiStepForm;
