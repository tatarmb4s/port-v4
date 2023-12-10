import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Avatar,
  Button,
  TimelineFooter,
} from "@material-tailwind/react";

import njit from "../assets/Neumann_Janos_Informatikai_Technikum.webp";
import fp from "../assets/FizetesiPont.png";
import nokia from "../assets/nokia.jfif";
import t42cloud from "../assets/t42-cloud.png";
import hajo from "../assets/hajo.png";
import sally from "../assets/sally.png";
import PowerShellPrew from "../assets/PowerShellPrew.png";
import KabelekPrew from "../assets/KabelekPrew.png";


export default function TimelinecS() {

  const munkaim = [
    {
      name: "T42 Projekt",
      content:
        "Ez egy mesterséges intelligencia rendszer lesz, mely teljeskörű digitális asszisztensként funkcionál, emellett mely segít a vak és mozgáskorlátozott embereknek. A cégeknek lehetőségük lesz használni belső védett adataikat benne, annélkül, hogy azok kikerülnének az internetre.",
      image: t42cloud,
      codeUrl: "",
      demo: "https://ai.t42.hu/",
    },
    {
      name: "Kétszemélyes Torpedó",
      content:
        "A klasszikus torpedó játék, csak a neten. Jelenleg két játékos játszhat vele stabilan. Mivel még előfordulnak benne bugok, ezeket kéretik nem kihasználni.",
      image: hajo,
      codeUrl: "",
      demo: "http://torpedo.t42.hu/",
    },
    {
      name: "Szelektív üveggyűjtés - okos kuka",
      content:
        "A Comper (más néven nevén: Sally) egy iskolákon belüli szelektív szemétgyűjtésre buzdító projekt. Ez egy alkalmazásból, okos kukából, ahhoz tartozó kezelő felületből, és egy weboldalból áll. Az alkalmazásban pontokat gyűjthetünk, melyeket beválthatunk különböző jutalmakra. A pontokkal versenyezhetünk több szinten. Az iskola hirdethet különleges időszakot is, melyben többet érhet egy bedobás. Kooperáció: Balogh Levente, Takács Zoltán",
      image: sally,
      codeUrl: "",
      demo: "",
    },
    {
      name: "PowerShell scriptek",
      content:
        "A saját PowerShell script gyűjteményem segít automatizálni és adatokat kinyerni a Windows rendszerből. Pl. Akkumulátor töltés figyelő, AutoTyper, ComputerInfo+WiFiData, stb.",
      image: PowerShellPrew,
      codeUrl: "https://github.com/tatarmb4s/PowerShellScripts",
      demo: "",
    },
    {
      name: "Codászok: Kábelek",
      content:
        "Egy iskolai projekt, amelyben ismertetjük a hétköznapokban használt kábelek legtöbbjét. Három társammal írtuk a szöveget.",
      image: KabelekPrew,
      codeUrl: "https://github.com/tatarmb4s/codaszok-kabelek",
      demo: "https://kabelek_codaszok.tatarmb.hu/",
    },
    {
      name: "Fizetési Pont Terminálüzemeltető Kft.",
      content:
        "Itt dolgoztam 2022-ben és 2023 elején, folyamatfejlesztőként. Legtöbbet a WorkflowGen rendszerrel foglalkoztam, és tanítottam be a kollégákat is. Emellett a cég életét könnyítő scripteket és egy RPA Robotot írtam, mely segít megfékezni, és időben észre venni egy támadást a kártyarendszer ellen.",
      image: fp,
      codeUrl: "",
      demo: "https://fizetesipont.hu",
    },
    {
      name: "Nokia Hackathon 2023",
      content:
        "A NOKIA által Magyarországon meghirdetett Hackathon versenyen különdíjat kaptam OpenAI GPT-3.5-turbo modell használatáért és betanításáért. A feladat, egy Pizza rendelő chatbot készítése volt. Emellett még készítettem Snake rekreációt és Double generátort is.",
      image: nokia,
      codeUrl: "https://github.com/tatarmb4s/hck-2023",
      demo: "https://www.youtube.com/watch?v=gEa2xLy4xS0",
    },
    {
      name: "Neumann János Informatikai Technikum",
      content:
        "2021-ben nyertem felvételt, ahol jelenleg is tanulok okleveles Szoftverfejlesztő és -tesztelő szakon.",
      image: njit,
      codeUrl: "",
      demo: "",
    },
  ];

  return (
    <div name='timeln' className="w-full min-h-screen mt-52 mb-32 md:mb-96 md:mt-60 lg:mt-0 bg-background text-gray-300 szunet">
      <hr className="elvalaszto w-[50%]" />
      <div className="flex flex-col justify-center items-center w-full ">
        <div className="sm:text-right pb-[6rem] pl-4">
      
          <div>
              <p className='secondary-title'>Eredményeim</p>
              <p className='py-4'>Projektek, Versenyek, Munkahelyek, Iskolák</p>
          </div>
        </div>
        <div className="md:w-[32rem]  w-[23rem] text-gray-300">
          <Timeline>

            {munkaim.map((munka, index) => (
              <TimelineItem key={index} name={munka.name}>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon className="p-0">
                    <Avatar size="sm" className="nobackgr" src={munka.image} alt={munka.name}  />
                  </TimelineIcon>
                  <Typography variant="h5" className="text-gray-400">
                    {munka.name}
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                  <Typography color="" className="font-normal text-gray-300">
                    {munka.content}
                
                    <br />
                    {munka.codeUrl != "" && (
                      <a href={munka.codeUrl} target="_blank">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          href={munka.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 mt-4"
                        >
                          Kód
                        </Button>
                      </a>
                    )}
                    {munka.demo != "" && (
                      <a href={munka.demo} target="_blank">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          href={munka.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 mt-4"
                        >
                          Demo
                        </Button>
                      </a>
                    )}
                  </Typography>
                </TimelineBody>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
}