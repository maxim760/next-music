import * as React from "react";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MusicIcon from "@material-ui/icons/MusicNoteRounded";
import AlbumIcon from "@material-ui/icons/LibraryMusicRounded";
import MainIcon from "@material-ui/icons/WebAssetRounded";
import { useRouter } from "next/router";
import useOnclickOutside from "react-cool-onclickoutside";


const pages = [
  { name: "Главная", icon: MainIcon, to: "/" },
  { name: "Список треков", icon: MusicIcon, to: "/tracks" },
  { name: "Список альбомов", icon: AlbumIcon, to: "/albums" },
];

const AppNavbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  
  const onDrawerOpen = () => setOpen(true);
  
  const onDrawerClose = () => {
    setOpen(false)
  };
  const ref = useOnclickOutside(onDrawerClose);

  const onChangePage = (to: string) => () => router.push(to);

  return (
    <>
      <div>
        <AppBar position="fixed" className="navbar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          ref={ref}
        >
          <div>
            <IconButton onClick={onDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <List>
            {pages.map(({ name, to, icon: IconMenu }) => (
              <ListItem button key={to} onClick={onChangePage(to)}>
                <ListItemIcon>{<IconMenu />}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default AppNavbar;
