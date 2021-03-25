import React, {useEffect, useState}from 'react'
import Grid from '@material-ui/core/Grid'

const Countdown = () => {
    const timeLeft = () => {
        let startTime = new Date()
        let oscarTime = new Date('April 25 2021 17:00:00 UTC-0700')
        let timeBetween = oscarTime - startTime + 1000
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
            countdown.seconds > 0 ?
                <Grid container className='countdown' spacing={4} justify='center'>
                    {countdown.days >= 1 ?                     
                        <Grid item>
                            <span className="countdown-number">{countdown.days}</span><br />
                            DAYS
                        </Grid>
                        :
                        <></>
                    }
                    <Grid item>
                        <span className="countdown-number">{countdown.hours}</span><br />
                        HOURS
                    </Grid>
                    <Grid item>
                        <span className="countdown-number">{countdown.minutes}</span><br />
                        MINUTES
                    </Grid>
                    {countdown.days < 1 ? 
                        <Grid item>
                        <span className="countdown-number">{countdown.seconds}</span><br />
                        SECONDS
                        </Grid>
                        :
                        <></>}
                </Grid>
            :
            countdown.hours > -4 ? 
            <span id='live-text'>OSCARS ARE LIVE!</span>
            :
            <></>
            
    )
}

export default Countdown