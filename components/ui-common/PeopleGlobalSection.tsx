"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Typography, MemberModal } from "@ui-element";
import { Container } from "@ui-layout/SectionContainer";
import type { PeopleMemberItem } from "@data/leadership.data";

export type { PeopleMemberItem };

export interface PeopleGlobalSectionProps {
  members?: PeopleMemberItem[];
  background_gradient?: string;
}

export default function PeopleGlobalSection({
  members = [],
  background_gradient = "linear-gradient(180deg, #EDE9FF 0%, #F3F0FF 50%, #F8F7FF 100%)",
}: PeopleGlobalSectionProps) {
  const [activeLeader, setActiveLeader] = useState<PeopleMemberItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = (leader: PeopleMemberItem, currentTarget: HTMLElement) => {
    triggerRef.current = currentTarget;
    setActiveLeader(leader);
  };

  const closeModal = () => {
    setActiveLeader(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <>
      <section className="relative pt-[60px] pb-24" style={{ background: background_gradient }}>
        <Container>
          <div className="max-w-[1200px] mx-auto -mt-32 sm:-mt-36 md:-mt-44 lg:-mt-44 relative z-[2]">
            <div className="flex flex-wrap justify-center gap-6">
              {members.map((leader, index) => (
                <div
                  key={index}
                  className={`reveal stagger-${(index % 4) + 1} relative rounded-xl overflow-hidden cursor-pointer aspect-[4/4.6] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl group w-full max-w-[400px] sm:max-w-none sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
                  onClick={(e) => openModal(leader, e.currentTarget)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(leader, e.currentTarget);
                    }
                  }}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-[center_15%] block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#0a0e20]/85 via-[#0a0e20]/40 to-transparent z-[2]">
                    <Typography
                      as="h3"
                      variant="b2"
                      uppercase
                      weight="bold"
                      className="text-white m-0 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {leader.name}
                    </Typography>
                    <Typography
                      as="p"
                      variant="b4"
                      className="text-white/80 m-0 leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {leader.role}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <MemberModal isOpen={Boolean(activeLeader)} onClose={closeModal} member={activeLeader} />
    </>
  );
}
