import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import React, { useRef } from "react";
/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClick);
  return (
    <div className={props.className || ""} ref={wrapperRef}>
      {props.children}
    </div>
  );
}
