import React from "react"

export const Input = React.forwardRef(({ label, error,...rest},ref) => (
    <>
      <label className="form-label"ref={ref}>{label}</label>
      <input className="form-control"ref={ref}{...rest}/>
      {error&&<p className="text-danger">{error}</p>}
    </>
  ));