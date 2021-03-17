import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Movie = (props) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panelia-content' id={`title-${props.movie.id}-header`}>
                    <h2>{props.movie.title}</h2>
                </AccordionSummary>
                <AccordionDetails>
                    {props.movie.nominations.map(nom => {
                        return (
                            <div className="nominations">
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