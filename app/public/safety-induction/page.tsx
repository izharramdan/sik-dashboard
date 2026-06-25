"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  User,
  Building,
  Check,
  Loader2,
  ShieldAlert,
  Sparkles,
  Award,
} from "lucide-react";

// Types matching the API response
interface MemberInfo {
  fullname: string;
  pt_name: string;
}

interface Induction {
  id: number;
  point: string;
  illustration: string;
  types: string;
  createdAt: string;
  updatedAt: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  image: string[];
  createdAt: string;
  updatedAt: string;
}

interface VerifyResponse {
  status: boolean;
  message: string;
  memberInfo: MemberInfo;
  projectId: number;
  inductions: Induction[];
  quizQuestions: QuizQuestion[];
}

type Phase = "welcome" | "induction" | "quiz" | "submitting" | "success" | "error";

function SafetyInductionContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // State
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<VerifyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentPhase, setCurrentPhase] = useState<Phase>("welcome");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [commitments, setCommitments] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<{ score?: number; result?: string; message?: string } | null>(null);

  // Group inductions by type
  const groupedInductions = useMemo(() => {
    if (!data) return {};
    return data.inductions.reduce<Record<string, Induction[]>>((acc, item) => {
      if (!acc[item.types]) acc[item.types] = [];
      acc[item.types].push(item);
      return acc;
    }, {});
  }, [data]);

  const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
    "1": { label: "Aturan Umum", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    "2": { label: "Keadaan Darurat", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/30" },
    "3": { label: "Peraturan Kerja", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30" },
    "4": { label: "Pekerjaan Khusus", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/30" },
  };

  // Fetch Safety Induction data
  useEffect(() => {
    if (token) {
      setLoading(true);
      apiGet(`/api/safetyinduction/public/safety-induction/verify?token=${token}`)
        .then((res: VerifyResponse) => {
          if (res.status) {
            setData(res);
            // Initialize commitments to false
            const initialCommitments: Record<number, boolean> = {};
            res.inductions.forEach((item) => {
              initialCommitments[item.id] = false;
            });
            setCommitments(initialCommitments);
          } else {
            setErrorMessage(res.message || "Tautan tidak valid.");
          }
          setLoading(false);
        })
        .catch((err) => {
          setErrorMessage(err.message || "Gagal menghubungkan ke server.");
          setLoading(false);
        });
    } else {
      setErrorMessage("Token tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [token]);

  // Handle slide viewing to automatically agree to commitments
  useEffect(() => {
    if (data && currentPhase === "induction") {
      const currentInduction = data.inductions[currentSlideIndex];
      if (currentInduction && !commitments[currentInduction.id]) {
        setCommitments((prev) => ({
          ...prev,
          [currentInduction.id]: true,
        }));
      }
    }
  }, [currentSlideIndex, currentPhase, data]);

  // Navigation handlers
  const handleStartInduction = () => {
    setCurrentPhase("induction");
    setCurrentSlideIndex(0);
  };

  const handleNextSlide = () => {
    if (!data) return;
    if (currentSlideIndex < data.inductions.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      // Completed all slides, transition to quiz
      setCurrentPhase("quiz");
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    } else {
      setCurrentPhase("welcome");
    }
  };

  const handleNextQuestion = () => {
    if (!data) return;
    const currentQuestion = data.quizQuestions[currentQuestionIndex];
    if (!answers[currentQuestion.id]) {
      alert("Pilih salah satu jawaban terlebih dahulu.");
      return;
    }
    if (currentQuestionIndex < data.quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Submit
      handleSubmit();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setCurrentPhase("induction");
      setCurrentSlideIndex(data ? data.inductions.length - 1 : 0);
    }
  };

  const handleSubmit = async () => {
    if (!data) return;

    // Validate that everything is answered
    const unanswered = data.quizQuestions.find((q) => !answers[q.id]);
    if (unanswered) {
      alert("Harap jawab semua pertanyaan kuis.");
      return;
    }

    // Validate commitments
    const uncommitted = data.inductions.find((item) => !commitments[item.id]);
    if (uncommitted) {
      // Auto-commit everything just in case, but slideshow should have done it
      const allTrue = { ...commitments };
      data.inductions.forEach((item) => {
        allTrue[item.id] = true;
      });
      setCommitments(allTrue);
    }

    setCurrentPhase("submitting");
    setSubmitError(null);

    try {
      const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
        questionId: parseInt(qId),
        answer: ans,
      }));

      const response = await apiPost("/api/safetyinduction/public/safety-induction/submit", {
        token,
        answers: formattedAnswers,
      });

      setSubmitResult(response);
      setCurrentPhase("success");
    } catch (err: any) {
      setSubmitError(err.message || "Terjadi kesalahan saat mengirim jawaban.");
      setCurrentPhase("error");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Loading Screen / Wait for client mount
  if (!isMounted || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">
        <div className="relative flex flex-col items-center p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl shadow-xl border border-white dark:border-slate-800 max-w-sm w-full text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Memuat Modul Keselamatan
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Harap tunggu sebentar, kami sedang menyiapkan materi dan kuis keselamatan Anda.
          </p>
        </div>
      </div>
    );
  }

  // Error Loading Data Screen
  if (errorMessage || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
        <div className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-red-100 dark:border-red-950/30 max-w-sm w-full text-center">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-full mb-4">
            <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Verifikasi Gagal
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {errorMessage || "Tautan verifikasi tidak valid, telah kedaluwarsa, atau tidak terdaftar di sistem kami."}
          </p>
          <div className="w-full p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800 mb-2">
            Silakan hubungi pengawas lapangan atau SHE administrator untuk mendapatkan tautan baru.
          </div>
        </div>
      </div>
    );
  }

  const { memberInfo, inductions, quizQuestions } = data;
  const currentInduction = inductions[currentSlideIndex];
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 text-slate-900 dark:text-slate-100 flex flex-col items-center py-6 px-4 md:py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[720px]">

        {/* Phase-specific layout wrapper */}
        <AnimatePresence mode="wait">

          {/* FASE 1: WELCOME SCREEN */}
          {currentPhase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 flex flex-col items-center justify-between flex-1 text-center h-full overflow-hidden"
            >
              <div className="w-full flex-1 flex flex-col items-center overflow-y-auto min-h-0 pr-1 scrollbar-thin">
                {/* Visual Badge */}
                <div className="relative mb-6 shrink-0">
                  <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-xl scale-125" />
                  <div className="relative p-5 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl shadow-lg">
                    <BookOpen className="w-12 h-12" />
                  </div>
                </div>

                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full mb-3 shrink-0">
                  Safety Induction & Kuis
                </span>

                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 shrink-0">
                  Selamat Datang di Portal Keselamatan Kerja
                </h1>

                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed shrink-0">
                  Harap selesaikan modul induksi keselamatan dan kuis singkat untuk memverifikasi kelayakan bekerja Anda di lokasi proyek.
                </p>

                {/* Member Info Box - Fixed background and contrast colors */}
                <div className="w-full bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 mb-6 text-left grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Nama Lengkap</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">{memberInfo.fullname}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Perusahaan / Vendor</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">{memberInfo.pt_name}</span>
                    </div>
                  </div>
                </div>

                {/* Guidelines Summary */}
                <div className="w-full text-left bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-950/25 rounded-2xl p-5 shrink-0">
                  <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" /> Tahapan Pengerjaan
                  </h4>
                  <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-400 space-y-2.5">
                    <li className="flex gap-2.5 items-start">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-xxs shrink-0 mt-0.5">1</span>
                      <span>Pelajari <strong>{inductions.length} poin penting</strong> keselamatan kerja secara bertahap.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-xxs shrink-0 mt-0.5">2</span>
                      <span>Jawab <strong>{quizQuestions.length} pertanyaan kuis</strong> berdasarkan materi yang telah dibaca.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-xxs shrink-0 mt-0.5">3</span>
                      <span>Kirim jawaban Anda untuk mendapatkan verifikasi SHE secara instan.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleStartInduction}
                className="w-full mt-6 bg-blue-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition duration-200 active:scale-98 flex items-center justify-center gap-2 shrink-0"
              >
                Mulai Safety Induction <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* FASE 2: INDUCTION SLIDESHOW */}
          {currentPhase === "induction" && currentInduction && (
            <motion.div
              key={`induction-${currentSlideIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8 flex flex-col justify-between flex-1 h-full overflow-hidden"
            >
              {/* Header Info */}
              <div className="mb-4 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  {/* Category tag */}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeLabels[currentInduction.types]?.bg || "bg-slate-100 dark:bg-slate-800"} ${typeLabels[currentInduction.types]?.color || "text-slate-600 dark:text-slate-400"}`}>
                    {typeLabels[currentInduction.types]?.label || `Kategori ${currentInduction.types}`}
                  </span>
                  {/* Progress Indicator */}
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Materi {currentSlideIndex + 1} dari {inductions.length}
                  </span>
                </div>
                {/* Progress Bar - Correct standard Tailwind class */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentSlideIndex + 1) / inductions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Main Illustration Card - Scrollable Content */}
              <div className="flex-1 flex flex-col items-center justify-start py-4 overflow-y-auto min-h-0 pr-1 scrollbar-thin">
                <div className="relative w-full max-w-md aspect-[4/3] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden shadow-md flex items-center justify-center shrink-0">
                  <img
                    src={currentInduction.illustration}
                    alt="Ilustrasi Induksi Keselamatan"
                    className="max-h-full max-w-full object-contain p-2 hover:scale-102 transition duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className = "flex flex-col items-center text-slate-400";
                        fallback.innerHTML = `<svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-xs">Gambar Ilustrasi Keselamatan</span>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>

                {/* Point Text */}
                <div className="mt-5 w-full max-w-md text-center">
                  <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line text-center">
                    {currentInduction.point}
                  </p>
                </div>
              </div>

              {/* Auto Commitment Notification */}
              <div className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-semibold shrink-0">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Poin ini telah dipahami & disetujui secara otomatis</span>
              </div>

              {/* Slide Navigation Footer - Correct standard hover class */}
              <div className="mt-6 flex gap-3 shrink-0">
                <button
                  onClick={handlePrevSlide}
                  className="flex-1 py-3 px-4 rounded-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>

                <button
                  onClick={handleNextSlide}
                  className="flex-1 py-3 px-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/15 transition flex items-center justify-center gap-1.5"
                >
                  {currentSlideIndex < inductions.length - 1 ? (
                    <>Next <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Mulai Kuis <Award className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* FASE 3: QUIZ WIZARD */}
          {currentPhase === "quiz" && currentQuestion && (
            <motion.div
              key={`quiz-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8 flex flex-col justify-between flex-1 h-full overflow-hidden"
            >
              {/* Header Info */}
              <div className="mb-4 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Kuis Kepatuhan Safety
                  </span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Soal {currentQuestionIndex + 1} dari {quizQuestions.length}
                  </span>
                </div>
                {/* Progress Bar - Correct standard Tailwind class */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question & Choices Grid - Scrollable Content */}
              <div className="flex-1 flex flex-col py-2 overflow-y-auto min-h-0 pr-1 scrollbar-thin">
                <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed shrink-0">
                  {currentQuestion.question}
                </h2>

                {/* Choices Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {currentQuestion.choices.map((choice, idx) => {
                    const isSelected = answers[currentQuestion.id] === choice;
                    const choiceImageUrl = currentQuestion.image && currentQuestion.image[idx];
                    const choiceLetter = String.fromCharCode(65 + idx); // A, B, C...

                    return (
                      <button
                        key={idx}
                        onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: choice }))}
                        className={`flex flex-col text-left border rounded-2xl overflow-hidden transition-all duration-200 focus:outline-none ${isSelected
                            ? "border-blue-500 bg-blue-50/40 dark:border-blue-500 dark:bg-blue-950/20 shadow-md shadow-blue-500/5 ring-1 ring-blue-500"
                            : "border-slate-200/70 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40"
                          }`}
                      >
                        {/* Choice Image - Correct border class */}
                        {choiceImageUrl && (
                          <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                            <img
                              src={choiceImageUrl}
                              alt={`Pilihan ${choiceLetter}`}
                              className="max-h-full max-w-full object-contain p-1 transition duration-200 hover:scale-102"
                            />
                            {/* Option label indicator */}
                            <div className="absolute top-2.5 left-2.5 bg-slate-900/70 backdrop-blur-sm text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                              {choiceLetter}
                            </div>
                          </div>
                        )}

                        {/* Choice Text Area */}
                        <div className="p-4 flex items-start gap-3 flex-1">
                          {/* Custom Radio Button */}
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition ${isSelected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-300 dark:border-slate-700 text-transparent"
                            }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>

                          <div className="flex flex-col">
                            {/* Fallback Letter Label if there is no image */}
                            {!choiceImageUrl && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                                Pilihan {choiceLetter}
                              </span>
                            )}
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                              {choice === "a" || choice === "b" || choice === "c" ? `Gambar Pilihan ${choiceLetter}` : choice}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Footer - Correct border and hover classes */}
              <div className="mt-6 flex gap-3 shrink-0">
                <button
                  onClick={handlePrevQuestion}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion.id]}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${answers[currentQuestion.id]
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/15"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    }`}
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <>Lanjut <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Submit Jawaban <CheckCircle2 className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* FASE 4A: SUBMITTING / LOADING STATE */}
          {currentPhase === "submitting" && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center flex-1 text-center h-full"
            >
              <Loader2 className="w-14 h-14 text-blue-600 animate-spin mb-5" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Mengirim Jawaban Kuis
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Kami sedang memproses jawaban Anda dan mengunggah verifikasi ke sistem safety induction proyek.
              </p>
            </motion.div>
          )}

          {/* FASE 4B: SUCCESS STATE */}
          {currentPhase === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 flex flex-col items-center justify-between flex-1 text-center h-full overflow-hidden"
            >
              {submitResult?.result === "retest" ? (
                // RETEST STATE (FAILED) - Correct container styling
                <div className="w-full flex-1 flex flex-col items-center overflow-y-auto min-h-0 pr-1 scrollbar-thin">
                  <div className="relative mb-6 shrink-0">
                    <div className="absolute inset-0 bg-amber-500/20 dark:bg-amber-500/10 rounded-full blur-xl scale-150" />
                    <div className="relative p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full shadow-lg">
                      <ShieldAlert className="w-16 h-16 stroke-[2]" />
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/40 px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest shrink-0">
                    Evaluasi Kuis
                  </span>

                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 shrink-0">
                    Skor Belum Mencukupi
                  </h1>

                  <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed shrink-0">
                    {submitResult.message || "Maaf, skor kuis Anda belum memenuhi batas kelayakan bekerja. Silakan tinjau kembali jawaban Anda."}
                  </p>

                  {/* Score Indicator Badge */}
                  <div className="flex flex-col items-center justify-center p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl mb-6 w-full max-w-sm shrink-0">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase font-bold tracking-wider mb-1">Skor Kuis Anda</span>
                    <span className="text-4xl font-black text-amber-600 dark:text-amber-400">{submitResult.score}</span>
                    <span className="text-[10px] text-slate-400 mt-2 block">Minimal Kelayakan: 80</span>
                  </div>

                  {/* Summary of member - Correct container styling and theme-friendly colors */}
                  <div className="w-full max-w-md bg-slate-50/80 dark:bg-slate-955/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 text-left divide-y divide-slate-200/60 dark:divide-slate-800 shrink-0">
                    <div className="py-2.5 flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Pekerja</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{memberInfo.fullname}</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 uppercase">
                        RETEST REQUIRED
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                // SUCCESS STATE (PASSED)
                <div className="w-full flex-1 flex flex-col items-center overflow-y-auto min-h-0 pr-1 scrollbar-thin">
                  <div className="relative mb-6 shrink-0">
                    <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-xl scale-150" />
                    <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full shadow-lg">
                      <CheckCircle2 className="w-16 h-16 stroke-[2]" />
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest shrink-0">
                    Verifikasi Berhasil
                  </span>

                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 shrink-0">
                    Kuis Selesai & Lulus!
                  </h1>

                  <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed shrink-0">
                    Terima kasih, <strong>{memberInfo.fullname}</strong>. Anda telah menyelesaikan seluruh materi safety induction dan berhasil lulus kuis keselamatan dengan baik.
                  </p>

                  {/* Worker summary receipt - Correct container styling and theme-friendly colors */}
                  <div className="w-full max-w-md bg-slate-50/80 dark:bg-slate-955/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 mb-4 text-left divide-y divide-slate-200/60 dark:divide-slate-800 shrink-0">
                    <div className="py-2.5 flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Pekerja</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{memberInfo.fullname}</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Perusahaan / PT</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{memberInfo.pt_name}</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Status Clearance</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Guidance / Footer Actions */}
              <div className="w-full shrink-0">
                {submitResult?.result === "retest" ? (
                  // RETEST FOOTER ACTION
                  <>
                    <button
                      onClick={() => {
                        // Reset quiz to let them try again
                        setAnswers({});
                        setCurrentQuestionIndex(0);
                        setCurrentPhase("quiz");
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold shadow-md shadow-blue-500/15 transition flex items-center justify-center gap-1.5"
                    >
                      Ulangi Kuis <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-4 py-1">
                      Silakan pelajari kembali materi K3 jika Anda masih ragu.
                    </div>
                  </>
                ) : (
                  // SUCCESS FOOTER ACTION
                  <>
                    <div className="w-full bg-blue-50/40 dark:bg-blue-950/15 border border-blue-100/30 dark:border-blue-900/30 rounded-2xl p-4 text-xs md:text-sm text-blue-900 dark:text-blue-300 flex items-start gap-3 mb-6 text-left">
                      <AlertCircle className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="font-bold block mb-0.5">Langkah Selanjutnya</span>
                        Tunjukkan halaman ini kepada pengawas lapangan atau SHE administrator untuk mengambil **Stiker Safety Induksi** dan **ID Card Kontraktor** Anda sebelum memasuki area kerja.
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 py-2">
                      Halaman ini dapat ditutup dengan aman.
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* FASE 4C: ERROR STATE */}
          {currentPhase === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 flex flex-col items-center justify-between flex-1 text-center h-full overflow-hidden"
            >
              <div className="w-full flex-1 flex flex-col items-center justify-center overflow-y-auto min-h-0 pr-1 scrollbar-thin">
                <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-full mb-6 shrink-0">
                  <ShieldAlert className="w-16 h-16 text-rose-600 dark:text-rose-400" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 shrink-0">
                  Gagal Mengirim Jawaban
                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed shrink-0">
                  Terjadi masalah saat berkomunikasi dengan server untuk menyimpan hasil kuis Anda.
                </p>

                {/* Error message detail block */}
                <div className="w-full max-w-md p-4 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/20 rounded-xl text-left mb-8 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
                    Detail Kesalahan
                  </span>
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-400/90 leading-relaxed">
                    {submitError || "Unknown connection error."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => {
                    setCurrentPhase("quiz");
                    setCurrentQuestionIndex(quizQuestions.length - 1);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                >
                  Tinjau Jawaban
                </button>

                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/15 transition flex items-center justify-center gap-2 animate-pulse"
                >
                  <Loader2 className="w-4 h-4 hidden group-hover:block animate-spin" />
                  Coba Kirim Lagi
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SafetyInductionPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">
        <div className="relative flex flex-col items-center p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl shadow-xl border border-white dark:border-slate-800 max-w-sm w-full text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-450 animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Menghubungkan
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mempersiapkan modul kuis...
          </p>
        </div>
      </div>
    }>
      <SafetyInductionContent />
    </Suspense>
  );
}
