import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
const ITEM_HEIGHT = 55;

export default function BurgerMenu(props: {
  options: Array<{ name: string; path: string }>;
  width?: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [, setAuth] = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    setAnchorEl(null);
    if (path === '/logout') {
      setAuth.logout();
    } else {
      navigate(`${path}`);
    }
  };

  const menuWith = props.width || '100%';

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: menuWith,
          },
        }}
      >
        {props.options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleClose(option.path)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
