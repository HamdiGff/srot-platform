"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUserStore, UserRole, DEMO_PROFILES } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  User,
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Sliders,
  X,
  Check,
  UserPlus,
  LogIn,
  LogOut,
  Sparkles,
  Phone,
  Lock,
  MapPin,
  Briefcase,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function RoleSwitcherModal() {
  const {
    isAuthModalOpen,
    isRoleModalOpen,
    closeAuthModal,
    closeRoleModal,
    currentRole,
    currentUser,
    switchRole,
    registerAccount,
    loginWithPhone,
    logout,
    registeredUsers,
    authModalTab,
  } = useUserStore();

  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const isOpen = isAuthModalOpen || isRoleModalOpen;
  const handleClose = () => {
    closeAuthModal();
    closeRoleModal();
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeTab, setActiveTab] = useState<"demo" | "register" | "signin">(
    authModalTab || "demo"
  );

  // Sync tab with store state when opened
  useEffect(() => {
    if (authModalTab) {
      setActiveTab(authModalTab);
    }
  }, [authModalTab]);

  // Dialog show/close handling
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState<UserRole>("farmer");
  const [regDistrict, setRegDistrict] = useState("Bogura");
  const [regPin, setRegPin] = useState("");
  const [regDetail, setRegDetail] = useState("");
  const [regRegNumber, setRegRegNumber] = useState("");
  const [regStatus, setRegStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Sign In Form State
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginStatus, setLoginStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegStatus(null);
    const res = registerAccount({
      name: regName,
      phone: regPhone,
      role: regRole,
      district: regDistrict,
      pin: regPin,
      farmOrPetDetail: regDetail,
      registrationNumber: regRegNumber,
    });

    if (res.success) {
      setRegStatus({ type: "success", message: res.message });
      setTimeout(() => {
        handleClose();
      }, 1000);
    } else {
      setRegStatus({ type: "error", message: res.message });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus(null);
    const res = loginWithPhone(loginPhone, loginPin);
    if (res.success) {
      setLoginStatus({ type: "success", message: res.message });
      setTimeout(() => {
        handleClose();
      }, 1000);
    } else {
      setLoginStatus({ type: "error", message: res.message });
    }
  };

  const demoRoles: {
    role: UserRole;
    title: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      role: "farmer",
      title: "Crop Farmer (Tariqul Islam)",
      description: "5.2 acres rice & maize in Bogura. Leaf blast triage, IPM advice, and spray prescriptions.",
      badge: "Crops & Agronomy",
      icon: <Wheat className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 hover:border-emerald-500 bg-emerald-950/20",
    },
    {
      role: "livestock_farmer",
      title: "Dairy Producer (Marcus Holloway)",
      description: "28 Holstein Friesians & 45 goats in Sirajganj. Milk yield tracking and cattle vet triage.",
      badge: "Dairy & Livestock",
      icon: <Milk className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/30 hover:border-cyan-500 bg-cyan-950/20",
    },
    {
      role: "pet_owner",
      title: "Companion Pet Parent (Jessica Miller)",
      description: "Cares for Golden Retriever 'Max' and cat 'Cleo'. 24/7 tele-vet consultations and pet health cards.",
      badge: "Pet Healthcare",
      icon: <HeartHandshake className="w-5 h-5 text-pink-400" />,
      color: "border-pink-500/30 hover:border-pink-500 bg-pink-950/20",
    },
    {
      role: "expert_agronomist",
      title: "Plant Pathologist (Dr. Ramesh Patel)",
      description: "Certified IPM specialist. Diagnoses rice blast, issues digital chemical/bio spray advisories.",
      badge: "Doctor Desk (DAE)",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 hover:border-emerald-500 bg-emerald-950/20",
    },
    {
      role: "veterinarian",
      title: "Veterinary Surgeon (Dr. Ananya Sen)",
      description: "BVC registered surgeon. Reviews animal symptoms, prescribes antibiotics with withholding safety times.",
      badge: "Veterinarian (BVC)",
      icon: <Stethoscope className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/30 hover:border-cyan-500 bg-cyan-950/20",
    },
    {
      role: "field_vendor",
      title: "Field Paravet & Soil Tech (Kamal Hossain)",
      description: "Dispatched to farm gates for doorstep Artificial Insemination (AI) and core soil NPK audits.",
      badge: "Doorstep Paravet",
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/30 hover:border-amber-500 bg-amber-950/20",
    },
    {
      role: "admin",
      title: "Platform Administrator",
      description: "Controls modular system toggles, 70/30 GMV fee revenue audits, and practitioner compliance.",
      badge: "System Governance",
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/30 hover:border-purple-500 bg-purple-950/20",
    },
  ];

  const bangladeshDistricts = [
    "Bogura",
    "Rajshahi",
    "Dhaka",
    "Sirajganj",
    "Mymensingh",
    "Rangpur",
    "Cumilla",
    "Dinajpur",
    "Jashore",
    "Chattogram",
    "Sylhet",
    "Khulna",
    "Barishal",
  ];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="auth-modal-title"
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      className="fixed inset-0 m-auto z-50 p-0 rounded-3xl bg-slate-900 text-slate-100 border border-slate-700/80 shadow-2xl max-w-2xl w-[94vw] max-h-[90vh] overflow-y-auto backdrop:bg-black/80"
    >
      <div className="p-5 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-lg font-black text-white">
                {isBn ? "ইউজার একাউন্ট ও পার্সোনা কন্ট্রোল" : "User Accounts & Role Persona"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "নতুন একাউন্ট তৈরি করুন, সাইন ইন করুন বা ১-ক্লিকে টেস্ট পার্সোনা বাছাই করুন"
                  : "Create your verified profile, sign in, or test live with pre-set personas."}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{currentUser.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  {currentUser.roleLabel.split("(")[0]}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {currentUser.phone} • {currentUser.location}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition border border-white/[0.06]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isBn ? "লগআউট" : "Sign Out"}</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "register"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isBn ? "নতুন একাউন্ট খুলুন" : "Create Account"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "signin"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{isBn ? "সাইন ইন" : "Sign In"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("demo")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "demo"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? "১-ক্লিক ডেমো" : "Demo Personas"}</span>
          </button>
        </div>

        {/* TAB 1: CREATE ACCOUNT */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            {regStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                  regStatus.type === "success"
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                    : "bg-rose-950/40 border-rose-500/30 text-rose-300"
                }`}
              >
                {regStatus.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{regStatus.message}</span>
              </div>
            )}

            {/* Select Role Persona */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isBn ? "আপনার ধরন নির্বাচন করুন:" : "Select Account Role / Persona:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: "farmer" as UserRole,
                    label: isBn ? "মাঠফসল খামারি" : "Crop Farmer",
                    icon: <Wheat className="w-4 h-4 text-emerald-400" />,
                  },
                  {
                    id: "livestock_farmer" as UserRole,
                    label: isBn ? "ডেইরি ও গবাদিপশু" : "Dairy / Livestock",
                    icon: <Milk className="w-4 h-4 text-cyan-400" />,
                  },
                  {
                    id: "pet_owner" as UserRole,
                    label: isBn ? "পোষা প্রাণীর অভিভাবক" : "Pet Parent",
                    icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
                  },
                  {
                    id: "expert_agronomist" as UserRole,
                    label: isBn ? "উদ্ভিদ বিশেষজ্ঞ / কৃষিবিদ" : "Agronomist (DAE)",
                    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
                  },
                  {
                    id: "veterinarian" as UserRole,
                    label: isBn ? "ভেটেরিনারি সার্জন" : "Veterinarian (BVC)",
                    icon: <Stethoscope className="w-4 h-4 text-cyan-400" />,
                  },
                  {
                    id: "field_vendor" as UserRole,
                    label: isBn ? "মাঠ টেকনিশিয়ান / প্যারাভেট" : "Field Paravet",
                    icon: <Briefcase className="w-4 h-4 text-amber-400" />,
                  },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegRole(r.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 ${
                      regRole === r.id
                        ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-1 ring-emerald-500"
                        : "border-white/[0.08] bg-slate-950/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    {r.icon}
                    <span className="line-clamp-1">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "পূর্ণ নাম" : "Full Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={isBn ? "উদা: মোঃ আরিফুল ইসলাম" : "e.g. Md. Ariful Islam"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "মোবাইল নম্বর (১১ ডিজিট)" : "Mobile Number (11 Digits)"} *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Inputs: District & PIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "জেলা / এলাকা" : "District / Region"} *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {bangladeshDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "পাসওয়ার্ড / পিন (কমপক্ষে ৪ সংখ্যা)" : "Password / PIN (Min 4 digits)"} *
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Field */}
            {regRole === "farmer" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "খামারের সাইজ ও প্রধান ফসল" : "Farm Size & Primary Crops"}
                </label>
                <input
                  type="text"
                  value={regDetail}
                  onChange={(e) => setRegDetail(e.target.value)}
                  placeholder={isBn ? "উদা: ৪.৫ একর আমন ধান ও ভুট্টা" : "e.g. 4.5 Acres Aman Rice & Maize"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {regRole === "livestock_farmer" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "পালিত গবাদিপশুর সংখ্যা ও জাত" : "Herd Size & Cattle Breed"}
                </label>
                <input
                  type="text"
                  value={regDetail}
                  onChange={(e) => setRegDetail(e.target.value)}
                  placeholder={isBn ? "উদা: ১৮টি সংকর গাভী ও ১২টি ছাগল" : "e.g. 18 Crossbred Dairy Cows"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {regRole === "pet_owner" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "পোষা প্রাণীর নাম ও জাত" : "Pet Name & Breed"}
                </label>
                <input
                  type="text"
                  value={regDetail}
                  onChange={(e) => setRegDetail(e.target.value)}
                  placeholder={isBn ? "উদা: টমি (জার্মান শেফার্ড) / পম্পম (বিড়াল)" : "e.g. Milo (Golden Retriever)"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {(regRole === "expert_agronomist" || regRole === "veterinarian") && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? "কাউন্সিল বা সরকারি রেজিস্ট্রেশন নম্বর" : "DAE / BVC Council Registration No."}
                </label>
                <input
                  type="text"
                  value={regRegNumber}
                  onChange={(e) => setRegRegNumber(e.target.value)}
                  placeholder="e.g. BVC-REG-2024-8891"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20"
            >
              {isBn ? "একাউন্ট তৈরি ও পোর্টালে প্রবেশ করুন →" : "Create Account & Enter Dashboard →"}
            </button>
          </form>
        )}

        {/* TAB 2: SIGN IN */}
        {activeTab === "signin" && (
          <form onSubmit={handleLogin} className="space-y-4">
            {loginStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                  loginStatus.type === "success"
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                    : "bg-rose-950/40 border-rose-500/30 text-rose-300"
                }`}
              >
                {loginStatus.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{loginStatus.message}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? "মোবাইল নম্বর" : "Registered Mobile Number"} *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? "পাসওয়ার্ড / পিন" : "PIN / Password"} *
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20"
            >
              {isBn ? "লগইন করুন →" : "Sign In to SROT →"}
            </button>

            {registeredUsers.length > 0 && (
              <div className="pt-3 border-t border-white/[0.06]">
                <p className="text-[11px] text-slate-400 mb-2">
                  {isBn ? "এই ব্রাউজারে সংরক্ষিত একাউন্টসমূহ:" : "Registered on this device:"}
                </p>
                <div className="space-y-1.5">
                  {registeredUsers.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        setLoginPhone(u.phone);
                        if (u.pin) setLoginPin(u.pin);
                      }}
                      className="w-full p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-left flex items-center justify-between text-xs transition border border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt="" className="w-6 h-6 rounded-lg object-cover" />
                        <span className="text-white font-medium">{u.name}</span>
                        <span className="text-[10px] text-slate-400">({u.role})</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">{u.phone}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        )}

        {/* TAB 3: DEMO PERSONAS */}
        {activeTab === "demo" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              {isBn
                ? "কোনো রেজিস্ট্রেশন ছাড়াই যেকোনো ভূমিকা ও পোর্টালে সরাসরি প্রবেশ করুন:"
                : "Switch instantly to explore specialized portals and interconnected routing:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demoRoles.map((r) => {
                const isSelected = currentRole === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      switchRole(r.role);
                      handleClose();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                      r.color
                    } ${
                      isSelected
                        ? "ring-2 ring-emerald-500 border-transparent shadow-lg shadow-emerald-950/60"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-lg bg-slate-900/60 border border-white/[0.08]">
                            {r.icon}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-300 border border-white/[0.06]">
                            {r.badge}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="p-1 rounded-full bg-emerald-500 text-slate-950">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-white mb-0.5">{r.title}</h3>
                      <p className="text-[11px] text-slate-300/80 leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
