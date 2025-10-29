"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function QuizPage() {
  const questions = [
    {
      id: 1,
      q: "Сэтгэц гэж юуг хэлэх вэ?",
      options: [
        "Хүний хөдөлгөөний чадвар",
        "Бие махбодын физиологийн үйл явц",
        "Бодит ертөнцийн юмс үзэгдлийг тусгах чадвар",
        "Зөвхөн мэдрэхүйн дохио дамжуулах үйл явц",
      ],
      correct: 2,
    },
    {
      id: 2,
      q: "Сэтгэцийн үндсэн үүрэг юу вэ?",
      options: [
        "Хөгжим сонсох ба ярих",
        "Дохиолох ба зохицуулах",
        "Хөдөлгөөн ба яриа",
        "Суралцах ба тоглох",
      ],
      correct: 1,
    },
    {
      id: 3,
      q: "Сэтгэцийн хөгжлийн дээд хэлбэр аль нь вэ?",
      options: ["Ухамсар", "Мэдрэхүй", "Ой тогтоолт", "Сэтгэхүй"],
      correct: 0,
    },
    {
      id: 4,
      q: '"Картезийн театр" гэдэг нь юуг илэрхийлдэг вэ?',
      options: [
        "Ухамсрын төвд бүх мэдээлэл нэг газар цуглардаг гэсэн үзэл",
        "Хүний тархины бүтэц",
        "Урлагийн хэлбэр",
        "Хэл ярианы хөгжил",
      ],
      correct: 0,
    },
    {
      id: 5,
      q: "Ховс гэж юуг хэлэх вэ?",
      options: [
        "Хүний ухамсар бүрэн унтарсан байдал",
        "Хүний анхаарал төвлөрсөн сэтгэл зүйн байдал",
        "Хий юм үзэгдэх байдал",
        "Мэдрэлийн системийн гэмтэл",
      ],
      correct: 1,
    },
    {
      id: 6,
      q: "Бясалгал гэж юу вэ?",
      options: [
        "Зөвхөн сууж бодох явдал",
        "Ухаан санаагаа удирдах, бодол мэдрэмжээ ажиглах үйл явц",
        "Биеийн хүчний хөгжил",
        "Хурдан нойрсох арга",
      ],
      correct: 1,
    },
    {
      id: 7,
      q: "Хий юм үзэгдэх (галлюцинаци) ямар нөхцөлд үүсч болох вэ?",
      options: [
        "Зөвхөн галлюциноген бодисоос",
        "Сэтгэлзүйн стресс, ядаргаа, мэдрэхүйн тусгаарлалт зэрэг нөхцөлд",
        "Зөвхөн нойр дутуу үед",
        "Зөвхөн ховсын үед",
      ],
      correct: 1,
    },
    {
      id: 8,
      q: "Ухамсар гэж юу вэ?",
      options: [
        "Зөвхөн санах ой",
        "Өөрийгөө болон орчноо ухамсарлах явдал",
        "Автомат үйлдэл хийх",
        "Зөвхөн мэдрэхүй",
      ],
      correct: 1,
    },
    {
      id: 9,
      q: "Ухамсрын хувирсан хэлбэрийн жишээ аль нь вэ?",
      options: [
        "Нойр, ховс, бясалгал",
        "Хөдөлгөөн, яриа, бодол",
        "Сургалт, дасгал, тоглоом",
        "Мэдрэхүй, сэтгэхүй, анхаарал",
      ],
      correct: 0,
    },
    {
      id: 10,
      q: "XVIII зууны Австрийн аль эмч ховсыг анхаарч судалсан бэ?",
      options: ["Зигмунд Фрейд", "Антон Месмер", "Иван Павлов", "Карл Юнг"],
      correct: 1,
    },
    {
      id: 11,
      q: "Тархи бодит орчинд байхгүй зүйлсийг бодитоор байгаа мэт мэдрэх үзэгдлийг юу гэдэг вэ?",
      options: ["Ховс", "Бясалгал", "Хий юм үзэгдэх", "Нойр"],
      correct: 2,
    },
    {
      id: 12,
      q: "Ухамсрын хувирсан хэлбэрийг хэдэн төрөлд хуваадаг вэ?",
      options: [
        "Ердийн ба тусгайлан зохион байгуулсан",
        "Зөвхөн ердийн",
        "Зөвхөн тусгайлан зохион байгуулсан",
        "Гурван төрөлд",
      ],
      correct: 0,
    },
    {
      id: 13,
      q: "Ухамсар төлөвших явцад юу хуримтлагддаг вэ?",
      options: [
        "Зөвхөн мэдрэмж",
        "Мэдлэг",
        "Зөвхөн дурсамж",
        "Зөвхөн туршлага",
      ],
      correct: 1,
    },
    {
      id: 14,
      q: 'Дэниэл Деннетт "Картезийн театр" гэдэг ойлголтыг аль чиглэлд тайлбарласан бэ?',
      options: [
        "Биологийн чиглэлд",
        "Танин мэдэхүйн чиглэлд",
        "Социологийн чиглэлд",
        "Физикийн чиглэлд",
      ],
      correct: 1,
    },
    {
      id: 15,
      q: "Бясалгалын үед хүн юуг хийдэг вэ?",
      options: [
        "Зөвхөн нойрсох оролдлого",
        "Анхаарлаа нэг зүйлд төвлөрүүлэх, бодол мэдрэмжээ ажиглах",
        "Биеийн дасгал хийх",
        "Зөвхөн амрах",
      ],
      correct: 1,
    },
  ];

  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [nick, setNick] = useState("");
  const [started, setStarted] = useState(false);
  const [blocked, setBlocked] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const current = questions[page];

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("quizAnswers");
      const savedPage = localStorage.getItem("quizPage");
      const savedNick = localStorage.getItem("quizCurrentNick") || "";
      const savedStarted = localStorage.getItem("quizStarted") === "1";
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedPage) setPage(Number(savedPage));
      if (savedNick) setNick(savedNick);
      if (savedStarted) setStarted(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
      localStorage.setItem("quizPage", String(page));
      localStorage.setItem("quizCurrentNick", nick);
      localStorage.setItem("quizStarted", started ? "1" : "0");
    } catch {}
  }, [answers, page, nick, started]);

  function handleSelect(optIndex) {
    setAnswers((s) => ({ ...s, [current.id]: optIndex }));
  }

  async function next() {
    if (page < questions.length - 1) {
      setPage((p) => p + 1);
    } else {
      // Finalize and submit to server
      const correct = Object.keys(answers).reduce((acc, key) => {
        const q = questions.find((qq) => qq.id === Number(key));
        if (!q) return acc;
        return acc + (answers[key] === q.correct ? 1 : 0);
      }, 0);
      const payload = {
        nick: nick || "Зочин",
        correct,
        total: questions.length,
        percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
      };
      setSubmitting(true);
      setSubmitError("");
      try {
        const res = await fetch("/api/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setSubmitError(data?.error || "Илгээхэд алдаа гарлаа");
        } else {
          setShowResults(true);
        }
      } catch (e) {
        setSubmitError("Сервертэй холбогдож чадсангүй");
      } finally {
        setSubmitting(false);
      }
    }
  }

  function prev() {
    if (page > 0) setPage((p) => p - 1);
  }

  const score = useMemo(() => {
    let correct = 0;
    let answered = 0;
    questions.forEach((q) => {
      if (typeof answers[q.id] === "number") {
        answered += 1;
        if (answers[q.id] === q.correct) correct += 1;
      }
    });
    return { correct, total: questions.length, answered };
  }, [answers, questions]);

  const percentage =
    score.answered > 0 ? Math.round((score.correct / score.answered) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Сэтгэц ба Ухамсар
            </h1>
            <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {score.answered} / {questions.length}
            </div>
          </div>

          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((page + 1) / questions.length) * 100}%` }}
            />
          </div>
        </header>

        {!started ? (
          <main>
            <div className="space-y-4">
              <p className="text-gray-700">Эхлэхийн өмнө нэрээ оруулна уу. Нэг никнэймээр зөвхөн нэг удаа өгөх боломжтой.</p>
              {blocked && (
                <div className="p-3 rounded-lg border border-amber-300 bg-amber-50 text-amber-700">
                  {blocked}
                </div>
              )}
              <div className="flex gap-3">
                <input
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  placeholder="Таны ник"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                />
                <button
                  onClick={async () => {
                    const key = (nick || "").trim().toLowerCase();
                    if (!key) return setBlocked("Нэрээ оруулна уу.");
                    try {
                      const res = await fetch(`/api/attempts?nick=${encodeURIComponent(key)}`);
                      const data = await res.json();
                      if (data?.exists) {
                        setBlocked("Энэ никнэймээр аль хэдийн өгсөн байна. Дахин өгөх боломжгүй.");
                        return;
                      }
                    } catch {}
                    setBlocked("");
                    setStarted(true);
                  }}
                  className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
                >
                  Эхлэх
                </button>
              </div>
            </div>
          </main>
        ) : !showResults ? (
          <main>
            <div className="mb-6">
              <div className="inline-block text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
                Асуулт {page + 1} / {questions.length}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                {current.q}
              </h2>
            </div>

            <div className="space-y-3">
              {current.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 hover:shadow-md
                    ${
                      answers[current.id] === idx
                        ? "bg-indigo-50 border-indigo-400 shadow-md transform scale-[1.02]"
                        : "bg-white border-gray-200 hover:border-indigo-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors
                      ${
                        answers[current.id] === idx
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-medium text-gray-700">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center gap-4">
              <button
                onClick={prev}
                disabled={page === 0}
                className="px-6 py-3 rounded-xl font-medium border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-200"
              >
                ← Өмнөх
              </button>

              <button
                onClick={next}
                disabled={submitting}
                className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {page < questions.length - 1 ? "Дараах →" : "Дүн харах"}
              </button>
            </div>
            {submitError && (
              <p className="mt-3 text-sm text-red-600">{submitError}</p>
            )}
          </main>
        ) : (
          <section className="space-y-6">
            <div className="text-center py-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                🎉 Шалгалт дууслаа!
              </h3>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {score.correct} / {score.total}
                </div>
                <p className="text-gray-600 font-medium mb-2">Зөв хариулт</p>
                <div className="text-3xl font-bold text-gray-700">
                  {percentage}%
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ({score.answered} асуултад хариулсан) • Өгсөн: {nick || "Зочин"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 max-h-96 overflow-y-auto">
              <h4 className="font-bold text-lg mb-4 text-gray-800">
                Дэлгэрэнгүй хариултууд
              </h4>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="bg-white p-4 rounded-xl border border-gray-200"
                  >
                    <div className="font-semibold text-gray-800 mb-2">
                      {index + 1}. {q.q}
                    </div>
                    <div className="text-sm space-y-2">
                      <div
                        className={`p-3 rounded-lg ${
                          typeof answers[q.id] === "number" &&
                          answers[q.id] === q.correct
                            ? "bg-green-50 border border-green-200"
                            : typeof answers[q.id] === "number"
                            ? "bg-red-50 border border-red-200"
                            : "bg-gray-50"
                        }`}
                      >
                        <strong>Таны сонголт:</strong>{" "}
                        {typeof answers[q.id] === "number"
                          ? `${String.fromCharCode(65 + answers[q.id])}. ${
                              q.options[answers[q.id]]
                            }`
                          : "Хариулаагүй"}
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <strong>Зөв хариулт:</strong>{" "}
                        {String.fromCharCode(65 + q.correct)}.{" "}
                        {q.options[q.correct]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Сэдэв: Сэтгэц ба Ухамсар • Шалгалтын систем • <a className="underline" href="/admin">Админ</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
