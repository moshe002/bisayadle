import FB_LOGO from '../assets/fblogo.png'

function Creator() {
  return (
    <div className="flex flex-row items-center justify-center">
        <h1 className="text-sm font-bold">Gihimo ni:</h1>
        <a 
          href="https://www.facebook.com/mosesanthony873" 
          rel="noopener" 
          target="_blank"
          title="Gwapo raba ni buyag"
          className="flex text-sm hover:text-green-500 duration-150 font-normal"
          >
          &nbsp;
          Moses Anthony Y. Fat
          &nbsp;
          <img className='mt-0.5 w-4 h-4' src={FB_LOGO} alt="fb_logo" />
        </a>
    </div>
  )
}

export default Creator