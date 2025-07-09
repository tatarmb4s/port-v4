import React, { useState, useEffect, useRef  } from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-scroll';
// import ChatPanel from './ChatPanel2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

let isSendedOnece = false;
const Home = ({ handleChatToggle }) => {
  const dater = JSON.parse(localStorage.getItem('data'));
  let isExpired = false;
  if (dater === null) {
    const data = {
      value: 'your data here',
      expiry: new Date().getTime() + 2 * 60 * 60 * 1000 // 2 hours from now
    };
    localStorage.setItem('data', JSON.stringify(data));
    isExpired = true;
  } else if (dater.expiry < new Date().getTime()) {
    isExpired = true;
  }
  else {
    isExpired = false;
    let ipA = localStorage.getItem('ipA');
    let ipD = localStorage.getItem('ipD');
    let ipDJSON = localStorage.getItem('ipDJSON');
    
    if (!isSendedOnece) {
      console.log("isSendedOnece");
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(`https://chatapi.tatarmb.hu/api/Visit/?ipa=${encodeURIComponent(ipA)}&ipd=${encodeURIComponent(ipDJSON)}`, requestOptions)
      .catch(error => console.log('error', error));
      isSendedOnece = true;
    }
  }
  if (!isSendedOnece | localStorage.getItem('ipA') === null | localStorage.getItem('ipA') === "Limit elérve az ip címre" && isExpired) {
    
    let ipA = "0.0.0.0"
    let ipD = "alma";
    let ipDJSON = "alma";
    fetch('https://api.ipregistry.co/?key=74689t4e6vggpsua&hostname=true')
    .then(res => res.json())
    .then(res => {
      if (res.code === "TOO_MANY_REQUESTS") {
        localStorage.setItem('ipA', "Limit elérve az ip címre");
      } else {
        let ip = JSON.stringify(res.ip);
        ipA = res.ip;
        let host = JSON.stringify(res.hostname);
        let brw = JSON.stringify(res.user_agent.header);
        let l = JSON.stringify(res.location);
        ipD = (JSON.stringify(res));
        ipD = ip+host+brw+l;
        // console.log(ipD);
        ipDJSON = JSON.stringify(res);
        localStorage.setItem('ipA', res.ip);
        localStorage.setItem('ipD', JSON.stringify(res));
        localStorage.setItem('ipDJSON', JSON.stringify(res));
        var myHeaders = new Headers();
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`https://chatapi.tatarmb.hu/api/Visit/?ipa=${encodeURIComponent(ipA)}&ipd=${encodeURIComponent(ipDJSON)}`, requestOptions)
        .catch(error => console.log('error', error));
      }
    });
    isSendedOnece = true;
              
  }


  return (
    <div name='home' className='w-full lg:h-screen md:pt-auto bg-background szunet'>
      {/*Container*/}
      <div className="max-w-[1000px] mx-auto px-8 pt-20 flex flex-col justify-center h-full">

        <p className='text-koszones'>Üdvözlöm a weboldalamon, nevem</p>
        <h1 className='text-4xl sm:text-7xl font-bold text-head1 '>Tatár Mátyás Bence</h1>
        <h2 className='text-3xl sm:text-6xl font-bold text-head2'>IT Student at NJIT</h2>
        <p className='text-head2 py-4 max-w-[700px]'><span className="text-red-500 font-bold">Karbantartás miatt jelenleg Egyes funkciók nem működnek az oldalaimon.<br></br></span>Jelenleg tanuló vagyok a Neumann János Informatikai Technikumban okleveles Szoftverfejlesztő és -tesztelő szakon. <br></br><br></br>  Pillanatnyilag a mesterséges intelligencia és a neurális hálózatok foglalkoztatnak, ezekről próbálok minél többet tanulni. <br></br><br></br> Hosszútávú célom Full Stack fejlesztő lenni, Mesterséges Intelligencia, Web és asztali / mobil alkalmazások terén. Elkötelezett vagyok az IT Security - Secure Software és self-hosting enterprise megoldások iránt.<br></br> <br></br>A weboldalon működik egy nyelvi modell (LLM), amely ezen referencia alapján állapítja meg a programozási nyelvi szintet: <a target='_blank' className='text-aiMsg1 underline underline-offset-4' href="https://dr-knz.net/programming-levels/prog-skill-matrix.png">Programming Levels</a></p>
        <Link to='' onClick={handleChatToggle} smooth={true} duration={500}>
          <div className="">
            <button className='text-white group border-aiMsg1 rounded-xl border-2 px-6 py-3 my-2 flex items-center hover:bg-gradient-to-r from-aiMsg2 to-aiMsg1 ml-3 hover:border-head1 duration-150'>
            LLM Kipróbálása
            <span className='group-hover:rotate-90 group-hover:mt-[-9px] group-hover:ml-[9px] duration-150'>
              <FontAwesomeIcon icon={faRobot} className='ml-3 group-hover:hidden text-aiMsg1' />
              
              <FontAwesomeIcon icon={faRobot} className='hidden group-hover:flex ml-3'  />
              
            </span>
            </button>
          </div>
        </Link>            
        <Link to='timeln' smooth={true} duration={500}>
          <div className="">
            <button className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-head1 hover:border-head1 duration-150'>
            Eredményeim megtekintése
            <span className='group-hover:rotate-90 group-hover:mt-[-9px] group-hover:ml-[9px] duration-150'>
              <HiArrowNarrowRight className='ml-3 group-hover:hidden' />
              <HiArrowNarrowRight className='hidden group-hover:flex ml-3'  />
            </span>
            </button>
          </div>
        </Link>            
      </div>
    </div>
  )
}

export default Home
