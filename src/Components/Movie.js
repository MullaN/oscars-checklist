import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    movie: {
        textAlign: 'left',
        fontFamily: ['Spartan', 'sans-serif']
    },
    nominations:{
        flexDirection: 'column',
        textAlign: 'left',
        backgroundColor: 'rgb(207, 193, 129)'
    }
}));

const Movie = ({movie, checked, type, checkMovie}) => {
    const classes = useStyles()
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id={`title-${movie.id}-header`}>
                    <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox color='primary' checked={checked} onClick={() => checkMovie(movie.id, type)}/>}
                    label={<Typography className={classes.movie}>{movie.title}</Typography>}
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.nominations}>
                    {movie.nominations.map(nom => {
                        return (
                            <div key={movie.title + '-' + nom.category + '-' + nom.people}>
                                <h3>{nom.category}</h3>
                                <span>{nom.people}</span>
                                <br />
                            </div>
                        )
                    })}
                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default Movie