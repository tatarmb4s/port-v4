import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
// import Home from "./components/Home";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Hrole from "./components/Hrole";
// import ChatButton from "./components/ChatButton";
import TimelinecS from "./components/TimelinecS";
import MaterialBar from "./components/MaterialBar";
import ParentComponent from "./components/ParentComponent";
import { connectSocket } from "./components/WebSocketClient.ts";
import Providers from "./components/Providers.tsx";
import T42 from "./components/T42";

connectSocket();


function App() {
  return (
    <Providers>
      <div>
        <Navbar />
        {/* <MaterialBar /> */}
        {/* <Home /> */}
        <ParentComponent />
        <Hrole />
        <About />
        <T42 />
        <TimelinecS />
        <Skills />
        <Work />
        <Contact />
        {/* <ChatButton /> */}

      </div>
    </Providers>

  );
}
export default App;
