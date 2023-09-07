import React from "react";
import { useState } from "react";
import { Web3Button} from "@thirdweb-dev/react";
import { Contact_Address } from "../constant/contractAddress";
import "../styles/AddProduct.css";
import lighthouse from '@lighthouse-web3/sdk';
import defaultImage from "../stocks/default-img.png";

export default function AddProduct() {
    const [addProduct, setAddProduct] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    let image = document.getElementById("ProductImage");
    const uploadImage = async(file) => {
        const output = await lighthouse.upload( file , 'e62fe510.9eb94e8f6f22466c8df16a6dda9ab6aa', false, null, progressCallback);
        image.src = "https://gateway.lighthouse.storage/ipfs/" + output.data.Hash;
        setImageUrl ("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
    }

    const progressCallback = (progressData) => {
        let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };


    function resetForm() {
        setName("");
        setDescription("");
        setPrice("");
    }

    return (
        <div>
            {
                !addProduct ? (
                    <button className="addProduct" onClick={() => setAddProduct(true)}>Add Your Product</button>
                ) : (
                    <div>
                        <div className="form-container">
                            <div className="input-container">
                                <h1>Add Product</h1>
                                <label>Name</label>
                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <br />
                                <label>Description</label>
                                <textarea rows='5' maxLength='1000' type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <br />
                                <label>Price</label>
                                <input type="text" placeholder="Price in 0.001 ETH" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <br />
                                <input type="file" onChange={(e) => uploadImage(e.target.files)} />
                            </div>
                            <div className="img-container">
                                <img id = "ProductImage"src={defaultImage}></img>
                            </div>

                            <div className="form-btn-container">
                                <button className="closeForm" onClick={() => setAddProduct(false)}>Close</button>
                                <Web3Button
                                    contractAddress={Contact_Address}
                                    action={(contract) => contract.call(
                                        "addProduct",
                                        [
                                            name,
                                            description,
                                            price,
                                            imageUrl
                                        ]
                                    )}
                                    onSuccess={() => {
                                        resetForm();
                                        setAddProduct(false);
                                    }}
                                    className="submitForm"
                                >Submit for Listing</Web3Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}