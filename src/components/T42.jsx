import {
  Avatar
} from "@material-tailwind/react";
import React, { useState, useEffect, useRef  } from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-scroll';
import ChatPanel from './ChatPanel2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import t42ai from "../assets/t42ai.png";
import t42cloud from "../assets/t42-cloud.png";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

let isSendedOnece = false;
const T42 = ({ handleChatToggle }) => {



  return (
    <div name='T42' className='w-full h-screen bg-background szunet'>
      {/*Container*/}
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <p className='text-koszones'>Ezennel bemutatom a</p>
        <h1 className='mt-2 text-4xl sm:text-7xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-aiMsg1 via-pink-500 to-red-500 '>
          

          <Avatar size="xl" className="mr-2 mb-2 hover:animate-spin nobackgr" src={t42cloud} alt={"T42"}  />
          T42<span className="text-3xl">.hu</span>
        </h1>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Multi modell systemet
        </h1>

        {/* <h2 className='text-3xl sm:text-6xl font-bold text-head2'>IT Student at NJIT</h2> */}
        <p className='text-head2 py-4 max-w-[700px]'>Röviden ismertetve, a cél első körben egy text-to-speech, speech-to-text, video-to-text modell családot létrehozni. Hosszútávú célom pedig egy text/voice/image/video-to-text/voice/image modell létrehozása. <br></br><br></br>  A rendszer rendelkezni fog az okos otthonok és a teljes értékű virtuális asszisztens minden funkciójával. Emellett segít majd a vak és mozgáskorlátozott embereknek is. Cégek számára is elérhető lesz, támogatva azt, hogy a belsős cégadatok ne kerüljenek ki. 2019 óta dolgozom rajta. <br></br><br></br> 
        <ul>              

          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Vállalati használatra alkalmas</li>
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Kiemelt adatvédelem</li>
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Self hosztolható</li>
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Könnyen használható</li>
{/* 
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Enterprise ready features</li>
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Privacy-focused</li>
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Self hosted version</li>
          <li><FontAwesomeIcon icon={faSquareCheck} className='ml-3 group-hover:hidden text-zold' /> Easy to use</li> */}

        </ul>
         <br></br> </p>
        <a href='https://ai.t42.hu/' target='_blank' onClick={handleChatToggle} smooth={true} duration={500}>
          <div className="">
            <button className='text-white group border-aiMsg1 rounded-xl border-2 px-6 py-3 my-2 flex items-center hover:bg-gradient-to-r from-aiMsg2 to-aiMsg1 ml-3 hover:border-head1 duration-150'>
            T42 AI Kipróbálása
            <span className='group-hover:rotate-90 group-hover:mt-[-9px] group-hover:ml-[9px] duration-150'>
              {/* <FontAwesomeIcon icon={faRobot} className='ml-3 group-hover:hidden text-aiMsg1' /> */}
              <Avatar size="sm" className=" ml-3 hover:animate-spin nobackgr hover:shadow-glow" src={t42cloud} alt={"T42"}  />

              
              {/* <FontAwesomeIcon icon={faRobot} className='hidden group-hover:flex ml-3'  /> */}
              
            </span>
            </button>
          </div>
        </a>            
        {/* <Link to='timeln' smooth={true} duration={500}>
          <div className="">
            <button className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-head1 hover:border-head1 duration-150'>
            Eredményeim megtekintése
            <span className='group-hover:rotate-90 group-hover:mt-[-9px] group-hover:ml-[9px] duration-150'>
              <HiArrowNarrowRight className='ml-3 group-hover:hidden' />
              <HiArrowNarrowRight className='hidden group-hover:flex ml-3'  />
            </span>
            </button>
          </div>
        </Link>             */}
      </div>
    </div>
  )
}

export default T42
