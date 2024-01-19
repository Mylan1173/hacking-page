import React, { useEffect, useState } from 'react'

const BackGround = () => {
    const [preMap, setPreMap] = useState([])
    const [charMap, setCharMap] = useState([])

    const colors = [
        "hsl(137, 44%, 50%)",
        "hsl(137, 44%, 50%)",
        "hsl(137.25, 37.38%, 58.04%)",
        "hsl(137.25, 37.38%, 58.04%)",
        "hsl(146.04, 26.37%, 60.59%))",
        "hsl(146.04, 26.37%, 60.59%)",
        "hsl(120, 100%, 5%)"
    ]
    const generateRandomChar = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let rand = Math.floor(Math.random() * chars.length)
        return chars[rand]
    }
    const startDrawingLetters = () => {
        if (preMap.length === 0) {
            let hRows = []
            //Math.floor(window.innerWidth / 50)
            for (let v = 0; v < 49; v++) {

                let vRows = []
                //Math.floor(window.innerHeight / 50)
                for (let i = 0; i < 26; i++) {
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
            setPreMap(newMap)
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
        const startProcesses = () => {
            startDrawingLetters()
            startRain()
        }
        const interval = setInterval(startProcesses, 100)
        return () => clearInterval(interval)
    })

    return (

        < div className='page'>
            {
                charMap.map((hRow) => {
                    return <div className='row' key={hRow.num}>
                        {hRow.data.map((vRow) => {
                            return <div className='col' key={vRow.num}><span style={{ color: !vRow.color ? "hsl(137.88, 100%, 29.61%)" : vRow.color }}>{vRow.char}</span></div>
                        })}
                    </div>
                })
            }
        </div >
    )
}

export default BackGround