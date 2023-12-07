import React, {useState} from 'react'
import {FaBars, FaTimes, FaFacebook, FaGithub, FaLinkedin, FaYoutube, FaMicrosoft} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import {BsFillPersonLinesFill} from 'react-icons/bs'
import Logo from '../assets/logo.png'
import { Link } from 'react-scroll';


const Navbar = () => {

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
 
  const icons = [
    {
      name: "GitHub",
      url: "https://github.com/tatarmb4s",
      icon: "FaGithub",
      color: "#333333",
    },
    {
      name: "Email",
      url: "mailto:xyz@tmb.hu",
      icon: "HiOutlineMail",
      color: "#6fc2b0",
    },
  ];

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 z-10 bg-menuColor text-menuText'>
      <div>
        <img src={Logo} alt="Logo image" style={{width: '50px'}} />
      </div>

      {/* menu */}
      <div className="hidden md:flex z-10">
        <ul className='hidden md:flex z-20'>
        <li>
          <Link to='home' smooth={true} duration={500}>
            Ki vagyok?
          </Link>
        </li>
        <li>
          <Link to='about' smooth={true} duration={500}>
            Rólam
          </Link>
        </li>
        <li>
          <Link to='T42' smooth={true} duration={500}>
            T42
          </Link>
        </li>
        <li>
          <Link to='timeln' smooth={true} duration={500}>
            Eredményeim
          </Link>
        </li>
        <li>
          <Link to='skills' smooth={true} duration={500}>
            Ismereteim
          </Link>
        </li>
        <li>
          <Link to='work' smooth={true} duration={500}>
            Eddigi munkáim
          </Link>
        </li>
        <li>
          <Link to='contact' smooth={true} duration={500}>
            Kapcsolat
          </Link>
        </li>
        </ul>
      </div>

      {/* Hamburger*/}
      <div onClick={handleClick} className="md:hidden z-[12]">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu*/}
      <ul className={!nav ? "hidden" : "absolute top-0 left-0 w-full h-screen bg-mobileMenuColor text-menuText flex flex-col justify-center items-center backdrop-blur z-[11]"}>
      <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='home' smooth={true} duration={500}>
            Ki vagyok?
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='about' smooth={true} duration={500}>
            Rólam
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='T42' smooth={true} duration={500}>
            T42
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='timeln' smooth={true} duration={500}>
            Eredményeim
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='skills' smooth={true} duration={500}>
            Ismereteim
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='work' smooth={true} duration={500}>
            Eddigi munkáim
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='contact' smooth={true} duration={500}>
            Kapcsolat
          </Link>
        </li>
        </ul>

       {/* Social icons */}
       <div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://github.com/tatarmb4s' target='_blank'
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='mailto:tatar.matyas.bence4c@hotmail.com'
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Navbar