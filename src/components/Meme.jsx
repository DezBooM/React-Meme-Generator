import { useState, useEffect, useRef } from "react"
import Draggable from 'react-draggable';

function Meme() {

    const [allMemes, setAllMemes] = useState([])
    const [meme, setMeme] = useState({
        top: "",
        bottom: "",
        url: "https:\/\/i.imgflip.com\/3oevdk.jpg",
        name: "Bernie I Am Once Again Asking For Your Support"
    })
    const nodeRef1 = useRef(null)
    const nodeRef2 = useRef(null)

    const handleChange = e => {
        const {name, value} = e.target
        setMeme(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const getMemes = async () => {
        const res = await fetch("https://api.imgflip.com/get_memes")
        if(!res.ok) {
            throw new Error("Either wrong link or api doesn't work anymore")
        }
        const data = await res.json()
        setAllMemes(data.data.memes)
    }

    useEffect (() => {
        getMemes().catch(err => console.log(err)) 
    }, []) 

    const getRandomMeme = e => {
        e.preventDefault()
        const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)]
        setMeme(prev => {
            return {
                ...prev,
                url: randomMeme.url,
                name: randomMeme.name
            }
        })
    }

  return (
    <main className="mx-2">
        <form className="flex flex-col items-center mt-10 md:mx-20 h-2/3">
            <div className="md:flex md:justify-center gap-5 w-full">
                <input 
                    className="w-full md:w-1/4 py-2 px-5 border border-solid border-blue-300 rounded-lg outline-none placeholder-blue-300 text-gray-700" 
                    type="text" 
                    placeholder="Top Text"
                    value={meme.top}
                    name="top"
                    onChange={handleChange} />
                <input 
                    className="w-full md:w-1/4 py-2 px-5 border border-solid border-blue-300 rounded-lg outline-none placeholder-blue-300 text-gray-700" 
                    type="text" 
                    placeholder="Bottom Text"
                    value={meme.bottom}
                    name="bottom"
                    onChange={handleChange} />
            </div>
            <button onClick={getRandomMeme} className="cursor-pointer mt-6 mb-4 w:full md:w-3/12 rounded-lg text-center py-2 px-5 text-gray-200 text-lg bg-gradient-to-r from-blue-600 to-blue-900 border-none">
                Generate new meme image
            </button>
            <div className="font-rowdies relative">
                <img className="max-w-screen rounded-md " src={meme.url} alt={meme.name} />
                <Draggable nodeRef={nodeRef1} bounds={"parent"}>
                    <h2 ref={nodeRef1} className="drop-shadow-[0_0_2px_#000000] text-sm md:text-2xl my-1 py-0 px-1 absolute text-center text-white uppercase tracking-wider top-3 left-1 ">{meme.top}</h2>
                </Draggable>
                <Draggable nodeRef={nodeRef2} bounds={"parent"}>
                 <h2 ref={nodeRef2} className="drop-shadow-[0_0_2px_#000000] text-sm md:text-2xl my-1 py-0 px-1 absolute text-center text-white uppercase tracking-wider bottom-3 left-1 ">{meme.bottom}</h2>
                </Draggable>
                
                
            </div>
            
        </form>  
    </main>
  )
}

export default Meme