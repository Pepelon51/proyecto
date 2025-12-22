import React from 'react'

const SpinnerComponent =() => {
  return(

    <div
  className="h-2 w-2 animate-spin rounded-full border-2 border-solid border-e-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...
    </span>
</div>
  )
}

export default SpinnerComponent