interface FunctionProp {
    handleSubmit : () => void;
}

function CheckButton({ handleSubmit } : FunctionProp ) {
  return (
    <>
        <button 
            type="button" 
            className="p-2 text-lg bg-green-400 rounded-md text-white font-semibold opacity-75 focus:outline-green-600 hover:opacity-100 duration-150" 
            onClick={handleSubmit}
            >
            CHECK
        </button>
    </>
  )
}

export default CheckButton