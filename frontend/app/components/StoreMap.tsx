"use client";

export default function StoreMap() {
  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#112138] bg-white shadow-xl">
      <div className="relative h-[420px] overflow-hidden md:h-[520px]">
        <iframe
          src="https://www.google.com/maps/d/u/4/embed?mid=1fRSBjWkwxia4rH771jkXLAy0JFWCCps&ehbc=2E312F"
          className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}