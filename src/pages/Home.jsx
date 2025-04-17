import { useEffect } from "react";
import HomeSearchBox from "../components/HomeSearchBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function Home() {
  useEffect(() => {
    var Tawk_API=Tawk_API||{};
    var Tawk_LoadStart=new Date();

    const s1 = document.createElement("script");
    // script.type="text/javascript";
    s1.src='https://embed.tawk.to/67ff517af308dc1911a94f13/1ioulcin9';
    s1.async=true;
    // s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');

    const s0=document.getElementsByTagName("script")[0];
    if (s0?.parentNode){
      s0.parentNode.insertBefore(s1,s0);
    } else {
      document.body.appendChild(s1);
    }
  
    return () => {
      if(s1.parentNode){
        s1.parentNode.removeChild(s1);
      }
    };
  }, []);

  return (
    <div className="text-center  pb-20">
      <div className="flex  flex-col justify-center px-16 py-11 max-w-full w-[756px] max-md:px-5 mx-auto">
        <h1
          className=" mb-5 text-8xl text-center font-bold z-[2] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets/TEMP/2ed4661a4718efd03a94fa770677b60702a313c99d87b501bef94ff89e752d1c?placeholderIfAbsent=true&apiKey=cd1e4045b2304ec79512e28a303c169c')",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          BOOK YOUR DREAM
        </h1>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HomeSearchBox />
      </LocalizationProvider>
    </div>
  );
}
