import { Web3Button, useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import Home from "../pages/Home";
import { Contact_Address } from "../constant/contractAddress";
import Navbar from "./Navbar";
import "../styles/UserExist.css";
import BackgroundImage from "../stocks/background.jpeg";

export default function CheckUserExist() {
    const address = useAddress();
    let userExist = false;
    const { contract } = useContract(Contact_Address);
    const { data: user } = useContractRead(
        contract,
        "getUsers"
    );
    try {
        for (let i = 0; i < user.length; i++) {
            if (user[i].userAddress === address) {
                userExist = true;
                break;
            } else {
                userExist = false;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return (
        <div>
            {userExist ? (
                <Home />
            ) : (
                <div>
                    <Navbar />
                    <div className="image-container">
                        <img src={BackgroundImage} className="background-image"/>
                    </div>
                    <Web3Button
                        contractAddress={Contact_Address}
                        action={(contract) => contract.call(
                            "addUser",
                        )}
                        className="buy-btn"
                    >Buy Items</Web3Button>
                    <Web3Button
                        contractAddress={Contact_Address}
                        action={(contract) => contract.call(
                            "becomeSeller",
                        )}
                        className="sell-btn"
                    >Sell Items</Web3Button>
                </div>
            )}
        </div>
    );
}
