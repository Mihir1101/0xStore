import React from "react";
import { useContract, useContractRead, useAddress, Web3Button } from "@thirdweb-dev/react";
import { Contact_Address } from "../constant/contractAddress";
import "../styles/IsSeller.css";
import AddProduct from "./AddProduct";

export default function IsSeller() {

    const { contract } = useContract(Contact_Address)
    const address = useAddress();
    const { data: user } = useContractRead(
        contract,
        "getUsers"
    );
    let userStatus = false;

    try {
        for (let i = 0; i < user.length; i++) {
            if (user[i].userAddress === address && user[i].status === 1) {
                userStatus = true;
                break;
            } else {
                userStatus = false;
            }
        }
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            {   userStatus ? (
                    <AddProduct/>
                ) : (
                    <div className="container-addProduct">
                        <Web3Button
                            contractAddress={Contact_Address}
                            action={(contract) => contract.call(
                                "becomeSellerFromUser",
                            )}
                            className="addProduct"
                        >
                            Become a Seller
                        </Web3Button>
                    </div>
                )
            }
        </div>
    );
}
