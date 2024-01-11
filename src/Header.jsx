import React, { useEffect, useState } from 'react'
import "./Header.scss"

const Header = () => {
    const [charMap, setCharMap] = useState([])
    const [siteWidth, setSiteWidth] = useState(window.innerWidth)
    const [siteHeight, setSiteHeight] = useState(window.innerHeight)
    const [isAlreadyRunning, setRunning] = useState(null)

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setSiteWidth(window.innerWidth)
            setSiteHeight(window.innerHeight)
        };
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    });

    const calcRows = (type) => {
        switch (type) {
            case "H":
                return Math.floor(window.innerWidth / 50)
            case "V":
                return Math.floor(window.innerHeight / 50)
        }
    }

    const generateRandomChar = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let rand = Math.floor(Math.random() * chars.length)
        return chars[rand]
    }
    const startDrawingLetters = () => {
        let rowcopy = []
        for (let v = 0; v < calcRows("H"); v++) {

            let rowcopy2 = []
            for (let i = 0; i < calcRows("V"); i++) {
                let randGen = ""
                let collision = false
                do {
                    randGen = generateRandomChar()
                    collision = rowcopy2.includes(randGen)
                } while (collision)
                rowcopy2.push(randGen)
            }
            rowcopy.push(rowcopy2)
        }
        setCharMap(rowcopy)
    }
    if (!isAlreadyRunning) {
        setRunning(true)
        setInterval(startDrawingLetters, 50)
    }

    return (
        <div className='page' style={{ padding: `${(siteHeight % 50) / 2}px ${(siteWidth % 50) / 2}px` }}>
            {
                charMap.map((lrow) => {
                    return <div className='row' key={lrow}>
                        {lrow.map((lcol) => {
                            return <div className='col' key={lcol}><span>{lcol}</span></div>
                        })}
                    </div>
                })
            }
        </div>
    )
}

export default Header