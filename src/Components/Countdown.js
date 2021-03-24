import React, {useEffect, useState}from 'react'

const Countdown = () => {
    const timeLeft = () => {
        let startTime = new Date()
        let oscarTime = new Date('April 25 2021 17:00:00 UTC-0700')
        let timeBetween = oscarTime - startTime
        let days = Math.floor(timeBetween / 1000 / 60 / 60 / 24)
        let hours = Math.floor(timeBetween / 1000 / 60 / 60 % 24)
        let minutes = Math.floor(timeBetween / 1000 / 60 % 60)
        let seconds = Math.floor(timeBetween / 1000 % 60)

        return {days, hours, minutes, seconds}
    }

    const [countdown, setCountDown] = useState(timeLeft())

    useEffect(() => {
        const timeout = setTimeout(setCountDown(timeLeft()),1000)
        return () => clearTimeout(timeout)
    })

    return(
        <>
            {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes until the OSCARS
        </>
    )
}

export default Countdown