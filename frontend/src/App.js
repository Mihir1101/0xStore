import { ConnectWallet, useAddress} from "@thirdweb-dev/react";
import CheckUserExist from "./component/UserExist";
import "./styles/App.css";
import BackVideo from "./stocks/BackgroundVideo.mp4"


export default function App() {
  const address = useAddress();
  return (
    <main>
      {address ? (
        <CheckUserExist/>
      ) : (
        <div className="home-page">
          <h1 id="title">0xStore</h1>
          <div className="video-container">
          <video src={BackVideo} autoPlay loop muted></video>
          </div>
          <span className="getStarted">Get Started</span>
          <ConnectWallet
              theme="dark"
              btnTitle="Login"
              className="connect-btn"
          />
        </div>
      )}

    </main>
  );
}
