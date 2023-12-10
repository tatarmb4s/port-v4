import React from 'react'

const Contact = () => {
  return (
    <div className="szunet w-full md:h-screen">
      <hr className="elvalaszto w-[30%]" />
      <div name='contact' className='w-full md:h-screen bg-[#173257] flex justify-center items-center p-4'>
          <form method='POST' action="https://getform.io/f/fad4cd15-130b-495d-9c14-06e8cc339d7c" className='flex flex-col max-w-[600px] w-full'>
              <div className='pb-8 pt-16'>
              <h1 className='secondary-title text-gray-300'>Kapcsolat</h1>
                  <p className='text-gray-300 py-4'>Töltsd ki az űrlapot, vagy írj e-mailt a <a href="mailto:tatar.matyas.bence4c@hotmail.com'">tatar.matyas.bence4c@hotmail.com</a> címre</p>
              </div>
              <input className='bg-[#ccf6f0] p-2' type="text" placeholder='Név' name='name' />
              <input className='my-4 p-2 bg-[#ccf6f0]' type="email" placeholder='Email' name='email' />
              <textarea className='bg-[#ccf6f0] p-2' name="message" rows="10" placeholder='Üzenet'></textarea>
              <button className='text-white border-2 hover:bg-head1 hover:border-head1 duration-150 px-4 py-3 my-8 mx-auto flex items-center'>Elküldés</button>
              
          </form>
      </div>
    </div>
  )
}

export default Contact