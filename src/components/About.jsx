import React from 'react'

const About = () => {
  return (
    <div name='about' className='w-full md:h-screen bg-background text-gray-300 szunet'>
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
                    <p>Kedves, proaktív, kitartó, nem hagyja félbe azt amibe belekezdett</p>
                </div>
                <div className="">
                    <p>Szinte minden érdekel, ami az IT-vel kapcsolatos, legyen az hardver vagy szoftver. 
                        9 éves korom óta tanulok programozni, alapesetben Windows OS-t futtató számítógépen. Írtam programot C#-ban, scriptet PowerShell-ben és MS-SQL-ben. Tudok programozni JavaScriptben, Pythonban és C#-ban.
                        Tudok LEGO EV3 robotot programozni, mellyel részt vettem a 2019-es WRO (World Robot Olimpic) verseny mellett más robotversenyen is.
                        <br />
                        <br />
                        Jelenleg többnyire valamilyen mesterséges intelligencia alapú projekt fejlesztésében veszek részt, melyeket többnyire Pythonban írok. A mesterséges intelligencián belül a text-to-speech és a speech-to text, a large-language modellek, és az image-to-text technológia. Célom, ezekben minnél több tudást és tapasztalatot szerezni.
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default About