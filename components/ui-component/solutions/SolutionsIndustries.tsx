"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Typography } from "@ui-element";

// SVG Icons corresponding to the 7 industries from reference design
function StadiumsIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M232.71,117.54l-6.88-4.6s-.09-.06-.14-.09h0s0,0,0,0c-.14-.09-.29-.17-.46-.23-.01,0-.03-.01-.04-.02-.06-.02-.11-.05-.18-.07-.11-.03-.21-.04-.32-.05,0,0,0,0,0,0-.54-.06-1.07.08-1.5.37-.03.02-.05.04-.08.05-.11.08-.2.16-.3.26-.03.03-.06.07-.09.1-.08.09-.14.19-.2.29-.03.05-.06.09-.08.13-.05.11-.09.22-.13.34-.01.05-.04.09-.05.13l-.36,1.4-4.65,17.94c-3.44-2.81-10.59-8.01-21.31-12.8l2.3-21.1,6.43-.96c.98-.15,1.75-.91,1.89-1.89.15-.98-.36-1.94-1.25-2.37l-7.62-3.66c-.07-.03-.14-.05-.22-.07-.04-.01-.08-.03-.12-.04-.12-.03-.23-.06-.35-.07-.01,0-.03,0-.04,0-.02,0-.05,0-.07,0-.12,0-.23-.01-.35,0-.07,0-.13.02-.2.03-.09.01-.18.02-.26.05-.15.04-.29.1-.42.17-.01,0-.02,0-.03.01-.05.03-.08.06-.12.09-.09.06-.17.11-.25.18-.05.05-.1.1-.15.15-.07.07-.13.14-.18.22-.04.06-.08.11-.12.17-.05.09-.1.18-.14.28-.02.05-.05.11-.07.16-.05.15-.09.3-.11.47,0,0,0,0,0,.01h0s0,0,0,.01l-2.87,26.34c-12.09-4.81-28.03-8.79-47.71-8.79s-35.61,3.98-47.71,8.79l-2.17-19.91,6.18-2.97c.89-.43,1.4-1.39,1.25-2.36-.15-.98-.92-1.74-1.89-1.89l-8.14-1.21c-.69-.1-1.39.12-1.89.6-.06.06-.1.13-.16.19-.03.03-.05.06-.07.09-.06.08-.11.16-.16.25-.04.06-.07.13-.1.19-.03.07-.06.13-.08.2-.04.12-.07.23-.09.36,0,.03-.01.06-.02.08-.02.17-.03.35-.01.53l.32,2.95.2,1.89s0,.03.01.05l2.48,22.79c-10.72,4.79-17.87,9.98-21.31,12.8l-3.38-13.05,5.69-3.85c.82-.55,1.18-1.58.89-2.52-.29-.95-1.16-1.59-2.15-1.59h-8.07c-.24-.02-.49,0-.73.06-1.2.31-1.93,1.54-1.61,2.74l20.73,79.98h-3.41l-11.93-36.02c-.39-1.18-1.67-1.82-2.84-1.43-1.18.39-1.82,1.66-1.43,2.84l11.47,34.61h-14.54c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25h169.73c1.24,0,2.25-1.01,2.25-2.25s-1.01-2.25-2.25-2.25h-14.93l11.47-34.61c.39-1.18-.25-2.45-1.43-2.84-1.18-.39-2.45.25-2.84,1.43l-11.93,36.02h-3.41l19.06-73.53,6.54-.06c.99,0,1.85-.66,2.13-1.61.28-.95-.09-1.97-.91-2.51ZM197.96,126.67c10.22,5.06,16.34,10.17,18.03,11.67l-2.58,9.97c-2.37-2.07-8.58-6.89-19.24-11.32l1.26-11.53c.88.41,1.73.81,2.54,1.21ZM209.9,161.82c-2.4-1.52-8.2-4.83-17.57-7.97l1.32-12.09c11.91,5.17,17.52,10.59,17.67,10.74.25.25.55.42.86.53l-2.28,8.79ZM167.69,195.25v-22.38c0-3-1.89-5.7-4.71-6.7-3.97-1.42-10.39-2.14-19.07-2.14s-15.1.72-19.07,2.14c-2.82,1.01-4.71,3.7-4.71,6.7v22.38h-15.61l-4.16-38.19c9.96-2.99,24.55-5.91,43.54-5.91s33.58,2.92,43.55,5.91l-4.16,38.19h-15.61ZM144.1,182.74c-1.24,0-2.25,1.01-2.25,2.25v10.25h-17.23v-22.37c0-1.11.69-2.09,1.72-2.46,2.4-.85,7.38-1.87,17.56-1.87s15.16,1.02,17.56,1.87c1.03.37,1.72,1.36,1.72,2.46v22.37h-16.83v-10.25c0-1.24-1.01-2.25-2.25-2.25ZM143.91,146.65c-18.65,0-33.26,2.67-44.04,5.82l-1.36-12.52c10.27-3.85,25.33-7.53,45.41-7.53s34.6,3.5,45.4,7.58l-1.36,12.47c-10.78-3.16-25.4-5.82-44.04-5.82ZM75.63,153.03c.31-.11.61-.28.86-.53.05-.05,5.15-5.07,15.94-10.03.55-.25,1.13-.51,1.73-.77l1.32,12.14c-9.37,3.14-15.18,6.45-17.57,7.97l-2.28-8.79ZM143.91,114.57c20,0,35.95,4.39,47.19,9l-1.28,11.72c-11.12-4.04-26.25-7.37-45.92-7.37s-34.79,3.33-45.92,7.37l-1.28-11.72c11.25-4.61,27.19-9,47.19-9ZM89.86,126.67c.8-.4,1.66-.8,2.54-1.21l1.26,11.53c-10.66,4.44-16.87,9.25-19.24,11.32l-2.59-9.97c1.69-1.5,7.81-6.6,18.03-11.67ZM79.1,166.42c.07-.04.14-.07.21-.12.05-.04,5.36-3.83,15.92-7.57.24-.09.51-.17.76-.26l4.01,36.79h-13.42l-7.47-28.84ZM187.82,195.25l4.01-36.79c.25.09.52.17.76.26,10.56,3.74,15.87,7.53,15.92,7.57.07.05.14.07.21.11l-7.48,28.85h-13.42Z" />
    </svg>
  );
}

function AmusementIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M223.19,182.99c-.65-1.08-2.06-1.42-3.13-.77-.2.12-19.76,11.76-37.98,7.12-8.76-2.24-15.87-7.94-21.12-16.96-15.38-26.41-34.61-31.12-44.63-31.6v-39.53c0-1.37-.91-2.28-2.27-2.28h-39.59c-1.36,0-2.28.91-2.28,2.28v127.28c0,1.37.91,2.28,2.27,2.28h39.59s0,0,0,0,0,0,0,0h39.03c.17.04.34.07.52.07.41,0,.78-.11,1.11-.3.74-.35,1.2-1.08,1.2-2.04v-16.34h8.14v16.4c0,1.26,1.02,2.28,2.28,2.28s2.28-1.02,2.28-2.28v-16.4h8.17v16.4c0,1.26,1.02,2.28,2.28,2.28s2.28-1.02,2.28-2.28v-16.4h8.17v16.4c0,1.26,1.02,2.28,2.28,2.28s2.28-1.02,2.28-2.28v-16.4h8.17v16.4c0,1.26,1.02,2.28,2.28,2.28s2.28-1.02,2.28-2.28v-16.4h8.17v16.4c0,1.26,1.02,2.28,2.28,2.28s2.28-1.02,2.28-2.28v-40.89c1.68-.85,2.69-1.45,2.87-1.56,1.08-.65,1.42-2.05.77-3.13ZM138.59,165.59h-8.17v-16.64c2.62,1.17,5.36,2.7,8.17,4.7v11.95ZM138.59,170.15v9.21h-8.17v-9.21h8.17ZM125.85,179.37h-9.53v-9.21h9.53v9.21ZM116.32,183.93h9.53v9.03h-9.53v-9.03ZM130.42,183.93h8.17v9.03h-8.17v-9.03ZM143.15,183.93h8.17v9.03h-8.17v-9.03ZM155.88,192.96v-9.03h7.61c.16,0,.32-.02.47-.04.03.03.06.06.09.09v8.98h-8.17ZM160.11,179.37h-4.23v-6.56c.38.61.75,1.22,1.13,1.86.97,1.67,2.01,3.23,3.1,4.7ZM151.32,166.16v13.21h-8.17v-22.08c2.74,2.44,5.48,5.37,8.17,8.87ZM125.85,147.2v18.38h-9.53v-20.2c2.57.16,5.84.64,9.53,1.82ZM111.77,226.24h0s-35.04,0-35.04,0v-122.73h35.04v122.73ZM116.33,197.51h34.99v28.73h-8.53v-10.42c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v10.42h-8.43v-10.42c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v10.42h-8.93v-28.73ZM155.91,207.61v-10.1h8.14v10.1h-8.14ZM168.61,207.61v-19.67c2.53,1.86,5.26,3.35,8.17,4.48v15.2h-8.17ZM181.35,207.61v-13.77c2.73.67,5.47,1.01,8.17,1.11v12.65h-8.17ZM194.08,207.61v-12.69c2.83-.17,5.57-.57,8.17-1.11v13.8h-8.17ZM214.98,207.61h-8.17v-14.93c3.08-.88,5.85-1.91,8.17-2.89v17.82Z" />
    </svg>
  );
}

function EducationIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M234.65,173.73c-.38-.66-1.03-1.1-1.78-1.22l-27.67-4.37c1.06-1.33,1.6-2.73,1.6-4.19v-41.09l9.24-1.98v24.66c-1.24.75-2.09,2.09-2.09,3.65,0,2.36,1.91,4.27,4.27,4.27s4.27-1.91,4.27-4.27c0-1.5-.78-2.81-1.95-3.58v-25.7l8.4-1.8c1.95-.42,3.31-2.1,3.31-4.09,0-1.99-1.36-3.68-3.31-4.1l-79.87-17.13c-.58-.13-1.18-.13-1.76,0l-79.87,17.13c-1.95.42-3.31,2.1-3.31,4.1,0,1.99-1.36-3.68-3.31-4.09l22.14,4.75v41.09c0,5.64,8.04,10.42,22.63,13.45.62.13,1.25.19,1.88.19,1.51,0,3.03-.37,4.41-1.08,4.16-2.15,9.34-3.7,14.96-4.68.91.66,1.92,1.21,3.01,1.62l32.44,10.5c-.06,2.35.82,4.59,2.45,6.23l-4.38,11.52c-.36.95-.12,2.02.62,2.72.74.7,1.82.88,2.75.46l5.49-2.47,2.47,5.49c.41.91,1.3,1.48,2.28,1.48.03,0,.05,0,.08,0,.11,0,.22-.01.33-.03.88-.14,1.63-.75,1.94-1.59l5.97-15.71,22.58,9.89c2.06.78,4.28,1.01,6.45.66,4.43-.72,8.17-3.76,9.75-7.94l7.14-18.79c.27-.71.21-1.5-.17-2.15ZM89.57,118.25l-19.77-4.24,78.39-16.81,78.39,16.81-19.77,4.24-15.08,3.23-43.53,9.34-43.53-9.34-15.08-3.24ZM116.41,172.51c-1.03.54-2.21.71-3.3.48-13.97-2.9-19.04-7-19.04-9.04v-40.13l53.24,11.42c.29.06.59.09.88.09s.59-.03.88-.09l53.24-11.42v40.13c0,.83-.85,2-2.79,3.29l-7.26-1.15c-.11-.86-.32-1.62-.64-2.34-.93-2.08-2.62-3.67-4.75-4.48-2.22-.84-4.71-.7-6.87.4l-30.73-18.94c-.64-.39-1.43-.48-2.12-.24-.71.24-1.27.78-1.54,1.49l-2.06,5.41c-2.44-.41-4.91-.08-7.17.93-3.06,1.38-5.4,3.86-6.59,6.99l-.71,1.88c-1.19,3.14-1.09,6.55.28,9.61.17.38.36.74.56,1.09-5,1.07-9.61,2.6-13.48,4.61ZM187.11,168.51l-6.42,16.91c-.33.88-.99,1.58-1.85,1.96-.86.38-1.81.42-2.69.08-.88-.33-1.57-.99-1.96-1.85-.39-.86-.42-1.81-.08-2.69l6.42-16.91c.53-1.41,1.87-2.27,3.29-2.27.41,0,.83.07,1.24.23.88.33,1.58.99,1.96,1.85.39.85.41,1.81.08,2.69ZM165.24,156.48l-16.97-7.43.93-2.45,16.04,9.88ZM170.19,179.09l-32.07-10.38c-1.88-.71-3.37-2.12-4.2-3.96-.83-1.84-.89-3.89-.17-5.77l.71-1.88c.71-1.88,2.12-3.37,3.96-4.2,1.82-.81,3.88-.89,5.65-.22l30.99,13.58-4.87,12.82ZM180.4,200.32l-1.01-2.25c-.27-.6-.78-1.08-1.4-1.32-.29-.11-.59-.16-.89-.16-.35,0-.71.07-1.03.22l-2.25,1.01,2-5.27c.97.19,1.96.2,2.93.04,1.95-.31,3.72-1.3,5.03-2.78l.52.23-3.91,10.28ZM223.71,191.01l-.71,1.88c-1.48,3.88-5.79,5.86-9.62,4.41l-27.29-11.96,5.01-13.2,28.24,9.14c1.88.71,3.37,2.12,4.2,3.96.82,1.84.88,3.89.17,5.77ZM227.26,181.67c-1.46-2.36-3.6-4.11-6.25-5.12l-5.01-1.62,13.05,2.06-1.78,4.68Z" />
    </svg>
  );
}

function RealEstateIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M159.4,91.31c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M168.95,91.31c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36-.91,2.27,2.27,2.27Z" />
      <path d="M159.4,107.92c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M168.95,107.92c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36-.91,2.27,2.27,2.27Z" />
      <path d="M159.4,124.53c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36-.91,2.27,2.27,2.27Z" />
      <path d="M168.95,124.53c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36-.91,2.27,2.27,2.27Z" />
      <path d="M159.4,141.14c1.36,0,2.28-.91,2.28-2.27v-4.09c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v4.09c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M168.95,141.14c1.36,0,2.28-.91,2.28-2.27v-4.09c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v4.09c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M159.4,157.74c1.36,0,2.28-.91,2.28-2.27v-4.09c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v4.09c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M149.84,157.74c1.36,0,2.28-.91,2.28-2.27v-4.09c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v4.09c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M149.84,91.31c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36,1.14,2.27,2.27,2.27Z" />
      <path d="M149.84,107.92c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36,1.14,2.27,2.27,2.27Z" />
      <path d="M149.84,124.53c1.36,0,2.28-.91,2.28-2.27v-4.1c0-1.36-.91-2.27-2.28-2.27s-2.27.91-2.27,2.27v4.1c0,1.36,1.14,2.27,2.27,2.27Z" />
      <path d="M152.12,138.86v-4.09c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v4.09c0,1.36.91,2.27,2.27,2.27s2.28-.91,2.28-2.27Z" />
      <path d="M168.95,157.74c1.36,0,2.28-.91,2.28-2.27v-4.09c0-1.37-.91-2.28-2.28-2.28s-2.27.91-2.27,2.28v4.09c0,1.36.91,2.27,2.27,2.27Z" />
      <path d="M201.03,216.44h-5.01v-49.37c0-1.37-.91-2.28-2.27-2.28h-11.83v-91c0-1.37-.91-2.28-2.27-2.28h-39.59c-1.36,0-2.28.91-2.28,2.28v142.64h0s-6.51,0-6.51,0v-126.01c0-1.38-.83-2.61-2.12-3.12-1.29-.51-2.73-.19-3.68.82l-37.89,40.39c-.59.62-.91,1.44-.91,2.29v85.62h-4.65c-1.36,0-2.27.91-2.27,2.28s.91,2.27,2.27,2.27h118.55c1.36,0,2.27-.91,2.27-2.27s-.46-2.28-1.82-2.28ZM91.17,163.77l35.6-37.95v26.18l-35.6,37.95v-26.18ZM91.17,196.53l35.6-37.95v26.18l-29.15,31.07h-6.45v-19.3ZM126.78,191.33v24.49h-22.98l22.98-24.49ZM126.78,93.33v25.92l-35.6,37.95v-25.92l35.6-37.95ZM150.17,164.8c-1.36,0-2.27.91-2.27,2.28v49.37h-5.56V76.07h35.04v88.73h-27.2ZM181.08,216.34h-18.11v-18.71h18.11v18.71ZM191.47,216.44h-5.9v-20.97c0-1.29-1.05-2.33-2.33-2.33h-22.45c-1.29,0-2.33,1.05-2.33,2.33v20.97h-5.89v-47.09h38.9v47.09Z" />
    </svg>
  );
}

function HealthcareIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M191.89,169.63c0-1.24-1.01-2.25-2.25-2.25h-5.64v-5.64c0-1.24-1.01-2.25-2.25-2.25s-2.25,1.01-2.25,2.25v5.64h-5.64c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25h5.64v5.64c0,1.24,1.01,2.25,2.25,2.25s2.25-1.01,2.25-2.25v-5.64h5.64c1.24,0,2.25-1.01,2.25-2.25Z" />
      <path d="M208.61,123.89h-11.39v-4.2c0-1.24-1.01-2.25-2.25-2.25h-5.11c-.25-1.05-.75-2.28-1.75-3.36-1.49-1.62-3.63-2.44-6.34-2.44s-4.85.82-6.35,2.43c-1.01,1.08-1.52,2.31-1.78,3.37h-4.99c-1.24,0-2.25,1.01-2.25,2.25v4.2h-10.91c-2.32,0-4.2,1.89-4.2,4.2v67.29c0,2.32,1.89,4.2,4.2,4.2h22.99c-.7,3.46-1.79,5.73-3.36,7.29-4.53,4.5-14.73,4.42-33.26,4.29-3.46-.03-7.21-.05-11.27-.05-7.02,0-12.32-1.92-15.76-5.7-5.3-5.82-4.57-14.32-4.56-14.4,0-.07.01-.15.01-.22v-35.69c18.62-1.17,33.41-16.68,33.41-35.58v-35.58c0-1.24-1.01-2.25-2.25-2.25h-14.12c-.82-1.57-2.44-2.65-4.33-2.65-2.71,0-4.9,2.19-4.9,4.9s2.19,4.9,4.9,4.9c1.89,0,3.51-1.08,4.33-2.65h11.87v33.33c0,17.18-13.98,31.16-31.16,31.16h-3.04c-17.18,0-31.16-13.98-31.16-31.16v-33.33h12.07c.82,1.57,2.44,2.65,4.33,2.65,2.71,0,4.9-2.19,4.9-4.9s-2.19-4.9-4.9-4.9c-1.89,0-3.51,1.08-4.33,2.65h-14.32c-1.24,0-2.25,1.01-2.25,2.25v35.58c0,19.66,16,35.66,35.66,35.66h.79v35.52c-.1,1.25-.63,10.73,5.69,17.71,4.33,4.78,10.76,7.2,19.12,7.2,4.05,0,7.79.03,11.24.05,2.98.02,5.74.04,8.3.04,14.97,0,23.16-.67,28.16-5.64,2.51-2.49,3.95-5.95,4.77-10.49h25.55c2.32,0,4.2-1.88,4.2-4.2v-67.29c0-2.32-1.88-4.2-4.2-4.2ZM170.9,121.94h4.75c.62,0,1.2-.27,1.63-.71.42-.45.65-1.06.62-1.68,0-.01-.06-1.49.84-2.43.62-.65,1.64-.98,3.04-.98s2.41.33,3.02.97c.88.93.81,2.4.81,2.4-.05.63.16,1.25.59,1.71.43.46,1.03.73,1.65.73h4.88v6.16h-21.83v-6.16ZM181.77,182.18c-6.94,0-12.59-5.65-12.59-12.59s5.65-12.59,12.59-12.59,12.59,5.65,12.59,12.59-5.65,12.59-12.59,12.59ZM208.32,195.08h-24.66c.23-2.57.33-5.43.36-8.57,8.36-1.1,14.85-8.26,14.85-16.92,0-9.42-7.67-17.09-17.09-17.09s-17.09,7.67-17.09,17.09c0,8.65,6.47,15.81,14.83,16.92-.04,3.32-.16,6.15-.39,8.57h-23.33v-66.7h10.61v1.96c0,1.24,1.01,2.25,2.25,2.25h26.33c1.24,0,2.25-1.01,2.25-2.25v-1.96h11.09v66.7Z" />
    </svg>
  );
}

function GovernmentIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M217.4,190.1h-5.79v-9.61c0-2.17-1.77-3.94-3.94-3.94h-15.78v-35.6h12.77c1.24,0,2.25-1.01,2.25-2.25,0-15.32-8.88-26.89-25.69-33.47-12.98-5.08-27.79-6.08-35.36-6.22v-13.84h15.43c1.24,0,2.25-1.01,2.25-2.25v-9.75c0-1.24-1.01-2.25-2.25-2.25h-17.68c-1.24,0-2.25,1.01-2.25,2.25v25.84c-6.65.16-21.37,1.12-34.61,6.21-17.27,6.64-26.4,18.21-26.4,33.47,0,1.24,1.01,2.25,2.25,2.25h12.74v35.6h-15.74c-2.17,0-3.94,1.77-3.94,3.94v9.61h-5.79c-1.96,0-3.56,1.6-3.56,3.56v10.65c0,1.96,1.6,3.56,3.56,3.56h147.54c1.96,0,3.56-1.6,3.56-3.56v-10.65c0-1.96-1.6-3.56-3.56-3.56ZM174.52,176.55v-35.29h12.87v35.29h-12.87ZM170.02,176.55h-15.47v-35.6h15.47v35.6ZM137.18,176.55v-35.29h12.87v35.29h-12.87ZM159.04,80.66h-13.18v-5.25h13.18v5.25ZM108.36,109.42c14.34-5.51,30.62-5.94,35.26-5.94,6.25,0,22.25.58,35.95,5.94,14.29,5.59,21.94,14.68,22.76,27.03h-117.42c.85-12.28,8.72-21.37,23.44-27.02ZM132.68,140.95v35.6h-15.47v-35.6h15.47ZM99.84,141.25h12.87v35.29h-12.87v-35.29ZM216.46,203.38H70.8v-8.78h7.1c1.24,0,2.25-1.01,2.25-2.25v-11.3h18.18s.02,0,.03,0h15.83s.02,0,.03,0h21.46s.02,0,.03,0h15.83s.02,0,.03,0h21.46s.02,0,.03,0h15.83s.02,0,.03,0h18.21v11.3c0,1.24,1.01,2.25,2.25,2.25h7.1v8.78Z" />
    </svg>
  );
}

