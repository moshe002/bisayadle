interface WinnerModalProps {
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ 
    setIsCorrect 
  }) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-400 bg-opacity-20 backdrop-filter backdrop-blur-sm">
      <div className="rounded-lg p-7 opacity-100 text-center bg-white shadow-2xl">
          <h1 className='text-3xl font-bold text-black'>DAUG KA!</h1>
          <br />
          <h1 className='text-3xl font-bold text-black'>CONGRATS! &#129395; &#127881;</h1>
          <br />
          <button 
            type='button' 
            className='p-3 bg-green-400 text-white rounded-md font-semibold'
            onClick={() => {
              setIsCorrect(false);
            }}
            >
              CLOSE
          </button>
      </div>
    </div>
  )
}

export default WinnerModal