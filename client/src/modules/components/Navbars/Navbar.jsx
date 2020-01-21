import React from "react";
import { useDispatch, useSelector, connect } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import { OPEN_DRAWER_MENU } from '../../constants/constants'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

/**
 * <div>
      <Nav>

        <NavDropdown
          eventKey={2}
          title={notification}
          noCaret
          id="basic-nav-dropdown"
        >
          <MenuItem eventKey={2.1}><b>Nova mensagem</b>: Qual o preço do kit?</MenuItem>

        </NavDropdown>

      </Nav>

      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Ola! {this.props.nomeUsuario}
        </NavItem>


        <NavItem eventKey={3} href="#">
          Sair
        </NavItem>
      </Nav>
    </div>
 */

const drawerWidth = 240

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }
}));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Navbar(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const sideBarState = useSelector(store => store.sidebar)

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    dispatch({ type: OPEN_DRAWER_MENU, isSidebar: true })
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        style={{'backgroundColor':'#1976d2'}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sideBarState.isSidebar,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: sideBarState.isSidebar,
            })}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClickOpen}>

            <MenuIcon />

          </IconButton>

          <div className={classes.grow} />

          <Typography className={classes.title} noWrap>
            Ola! {props.nomeUsuario}
          </Typography>

          <div className={classes.sectionDesktop}>

            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">

                <NotificationsIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />

                <StyledMenu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>

                  <StyledMenuItem>
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={<><b>Adriana Alves</b>: Bom dia tem tamanho G e GG ?</>} />
                  </StyledMenuItem>

                  <StyledMenuItem>
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={<><b>Mayara Melo Taveira</b>: Vem os mesmo modelo ?</>} />
                  </StyledMenuItem>

                  <StyledMenuItem>
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={<><b>Bruno Ribeiro Ferreira</b>: Boa noite vc tem link com menos quantidade ?</>} />
                  </StyledMenuItem>

                </StyledMenu>

              </Badge>
            </IconButton>

          </div>

          <Button color="inherit">Sair</Button>

        </Toolbar>
      </AppBar>
    </>
  );
}

