import React from 'react';

import HTML from '../assets/html.png';
import CSS from '../assets/css.png';
import JavaScript from '../assets/javascript.png';
import Node from '../assets/node.png';
import AWS from '../assets/aws.png';
import GitHub from '../assets/github.png';
import Csharp from '../assets/csharp.png';
import PowerShell from '../assets/PowerShell.png';
import Azure from '../assets/Microsoft_Azure.svg.png';
import MSSQL from '../assets/mssql.png';
import Windows from '../assets/windows.png';
import python from '../assets/python.png';
import Office from '../assets/Office.webp';
import langchain from "../assets/langchain.png";
import llama_index from "../assets/llama-index.png";
import reacLogo from "../assets/react.png";
import openaiLogo from "../assets/openai.png";
import tailwindLogo from "../assets/tailwind.png";
import cpp from "../assets/cpp.png";

const Skills = () => {
  return (
    <div name='skills' className='szunet w-full md:h-screen bg-mainColor text-gray-300 '>
        <hr className="elvalaszto w-[30%]" />
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full '>
          <div>
              <p className='secondary-title'>Ismereteim</p>
              <p className='py-4'>Az alábbi technológiákkal dolgoztam eddig, melyekben szintemet a következő táblázat alapján határoztam meg: <a target='_blank' className='text-aiMsg1 underline underline-offset-4' href="https://dr-knz.net/programming-levels/prog-skill-matrix.png" target="_blank">Programming Levels</a></p>
          </div>

          <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={HTML} alt="HTML icon" />
                  <p className='my-4'>HTML <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={CSS} alt="CSS" />
                  <p className='my-4'>CSS <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={JavaScript} alt="JavaScript" />
                  <p className='my-4'>JavaScript <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Node} alt="Node JS" />
                  <p className='my-4'>Node JS <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={reacLogo} alt="React JS" />
                  <p className='my-4'>React JS <br></br><span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={tailwindLogo} alt="Tailwind CSS" />
                  <p className='my-4'>Tailwind CSS <br /> <span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={GitHub} alt="GitHub" />
                  <p className='my-4'>GitHub <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Azure} alt="Microsoft Azure" />
                  <p className='my-4'>Microsoft Azure <br /> <span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Csharp} alt="C#" />
                  <p className='my-4'>C# <br /> <span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={MSSQL} alt="MSSQL" />
                  <p className='my-4'>MSSQL <br /> <span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Windows} alt="Microsoft Windows Server" />
                  <p className='my-4'>Microsoft Windows Server <br /> <span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={PowerShell} alt="Windows PowerShell" />
                  <p className='my-4'>Windows PowerShell <br /> <span className='text-orange-400'>B2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={python} alt="Python" />
                  <p className='my-4'>Python <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={langchain} alt="LangChain" />
                  <p className='my-4'>LangChain <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={openaiLogo} alt="Open AI" />
                  <p className='my-4'>Open AI <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={llama_index} alt="llama-index" />
                  <p className='my-4'>llama-index <br></br><span className='text-green-500 font-bold'>C1</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={cpp} alt="Arduino: C++" />
                  <p className='my-4'>Arduino: C++ <br></br><span className='text-yellow-500'>A2</span></p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Office} alt="Office" />
                  <p className='my-4'>Office <br /> <span className='text-red-300'>ECDL</span></p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Skills;