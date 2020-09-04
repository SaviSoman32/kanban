import React, { Fragment } from 'react';
import Link from 'next/link'
import {Toolbar, Typography, IconButton, Drawer} from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import AccountCircle from '@material-ui/icons/AccountCircle';

import UsersMenu from './UsersMenu';
import { useCurrentUsername } from './CurrentUser';
import { useMenubarStyles } from './styles';

const noop = () => {
};

export interface MenubarProps {
  title: string,
  projectsUrlPath: string,
}

export default function Header({ title, projectsUrlPath }: MenubarProps) {
  const classes = useMenubarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const currentUsername = useCurrentUsername();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <MuiAppBar position="static">
        <Toolbar style={{"backgroundColor": "#b1a5a5"}}>
          <Link href={projectsUrlPath}>
            <Typography variant="h6" className={classes.title}>{title}</Typography>
          </Link>
          <div className={classes.currentUser}>
            <Typography variant="subtitle2" className={classes.currentUsername}>
              {currentUsername}
            </Typography>

            <IconButton onClick={handleMenu}>
              <AccountCircle/>
            </IconButton>
          </div>
        </Toolbar>
      </MuiAppBar>

      <Drawer open={open} anchor="right" onClose={handleClose}>
        <div style={{ width: 300 }}>
          <UsersMenu/>
        </div>
      </Drawer>
    </Fragment>

  );
}
