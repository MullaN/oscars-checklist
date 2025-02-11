import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@material-ui/core';

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgb(235, 226, 190)',
    color: 'rgb(155, 144, 96)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function FilterBox(props) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const categories = Object.keys(props.categories).sort((a,b) => {
      if(a < b) return -1
      if(b > a) return 1
      return 0
  })

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <span><FilterListIcon /> Filter Movies By Award</span>
        </AccordionSummary>
        <AccordionDetails>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                {categories.map(category => {
                    return(
                        <Grid item key={category}>
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox color='primary' checked={props.categories[category].checked} onClick={() => props.checkFilter(category)}/>}
                                label={<Typography>{category}</Typography>}
                                />
                        </Grid>
                    )
                    })                    
                }
                <Grid item xs={12}>

                </Grid>
                <Grid item>
                    <Button onClick={() => props.filterAllBehavior(false)}>Select All</Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => props.filterAllBehavior(true)}>Select None</Button>
                </Grid>
            </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}