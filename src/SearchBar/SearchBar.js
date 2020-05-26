import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DataLoader from '../DataLoader'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
    const { onSearch } = props;
    const classes = useStyles();
    const { handleSubmit, register  } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        onSearch(data.searchPlace)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper className={classes.root} >
          <input
              className={classes.input}
              type='text'
              name='searchPlace'
              placeholder="Search Google Maps"
              // inputProps={{ 'aria-label': 'search google maps' }}
              ref={register}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" >
              <SearchIcon />
          </IconButton>
          </Paper>
        </form>
    );
}