function AirportsIcon() {
  return (
    <svg viewBox="0 0 288 288" className="w-full h-full">
      <path d="M222.15,214.58h-7.89v-37.23c0-1.34-1.09-2.44-2.43-2.44h-18.52v-40.64h5.38l6.55-23.23v-.31c0-2.22-2.21-2.27-3.15-2.29-.57-.01-1.34-.02-2.1-.03-1.53-.02-3.07-.03-3.1-.03h-34.69s-1.57.01-3.1.03c-.77,0-1.53.02-2.1.03-.94.02-3.15.07-3.15,2.29v.31l6.55,23.23h5.38v40.64h-16.47v-25.76c0-1.38-.83-2.61-2.12-3.12-1.16-.46-2.45-.24-3.39.55l-67.69,40.28-.27.16-.22.23c-.59.62-.91,1.44-.91,2.29v6.94c0,.05-.02.1-.02.15s.01.1.02.15v17.8h-7.75c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25h155.2c1.24,0,2.25-1.01,2.25-2.25s-1.01-2.25-2.25-2.25ZM159.05,112.91c1.34-.02,2.74-.03,3.15-.03h34.69c.41,0,1.82.01,3.15.03l-4.75,16.86h-10.02v-7.93l-.03-2.28h-9.13l-2.28.03v10.18h-10.02l-4.75-16.86ZM178.32,129.73v-5.67h2.44v5.67h-2.44ZM170.27,174.83v-40.54h18.53v40.54h-18.53ZM149.32,179.41h60.44v35.13h-5.12v-12.51l-.05-2.3h-13.85l-2.3.05v14.76h-.8v-12.51l-.05-2.3h-13.85l-2.3.05v14.76h-.8v-12.51l-.05-2.3h-13.85l-2.3.05v14.76h-5.12v-35.13ZM192.94,214.47v-10.24h7.2v10.24h-7.2ZM175.94,214.47v-10.24h7.2v10.24h-7.2ZM158.94,214.47v-10.24h7.2v10.24h-7.2ZM79.2,198.88h65.6v15.67h-65.6v-15.67ZM144.8,151.21v23.73h-39.88l39.88-23.73ZM97.36,179.44h47.45v14.94h-65.6v-4.13l18.16-10.8Z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "stadiums & arenas": <StadiumsIcon />,
  "stadiums and arenas": <StadiumsIcon />,
  stadiums: <StadiumsIcon />,
  "amusement parks, hospitality & entertainment": <AmusementIcon />,
  "amusement parks": <AmusementIcon />,
  "higher education": <EducationIcon />,
  "commercial real estate": <RealEstateIcon />,
  healthcare: <HealthcareIcon />,
  "state & local government": <GovernmentIcon />,
  "state and local government": <GovernmentIcon />,
  government: <GovernmentIcon />,
  airports: <AirportsIcon />,
};

interface IndustryFallback {
  title: string;
  description: string;
  theme: string;
  bgImage: string;
  iconNode: React.ReactNode;
}

const INDUSTRIES: IndustryFallback[] = [
  {
    title: "Stadiums & Arenas",
    description:
      "We enable reliable wireless service for a better guest experience including enhanced fan engagement, public safety, mobile ticketing, concessions, and event operations.",
    theme: "teal",
    bgImage: "/assets/images/industry-stadiums.png",
    iconNode: <StadiumsIcon />,
  },
  {
    title: "Amusement Parks, Hospitality & Entertainment",
    description:
      "Our solutions provide high-quality wireless coverage for your guests, improving experience satisfaction, operational efficiency, and smart property technologies.",
    theme: "purple",
    bgImage: "/assets/images/industry-amusement.png",
    iconNode: <AmusementIcon />,
  },
  {
    title: "Higher Education",
    description:
      "Our solutions enable digital learning and enhance campus safety by keeping faculty and students connected.",
    theme: "amber",
    bgImage: "/assets/images/industry-education.png",
    iconNode: <EducationIcon />,
  },
  {
    title: "Commercial Real Estate",
    description:
      "We can help you improve connectivity on your property while accommodating the technologies that make your building more functional, efficient, and tenant friendly.",
    theme: "amber",
    bgImage: "/assets/images/industry-realestate.png",
    iconNode: <RealEstateIcon />,
  },
  {
    title: "Healthcare",
    description:
      "Our solutions improve connectivity for staff, patients, and medical professionals.",
    theme: "blue",
    bgImage: "/assets/images/industry-healthcare.png",
    iconNode: <HealthcareIcon />,
  },
  {
    title: "State & Local Government",
    description:
      "Municipalities can improve connectivity for their constituents and help agencies better serve their residents and first responders.",
    theme: "teal",
    bgImage: "/assets/images/industry-government.png",
    iconNode: <GovernmentIcon />,
  },
  {
    title: "Airports",
    description:
      "We enable connectivity that supports the high data demand for travelers, busy staff and back-of-house operations, and mobile ticketing, providing a better guest experience and enhanced safety.",
    theme: "purple",
    bgImage: "/assets/images/industry-airports.png",
    iconNode: <AirportsIcon />,
  },
];

export interface IndustryCard {
  title: string;
  description: string;
  icon?: string;
  image?: { url: string }[];
}

interface SolutionsIndustriesProps {
  data?: {
    title?: string;
    body?: string;
    cards?: IndustryCard[];
  };
}

export default function SolutionsIndustries({ data }: SolutionsIndustriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoDisabled, setIsAutoDisabled] = useState(false);

  // Merge dynamic data from Strapi with fallback themes/images/icons
  const displayIndustries = data?.cards?.length
    ? data.cards.map((item, index) => {
        const fallback =
          INDUSTRIES.find((ind) => ind.title.toLowerCase() === item.title.toLowerCase()) ||
          INDUSTRIES[index % INDUSTRIES.length];
        const iconKey = item.title.toLowerCase().trim();
        const iconNode = ICON_MAP[iconKey] || fallback.iconNode;
        return {
          title: item.title,
          description: item.description,
          iconNode,
          theme: fallback.theme,
          bgImage: item.image?.[0]?.url || fallback.bgImage,
        };
      })
    : INDUSTRIES;

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (isAutoDisabled) return;
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayIndustries.length);
    }, 5500);
  }, [isAutoDisabled, displayIndustries.length, stopAutoPlay]);

  useEffect(() => {
    if (!isAutoDisabled) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoDisabled, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      stopAutoPlay();
      setCurrentIndex(index);
    }, 200);
  };

  const handleClick = (index: number) => {
    setIsAutoDisabled(true);
    stopAutoPlay();
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!isAutoDisabled) {
      startAutoPlay();
    }
  };

  return (
    <section
      id="industries"
      className="relative overflow-hidden py-14 md:py-20 lg:py-24 bg-[#101830] border-none"
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images wrapper */}
      <div className="ind-bg-wrapper absolute left-0 top-0 w-full h-full lg:w-3/4 z-0 pointer-events-none overflow-hidden">
        {displayIndustries.map((industry, index) => (
          <Image
            key={index}
            className={`ind-bg-img absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0"
            }`}
            src={industry.bgImage || "/assets/images/industry-stadiums.png"}
            alt={industry.title}
            fill
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
        ))}
        {/* Gradient overlay inside wrapper: vertical fade on mobile, horizontal fade on desktop */}
        <div className="ind-bg-overlay absolute inset-0 z-[1] bg-gradient-to-b from-[#101830]/85 via-[#101830]/70 to-[#101830]/95 lg:bg-gradient-to-r lg:from-[#0a0e20]/80 lg:via-[#0a0e20]/50 lg:to-[#101830]" />
      </div>

      {/* Two-column layout: heading left, pillars right */}
      <div className="container mx-auto px-4 sm:px-6 relative z-[2]">
        <div className="ind-two-col grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-16 items-start">
          {/* LEFT: Section heading & description */}
          <div className="ind-col-left reveal w-full lg:max-w-[540px] lg:sticky lg:top-36">
            <Typography
              variant="h3"
              as="h2"
              uppercase
              weight="normal"
              className="section-title text-left text-white m-0 mb-3 md:mb-6 leading-tight tracking-[0.06em]"
            >
              {data?.title || "Industries That Require Advanced Connectivity"}
            </Typography>
            {data?.body ? (
              <div
                className="section-description strapi-richtext-body text-white/80 leading-relaxed text-left m-0"
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            ) : (
              <Typography
                variant="b1"
                as="p"
                className="section-description text-white/80 text-left m-0 leading-relaxed"
              >
                We partner with industries like yours, designing the right mix of small cells and
                DAS to meet performance, aesthetic, and operational requirements, all while
                leveraging our long-standing relationships with MNOs, utilities, public safety
                agencies, and more.
              </Typography>
            )}
          </div>

          {/* RIGHT: Industry pillars */}
          <div className="ind-col-right w-full flex flex-col justify-center">
            <div className="reveal ind-accordion-container flex flex-col gap-2.5 md:gap-3">
              {displayIndustries.map((industry, index) => {
                const isActive = index === currentIndex;
                const hasIcon = Boolean(industry.iconNode);
                return (
                  <div
                    key={index}
                    className={`ind-interactive-item group flex flex-col justify-start py-[14px] px-[12px] rounded-lg border transition-all duration-350 cursor-pointer ${
                      isActive
                        ? "border-[#00e8d9]/40 bg-[#0d1224]/90 shadow-lg"
                        : "border-white/10 bg-[#0d1224]/75 hover:border-[#00e8d9]/30 hover:bg-[#0d1224]/85"
                    }`}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <div className="ind-item-header flex items-center gap-3 min-h-[32px]">
                      {hasIcon && (
                        <span
                          className={`ind-icon-svg w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 transition-colors duration-350 [&>svg]:w-full [&>svg]:h-full ${
                            isActive
                              ? "[&>svg]:fill-[#00e8d9] [&>svg]:stroke-[#00e8d9]"
                              : "[&>svg]:fill-white/65 [&>svg]:stroke-white/65 group-hover:[&>svg]:fill-[#00e8d9] group-hover:[&>svg]:stroke-[#00e8d9]"
                          }`}
                        >
                          {industry.iconNode}
                        </span>
                      )}
                      <Typography
                        variant="h6"
                        as="h3"
                        uppercase
                        weight="normal"
                        className={`m-0 transition-colors duration-350 tracking-[0.12em] md:tracking-[0.15em] text-sm sm:text-base ${
                          isActive ? "text-[#00e8d9]" : "text-white group-hover:text-[#00e8d9]"
                        }`}
                      >
                        {industry.title}
                      </Typography>
                    </div>
                    <div
                      className={`ind-expand-desc overflow-hidden transition-all duration-500 ${
                        hasIcon ? "pl-9 md:pl-10" : "pl-0"
                      } ${isActive ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
                    >
                      <Typography
                        variant="b3"
                        as="span"
                        className="text-white/70 block leading-relaxed text-xs sm:text-sm"
                      >
                        {industry.description}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
