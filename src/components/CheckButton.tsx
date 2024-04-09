type CheckButtonProp = {
    handleSubmit : () => void,
    checkButtonRef: React.MutableRefObject<HTMLButtonElement | null>,
}

function CheckButton({ handleSubmit, checkButtonRef } : CheckButtonProp ) {

  return (
    <>
      <button 
        type="button" 
        className="p-2 text-lg bg-green-400 rounded-md text-white font-semibold opacity-75 focus:outline-green-600 hover:opacity-100 duration-150" 
        ref={checkButtonRef}
        onClick={handleSubmit}
      >
        SUSIHA
      </button>
    </>
  )
}

export default CheckButton