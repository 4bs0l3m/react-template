import { useState, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { IMenuItem } from "../../core/types/menu-item";
import { MenuHelper } from "../../core/helpers/menu.helper";

interface IProps {
  menuItems: IMenuItem[];
}

const SidebarMenu = () => {
  const menuItems = MenuHelper.getMenuItems();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleListItemClick = (id: string) => {
    setSelectedItem(id);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {menuItems.map((item) => (
        <Fragment key={item.id}>
          {item.children ? (
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemText primary={item.title} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          ) : (
            <ListItemButton
              component={RouterLink}
              to={item?.url || ""}
              key={item?.id}
              onClick={() => {
                handleListItemClick(item.id || "");
                setOpen(!open);
              }}
              selected={selectedItem === item.id}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          )}
          {item.children && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child: any) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={RouterLink}
                    to={child.url}
                    key={child.id}
                    onClick={() => handleListItemClick(child.id || "")}
                    selected={selectedItem === child.id}
                  >
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default SidebarMenu;
