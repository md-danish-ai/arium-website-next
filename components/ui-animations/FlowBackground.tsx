import React from "react";

export default function FlowBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute top-[5%] -left-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,232,217,0.2)_0%,transparent_70%)] opacity-65 blur-[140px] will-change-transform animate-orbit-teal"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[45%] left-[70%] h-[780px] w-[780px] rounded-full bg-[radial-gradient(circle,rgba(124,92,191,0.44)_0%,transparent_70%)] opacity-65 blur-[140px] will-change-transform animate-orbit-purple"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[75%] -left-[10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(212,136,46,0.36)_0%,transparent_70%)] opacity-65 blur-[140px] will-change-transform animate-orbit-orange"
        aria-hidden="true"
      />
    </>
  );
}
