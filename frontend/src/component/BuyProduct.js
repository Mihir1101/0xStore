import React from "react";
import { useState } from "react";
import { Web3Button, useContractRead, useContract } from "@thirdweb-dev/react";
import { Contact_Address } from "../constant/contractAddress";
import "../styles/BuyProduct.css";
import { ethers } from "ethers";

const BuyProduct = (props) => {
    const productId = props.productId;
    const { contract } = useContract(Contact_Address)
    const { data: product } = useContractRead(
        contract,
        "getProductById",
        [productId]
    );
    console.log(productId);
    console.log(product);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    function resetForm() {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPincode("");
    }
    return (
        <div>
            {
                product ? (
                    <div className="buyer-details">
                        <div className="product-details">
                            <img src={product.imageUrl} width="250px" />
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                            <h3>{product.price.toString() / 1e3} ETH</h3>
                        </div>
                        <div className="buyer-form">
                            <h1>Fill Your Details</h1>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <br />
                    
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                    
                            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <br />
                            
                            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <br />
                            
                            <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            <br />
                            <div >
                                <Web3Button
                                    contractAddress={Contact_Address}
                                    action={(contract) => contract.call(
                                        "buyProduct",
                                        [
                                            product.owner,
                                            productId,
                                            name,
                                            email,
                                            phone,
                                            address,
                                            pincode
                                        ]
                                    )}
                                    overrides={{
                                        value: ethers.utils.parseEther((product.price* 1e15).toString())
                                    }}
                                    onSuccess={() => {
                                        resetForm();
                                    }}
                                    className="submitForm"
                                >Confirm Purchase</Web3Button>
                            </div>
                        </div>
                    </div>

                ) : (
                    <h1>Loading...</h1>
                )
            }
        </div>

    );

}

export default BuyProduct;