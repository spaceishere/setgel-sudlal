"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/attempts");
        if (!res.ok) throw new Error("Fetch failed");
        const rows = await res.json();
        setData(rows || []);
      } catch (e) {
        setError("Мэдээлэл ачаалах үед алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      if (b.correct !== a.correct) return b.correct - a.correct;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-md p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Админ • Лидерборд</h1>
          <div className="flex gap-2">
            <a
              href="/"
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Буцах
            </a>
          </div>
        </header>

        {loading ? (
          <p className="text-gray-600">Ачаалж байна...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : sorted.length === 0 ? (
          <p className="text-gray-600">Одоогоор үр дүн алга.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4 text-black">#</th>
                  <th className="py-2 pr-4 text-black">Нэр</th>
                  <th className="py-2 pr-4 text-black">Оноо</th>
                  <th className="py-2 pr-4 text-black">Хувь</th>
                  <th className="py-2 pr-4 text-black">Огноо</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr
                    key={`${row.nick}-${i}`}
                    className="border-b last:border-0"
                  >
                    <td className="py-2 pr-4 text-black font-medium">
                      {i + 1}
                    </td>
                    <td className="py-2 pr-4 text-black">{row.nick}</td>
                    <td className="py-2 pr-4 text-black">
                      {row.correct} / {row.total}
                    </td>
                    <td className="py-2 pr-4 text-black">{row.percentage}%</td>
                    <td className="py-2 pr-4 text-black text-gray-500">
                      {new Date(row.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
