import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
      margin: 'auto',
      width: '200px',
      backgroundColor: 'rgb(235, 226, 190)'
  }
}));

export default function BottomAppBar({recentSave, saveList, saveId}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Button className={classes.button} variant='contained' disabled={recentSave} onClick={saveList}>{recentSave ? 'List Saved' : 'Save List'}</Button>
        {recentSave ? <><br /><br /><span>Your list has been saved at <a href={`https://oscars-checklist.web.app/${saveId}`}>{`oscars-checklist.web.app/${saveId}`}</a>. Be sure to bookmark or save this link to keep your checklist!</span></> : <></>}
      </AppBar>
    </React.Fragment>
  );
}