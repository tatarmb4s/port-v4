import React from "react";
import WorkImg from "../assets/workImg.jpeg";
import TorpedoGameplay from "../assets/TorpedoGameplay.png";
import PowerShellPrew from "../assets/PowerShellPrew.png";
import KabelekPrew from "../assets/KabelekPrew.png";
import JarvisAI2 from "../assets/jarvis.jpg";
import JarvisAI from "../assets/jarvis_crop.png";

const Work = () => {
  const munkaim = [
    {
      name: "Jarvis AI",
      content:
        "Egy aszisztens amely képes beszálni a Microsoft Azure segítségével.",
      image: "",
      codeUrl: "",
      demo: "",
    },
    {
      name: "Jarvis AI",
      content:
        "Egy aszisztens amely képes beszálni a Microsoft Azure segítségével.",
      image: "",
      codeUrl: "",
      demo: "",
    },
    {
      name: "Jarvis AI",
      content:
        "Egy aszisztens amely képes beszálni a Microsoft Azure segítségével.",
      image: "",
      codeUrl: "",
      demo: "",
    },
    {
      name: "Jarvis AI",
      content:
        "Egy aszisztens amely képes beszálni a Microsoft Azure segítségével.",
      image: "",
      codeUrl: "",
      demo: "",
    },
  ];


  function Grigitem(project) {
    return (
    <div
      style={{ backgroundImage: `url(${project.image})`}}
      className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div projektek sm:mb-4"
    >
      
      <div className="w-full h-full items-center ">
        <div className="opacity-0 group-hover:opacity-100 group-hover w-full mosott mb-[-55px] pl-[50%] justify-center items-center pt-1">
          <div className="text-center pt-0">
            <span className="text-2xl font-bold opacity-100 text-kiscim tracking-wider border-b-head1 border-solid border-b-2 mb-4">
              {project.name}
            </span>
            <div className="text-1xl font-bold opacity-100 text-white tracking-wider w-[90%]">
              {project.content}
            </div>
          </div>
          <div className="pt-8 text-center">
            {project.isDemo ? (
              <a href={project.demo} target={project.target}>
                <button className="gomb alplink">
                  Demo
                </button>
              </a>) : (<button className="UresGomb ">
                  Demo
                </button>)
            }
            {project.isSource ? (
              <a href={project.codeUrl} target={project.target}>
                <button className="gomb neon-link">
                  Forrás
                </button>
              </a>) : (
                <button className="UresGomb ">
                  Forras
                </button>)
            }
          </div>
        </div>
        <div className="flex group-hover:hidden text-center w-full m-auto">
          <span className="text-2xl font-bold opacity-100 text-kiscim tracking-wider text-center mosott m-auto ">
            {project.name}
          </span>
        </div>

        <div className="hidden group-hover:flex text-center w-full m-auto">
          <span className="text-2xl font-bold opacity-0 text-kiscim tracking-wider text-center mosott m-auto kikapcsolt">
            a
          </span>
        </div>
      </div>
    </div>);
  }

  return (
    <div name="work" className="szunet w-full md:h-screen text-gray-300 bg-mainColor pt-48 sm:pt-0 ">
      <hr className="elvalaszto w-[30%]" />
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8 mt-60">
          <p className="secondary-title">Munkáim</p>
          <p className="py-6">Eddig elkészült projektjeim, melyeket az iskolában, vagy saját magam szórakoztatására készítettem.</p>
        </div>

        {/* Container */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 ">
          <Grigitem className="" name='Codászok: Kábelek' content="Egy iskolai projekt, amelyben ismertetjük a hétköznapokban használt kábelek leggtöbbjét. Három társammal írtuk a szöveget." image={KabelekPrew} demo='https://kabelek_codaszok.tatarmb.hu/' codeUrl='https://github.com/tatarmb4s/codaszok-kabelek' target='_blank' isDemo={true} isSource={true}/>
          <Grigitem className="" name='PowerShell' content="Ez egy PowerShell script gyűjtemény, amely segít automatizálni a Windows renszert, adatokat kinyerni belőle." image={PowerShellPrew} demo='#' codeUrl='https://github.com/tatarmb4s/PowerShellScripts' target='_blank' isDemo={false} isSource={true} />
        </div>
        <div className="py-8">
          <p className="py-6">Fejlesztés alatt álló főbb munkáim, amelyek még nincsenek készen, vagy még csak bétában vannak. Ezeknek a forráskódja nem elérhető egyenlőre.</p>
        </div>

        {/* Container */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <Grigitem className="" name='Kétszemélyes Torpedó' content="A klasszikus torpedó játék, csak a neten. Jelenleg két játékos játszhat vele stabilan. A játékba egy kód segítségével lehet belépni, melyet a meccset indító fél ad meg. Ezután a másik fél beírja a kódot. Mivel még előfordulnak benne bugok, ezeket kéretik nem kihasználni. " image={TorpedoGameplay} demo='http://torpedo.t42.hu/' codeUrl='#code' target='_blank' isDemo={true} isSource={false} />
          <Grigitem className="" name='T42 AI' content="Ez egy mesterséges inteligencia lesz, mely segít a vak, és mozgáskorlátozott embereknek, illetve az otthoni rendszreket vezérli. Egy aszisztens amely képes beszélni a Microsoft Azure segítségével. Egyedileg tanított gpt-3.5-turbo és gpt-4 modelleket használ majd." image={JarvisAI} demo='#demo' codeUrl='#code' />
        </div>
      </div>
    </div>
  );
};

export default Work;
