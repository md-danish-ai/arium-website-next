"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { getStrapiURL } from "@lib/api";
import { Typography } from "@ui-element";
import { DetailedCardGridProps } from "./type";

export default function DetailedCardGrid({
  heading,
  Headings,
  Heading,
  description,
  Description,
  bgColor,
  BgColor,
  panelsCards,
  PanelsCards,
  cards,
  cardItem,
  data,
}: DetailedCardGridProps) {
  useEffect(() => {
    const svgs = document.querySelectorAll(".draw-svg");
    if (!svgs.length) return;

    const DRAW = 1.5,
      TOTAL_SPREAD = 2.5,
      FILL_DELAY = 0.3,
      FILL_DUR = 0.5,
      COLOR = "#00E8D9";

    // Hide all paths initially
    for (let s = 0; s < svgs.length; s++) {
      const svgEl = svgs[s] as HTMLElement;
      svgEl.removeAttribute("data-done");

      const paths = svgs[s].querySelectorAll("path[data-i]");
      for (let p = 0; p < paths.length; p++) {
        const path = paths[p] as SVGPathElement;
        const len = path.getTotalLength();
        path.style.fill = "transparent";
        path.style.stroke = "transparent";
        path.style.strokeWidth = path.getAttribute("data-circle") ? "1.5" : "0.6";
        path.style.strokeDasharray = len.toString();
        path.style.strokeDashoffset = len.toString();
      }
    }

    const animate = (svg: Element) => {
      const paths = svg.querySelectorAll("path[data-i]");
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j] as SVGPathElement;
        p.style.stroke = COLOR;
      }

      const stagger = paths.length > 1 ? TOTAL_SPREAD / (paths.length - 1) : 0;
      let lastDelay = 0;
      for (let k = 0; k < paths.length; k++) {
        const p2 = paths[k] as SVGPathElement;
        const delay = k * stagger;
        p2.style.transition = `stroke-dashoffset ${DRAW}s ease ${delay}s`;
        p2.style.strokeDashoffset = "0";
        lastDelay = delay;
      }

      const fillStart = (lastDelay + DRAW + FILL_DELAY) * 1000;
      setTimeout(() => {
        const circles = svg.querySelectorAll('path[data-circle="1"]');
        for (let c = 0; c < circles.length; c++) {
          const circle = circles[c] as SVGPathElement;
          circle.style.transition = `fill ${FILL_DUR}s ease`;
          circle.style.fill = COLOR;
        }
      }, fillStart);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const svg = entry.target.querySelector(".draw-svg") as HTMLElement;
            if (svg && !svg.dataset.done) {
              svg.dataset.done = "1";
              animate(svg);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cardsElements = document.querySelectorAll(".infra-panel-card");
    cardsElements.forEach((c) => observer.observe(c));

    return () => {
      observer.disconnect();
    };
  }, []);

  const sectionTitle =
    heading ||
    Headings ||
    Heading ||
    data?.title ||
    "The infrastructure that powers advanced connectivity";
  const sectionDesc =
    description ||
    Description ||
    data?.body ||
    "For over 15 years, we've been building and maintaining the infrastructure the wireless industry relies on.";
  const backgroundStyle = bgColor || BgColor ? { background: bgColor || BgColor } : undefined;

  const rawCards =
    panelsCards ||
    PanelsCards ||
    cards ||
    cardItem ||
    data?.cards ||
    data?.cardItem ||
    data?.PanelsCards;
  const hasCards = rawCards && rawCards.length > 0;

  return (
    <section
      className="infra-section py-10 max-[768px]:py-12 md:py-20 lg:py-24 relative overflow-hidden bg-midnight"
      id="infrastructure"
      style={backgroundStyle}
    >
      <div className="infra-grid-bg"></div>

      <div className="infra-particles" id="infra-particles"></div>

      <div className="container relative z-[2]">
        <div className="section-header text-center mb-8 md:mb-12 lg:mb-16">
          <Typography
            variant="h3"
            uppercase
            weight="normal"
            className="section-title reveal stagger-1 m-0 text-white"
          >
            {sectionTitle}
          </Typography>
          <Typography
            variant="b1"
            weight="normal"
            className="section-description reveal stagger-2 max-w-[960px] mx-auto mt-4 md:mt-5 text-white/80"
          >
            {sectionDesc}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 lg:gap-8 max-w-[520px] md:max-w-none mx-auto w-full">
          {hasCards ? (
            rawCards.map((item, index) => {
              let imageUrl = "";
              const imgObj = item.image || item.Image;
              if (imgObj) {
                if (Array.isArray(imgObj)) {
                  imageUrl = imgObj[0]?.url || "";
                } else if (typeof imgObj === "object") {
                  const singleImg = imgObj as {
                    url?: string;
                    data?: { attributes?: { url?: string } };
                  };
                  imageUrl = singleImg.data?.attributes?.url || singleImg.url || "";
                }
                if (imageUrl && !imageUrl.startsWith("http")) {
                  imageUrl = getStrapiURL(imageUrl);
                }
              }

              const rawSvg =
                item.IllustatioSvgCode ||
                item.illustatioSvgCode ||
                item.SvgCode ||
                item.svgCode ||
                item.icon ||
                "";
              const cleanSvg = rawSvg
                ? rawSvg
                    .replace(/style="[^"]*stroke-dashoffset[^"]*"/gi, "")
                    .replace(/style="[^"]*stroke-dasharray[^"]*"/gi, "")
                    .replace(/data-done="1"/gi, "")
                : "";

              const titleText = item.Title || item.title || "";
              const descText = item.Description || item.description || "";
              const ctaText =
                item.CtaText || item.ctaText || item.linkText || item.CTA || "Explore more";
              const ctaLink = item.CtaLink || item.ctaLink || item.link;

              return (
                <div
                  className="infra-panel w-full h-full transition-all duration-300 hover:-translate-y-1.5 reveal stagger-3"
                  key={index}
                >
                  <div className="infra-panel-card w-full h-full bg-white/[0.04] border border-teal/15 hover:border-teal/35 rounded-3xl pb-8 relative overflow-hidden flex flex-col items-center transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35),0_0_40px_rgba(0,232,217,0.1)]">
                    {imageUrl ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "32px",
                          position: "relative",
                          height: "180px",
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={titleText}
                          width={240}
                          height={180}
                          unoptimized
                          style={{ objectFit: "contain", height: "100%", width: "auto" }}
                        />
                      </div>
                    ) : cleanSvg ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: cleanSvg }}
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                        className="[&>svg]:infra-panel-svg [&>svg]:draw-svg"
                      />
                    ) : null}
                    <div className="infra-panel-text px-6 md:px-8 pt-6 text-center w-full">
                      <Typography
                        variant="h4"
                        uppercase
                        weight="normal"
                        className="infra-panel-heading m-0 mb-2 md:mb-2.5 text-white"
                      >
                        {titleText}
                      </Typography>
                      {descText ? (
                        <Typography
                          variant="b2"
                          weight="normal"
                          className="infra-panel-desc text-white/80 max-w-[480px] mx-auto m-0"
                        >
                          {descText}
                        </Typography>
                      ) : null}
                      {ctaLink && (
                        <Link
                          href={ctaLink}
                          aria-label={`${ctaText} about ${titleText}`}
                          className="community-link-cta group inline-flex items-center gap-2 no-underline mt-4"
                        >
                          <span className="community-link-text inline-block text-xs uppercase tracking-[0.15em] text-white font-body font-semibold leading-none transition-colors duration-300 group-hover:text-teal whitespace-nowrap">
                            {ctaText}
                          </span>
                          <svg
                            className="community-link-arrow text-teal inline-block w-4 h-4 min-w-4 min-h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="8 17 13 12 8 7" />
                            <polyline points="14 17 19 12 14 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="infra-panel w-full h-full transition-all duration-300 hover:-translate-y-1.5 reveal stagger-3">
                <div className="infra-panel-card w-full h-full bg-white/[0.04] border border-teal/15 hover:border-teal/35 rounded-3xl pb-8 relative overflow-hidden flex flex-col items-center transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35),0_0_40px_rgba(0,232,217,0.1)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-25 0 240 240"
                    fill="none"
                    className="infra-panel-svg draw-svg"
                    aria-hidden="true"
                  >
                    <g clipPath="url(#sc-draw)">
                      <path data-i="0" d="M186.803 94.4587V200.129" />
                      <path data-i="1" d="M169.464 183.597V83.7928" />
                      <path data-i="2" d="M168.867 83.7931V183.3" />
                      <path data-i="3" d="M158.785 179.079V139.023" />
                      <path data-i="4" d="M158.187 139.023V178.869" />
                      <path data-i="5" d="M149.66 176.223V91.0389" />
                      <path data-i="6" d="M149.063 91.0392V176.062" />
                      <path data-i="7" d="M142.885 174.532V107.688" />
                      <path data-i="8" d="M142.288 107.687V174.396" />
                      <path data-i="9" d="M130.875 172.248V78.8679" />
                      <path data-i="10" d="M130.277 78.8676V172.155" />
                      <path data-i="11" d="M117.941 170.637V88.7302" />
                      <path data-i="12" d="M117.344 88.7302V170.582" />
                      <path data-i="13" d="M111.259 170.105V97.4114" />
                      <path data-i="14" d="M110.661 97.4117V170.067" />
                      <path data-i="15" d="M101.313 169.663V131.65" />
                      <path data-i="16" d="M100.715 131.65V169.649" />
                      <path data-i="17" d="M88.2149 169.682V58.3163" />
                      <path data-i="18" d="M87.6172 58.3163V169.701" />
                      <path data-i="19" d="M80.4661 170.02V133.118" />
                      <path data-i="20" d="M79.8687 133.118V170.056" />
                      <path data-i="21" d="M72.0088 170.675V90.6203" />
                      <path data-i="22" d="M71.4111 90.6203V170.734" />
                      <path data-i="23" d="M62.8092 171.755V139.942" />
                      <path data-i="24" d="M62.2116 139.942V171.838" />
                      <path data-i="25" d="M52.3668 173.497V74.1435" />
                      <path data-i="26" d="M51.7695 74.1432V173.613" />
                      <path data-i="27" d="M41.2604 176.066V123.042" />
                      <path data-i="28" d="M40.6628 123.042V176.226" />
                      <path data-i="29" d="M32.9534 178.592V104.498" />
                      <path data-i="30" d="M32.3558 104.498V178.798" />
                      <path data-i="31" d="M22 183.041V86.7816" />
                      <path data-i="32" d="M21.4027 86.7813V183.334" />
                      <path data-i="33" d="M3.53693 200.129V94.459" />
                      <path data-i="34" d="M2.93928 94.459V204.045" />
                      <path data-i="35" d="M187.402 204.045V94.459" />
                      <path
                        data-i="36"
                        data-circle="1"
                        d="M189.41 92.1718C189.41 90.8967 188.376 89.8634 187.101 89.8634C185.827 89.8634 184.793 90.897 184.793 92.1718C184.793 93.3453 185.669 94.312 186.803 94.4587"
                      />
                      <path
                        data-i="37"
                        data-circle="1"
                        d="M169.464 83.7928C170.598 83.6457 171.474 82.6791 171.474 81.5059C171.474 80.2308 170.44 79.1975 169.166 79.1975C167.891 79.1975 166.857 80.2311 166.857 81.5059C166.857 82.6794 167.733 83.646 168.867 83.7931"
                      />
                      <path
                        data-i="38"
                        data-circle="1"
                        d="M158.785 139.023C159.918 138.876 160.794 137.909 160.794 136.736C160.794 135.461 159.761 134.427 158.486 134.427C157.211 134.427 156.178 135.461 156.178 136.736C156.178 137.909 157.054 138.876 158.187 139.023"
                      />
                      <path
                        data-i="39"
                        data-circle="1"
                        d="M149.66 91.0389C150.793 90.8919 151.67 89.9252 151.67 88.752C151.67 87.477 150.636 86.4436 149.361 86.4436C148.086 86.4436 147.053 87.4773 147.053 88.752C147.053 89.9255 147.929 90.8922 149.063 91.0392"
                      />
                      <path
                        data-i="40"
                        data-circle="1"
                        d="M142.885 107.688C144.019 107.541 144.895 106.574 144.895 105.4C144.895 104.125 143.862 103.092 142.587 103.092C141.312 103.092 140.278 104.126 140.278 105.4C140.278 106.574 141.154 107.541 142.288 107.687"
                      />
                      <path
                        data-i="41"
                        data-circle="1"
                        d="M130.875 78.8679C132.008 78.7211 132.885 77.7541 132.885 76.5807C132.885 75.3056 131.851 74.2722 130.576 74.2722C129.301 74.2722 128.268 75.3059 128.268 76.5807C128.268 77.7541 129.144 78.7208 130.277 78.8676"
                      />
                      <path
                        data-i="42"
                        data-circle="1"
                        d="M117.941 88.7302C119.074 88.5832 119.951 87.6165 119.951 86.4433C119.951 85.1683 118.917 84.1349 117.642 84.1349C116.367 84.1349 115.334 85.1686 115.334 86.4433C115.334 87.6168 116.21 88.5835 117.344 88.7302"
                      />
                      <path
                        data-i="43"
                        data-circle="1"
                        d="M111.259 97.4114C112.392 97.2646 113.268 96.2976 113.268 95.1245C113.268 93.8494 112.235 92.8161 110.96 92.8161C109.685 92.8161 108.651 93.8497 108.651 95.1245C108.651 96.2979 109.528 97.2646 110.661 97.4117"
                      />
                      <path
                        data-i="44"
                        data-circle="1"
                        d="M101.313 131.65C102.446 131.503 103.323 130.536 103.323 129.363C103.323 128.088 102.289 127.054 101.014 127.054C99.7393 127.054 98.7057 128.088 98.7057 129.363C98.7057 130.536 99.5819 131.503 100.715 131.65"
                      />
                      <path
                        data-i="45"
                        data-circle="1"
                        d="M88.2149 58.3163C89.3483 58.1695 90.2245 57.2025 90.2245 56.0294C90.2245 54.7543 89.1909 53.7209 87.9161 53.7209C86.6413 53.7209 85.6077 54.7546 85.6077 56.0294C85.6077 57.2028 86.4838 58.1695 87.6172 58.3163"
                      />
                      <path
                        data-i="46"
                        data-circle="1"
                        d="M80.4661 133.118C81.5995 132.97 82.4757 132.004 82.4757 130.831C82.4757 129.556 81.4421 128.522 80.1673 128.522C78.8925 128.522 77.8589 129.556 77.8589 130.831C77.8589 132.004 78.735 132.971 79.8687 133.118"
                      />
                      <path
                        data-i="47"
                        data-circle="1"
                        d="M72.0088 90.6203C73.1422 90.4736 74.0184 89.5066 74.0184 88.3334C74.0184 87.0583 72.9848 86.025 71.71 86.025C70.4352 86.025 69.4015 87.0586 69.4015 88.3334C69.4015 89.5069 70.2777 90.4736 71.4111 90.6203"
                      />
                      <path
                        data-i="48"
                        data-circle="1"
                        d="M62.8092 139.942C63.9426 139.795 64.8188 138.828 64.8188 137.655C64.8188 136.38 63.7852 135.347 62.5104 135.347C61.2356 135.347 60.202 136.38 60.202 137.655C60.202 138.829 61.0781 139.795 62.2116 139.942"
                      />
                      <path
                        data-i="49"
                        data-circle="1"
                        d="M52.3668 74.1435C53.5002 73.9967 54.3767 73.0297 54.3767 71.8563C54.3767 70.5812 53.3431 69.5478 52.0683 69.5478C50.7935 69.5478 49.7599 70.5815 49.7599 71.8563C49.7599 73.0297 50.636 73.9964 51.7695 74.1432"
                      />
                      <path
                        data-i="50"
                        data-circle="1"
                        d="M41.2604 123.042C42.3939 122.895 43.27 121.928 43.27 120.755C43.27 119.479 42.2364 118.446 40.9616 118.446C39.6868 118.446 38.6532 119.48 38.6532 120.755C38.6532 121.928 39.5293 122.895 40.6628 123.042"
                      />
                      <path
                        data-i="51"
                        data-circle="1"
                        d="M32.9534 104.498C34.0869 104.351 34.963 103.384 34.963 102.211C34.963 100.936 33.9294 99.9027 32.6546 99.9027C31.3798 99.9027 30.3462 100.936 30.3462 102.211C30.3462 103.385 31.2223 104.351 32.3558 104.498"
                      />
                      <path
                        data-i="52"
                        data-circle="1"
                        d="M22 86.7816C23.1335 86.6349 24.0099 85.6679 24.0099 84.4944C24.0099 83.2193 22.9763 82.186 21.7015 82.186C20.4267 82.186 19.3931 83.2196 19.3931 84.4944C19.3931 85.6679 20.2693 86.6346 21.4027 86.7813"
                      />
                      <path
                        data-i="53"
                        data-circle="1"
                        d="M3.53693 94.459C4.67036 94.3123 5.54652 93.3453 5.54652 92.1721C5.54652 90.897 4.51288 89.8637 3.2381 89.8637C1.96332 89.8637 0.929688 90.8973 0.929688 92.1721C0.929688 93.3456 1.80584 94.3123 2.93928 94.459"
                      />
                      <path
                        data-i="54"
                        d="M185.686 198.797L169.464 204.124V194.991L180.218 191.468C182.75 193.795 184.604 196.249 185.687 198.797L185.686 198.797Z"
                      />
                      <path
                        data-i="55"
                        d="M32.9513 190.104L33.6419 189.879L51.7677 195.787V203.46L50.1203 204L32.9516 198.318L32.9513 190.104Z"
                      />
                      <path
                        data-i="56"
                        d="M51.7677 183.978V195.157L34.6071 189.565L51.7677 183.978Z"
                      />
                      <path
                        data-i="57"
                        d="M117.342 182.606V196.395L101.312 191.058V187.858L117.342 182.606Z"
                      />
                      <path
                        data-i="58"
                        d="M168.867 194.557L158.785 197.86V189.123L168.867 185.783V194.557Z"
                      />
                      <path
                        data-i="59"
                        d="M169.464 185.585L171.005 185.075C174.412 186.929 177.335 188.915 179.708 191.006L169.464 194.362V185.585Z"
                      />
                      <path
                        data-i="60"
                        d="M158.187 198.056L149.66 200.85V192.147L158.187 189.321V198.056Z"
                      />
                      <path
                        data-i="61"
                        d="M149.062 201.046L142.885 203.069V194.392L149.062 192.345V201.045V201.046Z"
                      />
                      <path
                        data-i="62"
                        d="M142.287 203.265L130.874 207.004V198.372L142.287 194.59V203.265Z"
                      />
                      <path
                        data-i="63"
                        d="M130.874 216.796V207.633L142.287 203.894V213.048L130.874 216.796Z"
                      />
                      <path
                        data-i="64"
                        d="M110.701 224.049L117.342 221.868V226.247L110.701 224.049Z"
                      />
                      <path
                        data-i="65"
                        d="M109.747 223.733L82.0227 214.558L95.5815 210.065L117.342 217.157V221.239L109.747 223.733Z"
                      />
                      <path
                        data-i="66"
                        d="M80.4652 214.042V205.139L94.6238 209.753L81.0721 214.243L80.4652 214.042Z"
                      />
                      <path
                        data-i="67"
                        d="M62.2101 200.039L52.3653 203.264V195.981L62.2101 199.19V200.039Z"
                      />
                      <path
                        data-i="68"
                        d="M62.8077 199.384L63.5096 199.613L62.8077 199.843V199.384Z"
                      />
                      <path
                        data-i="69"
                        d="M62.2101 200.668V208.001L51.075 204.316L62.2101 200.668Z"
                      />
                      <path
                        data-i="70"
                        d="M62.8077 200.472L64.4719 199.927L79.8673 204.944V213.844L62.8077 208.198V200.472V200.472Z"
                      />
                      <path
                        data-i="71"
                        d="M79.8675 194.883V204.315L65.4344 199.611L79.8675 194.883Z"
                      />
                      <path
                        data-i="72"
                        d="M72.0076 196.829V181.932L79.8675 184.549V194.254L72.0076 196.829Z"
                      />
                      <path
                        data-i="73"
                        d="M117.342 202.225L101.312 207.537V191.688L117.342 197.025V202.225Z"
                      />
                      <path
                        data-i="74"
                        d="M117.94 197.224L125.171 199.631L117.94 202.027V197.224Z"
                      />
                      <path
                        data-i="75"
                        d="M117.342 202.855V211.437L109.575 213.982L109.58 213.999L101.312 211.304V208.166L117.342 202.855Z"
                      />
                      <path
                        data-i="76"
                        d="M117.342 212.066V216.528L110.514 214.303L117.342 212.066Z"
                      />
                      <path
                        data-i="77"
                        d="M100.714 211.109L96.5383 209.748L100.714 208.365V211.109Z"
                      />
                      <path
                        data-i="78"
                        d="M117.94 217.352L123.582 219.19L117.94 221.043V217.352Z"
                      />
                      <path
                        data-i="79"
                        d="M117.94 216.723V211.87L130.276 207.829V216.992L124.543 218.875L117.94 216.723Z"
                      />
                      <path
                        data-i="80"
                        d="M130.276 207.2L117.94 211.241V202.656L130.276 198.569V207.2Z"
                      />
                      <path
                        data-i="81"
                        d="M126.119 199.317L117.94 196.594V182.41L130.276 178.368V197.94L126.119 199.317Z"
                      />
                      <path
                        data-i="82"
                        d="M100.714 190.859L96.4666 189.445L100.714 188.054V190.859Z"
                      />
                      <path
                        data-i="83"
                        d="M100.714 191.489V207.735L95.5803 209.436L80.4649 204.509V194.687L95.5125 189.757L100.714 191.489L100.714 191.489Z"
                      />
                      <path
                        data-i="84"
                        d="M80.4652 194.058V184.748L94.5607 189.44L80.4652 194.058V194.058Z"
                      />
                      <path
                        data-i="85"
                        d="M80.4652 184.117V174.634L87.6164 172.305V186.498L80.4652 184.117Z"
                      />
                      <path
                        data-i="86"
                        d="M79.8675 183.919L72.0076 181.302V177.388L79.8675 174.829V183.919Z"
                      />
                      <path
                        data-i="87"
                        d="M71.4099 181.103L66.0637 179.323L71.4099 177.582V181.103V181.103Z"
                      />
                      <path
                        data-i="88"
                        d="M65.1066 179.634L71.4099 181.733V197.025L64.4722 199.298L62.808 198.756V180.383L65.1066 179.634Z"
                      />
                      <path
                        data-i="89"
                        d="M62.2101 198.561L52.3653 195.352V183.783L62.2101 180.578V198.561Z"
                      />
                      <path
                        data-i="90"
                        d="M49.1643 204.313L32.9513 209.624V198.947L49.1643 204.313Z"
                      />
                      <path
                        data-i="91"
                        d="M50.1194 204.629L62.2101 208.63V218.241L35.4791 209.425L50.1194 204.629Z"
                      />
                      <path
                        data-i="92"
                        d="M62.8077 208.828L79.8673 214.474V214.642L65.6161 219.364L62.8077 218.438V208.828V208.828Z"
                      />
                      <path
                        data-i="93"
                        d="M66.5684 219.678L79.8675 215.272V224.064L66.5684 219.678Z"
                      />
                      <path
                        data-i="94"
                        d="M64.6649 219.68L62.808 220.295V219.067L64.6649 219.68Z"
                      />
                      <path
                        data-i="95"
                        d="M65.617 219.994L93.3158 229.129L70.2442 236.705V236.706C57.3945 235.36 45.6863 233.001 35.7878 229.878L65.6172 219.994L65.617 219.994Z"
                      />
                      <path
                        data-i="96"
                        d="M80.4652 224.261V215.074L81.0724 214.873L108.792 224.047L94.2717 228.815L80.4655 224.261H80.4652Z"
                      />
                      <path
                        data-i="97"
                        d="M109.746 224.362L138.624 233.919C132.363 235.172 125.665 236.162 118.639 236.851L95.2274 229.13L109.747 224.362L109.746 224.362Z"
                      />
                      <path
                        data-i="98"
                        d="M117.94 226.445V221.672L124.543 219.504L155.471 229.583C150.663 231.141 145.412 232.515 139.798 233.678L117.94 226.445Z"
                      />
                      <path
                        data-i="99"
                        d="M125.504 219.188L158.187 208.456V228.668C157.61 228.871 157.024 229.07 156.432 229.267L125.504 219.188Z"
                      />
                      <path
                        data-i="100"
                        d="M142.885 212.852V203.698L158.187 198.685V207.827L142.885 212.852Z"
                      />
                      <path
                        data-i="101"
                        d="M158.785 198.489L168.867 195.186V204.32L158.785 207.631V198.489Z"
                      />
                      <path
                        data-i="102"
                        d="M170.276 184.686L169.464 184.955V184.264C169.738 184.404 170.009 184.545 170.276 184.686Z"
                      />
                      <path
                        data-i="103"
                        d="M168.867 183.961V185.153L158.785 188.494V179.709C162.453 181.019 165.827 182.442 168.867 183.961Z"
                      />
                      <path
                        data-i="104"
                        d="M158.187 179.496V188.692L149.66 191.517V176.846C152.646 177.666 155.494 178.551 158.187 179.496Z"
                      />
                      <path
                        data-i="105"
                        d="M149.062 176.684V191.715L142.885 193.762V175.153C145.003 175.633 147.062 176.145 149.062 176.685V176.684Z"
                      />
                      <path
                        data-i="106"
                        d="M142.287 193.96L130.874 197.742V178.173L141.216 174.785C141.574 174.862 141.932 174.94 142.287 175.019L142.287 193.96Z"
                      />
                      <path
                        data-i="107"
                        d="M140.051 174.538L130.874 177.544V172.863C134.028 173.359 137.089 173.919 140.051 174.538Z"
                      />
                      <path
                        data-i="108"
                        d="M130.276 172.772V177.74L117.94 181.781V171.244C122.178 171.646 126.297 172.159 130.276 172.772V172.772Z"
                      />
                      <path
                        data-i="109"
                        d="M117.342 171.189V181.977L111.257 183.97V170.707C113.311 170.842 115.339 171.004 117.342 171.189V171.189Z"
                      />
                      <path
                        data-i="110"
                        d="M110.66 170.671V184.166L101.312 187.229V170.262C104.474 170.34 107.592 170.477 110.66 170.671Z"
                      />
                      <path
                        data-i="111"
                        d="M100.714 170.248V187.425L95.5146 189.128L88.2137 186.697V172.111L94.1173 170.188C94.4678 170.187 94.8171 170.183 95.1685 170.183C97.0311 170.183 98.8787 170.207 100.714 170.247V170.248Z"
                      />
                      <path
                        data-i="112"
                        d="M92.1387 170.204L88.214 171.482V170.281C89.5145 170.245 90.8239 170.22 92.1387 170.204Z"
                      />
                      <path
                        data-i="113"
                        d="M87.6161 170.3V171.677L80.4649 174.005V170.622C82.8202 170.481 85.2046 170.372 87.6161 170.3Z"
                      />
                      <path
                        data-i="114"
                        d="M79.8675 170.659V174.199L72.0076 176.759V171.281C74.5852 171.032 77.2077 170.825 79.8675 170.658V170.659Z"
                      />
                      <path
                        data-i="115"
                        d="M71.4099 171.342V176.953L62.808 179.754V172.369C65.6128 171.976 68.4824 171.633 71.4099 171.342Z"
                      />
                      <path
                        data-i="116"
                        d="M62.2101 172.453V179.949L52.3653 183.154V174.117C55.5415 173.494 58.8271 172.937 62.2101 172.453Z"
                      />
                      <path
                        data-i="117"
                        d="M51.7677 174.234V183.349L41.2586 186.771V176.689C44.5992 175.787 48.1077 174.965 51.7677 174.234Z"
                      />
                      <path
                        data-i="118"
                        d="M40.661 176.85V186.965L33.6422 189.251H33.6416L32.9516 189.475V179.22C35.402 178.38 37.9743 177.588 40.661 176.85Z"
                      />
                      <path
                        data-i="119"
                        d="M32.3537 179.426V198.12L21.998 194.693V183.7C25.1216 182.169 28.5879 180.739 32.3537 179.426Z"
                      />
                      <path
                        data-i="120"
                        d="M21.4006 194.495L10.6914 190.951C13.5212 188.469 17.1304 186.137 21.4006 183.997V194.495Z"
                      />
                      <path
                        data-i="121"
                        d="M3.53484 204.082C3.53484 199.605 5.89913 195.328 10.1813 191.411L32.3537 198.749V209.82L10.4502 216.996C5.99804 213.013 3.53454 208.652 3.53454 204.082H3.53484Z"
                      />
                      <path
                        data-i="122"
                        d="M10.972 217.454L34.5223 209.739L62.2101 218.87V220.493L34.822 229.568V229.569C24.6198 226.259 16.4156 222.127 10.972 217.454Z"
                      />
                      <path
                        data-i="123"
                        d="M71.71 236.852L94.2717 229.444L117.157 236.991C110.11 237.636 102.746 237.98 95.1688 237.98C87.0623 237.98 79.2003 237.587 71.71 236.852Z"
                      />
                      <path
                        data-i="124"
                        d="M158.785 228.455V208.26L185.907 199.354C186.492 200.9 186.802 202.478 186.802 204.082C186.802 213.641 176.048 222.287 158.785 228.455Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="sc-draw">
                        <rect width="240" height="240" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="infra-panel-text px-6 md:px-8 pt-6 text-center w-full">
                    <Typography
                      variant="h4"
                      uppercase
                      weight="normal"
                      className="infra-panel-heading m-0 mb-2 md:mb-2.5 text-white"
                    >
                      Small Cells
                    </Typography>
                    <Typography
                      variant="b2"
                      weight="normal"
                      className="infra-panel-desc text-white/80 max-w-[480px] mx-auto m-0"
                    >
                      Small cells are discreet, low-powered, fiber-connected antennas that enhance
                      connectivity by providing targeted wireless coverage and capacity in public
                      spaces—especially in dense populations or high-traffic areas like cities and
                      suburbs.
                    </Typography>
                    <Link
                      href="/our-solutions"
                      aria-label="Explore more about Small Cells"
                      className="community-link-cta group inline-flex items-center gap-2 no-underline mt-4"
                    >
                      <span className="community-link-text inline-block text-xs uppercase tracking-[0.15em] text-white font-body font-semibold leading-none transition-colors duration-300 group-hover:text-teal whitespace-nowrap">
                        Explore more
                      </span>
                      <svg
                        className="community-link-arrow text-teal inline-block w-4 h-4 min-w-4 min-h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="8 17 13 12 8 7" />
                        <polyline points="14 17 19 12 14 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="infra-panel w-full h-full transition-all duration-300 hover:-translate-y-1.5 reveal stagger-4">
                <div className="infra-panel-card w-full h-full bg-white/[0.04] border border-teal/15 hover:border-teal/35 rounded-3xl pb-8 relative overflow-hidden flex flex-col items-center transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35),0_0_40px_rgba(0,232,217,0.1)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-30 0 240 240"
                    fill="none"
                    className="infra-panel-svg draw-svg"
                    aria-hidden="true"
                  >
                    <g clipPath="url(#das-draw)">
                      <path
                        data-i="0"
                        d="M179.893 92.0164C179.893 82.941 170.506 74.4341 153.46 68.0634C136.505 61.7264 113.968 58.2363 90.0003 58.2363C66.0328 58.2363 43.4959 61.7264 26.5404 68.0634C9.49471 74.4341 0.107422 82.9407 0.107422 92.0164V204.854H0.111502C0.111211 204.897 0.107422 204.94 0.107422 204.983C0.107422 214.059 9.495 222.566 26.5404 228.936C43.4959 235.273 66.0328 238.763 90.0003 238.763C113.968 238.763 136.505 235.273 153.46 228.936C170.506 222.566 179.893 214.059 179.893 204.983C179.893 204.94 179.889 204.897 179.889 204.854H179.893V92.0164Z"
                      />
                      <path
                        data-i="1"
                        d="M158.922 169.864C156.571 173.161 152.496 176.205 147.069 178.858C143.283 177.688 139.278 176.646 135.093 175.733V158.762C140.52 157.495 145.602 155.991 150.242 154.26C151.813 153.675 153.313 153.069 154.745 152.446C158.899 155.749 161.22 159.423 161.22 163.292C161.22 165.28 160.606 167.217 159.447 169.078C159.272 169.34 159.1 169.604 158.922 169.864Z"
                      />
                      <path
                        data-i="2"
                        d="M134.51 233.346L101.801 212.047C107.816 210.639 111.807 208.166 112.059 205.275H134.51V233.346Z"
                      />
                      <path
                        data-i="3"
                        d="M45.4909 205.275H67.9416C68.1977 208.204 72.2881 210.705 78.4356 212.104L45.4909 233.556V205.275V205.275Z"
                      />
                      <path
                        data-i="4"
                        d="M20.9793 169.052C19.831 167.199 19.2216 165.271 19.2216 163.292C19.2216 159.441 21.5208 155.783 25.638 152.491C27.0388 153.098 28.5055 153.689 30.0383 154.26C34.5985 155.961 39.5858 157.445 44.9084 158.698V175.733C40.8229 176.624 36.9079 177.638 33.2029 178.774C27.9646 176.191 24.0035 173.242 21.658 170.052C21.43 169.721 21.2036 169.387 20.979 169.052H20.9793Z"
                      />
                      <path
                        data-i="5"
                        d="M45.4909 176.211C45.5428 176.2 45.5944 176.188 45.6465 176.177L62.675 187.266C56.4445 186.301 50.6676 185.019 45.4909 183.476V176.21V176.211Z"
                      />
                      <path
                        data-i="6"
                        d="M44.9084 183.302C40.8628 182.07 37.1975 180.676 33.9819 179.149C37.4238 178.116 41.0746 177.176 44.9084 176.339V183.302Z"
                      />
                      <path
                        data-i="7"
                        d="M45.4909 143.108C47.8772 142.397 50.3911 141.741 53.0186 141.146C54.0909 146.709 55.2991 152.203 56.6621 157.518C56.9237 158.537 57.1891 159.54 57.4576 160.529C53.2883 159.879 49.2903 159.107 45.4909 158.227V143.107V143.108Z"
                      />
                      <path
                        data-i="8"
                        d="M44.9084 158.092C37.8905 156.437 31.5702 154.411 26.1542 152.087C30.6162 148.676 37.0489 145.675 44.9084 143.282V158.092Z"
                      />
                      <path
                        data-i="9"
                        d="M126.701 140.384C115.797 137.985 103.31 136.703 90.2919 136.698V125.795C104.141 125.778 117.505 124.595 129.585 122.372C128.717 128.679 127.754 134.703 126.701 140.384V140.384Z"
                      />
                      <path
                        data-i="10"
                        d="M130.188 122.262C131.649 121.988 133.089 121.698 134.51 121.394V142.375C132.19 141.696 129.773 141.074 127.269 140.511C128.336 134.759 129.31 128.655 130.188 122.262Z"
                      />
                      <path
                        data-i="11"
                        d="M71.8293 193.226L78.8221 197.78C77.9074 197.979 77.0368 198.201 76.2144 198.445C74.7076 196.966 73.2453 195.225 71.8293 193.226Z"
                      />
                      <path
                        data-i="12"
                        d="M90.2919 197.253C93.7542 197.27 97.0199 197.582 99.9052 198.124L90.2919 204.383V197.253Z"
                      />
                      <path
                        data-i="13"
                        d="M89.7093 204.174L80.3467 198.077C83.17 197.565 86.3468 197.269 89.7093 197.253V204.174Z"
                      />
                      <path
                        data-i="14"
                        d="M89.7093 162.965C78.527 162.944 67.8528 162.114 58.088 160.625C57.797 159.558 57.5095 158.476 57.2266 157.373C55.8651 152.064 54.6583 146.576 53.5875 141.018C64.1528 138.677 76.5087 137.318 89.7096 137.283V162.965L89.7093 162.965Z"
                      />
                      <path
                        data-i="15"
                        d="M89.7093 163.548V171.205C80.1172 171.216 70.7573 171.786 61.8958 172.874C60.6223 169.288 59.4087 165.411 58.259 161.25C68.126 162.738 78.756 163.528 89.7093 163.548Z"
                      />
                      <path
                        data-i="16"
                        d="M89.7093 171.788V189.301C82.3546 189.282 75.2628 188.851 68.5962 188.068C66.2897 183.942 64.1202 179.058 62.1003 173.447C70.7949 172.382 80.0741 171.799 89.7093 171.788Z"
                      />
                      <path
                        data-i="17"
                        d="M67.8828 187.983C66.5927 187.826 65.3182 187.657 64.0622 187.474L46.4557 176.009C51.2225 175.015 56.2552 174.178 61.5078 173.519C63.4918 179.046 65.6206 183.878 67.8828 187.983Z"
                      />
                      <path
                        data-i="18"
                        d="M68.2359 188.618C68.7407 189.512 69.2522 190.368 69.7701 191.19L65.2274 188.232C66.2218 188.369 67.2245 188.498 68.2359 188.618Z"
                      />
                      <path
                        data-i="19"
                        d="M70.6137 191.432C70.0535 190.565 69.501 189.653 68.9557 188.702C75.594 189.463 82.5693 189.865 89.7093 189.884V196.67C86.0474 196.688 82.6279 197.024 79.6319 197.612L70.9691 191.971C70.8505 191.792 70.7314 191.615 70.6134 191.432H70.6137Z"
                      />
                      <path
                        data-i="20"
                        d="M79.5215 198.235L89.4235 204.683C84.9157 204.559 80.6602 202.627 76.7032 198.915C77.5893 198.663 78.5305 198.435 79.5212 198.236L79.5215 198.235Z"
                      />
                      <path
                        data-i="21"
                        d="M100.724 198.286C101.682 198.485 102.593 198.71 103.451 198.958C99.5705 202.523 95.3814 204.433 90.9266 204.665L100.724 198.286Z"
                      />
                      <path
                        data-i="22"
                        d="M101.421 197.831L108.387 193.295C106.957 195.286 105.475 197.02 103.945 198.492C103.148 198.25 102.306 198.029 101.421 197.831Z"
                      />
                      <path
                        data-i="23"
                        d="M100.618 197.66C97.5638 197.041 94.0545 196.688 90.2919 196.67V189.886C97.5271 189.883 104.597 189.485 111.323 188.721C110.778 189.666 110.225 190.571 109.665 191.431C109.533 191.633 109.401 191.829 109.269 192.026L100.618 197.66H100.618Z"
                      />
                      <path
                        data-i="24"
                        d="M112.067 188.634C113.074 188.515 114.073 188.388 115.064 188.253L110.521 191.211C111.043 190.388 111.559 189.529 112.067 188.634V188.634Z"
                      />
                      <path
                        data-i="25"
                        d="M112.423 187.999C114.689 183.906 116.811 179.091 118.784 173.556C124.021 174.22 129.039 175.062 133.789 176.06L116.225 187.497C114.975 187.678 113.706 187.844 112.423 187.999Z"
                      />
                      <path
                        data-i="26"
                        d="M111.685 188.087C104.931 188.874 97.7449 189.3 90.2916 189.303V171.788C100.03 171.799 109.406 172.394 118.181 173.481C116.169 179.092 113.999 183.971 111.685 188.087Z"
                      />
                      <path
                        data-i="27"
                        d="M90.2919 171.205V163.549C101.337 163.542 112.057 162.752 122.003 161.253C120.863 165.427 119.656 169.315 118.385 172.909C109.441 171.798 99.985 171.216 90.2922 171.205H90.2919Z"
                      />
                      <path
                        data-i="28"
                        d="M90.2919 162.966V137.281C103.55 137.285 115.966 138.629 126.591 140.961C125.495 146.816 124.304 152.309 123.023 157.374C122.744 158.478 122.46 159.561 122.172 160.628C112.331 162.127 101.568 162.959 90.2919 162.966Z"
                      />
                      <path
                        data-i="29"
                        d="M90.2919 125.212V100.245C105.343 100.255 119.483 101.732 131.729 104.308C131.121 110.323 130.434 116.15 129.67 121.753C117.794 123.951 104.425 125.195 90.2922 125.212H90.2919Z"
                      />
                      <path
                        data-i="30"
                        d="M89.7093 125.212C75.6085 125.195 62.2693 123.957 50.413 121.768C49.5871 115.865 48.8921 110.02 48.3066 104.359C60.5334 101.767 74.6627 100.275 89.7093 100.247V125.212Z"
                      />
                      <path
                        data-i="31"
                        d="M89.7093 125.795V136.7C76.7446 136.734 64.3203 138.033 53.4771 140.442C52.3349 134.457 51.3501 128.395 50.5009 122.388C62.5585 124.601 75.8923 125.779 89.7093 125.795Z"
                      />
                      <path
                        data-i="32"
                        d="M52.9088 140.571C50.341 141.154 47.8638 141.799 45.4912 142.505V121.394C46.9393 121.704 48.408 121.999 49.8971 122.277C50.7544 128.363 51.7512 134.506 52.9088 140.571Z"
                      />
                      <path
                        data-i="33"
                        d="M57.6292 161.156C58.79 165.377 60.0161 169.311 61.3042 172.949C55.8174 173.639 50.5251 174.528 45.4909 175.606V158.832C49.3739 159.73 53.4296 160.508 57.6292 161.156Z"
                      />
                      <path
                        data-i="34"
                        d="M63.8621 188.038L70.5496 192.393C72.1648 194.815 73.8448 196.897 75.5849 198.64C72.5071 199.628 70.1826 200.934 68.9405 202.438C62.3773 200.949 56.1995 198.726 50.4534 195.778C48.7604 194.909 47.1091 193.971 45.4912 192.978V184.079C51.0931 185.745 57.2779 187.075 63.8621 188.038Z"
                      />
                      <path
                        data-i="35"
                        d="M76.0592 199.105C78.8996 201.831 81.8982 203.659 85.0386 204.578C79.6808 204.328 74.5203 203.66 69.5761 202.578C70.8202 201.214 73.0909 200.017 76.0592 199.105Z"
                      />
                      <path
                        data-i="36"
                        d="M78.9497 204.692H68.526C68.5834 204.14 68.7989 203.601 69.1633 203.084C72.3385 203.79 75.6021 204.327 78.9497 204.692Z"
                      />
                      <path
                        data-i="37"
                        d="M95.049 204.568C98.2428 203.654 101.269 201.849 104.125 199.161C107.019 200.071 109.23 201.254 110.445 202.598C105.525 203.654 100.388 204.312 95.049 204.568Z"
                      />
                      <path
                        data-i="38"
                        d="M110.853 203.107C111.207 203.617 111.419 204.148 111.475 204.692H101.014C104.382 204.331 107.663 203.802 110.853 203.107Z"
                      />
                      <path
                        data-i="39"
                        d="M104.603 198.7C106.38 196.953 108.091 194.86 109.733 192.42L116.426 188.061C122.896 187.121 128.981 185.828 134.51 184.209V193.213C132.918 194.17 131.293 195.076 129.627 195.914C123.874 198.809 117.677 200.995 111.081 202.461C109.869 200.978 107.604 199.686 104.603 198.7Z"
                      />
                      <path
                        data-i="40"
                        d="M117.612 187.289L134.51 176.286V183.606C129.404 185.103 123.725 186.349 117.612 187.289Z"
                      />
                      <path
                        data-i="41"
                        d="M135.093 176.339C139.027 177.198 142.769 178.165 146.29 179.231C142.999 180.781 139.241 182.192 135.093 183.435V176.339Z"
                      />
                      <path
                        data-i="42"
                        d="M134.51 175.59L134.492 175.602C129.551 174.544 124.362 173.67 118.985 172.986C120.264 169.348 121.48 165.405 122.633 161.159C126.738 160.525 130.706 159.768 134.51 158.896L134.51 175.59Z"
                      />
                      <path
                        data-i="43"
                        d="M122.802 160.532C123.068 159.543 123.329 158.538 123.588 157.517C124.87 152.446 126.062 146.947 127.16 141.087C129.722 141.661 132.175 142.293 134.51 142.978V158.292C130.788 159.146 126.877 159.897 122.802 160.532Z"
                      />
                      <path
                        data-i="44"
                        d="M135.093 143.15C143.117 145.554 149.687 148.586 154.23 152.042C148.719 154.415 142.267 156.48 135.093 158.156V143.149V143.15Z"
                      />
                      <path
                        data-i="45"
                        d="M140.732 144.42C138.929 143.755 137.046 143.131 135.093 142.547V121.267C141.718 119.823 147.892 118.051 153.461 115.97C155.516 115.201 157.457 114.402 159.287 113.574C168.993 118.678 174.702 124.899 174.702 131.606C174.702 139.282 167.223 146.322 154.83 151.779C151.348 149.076 146.613 146.59 140.732 144.42H140.732Z"
                      />
                      <path
                        data-i="46"
                        d="M135.093 120.661V105.055C144.276 107.201 152.273 109.984 158.631 113.235C152.015 116.186 144.051 118.705 135.093 120.661Z"
                      />
                      <path
                        data-i="47"
                        d="M134.51 120.789C133.121 121.087 131.708 121.371 130.273 121.641C131.025 116.11 131.702 110.36 132.302 104.429C133.046 104.588 133.781 104.753 134.51 104.92V120.789Z"
                      />
                      <path
                        data-i="48"
                        d="M132.362 103.838C133.259 94.8827 133.98 85.5178 134.51 75.86V104.315C133.799 104.152 133.084 103.993 132.362 103.838Z"
                      />
                      <path
                        data-i="49"
                        d="M131.789 103.716C119.257 101.079 105.063 99.672 90.2919 99.6624V58.8208C106.376 58.84 121.474 60.4471 134.505 63.2426C133.987 77.3403 133.067 90.9445 131.789 103.716Z"
                      />
                      <path
                        data-i="50"
                        d="M89.7093 99.6638C74.9418 99.6909 60.7589 101.114 48.2457 103.767C46.611 87.7883 45.8495 73.3243 45.4959 63.2424C58.5273 60.4468 73.6245 58.8397 89.7093 58.8205V99.6638Z"
                      />
                      <path
                        data-i="51"
                        d="M47.673 103.892C46.9398 104.05 46.2125 104.213 45.4912 104.379V75.996C45.9457 84.1968 46.6331 93.7386 47.673 103.892Z"
                      />
                      <path
                        data-i="52"
                        d="M47.7339 104.482C48.3124 110.068 48.9976 115.833 49.8097 121.657C48.3474 121.382 46.9063 121.093 45.4912 120.789V104.985C46.2317 104.813 46.9786 104.645 47.7339 104.482V104.482Z"
                      />
                      <path
                        data-i="53"
                        d="M44.9084 120.661C36.0174 118.72 28.1059 116.224 21.52 113.301C27.8347 110.054 35.7795 107.271 44.9084 105.119V120.661V120.661Z"
                      />
                      <path
                        data-i="54"
                        d="M26.5407 115.969C32.1091 118.051 38.2828 119.823 44.9084 121.267V142.678C43.1122 143.224 41.377 143.805 39.7099 144.42C33.796 146.602 29.04 149.104 25.5527 151.824C13.0992 146.36 5.57853 139.303 5.57853 131.606C5.57853 124.929 11.2384 118.733 20.8669 113.641C22.6522 114.445 24.5416 115.222 26.5404 115.969H26.5407Z"
                      />
                      <path
                        data-i="55"
                        d="M5.01808 130.927C2.51643 120.209 1.09346 108.58 0.787603 96.2197C2.84473 102.528 9.52733 108.422 20.2039 113.34C10.6581 118.468 5.36792 124.536 5.01808 130.927Z"
                      />
                      <path
                        data-i="56"
                        d="M25.0475 152.23C20.852 155.651 18.639 159.404 18.639 163.292C18.639 164.187 18.7564 165.076 18.988 165.955C14.0197 157.88 10.0275 148.732 7.0589 138.669C10.0284 143.659 16.1526 148.291 25.0475 152.23Z"
                      />
                      <path
                        data-i="57"
                        d="M32.4185 179.02C31.4636 179.319 30.5207 179.626 29.5947 179.942C27.7796 178 26.0397 175.951 24.3805 173.792C26.5026 175.636 29.1924 177.389 32.4185 179.02Z"
                      />
                      <path
                        data-i="58"
                        d="M33.1709 179.393C35.1616 180.363 37.3408 181.29 39.7102 182.164C41.377 182.779 43.1122 183.36 44.9086 183.906V192.62C39.5069 189.235 34.5333 185.154 30.0264 180.406C31.0532 180.06 32.1018 179.722 33.1712 179.393H33.1709Z"
                      />
                      <path
                        data-i="59"
                        d="M44.9084 193.304V204.692H0.700209C0.921593 195.186 11.9451 186.621 29.4237 180.614C34.0975 185.57 39.273 189.811 44.9084 193.304Z"
                      />
                      <path
                        data-i="60"
                        d="M45.4909 193.661C47.0243 194.593 48.5874 195.476 50.1875 196.296C55.9056 199.23 62.0473 201.449 68.5662 202.949C68.2058 203.508 67.9941 204.091 67.9416 204.692H45.4909V193.661Z"
                      />
                      <path
                        data-i="61"
                        d="M68.526 205.275H88.9228L79.1309 211.651C72.9982 210.352 68.8074 207.991 68.526 205.275Z"
                      />
                      <path
                        data-i="62"
                        d="M89.7093 205.458V212.714C86.1869 212.697 82.8673 212.374 79.9456 211.816L89.7093 205.458Z"
                      />
                      <path
                        data-i="63"
                        d="M90.2919 205.275H90.3324L100.304 211.768C97.3231 212.357 93.9138 212.697 90.2919 212.714V205.275Z"
                      />
                      <path
                        data-i="64"
                        d="M91.4 205.275H111.475C111.197 207.955 107.115 210.291 101.114 211.601L91.4 205.275Z"
                      />
                      <path
                        data-i="65"
                        d="M112.059 204.692C112.008 204.1 111.801 203.526 111.45 202.974C118.001 201.498 124.163 199.316 129.889 196.434C131.463 195.642 133.001 194.791 134.51 193.894V204.693L112.059 204.692Z"
                      />
                      <path
                        data-i="66"
                        d="M135.093 193.542C140.872 190.033 146.162 185.751 150.921 180.733C168.2 186.734 179.081 195.248 179.301 204.692H135.093V193.542V193.542Z"
                      />
                      <path
                        data-i="67"
                        d="M135.093 192.861V184.037C137.045 183.453 138.929 182.829 140.731 182.164C143.032 181.315 145.153 180.417 147.097 179.477C148.193 179.817 149.266 180.166 150.317 180.524C145.724 185.336 140.636 189.46 135.092 192.862L135.093 192.861Z"
                      />
                      <path
                        data-i="68"
                        d="M147.855 179.106C151.186 177.436 153.952 175.637 156.119 173.742C154.417 175.965 152.624 178.068 150.752 180.062C149.802 179.735 148.836 179.416 147.855 179.106Z"
                      />
                      <path
                        data-i="69"
                        d="M155.337 152.183C164.17 148.257 170.256 143.645 173.216 138.678C170.305 148.753 166.371 157.895 161.458 165.938C161.686 165.064 161.803 164.182 161.803 163.292C161.803 159.386 159.569 155.617 155.337 152.183V152.183Z"
                      />
                      <path
                        data-i="70"
                        d="M175.253 130.744C174.81 124.39 169.484 118.363 159.947 113.269C170.638 108.318 177.29 102.383 179.267 96.0362C179.027 108.413 177.673 120.038 175.253 130.744V130.744Z"
                      />
                      <path
                        data-i="71"
                        d="M179.311 92.0164C179.311 99.9377 171.804 107.218 159.301 112.931C156.599 111.527 153.578 110.196 150.242 108.951C145.602 107.221 140.52 105.716 135.093 104.45V63.3717C161.525 69.1428 179.311 79.8215 179.311 92.0164Z"
                      />
                      <path
                        data-i="72"
                        d="M44.9084 63.3717V104.514C39.5858 105.767 34.5985 107.25 30.0383 108.951C26.6482 110.215 23.5823 111.57 20.8468 112.999C8.78395 107.517 1.33814 100.58 0.733998 93.0143C0.728464 92.394 0.720308 91.7751 0.720308 91.1511C1.53885 79.3175 19.1028 69.0059 44.9084 63.3717Z"
                      />
                      <path
                        data-i="73"
                        d="M0.690306 106.06C2.59217 131.185 9.38111 152.88 20.6184 169.562C20.7626 169.786 20.9141 170.01 21.0737 170.232C21.4375 170.762 21.8028 171.29 22.1757 171.81C24.3074 174.781 26.5853 177.558 28.9931 180.151C28.1647 180.439 27.3447 180.73 26.5407 181.031C11.9439 186.486 2.9694 193.509 0.690306 201.113V106.06Z"
                      />
                      <path
                        data-i="74"
                        d="M0.700209 205.275H44.9084V233.628C18.6868 227.903 0.981309 217.348 0.700209 205.275Z"
                      />
                      <path
                        data-i="75"
                        d="M46.0657 233.877L79.2381 212.276C82.3267 212.913 85.8863 213.279 89.7093 213.296V238.096H90.2919V213.296C94.2159 213.278 97.8609 212.892 101.005 212.224L134.179 233.826C121.143 236.596 106.061 238.181 90.0003 238.181C74.0396 238.181 59.0461 236.615 46.0657 233.877Z"
                      />
                      <path
                        data-i="76"
                        d="M135.093 233.628V205.275H179.301C179.02 217.348 161.314 227.903 135.093 233.628Z"
                      />
                      <path
                        data-i="77"
                        d="M153.46 181.031C152.769 180.772 152.065 180.52 151.355 180.271C153.687 177.772 155.894 175.101 157.96 172.249C158.493 171.513 159.014 170.763 159.529 170.005C159.623 169.869 159.714 169.732 159.802 169.595C170.751 153.282 177.394 132.024 179.311 107.326V201.113C177.031 193.509 168.057 186.486 153.46 181.031Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="das-draw">
                        <rect width="240" height="240" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="infra-panel-text px-6 md:px-8 pt-6 text-center w-full">
                    <Typography
                      variant="h4"
                      uppercase
                      weight="normal"
                      className="infra-panel-heading m-0 mb-2 md:mb-2.5 text-white"
                    >
                      Distributed Antenna Systems
                    </Typography>
                    <Typography
                      variant="b2"
                      weight="normal"
                      className="infra-panel-desc text-white/80 max-w-[480px] mx-auto m-0"
                    >
                      Distributed Antenna Systems (DAS) use small, strategically placed connection
                      points, also called nodes, to meet the unique coverage and capacity needs of
                      venues and indoor spaces like high-rises, hospitals, campuses, stadiums,
                      resorts, and theme parks.
                    </Typography>
                    <Link
                      href="/our-solutions"
                      aria-label="Explore more about Distributed Antenna Systems"
                      className="community-link-cta group inline-flex items-center gap-2 no-underline mt-4"
                    >
                      <span className="community-link-text inline-block text-xs uppercase tracking-[0.15em] text-white font-body font-semibold leading-none transition-colors duration-300 group-hover:text-teal whitespace-nowrap">
                        Explore more
                      </span>
                      <svg
                        className="community-link-arrow text-teal inline-block w-4 h-4 min-w-4 min-h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="8 17 13 12 8 7" />
                        <polyline points="14 17 19 12 14 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
