import { forwardRef } from "react";

export const ExampleCustomInput = forwardRef(({ value, onClick, className }, ref) => (
  <button className={className} onClick={onClick} ref={ref}>
    {value}
  </button>
))
