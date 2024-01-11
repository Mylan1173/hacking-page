import React, { useEffect, useState } from 'react'
import "./Header.scss"

const Header = () => {
    const [preMap, setPreMap] = useState([])
    const [charMap, setCharMap] = useState([])

    const colors = [
        "hsl(120, 100%, 75%)",
        "hsl(120, 100%, 75%)",
        "hsl(120, 100%, 85%)",
        "hsl(120, 100%, 85%)",
        "hsl(120, 100%, 15%)"
    ]

    useEffect(() => {
        window.addEventListener("resize", () => {
            setPreMap([])
            startDrawingLetters()
        })
        return () => {
            window.removeEventListener("resize", () => {
                setPreMap([])
                startDrawingLetters()
            })
        }
    }, [])

    const generateRandomChar = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let rand = Math.floor(Math.random() * chars.length)
        return chars[rand]
    }
    const startDrawingLetters = () => {
        if (preMap.length === 0) {
            let hRows = []
            for (let v = 0; v < Math.floor(window.innerWidth / 50); v++) {

                let vRows = []
                for (let i = 0; i < Math.floor(window.innerHeight / 50); i++) {
                    vRows.push({
                        "char": generateRandomChar(),
                        "color": false,
                        "num": i
                    })
                }
                hRows.push({
                    "num": v,
                    "data": vRows
                })
            }
            setPreMap(hRows);
        } else {
            let newMap = [...preMap]
            newMap.map((h) => {
                return h.data.map((v) => v.char = generateRandomChar())
            })
            setPreMap(newMap);
        }

    }

    const startRain = () => {
        if (preMap.length) {
            let preMapCopy = [...preMap]
            let doneMap = []
            for (let h of preMapCopy) {
                let hRow = h
                const isRainStarted = Boolean((hRow.data.filter((value) => value.color !== false)).length)
                if (isRainStarted) {
                    const startPlace = hRow.data.findIndex((target) => target.color === colors[0])
                    hRow.data.map((value) => value.color = false)
                    for (let i = startPlace + 1; i < hRow.data.length; i++) {
                        hRow.data[i].color = colors[i - startPlace] ?? false
                    }
                } else {
                    const startWith = Math.floor(Math.random() * hRow.data.length)
                    for (let i = startWith; i < hRow.data.length; i++) {
                        hRow.data[i].color = colors[i - startWith] ?? false
                    }
                }
                doneMap.push(hRow)
            }
            setCharMap(doneMap)


        }

    }
    useEffect(() => {
        const timer = setInterval(startDrawingLetters, 200)
        return () => clearInterval(timer)

    }, [])
    useEffect(() => {
        const timer = setInterval(startRain, 200)
        return () => clearInterval(timer)

    }, [])

    return (
        <>
            <div className='page'>
                {
                    charMap.map((hRow) => {
                        return <div className='row' key={hRow.num}>
                            {hRow.data.map((vRow) => {
                                return <div className='col' key={vRow.num}><span style={{ color: !vRow.color ? "hsl(120, 100%, 45%)" : vRow.color }}>{vRow.char}</span></div>
                            })}
                        </div>
                    })
                }
            </div >
            {/* <button onClick={() => startDrawingLetters()} style={{ position: "fixed", color: "white", top: 0, left: 0 }}>Start</button>
            <button onClick={() => startRain()} style={{ position: "fixed", color: "white", top: "100px", left: 0 }}>Start</button> */}
        </>
    )
}

export default Header