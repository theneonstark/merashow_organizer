"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Upload } from "lucide-react";
import { onBoarding } from "@/lib/apis";
import { router } from "@inertiajs/react";

export default function OrganizerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    businessType: "",
    description: "",
    contactPerson: "",
    contactPhone: "",
    gst_certificate: null,
    aadhaar_front: null,
    aadhaar_back: null,
    pan_card: null,
    bankAccountHolder: "",
    bankAccountNumber: "",
    ifscCode: "",
    agreeToTerms: false,
  });

  const handleFileSelect = (e) => {
    let name = e.target.name;
    let file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isStep1Valid =
    formData.organizationName &&
    formData.businessType &&
    formData.contactPerson &&
    formData.contactPhone;

  const isStep2Valid =
    formData.gst_certificate &&
    formData.aadhaar_front &&
    formData.aadhaar_back &&
    formData.pan_card;

  const isStep3Valid =
    formData.agreeToTerms &&
    formData.bankAccountHolder &&
    formData.bankAccountNumber &&
    formData.ifscCode;

  // ========================================
  //              NEXT HANDLER
  // ========================================
  const handleNext = async () => {
    try {
      // STEP–1 → JSON DATA
      if (currentStep === 1 && isStep1Valid) {
        setLoading(true);

        await onBoarding({
          step: 1,
          organizationName: formData.organizationName,
          businessType: formData.businessType,
          description: formData.description,
          contactPerson: formData.contactPerson,
          contactPhone: formData.contactPhone,
        });

        setCurrentStep(2);
      }

      // STEP–2 → FILE UPLOAD
      else if (currentStep === 2 && isStep2Valid) {
        setLoading(true);

        const fd = new FormData();
        fd.append("step", 2);

        fd.append("gst_certificate", formData.gst_certificate);
        fd.append("aadhaar_front", formData.aadhaar_front);
        fd.append("aadhaar_back", formData.aadhaar_back);
        fd.append("pan_card", formData.pan_card);

        await onBoarding(fd);

        setCurrentStep(3);
      }

      // STEP–3 → FINAL JSON DATA
      else if (currentStep === 3 && isStep3Valid) {
        await completeOnboarding();
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  //              FINAL SUBMIT
  // ========================================
  const completeOnboarding = async () => {
    setLoading(true);
    try {
      await onBoarding({
        step: 3,
        bankAccountHolder: formData.bankAccountHolder,
        bankAccountNumber: formData.bankAccountNumber,
        ifscCode: formData.ifscCode,
        agreeToTerms: formData.agreeToTerms,
      });

      router.visit("/organizer/dashboard");
    } catch (err) {
      console.error("Onboarding error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-2xl px-4">
        {/* PROGRESS INDICATOR */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    step < currentStep
                      ? "bg-green-500 text-white"
                      : step === currentStep
                      ? "bg-accent text-background"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step < currentStep ? <Check size={20} /> : step}
                </div>
                {step < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step < currentStep ? "bg-green-500" : "bg-slate-700"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">

          {/* STEP–1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-2">General Information</h2>

              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Organization Name"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />

              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              >
                <option value="">Select business type</option>
                <option value="concerts">Concerts</option>
                <option value="sports">Sports</option>
                <option value="workshops">Workshops</option>
                <option value="corporate">Corporate</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Business description"
                rows="3"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />

              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Contact Person"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />

              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="Contact Phone"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />
            </div>
          )}

          {/* STEP–2 */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>

              {/* GST Certificate */}
              <div className="space-y-2">
                <p className="text-sm font-medium">GST Certificate *</p>
                <input
                  type="file"
                  name="gst_certificate"
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="file-input"
                />
              </div>

              {/* Aadhaar Front */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Aadhaar Card (Front) *</p>
                <input
                  type="file"
                  name="aadhaar_front"
                  onChange={handleFileSelect}
                  accept=".jpg,.jpeg,.png"
                />
              </div>

              {/* Aadhaar Back */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Aadhaar Card (Back) *</p>
                <input
                  type="file"
                  name="aadhaar_back"
                  onChange={handleFileSelect}
                  accept=".jpg,.jpeg,.png"
                />
              </div>

              {/* PAN Card */}
              <div className="space-y-2">
                <p className="text-sm font-medium">PAN Card *</p>
                <input
                  type="file"
                  name="pan_card"
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            </div>
          )}

          {/* STEP–3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-2">Bank Details</h2>

              <input
                type="text"
                name="bankAccountHolder"
                value={formData.bankAccountHolder}
                onChange={handleInputChange}
                placeholder="Account Holder Name"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />

              <input
                type="text"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                placeholder="Account Number"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />

              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                placeholder="IFSC Code"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
              />

              <label className="flex items-start gap-3 p-4 border border-slate-600 rounded-lg">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span>I agree to Terms & Conditions *</span>
              </label>
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-slate-600 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="inline mr-2" /> Previous
            </button>

            <div className="flex-1" />

            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid) ||
                (currentStep === 3 && !isStep3Valid) ||
                loading
              }
              className="px-6 py-2 bg-accent rounded-lg text-black"
            >
              {currentStep < 3 ? (
                <>
                  Next <ChevronRight className="inline ml-2" />
                </>
              ) : (
                <>
                  {loading ? "Completing..." : "Complete"}
                  <Check className="inline ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}