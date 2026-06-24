"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";

// Interface untuk menjaga Type Safety
interface Commitments {
  [key: number]: boolean;
}
interface Answers {
  [key: number]: string;
}
interface MemberInfo {
  fullname: string;
  pt_name: string;
}
interface Induction {
  id: number;
  point: string;
  illustration: string;
  types: string;
}
interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
}

export default function SafetyInductionPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [data, setData] = useState<{
    memberInfo: MemberInfo;
    inductions: Induction[];
    quizQuestions: QuizQuestion[];
    projectId: number;
  } | null>(null);

  const [commitments, setCommitments] = useState<Commitments>({});
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(true);

  // 1. Mengelompokkan materi berdasarkan tipe
  const groupedInductions = useMemo(() => {
    if (!data) return {};
    return data.inductions.reduce((acc: any, item) => {
      if (!acc[item.types]) acc[item.types] = [];
      acc[item.types].push(item);
      return acc;
    }, {});
  }, [data]);

  const typeLabels: { [key: string]: string } = {
    "1": "Aturan Umum",
    "2": "Keadaan Darurat",
    "3": "Peraturan Kerja",
    "4": "Pekerjaan Khusus",
  };

  useEffect(() => {
    if (token) {
      // Menggunakan apiGet dari lib/api.ts
      apiGet(
        `/api/safetyinduction/public/safety-induction/verify?token=${token}`,
      )
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => alert("Gagal memuat: " + err.message));
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!data) return;

    // Validasi
    if (!data.inductions.every((item) => commitments[item.id]))
      return alert("Mohon setujui semua poin safety!");
    if (!data.quizQuestions.every((q) => answers[q.id]))
      return alert("Mohon jawab semua pertanyaan kuis!");

    try {
      const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
        questionId: parseInt(qId),
        answer: ans,
      }));

      // Menggunakan apiPost dari lib/api.ts
      const response = await apiPost(
        "/safetyinduction/public/safety-induction/submit",
        {
          token,
          answers: formattedAnswers,
        },
      );

      alert(response.message || "Berhasil disubmit!");
    } catch (err: any) {
      alert("Gagal submit: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse text-blue-600">
        Memuat Safety Induction...
      </div>
    );

  if (!data)
    return (
      <div className="p-10 text-center text-red-500">
        Link tidak valid atau kedaluwarsa.
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-3xl shadow-lg mb-6 text-white">
        <h1 className="text-2xl font-bold">Safety Induction</h1>
        <p className="text-blue-100 text-sm mt-1">
          Halo, <strong>{data.memberInfo.fullname}</strong>
        </p>
      </div>

      {/* Materi Grouped */}
      {Object.entries(groupedInductions).map(([type, items]: [string, any]) => (
        <section key={type} className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">
            {typeLabels[type] || `Kategori ${type}`}
          </h2>
          {items.map((item: Induction) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl mb-3 shadow-sm border border-gray-100"
            >
              <div className="h-48 w-full bg-gray-100 rounded-xl mb-3 overflow-hidden">
                <img
                  src={item.illustration}
                  alt="Materi"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {item.point}
              </p>
              <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600"
                  onChange={(e) =>
                    setCommitments((prev) => ({
                      ...prev,
                      [item.id]: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm font-semibold text-blue-900">
                  Saya Mengerti
                </span>
              </label>
            </div>
          ))}
        </section>
      ))}

      {/* Kuis */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">
          Kuis Kepatuhan
        </h2>
        {data.quizQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-gray-100"
          >
            <p className="font-semibold text-gray-800 mb-4 text-sm">
              {q.question}
            </p>
            {q.choices.map((choice, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 p-3 mb-2 rounded-xl border border-gray-100 hover:bg-blue-50 cursor-pointer transition"
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={choice}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: choice }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        ))}
      </section>

      {/* Floating Action Button */}
      <button
        onClick={handleSubmit}
        className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition active:scale-95"
      >
        Submit Selesai
      </button>
    </div>
  );
}
