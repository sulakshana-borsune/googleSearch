import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Book from '../utils/Book';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [searchState, setSearchState] = useState({
    searchedBooks: [],
    books: [],
    title: '',
    searchInput: ''
  })
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);


  const handleInputChange = ({ target }) => {
    setSearchState({ ...searchState, [target.name]: target.value })
  }

  const handleBookSearch = (event) => {
    event.preventDefault()
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=harrypotter&key=AIzaSyCBfI-nk1JQ3Vcd76JFvoZGY8QRrX4SULc`)
      .then(({ data: { items } }) => {
        console.log(items)
        console.log(items[0].volumeInfo.title, items[0].volumeInfo.authors)

        let bookObj = items.map(obj => obj.volumeInfo)
        setSearchState({ ...useState.books, searchInput: '', searchedBooks: bookObj })
      })
      .catch(e => console.error(e))
  }

  const handleSaveBook = i => {
    let savedBook = JSON.parse(JSON.stringify(useState.searchedBooks[i]))
    let books = JSON.parse(JSON.stringify(searchState.books))
    Book.create(savedBook)
    useState.books.push(savedBook)
    setSearchState({ ...searchState, books })
  }
  const handleDeleteBook = (id) => {
    Book.delete(id)
      .then(() => {
        let books = JSON.parse(JSON.stringify(searchState.books))
        setSearchState({ ...searchState, books })
      })
      .catch(e => console.error(e))
  }

  return (
    <container>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <HomeIcon />
            <ArrowBackIcon />
            <ArrowForwardIcon />
            <Typography className={classes.title} variant="h6" noWrap>
              Google Book Search
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Book"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button variant="outlined" color="primary" onClick={handleBookSearch} >Search</Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          My Library
          </Typography>

        <List dense={dense}>
          <ListItem>
            <ListItemText
              primary="Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)"
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>

            <ListItemText
              primary="Harry Potter and the Philosopher's Stone"
            />

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>,
            </List>
      </div>
    </container>
  )
}
