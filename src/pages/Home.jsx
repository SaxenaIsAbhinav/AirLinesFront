// import HomeSearchBox from "../components/HomeSearchBox";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// export default function Home() {
//   return (
//     <div className="text-center">

//       <div className="flex relative flex-col justify-center px-16 py-11 max-w-full w-[756px] max-md:px-5 mx-auto">
//         <h1
//           className="relative mb-5 text-8xl text-center font-bold z-[2] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
//           style={{
//             backgroundImage:
//               "url('https://cdn.builder.io/api/v1/image/assets/TEMP/2ed4661a4718efd03a94fa770677b60702a313c99d87b501bef94ff89e752d1c?placeholderIfAbsent=true&apiKey=cd1e4045b2304ec79512e28a303c169c')",
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//           }}
//         >
//           BOOK YOUR DREAM
//         </h1>
//       </div>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <HomeSearchBox />
//       </LocalizationProvider>
//     </div>
//   );
// }


import HomeSearchBox from "../components/HomeSearchBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function Home() {
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
