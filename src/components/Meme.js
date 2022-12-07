import React from "react";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemesArr, setallMemeImages] = React.useState([]);

    // with fetch and then
    // React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(jsonData => setallMemeImages(jsonData.data.memes))
    // }, []);


    //with async/await - an async function always returns a PROMISE, so you need to use a workaround in order to return a function (if, say, you need to return a  cleanup function)
    React.useEffect(() => {
        //defining async function 
        const getMemesFromApi = async () => {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const jsonObj = await res.json();
            setallMemeImages(jsonObj.data.memes)
        }

        getMemesFromApi(); //calling async func
        //not returning a cleanup function - nothing is being mounted to the DOM, so no need to unmount anything. 
    }, []);

    //get individual meme upon clicking button 
    const getMeme = () => {
        const randomInd = Math.floor(Math.random() * allMemesArr.length);
        //setting new meme state 
        setMeme(() => {
            return {
                topText: "",
                bottomText: "",
                randomImage: allMemesArr[randomInd].url
            }
        });
    }

    //rendering text to meme
    const handleChange = (event) => {
        const { name, value } = event.target;
        setMeme(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div id="form">
            <div id="form-inputs">
                <input
                    name="topText"
                    value={meme.topText}
                    className="form-input"
                    type="text"
                    placeholder="Top line"
                    onChange={handleChange}
                />
                <input
                    name="bottomText"
                    value={meme.bottomText}
                    className="form-input"
                    type="text"
                    placeholder="Buttom line"
                    onChange={handleChange}
                />
            </div>
            <button
                className="form-button"
                onClick={getMeme}
            >Generate Meme!</button>
            <div className="meme">
                <img id="meme-image" src={meme.randomImage} alt="" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}