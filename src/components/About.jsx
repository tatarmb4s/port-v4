import React from 'react'
import { Link } from 'react-scroll';

const About = () => {
  return (
    <div name='about' className='w-full lg:h-screen bg-background text-gray-300 szunet'>
        <hr className="elvalaszto w-[50%]" />
        <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="sm:text-right pb-8 pl-4">
                    <h1 className='secondary-title ml-[-4rem]'>Rólam</h1>
                </div>
            <div className="max-w-[1000px] w-full px-4 grid grid-cols-2 gap-8">
                <div></div>
            </div>
            <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4">
                <div className="sm:text-right text-2xl font-bold">
                    <p>Kedves, proaktív, kitartó</p>
                </div>
                <div className="">
                    <p>Szinte minden érdekel, ami az IT-vel kapcsolatos, legyen az hardver vagy szoftver. 
Harmadikos korom óta programozom, általában Windows  Host és Debian környezet alatt. Írtam programot C#-ban, scriptet PowerShell-ben és MS-SQL-ben. OpenAI GPT modelleket tanítok be. Célom egy egyedi komplex M.I-s platformot készíteni, mellyel a legtöbb online feladatot ellátható. 
Korábban foglalkoztam LEGO EV3 robototokkal és voltam a 2019-es WRO (World Robot Olimpic) versenyen is. 
Különdíjas lettem a 2023-as tavaszi Nokia Hackaton versenyen, az akkor gyerekcipőben is alig lévő LangChain + llama-index embedder + OpenAI API használatáért.

                        <br />
                        <br />
                        Jelenleg többnyire valamilyen magas szintű biztonsági követelményeket teljesítő mesterséges intelligencia alapú projekt fejlesztésében veszek részt, melyeket többnyire TypeScriptben írok. A mesterséges intelligencián belül a text-to-speech és a speech-to text, a large-language modellek, és az image-to-text technológiák vonzanak. Célom, ezekben minnél több tudást és tapasztalatot szerezni.
                    </p>
                </div>
            </div>
            
            <div className="mt-8">
                <Link to='skills' smooth={true} duration={500}>
                    <button className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-head1 hover:border-head1 duration-150'>
                        Ismereteimet részletesen itt láthatja
                        <span className='group-hover:rotate-90 group-hover:mt-[-9px] group-hover:ml-[9px] duration-150'>
                            <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default About