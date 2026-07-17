"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Trailer } from "@/lib/site-data";

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function buildMonthCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = new Array(firstDay.getDay()).fill(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  return cells;
}

const TIME_OPTIONS = Array.from({ length: 21 }, (_, i) => {
  const totalMinutes = 8 * 60 + i * 30;
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
});

function Chevrons() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 shrink-0 text-coffee/40"
    >
      <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );
}

function MonthGrid({
  monthDate,
  today,
  start,
  end,
  onPick,
}: {
  monthDate: Date;
  today: Date;
  start: Date | null;
  end: Date | null;
  onPick: (d: Date) => void;
}) {
  const cells = useMemo(
    () => buildMonthCells(monthDate.getFullYear(), monthDate.getMonth()),
    [monthDate],
  );
  const label = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="flex-1">
      <p className="text-center text-sm font-semibold text-coffee">{label}</p>
      <div className="mt-2 grid grid-cols-7 gap-y-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="text-[11px] font-medium text-[#9a9a9a]">
            {d}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const past = date < today;
          const isToday = isSameDay(date, today);
          const isStart = start && isSameDay(date, start);
          const isEnd = end && isSameDay(date, end);
          const inRange = start && end && date > start && date < end;
          const selectable = !past;

          return (
            <button
              key={i}
              type="button"
              disabled={!selectable}
              onClick={() => onPick(date)}
              className={[
                "relative mx-auto flex size-8 flex-col items-center justify-center rounded-md text-xs",
                past ? "text-[#c9c9c9]" : "text-coffee",
                selectable && !isStart && !isEnd ? "hover:bg-almond/40" : "",
                isToday && !isStart && !isEnd ? "border border-[#e8963e]" : "",
                inRange ? "bg-[#f0f0f0]" : "",
                isStart || isEnd ? "bg-coffee font-semibold text-white" : "",
              ].join(" ")}
            >
              {date.getDate()}
              {selectable && (
                <span
                  className={`absolute bottom-0.5 size-1 rounded-full ${
                    isStart || isEnd ? "bg-white" : "bg-green-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TrailerAvailabilityModal({
  trailer,
  onClose,
}: {
  trailer: Trailer;
  onClose: () => void;
}) {
  const today = useMemo(() => stripTime(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnTime, setReturnTime] = useState("09:15");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const atEarliestMonth = viewMonth.getTime() <= currentMonth.getTime();

  function handlePick(date: Date) {
    if (!start || (start && end)) {
      setStart(date);
      setEnd(null);
    } else if (date.getTime() > start.getTime()) {
      setEnd(date);
    } else {
      setStart(date);
      setEnd(null);
    }
  }

  const dateParams = start && end ? `&pickup=${toISODate(start)}&return=${toISODate(end)}` : "";
  const requestHref = start && end ? `/contact?trailer=${trailer.slug}${dateParams}` : undefined;
  const bookingHref = `/book?trailer=${trailer.slug}${dateParams}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-coffee/60 p-4 py-10 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute left-2 top-2 z-10 flex size-9 items-center justify-center rounded-full bg-white text-coffee shadow"
          >
            ✕
          </button>
          <span className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-coffee shadow">
            <span className="size-2 rounded-full bg-green-500" /> Available
          </span>
          {trailer.images[0] ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-almond/50">
              <Image src={trailer.images[0]} alt={trailer.name} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
            </div>
          ) : (
            <div className="aspect-4/3 w-full rounded-xl bg-almond/50" />
          )}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) =>
              trailer.images[i] ? (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-almond/50">
                  <Image src={trailer.images[i]} alt={trailer.name} fill sizes="140px" className="object-cover" />
                </div>
              ) : (
                <div key={i} className="aspect-square rounded-lg bg-almond/50" />
              ),
            )}
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-coffee">{trailer.name}</h2>
          <p className="whitespace-nowrap text-2xl font-semibold text-coffee">
            ${trailer.pricePerDay}
            <span className="text-base font-normal text-coffee/60"> / day</span>
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-coffee">
          <span className="size-2 rounded-full bg-green-500" /> Salina, KS
        </p>

        {/* Availability calendar */}
        <div className="mt-4 rounded-lg border border-[#e0e0e0] bg-white p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-[#9a9a9a]">Pickup</p>
              <div className="mt-1 flex items-center justify-between rounded-md border border-[#e0e0e0] px-3 py-2">
                <span className="text-sm font-bold text-coffee">
                  {start ? start.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "Select date"}
                </span>
                <Chevrons />
              </div>
              <div className="mt-1.5 flex items-center justify-between rounded-md border border-[#e0e0e0] px-3 py-1.5">
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-transparent text-sm text-coffee focus:outline-none"
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <Chevrons />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#9a9a9a]">Return</p>
              <div className="mt-1 flex items-center justify-between rounded-md border border-[#e0e0e0] px-3 py-2">
                <span className="text-sm text-coffee">
                  {end ? end.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "Select date"}
                </span>
                <Chevrons />
              </div>
              <div className="mt-1.5 flex items-center justify-between rounded-md border border-[#e0e0e0] px-3 py-1.5">
                <select
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full bg-transparent text-sm text-coffee focus:outline-none"
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <Chevrons />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              disabled={atEarliestMonth}
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              aria-label="Previous month"
              className={`flex size-7 items-center justify-center rounded-md border border-[#e0e0e0] ${
                atEarliestMonth ? "cursor-not-allowed text-[#d5d5d5]" : "text-coffee hover:bg-almond/30"
              }`}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              aria-label="Next month"
              className="flex size-7 items-center justify-center rounded-md border border-[#e0e0e0] text-coffee hover:bg-almond/30"
            >
              ›
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-6 sm:flex-row">
            <MonthGrid monthDate={viewMonth} today={today} start={start} end={end} onPick={handlePick} />
            <MonthGrid monthDate={addMonths(viewMonth, 1)} today={today} start={start} end={end} onPick={handlePick} />
          </div>

        </div>

        {requestHref ? (
          <Link
            href={requestHref}
            className="mt-4 block w-full rounded-full bg-coffee px-8 py-3 text-center text-base font-semibold text-white hover:bg-coffee/90"
          >
            Request these dates
          </Link>
        ) : (
          <span className="mt-4 block w-full cursor-not-allowed rounded-full bg-coffee/30 px-8 py-3 text-center text-base font-semibold text-white">
            Select pickup &amp; return dates
          </span>
        )}

        <Link
          href={bookingHref}
          className="mt-3 block w-full rounded-full bg-pumpkin px-8 py-3 text-center text-base font-semibold text-white hover:bg-chestnut"
        >
          Continue to Booking
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-coffee">Specifications</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-coffee/80">
            {trailer.specs.map((spec) => (
              <li key={spec.label}>
                {spec.label}: <span className="font-semibold text-coffee">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
