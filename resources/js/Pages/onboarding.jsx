"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/auth-context"
import { redirect } from 'next/navigation'
import { ChevronRight, ChevronLeft, Check, Upload } from 'lucide-react'

export default function OrganizerOnboarding() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    organizationName: "",
    businessType: "",
    description: "",
    contactPerson: "",
    contactPhone: "",
    bankAccountHolder: "",
    bankAccountNumber: "",
    ifscCode: "",
    documents: [],
    agreeToTerms: false,
  })

  if (!user || user.role !== "organizer") {
    redirect("/login")
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files.map((f) => f.name)],
    }))
  }

  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }))
  }

  const isStep1Valid = formData.organizationName && formData.businessType && formData.contactPerson && formData.contactPhone

  const isStep2Valid = formData.documents.length > 0

  const isStep3Valid = formData.agreeToTerms && formData.bankAccountHolder && formData.bankAccountNumber && formData.ifscCode

  const handleNext = () => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2)
    } else if (currentStep === 2 && isStep2Valid) {
      setCurrentStep(3)
    } else if (currentStep === 3 && isStep3Valid) {
      completeOnboarding()
    }
  }

  const completeOnboarding = async () => {
    setLoading(true)
    try {
      const onboardingData = {
        onboardingComplete: true,
        organizationDetails: {
          organizationName: formData.organizationName,
          businessType: formData.businessType,
          description: formData.description,
        },
        contactDetails: {
          contactPerson: formData.contactPerson,
          contactPhone: formData.contactPhone,
        },
        bankDetails: {
          accountHolder: formData.bankAccountHolder,
          accountNumber: formData.bankAccountNumber,
          ifscCode: formData.ifscCode,
        },
        documents: formData.documents,
        termsAccepted: formData.agreeToTerms,
      }

      updateUser(onboardingData)
      router.push("/organizer/dashboard")
    } catch (err) {
      console.error("Onboarding error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Progress Steps */}
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
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${step < currentStep ? "bg-green-500" : "bg-slate-700"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-medium">Step 1</p>
              <p className="text-sm text-slate-400">General Info</p>
            </div>
            <div>
              <p className="font-medium">Step 2</p>
              <p className="text-sm text-slate-400">Documents</p>
            </div>
            <div>
              <p className="font-medium">Step 3</p>
              <p className="text-sm text-slate-400">Agreement</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">General Information</h2>
                <p className="text-slate-400 mb-6">Tell us about your organization</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization Name *</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Your event company name"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                >
                  <option value="">Select business type</option>
                  <option value="concerts">Concerts & Music</option>
                  <option value="sports">Sports & Fitness</option>
                  <option value="workshops">Workshops & Training</option>
                  <option value="corporate">Corporate Events</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your business..."
                  rows="4"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Person Name *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
                <p className="text-slate-400 mb-6">Required for verification and compliance</p>
              </div>

              <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-accent transition cursor-pointer"
                onClick={() => document.getElementById("file-upload").click()}
              >
                <Upload className="mx-auto mb-4 text-slate-400" size={32} />
                <p className="font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-400 mb-4">PDF, JPG, PNG up to 10MB each</p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-lg text-background font-medium transition"
                >
                  Choose Files
                </button>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Suggested Documents:</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• GST Certificate or Business Registration</li>
                  <li>• PAN Card</li>
                  <li>• Address Proof</li>
                  <li>• Bank Account Details (PAN Copy)</li>
                </ul>
              </div>

              {formData.documents.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-3">Uploaded Documents:</p>
                  <div className="space-y-2">
                    {formData.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-sm">{doc}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(idx)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Bank Details & Agreement</h2>
                <p className="text-slate-400 mb-6">Complete your setup with bank details</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Account Holder Name *</label>
                <input
                  type="text"
                  name="bankAccountHolder"
                  value={formData.bankAccountHolder}
                  onChange={handleInputChange}
                  placeholder="Name as per bank records"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bank Account Number *</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  placeholder="16-digit account number"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">IFSC Code *</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  placeholder="11-character IFSC code"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong>Terms & Conditions:</strong><br /><br />
                  By signing this agreement, you agree to: (1) Comply with all local, state, and national laws; (2) Maintain accurate event information; (3) Process refunds according to our policy; (4) Maintain professional conduct; (5) Pay commissions as per agreement; (6) Protect customer data confidentially.
                </p>
              </div>

              <label className="flex items-start gap-3 p-4 border border-slate-600 rounded-lg hover:bg-slate-700/20 transition cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm">
                  I have read and agree to the Terms & Conditions and Privacy Policy *
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-slate-700">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-2 border border-slate-600 hover:bg-slate-700/50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="flex-1" />

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid)
                }
                className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/90 rounded-lg text-background font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStep3Valid || loading}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Completing..." : "Complete Setup"}
                <Check size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}