import React from 'react';

import HTML from '../assets/html.png';
import CSS from '../assets/css.png';
import JavaScript from '../assets/javascript.png';
import TypeScript from '../assets/typescript.png';
import NextJS from '../assets/nextjs.png';
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
import M365 from "../assets/Microsoft_365.png";
import trpc from '../assets/trpc.svg'
import Bun from "../assets/bun.png"
import OpenIDC from "../assets/openidc.png"
import OAuth2 from "../assets/oauth2.png"
import ShadCN from "../assets/shadcn.png"
import Coolify from "../assets/coolify-logo.png"
import Proxmox from "../assets/proxmox.png"

const skills = [
  { name: 'HTML', level: 'C1', src: HTML },
  { name: 'CSS', level: 'C1', src: CSS },
  { name: 'JavaScript', level: 'C1', src: JavaScript },
  { name: 'TypeScript', level: 'C1', src: TypeScript },
  { name: 'NextJS', level: 'B2', src: NextJS },
  { name: 'React JS', level: 'B2', src: reacLogo },
  { name: 'tRPC', level: 'A2', src: trpc },
  { name: 'ShadCN', level: 'B2', src: ShadCN },
  { name: 'Tailwind CSS', level: 'C1', src: tailwindLogo },
  { name: 'bun.sh', level: 'B2', src: Bun },
  { name: 'Node JS', level: 'C1', src: Node },
  { name: 'GitHub', level: 'C1', src: GitHub },
  { name: 'Microsoft Azure', level: 'B2', src: Azure },
  { name: 'C#', level: 'C1', src: Csharp },
  { name: 'MSSQL', level: 'B2', src: MSSQL },
  { name: 'Microsoft Windows Server', level: 'B2', src: Windows },
  { name: 'Windows PowerShell', level: 'B2', src: PowerShell },
  { name: 'Python', level: 'C1', src: python },
  { name: 'LangChain', level: 'C1', src: langchain },
  { name: 'Open AI', level: 'C1', src: openaiLogo },
  { name: 'llama-index', level: 'C1', src: llama_index },
  { name: 'Arduino: C++', level: 'A2', src: cpp },
  { name: 'Microsoft 365 Enterprise', level: 'B2', src: M365 },
  { name: 'OpenID Connect (FAPI 2.0)', level: 'B2', src: OpenIDC },
  { name: 'OAuth 2.1 (FAPI 2.0)', level: 'B2', src: OAuth2 },
  { name: 'Coolify', level: 'A2', src: Coolify },
  { name: 'Proxmox', level: 'A2', src: Proxmox },
//   { name: 'Office', level: 'ECDL', src: Office },
  // Add all other skills here...
];

const getColor = (level) => {
    switch (level) {
      case 'C1':
        return 'text-green-500 font-bold';
      case 'B2':
        return 'text-orange-400';
      case 'A2':
        return 'text-yellow-500';
      default:
        return 'text-red-300';
    }
  };
  
  const Skills = () => {
    return (
      <div name='skills' className='szunet w-full lg:h-screen bg-mainColor text-gray-300 '>
        <hr className="elvalaszto w-[30%]" />
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full '>
          <div>
            <p className='secondary-title'>Ismereteim</p>
            <p className='py-4'>Az alábbi technológiákkal dolgoztam eddig, melyekben szintemet a következő táblázat alapján határoztam meg: <a target='_blank' className='text-aiMsg1 underline underline-offset-4' href="https://dr-knz.net/programming-levels/prog-skill-matrix.png">Programming Levels</a></p>
          </div>
  
          <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
            {skills.map((skill, index) => (
              <div key={index} className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={skill.src} alt={skill.name} />
                <p className='my-4'>{skill.name} <br /><span className={getColor(skill.level)}>{skill.level}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Skills;