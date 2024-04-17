import { ConnectButton } from "@rainbow-me/rainbowkit";
import Home from "./Components/Home";

function App() {
  return (
    <div className="bg-zinc-900 flex justify-center items-center h-screen text-white w-screen p-10">
      <div>
        <div className="flex justify-center">
          <ConnectButton showBalance={false} />
        </div>
        <div className="flex flex-col pt-10">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
