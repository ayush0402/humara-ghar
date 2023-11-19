"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/hooks/use-multistep-form";
import { AnimatePresence } from "framer-motion";
import OwnerDetailsForm from "@/components/custom/rent-agreement-form/owner-details-form";
import TenantDetailsForm from "@/components/custom/rent-agreement-form/tenant-details-form";
import PropertyDetailsForm from "@/components/custom/rent-agreement-form/property-details-form";
import SuccessMessage from "@/components/custom/rent-agreement-form/success-message";
import SideBar from "@/components/custom/rent-agreement-form/form-sidebar";
import AgreementDetailsForm from "@/components/custom/rent-agreement-form/agreement-details-form";
import RentAgreement from "@/components/custom/rent-agreement-form/rent-agreement-template";

export type FormItems = {
  owner_name: string;
  tenant_name: string;
  owner_address: string;
  tenant_address: string;
  owner_email: string;
  tenant_email: string;
  owner_phone: string;
  tenant_phone: string;
  property_state: string;
  property_city: string;
  property_pincode: string;
  property_address: string;
  monthly_rent: string;
  security_deposit: string;
  lock_in_period: string;
  notice_period: string;
  agreement_validity: string;
  agreement_start_date: string;
  created_by: string;
  annexure_details: string;
};

const initialValues: FormItems = {
  owner_name: "",
  tenant_name: "",
  owner_address: "",
  tenant_address: "",
  owner_email: "",
  tenant_email: "",
  owner_phone: "",
  tenant_phone: "",
  property_state: "",
  property_city: "",
  property_pincode: "",
  property_address: "",
  monthly_rent: "",
  security_deposit: "",
  lock_in_period: "",
  notice_period: "",
  agreement_validity: "",
  agreement_start_date: "",
  created_by: "owner",
  annexure_details: "",
};

export default function Home() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const {
      owner_name,
      tenant_name,
      owner_email,
      tenant_email,
      owner_phone,
      tenant_phone,
      owner_address,
      tenant_address,
      property_state,
      property_city,
      property_pincode,
      property_address,
      annexure_details,
    } = fieldToUpdate;

    if (owner_name && owner_name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        owner_name: "Name should be at least 3 characters long",
      }));
    } else if (owner_name && owner_name.trim().length > 50) {
      setErrors((prevState) => ({
        ...prevState,
        owner_name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        owner_name: "",
      }));
    }

    if (tenant_name && tenant_name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        tenant_name: "Name should be at least 3 characters long",
      }));
    } else if (tenant_name && tenant_name.trim().length > 50) {
      setErrors((prevState) => ({
        ...prevState,
        tenant_name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        tenant_name: "",
      }));
    }

    if (owner_email && !/\S+@\S+\.\S+/.test(owner_email)) {
      setErrors((prevState) => ({
        ...prevState,
        owner_email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        owner_email: "",
      }));
    }

    if (tenant_email && !/\S+@\S+\.\S+/.test(tenant_email)) {
      setErrors((prevState) => ({
        ...prevState,
        tenant_email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        tenant_email: "",
      }));
    }

    if (owner_phone && !/^[0-9]{10}$/.test(owner_phone)) {
      setErrors((prevState) => ({
        ...prevState,
        owner_phone: "Please enter a valid 10-digit phone number",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        owner_phone: "",
      }));
    }

    if (tenant_phone && !/^[0-9]{10}$/.test(tenant_phone)) {
      setErrors((prevState) => ({
        ...prevState,
        tenant_phone: "Please enter a valid 10-digit phone number",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        tenant_phone: "",
      }));
    }
    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    if (isLastStep) {
      // send formData to /api/rent-agreement as json
      try {
        const response = await fetch("/api/rent-agreement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await pdf(<RentAgreement {...formData} />).toBlob();
        saveAs(blob, "rent-agreement");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    nextStep();
  };

  const downloadPDF = async () => {
    const blob = await pdf(<RentAgreement {...formData} />).toBlob();
    saveAs(blob, "pageName");
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div
          className={`flex justify-between h-[750px] w-11/12 max-w-4xl relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-4`}
        >
          {!showSuccessMsg ? (
            <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
          ) : (
            ""
          )}
          <main
            className={`${
              showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"
            }`}
          >
            {showSuccessMsg ? (
              <AnimatePresence mode="wait">
                <SuccessMessage />
              </AnimatePresence>
            ) : (
              <form
                onSubmit={handleOnSubmit}
                className="w-full flex flex-col justify-between h-full"
              >
                <AnimatePresence mode="wait">
                  {currentStepIndex === 0 && (
                    <OwnerDetailsForm
                      key="step1"
                      {...formData}
                      updateForm={updateForm}
                      errors={errors}
                    />
                  )}
                  {currentStepIndex === 1 && (
                    <>
                      <TenantDetailsForm
                        key="step2"
                        {...formData}
                        updateForm={updateForm}
                        errors={errors}
                      />
                    </>
                  )}
                  {currentStepIndex === 2 && (
                    <PropertyDetailsForm
                      key="step3"
                      {...formData}
                      updateForm={updateForm}
                      errors={errors}
                    />
                  )}
                  {currentStepIndex === 3 && (
                    <AgreementDetailsForm
                      key="step3"
                      {...formData}
                      updateForm={updateForm}
                      errors={errors}
                    />
                  )}
                </AnimatePresence>
                <div className="w-full items-center flex justify-between">
                  <div className="">
                    <Button
                      onClick={previousStep}
                      type="button"
                      variant="ghost"
                      className={`${
                        isFirstStep
                          ? "invisible"
                          : "visible p-0 text-neutral-200 hover:text-white"
                      }`}
                    >
                      Go Back
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                      <Button
                        type="submit"
                        className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
                      >
                        {isLastStep ? "Confirm" : "Next Step"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
