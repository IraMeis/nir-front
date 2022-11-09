import { useState } from 'react'
import { useInterval } from 'usehooks-ts'

const Matmod = () => {
    // requests amount
    const [totalAmount, setTotalAmount] = useState(0)
    // dynamic delay
    const [delay, setDelay] = useState(1000)
    // ON/OFF
    const [isRunning, setIsRunning] = useState(false)
    // ability to continuation of getting evals
    const [isEnabled, setIsEnabled] = useState(false)
    // functions as rgb images
    //const [isImages, setImages] = useState([])

    useInterval(
        () => {
           //todo requests get data
            setTotalAmount(totalAmount + 1)
        },
        // Delay in milliseconds or null to stop it
        isRunning ? delay : null,
    )

    const handleChangeDelay = (event) => {
        const dl = Number(event.target.value)
        if(dl < 200)
            setDelay(200)
        else
            setDelay(dl)
    }

    const handleChangeIsRunning = () => {
        // todo request pause|play model
        if(isEnabled)
            setIsRunning(!isRunning)
    }

    const handleChangeIsEnabled = () => {
        if(isEnabled){
            // todo request clear model
            setIsEnabled(false)
            setIsRunning(false)
            setTotalAmount(0)
        }
        else {
            // todo request new model
            setIsEnabled(true)
            setIsRunning(true)
        }
    }

    return (
        <>
            <button onClick={handleChangeIsEnabled}>
                {isEnabled ? 'Stop' : 'Start'}
            </button>

            <h1>{totalAmount}</h1>
            <button onClick={handleChangeIsRunning}>
                {isRunning ? 'Pause' : 'Play'}
            </button>
            <p>
                <label htmlFor="delay">Delay: </label>
                <input
                    type="number"
                    name="delay"
                    onChange={handleChangeDelay}
                    value={delay}
                />
            </p>
        </>
    )
}

export default Matmod;