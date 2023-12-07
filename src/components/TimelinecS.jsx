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
import t42ai from "../assets/t42ai.png";
import hajo from "../assets/hajo.png";
import sally from "../assets/sally.png";
import PowerShellPrew from "../assets/PowerShellPrew.png";
import KabelekPrew from "../assets/KabelekPrew.png";


export default function TimelinecS() {

  const munkaim = [
    {
      name: "T42 Projekt",
      content:
        "Ez egy mesterséges inteligencia lesz, mely segít a vak, és mozgáskorlátozott embereknek, illetve az otthoni rendszreket vezérli. Egy aszisztens amely képes beszélni a Microsoft Azure segítségével. Egyedileg tanított gpt-3.5-turbo és gpt-4 modelleket használ majd.",
      image: t42ai,
      codeUrl: "",
      demo: "https://ai.t42.hu/",
    },
    {
      name: "Fizetési Pont Terminálüzemeltető Kft.",
      content:
        "Itt dolgozom 2022-től, folyamatfejlesztőként. Legtöbbet a WorkflowGen rendszerrel foglalkoztam, és tanítottam be a kollégákat is. Emellett a cég életét könnyítő scripteket írtam, és egy RPA Robotot, mely segít megfékezni, és időben észrevenni egy támadást a kártyarendszer ellen.",
      image: fp,
      codeUrl: "",
      demo: "https://fizetesipont.hu",
    },
    {
      name: "Nokia Hackaton 2023",
      content:
        "A NOKIA által magyar országon meghírdetett Hackaton versenyen küldöndíjat kaptam OpenAI GPT-3.5-turbo modell használata és tanítása miatt. A feladat, egy Pizza rendelő chatbot készítése volt. Emellett még készítettem Snake rekreációt és Double generátort is.",
      image: nokia,
      codeUrl: "https://github.com/tatarmb4s/hck-2023",
      demo: "https://www.youtube.com/watch?v=gEa2xLy4xS0",
    },
    {
      name: "Szelektív üveggyűjtés - okos kuka",
      content:
        "Comper egy alkalmazásból, okos kukából, ahhoz tartozó kezelő felületből, és egy weboldalból áll. Az alkalmazásban pontokat gyűjthetünk, melyeket beválthatunk különböző jutalmakra. A pontokkal versenyezhetünk az több szinten. Az iskola hirdethet különleges időszakot is, melyben többet érhet egy bedobás. Kooperáció: Balogh Levente, Takács Zoltán",
      image: sally,
      codeUrl: "",
      demo: "",
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
      name: "PowerShell",
      content:
        "Ez egy PowerShell script gyűjtemény, amely segít automatizálni a Windows renszert, adatokat kinyerni belőle.",
      image: PowerShellPrew,
      codeUrl: "https://github.com/tatarmb4s/PowerShellScripts",
      demo: "",
    },
    {
      name: "Codászok: Kábelek",
      content:
        "Egy iskolai projekt, amelyben ismertetjük a hétköznapokban használt kábelek leggtöbbjét. Három társammal írtuk a szöveget.",
      image: KabelekPrew,
      codeUrl: "https://github.com/tatarmb4s/codaszok-kabelek",
      demo: "https://kabelek_codaszok.tatarmb.hu/",
    },
    {
      name: "Neumann János Informatikai Technikum",
      content:
        "2021-ben nyertem felvételt, ahol jelenleg is tanulok szoftverfejlesztő - tesztelő szakon.",
      image: njit,
      codeUrl: "",
      demo: "",
    },
  ];

  return (
    <div name='timeln' className="w-full  bg-background text-gray-300 szunet">
      <hr className="elvalaszto w-[50%]" />
      <div className="flex flex-col justify-center items-center w-full ">
        <div className="sm:text-right pb-[6rem] pl-4">
      
          <div>
              <p className='secondary-title'>Eredményeim</p>
              <p className='py-4'>Iskolák, Versenyek, Projektek, és Munkahelyek</p>
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
                  <Typography color="gary" className="font-normal text-gray-300">
                    {munka.content}
                
                  
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