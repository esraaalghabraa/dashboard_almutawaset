import {createContext, useContext, useState} from "react";
import React, { useEffect } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    setToken: () => {
    },
    setUser: () => {
    },
    logout: () => {
    },
});


export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [activeMenuHover, setActiveMenuHover] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});
    const [showTooltip, setShowTooltip] = useState(false);
    const [addFiltter, setAddFiltter] = useState(false);

    const [screenSize, setScreenSize] = useState(undefined);
    const [user, setUserState] = useState(
        JSON.parse(localStorage.getItem("USER") || "{}"));
    const [token, setTokenState] = useState(
        localStorage.getItem("ACCESS_TOKEN")
    );
    const setToken = (token) => {
        setTokenState(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    const setUser = (user) => {
        setUserState(user);
        if (user) {
            localStorage.setItem('USER', JSON.stringify(user))
        } else {
            localStorage.removeItem('USER')
        }
    }
    const logout = () => {
        setTokenState(null);
        setUser(null);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER");
    };
    const toggleSubmenu = (title) => {
        setOpenSubmenus((prevOpenSubmenus) => {
            const newOpenSubmenus = {};

            // Close all submenus except the one being toggled
            Object.keys(prevOpenSubmenus).forEach((key) => {
                newOpenSubmenus[key] = false;
            });

            // Toggle the clicked submenu
            newOpenSubmenus[title] = !prevOpenSubmenus[title];

            return newOpenSubmenus;
        });
    };

     // Handle screen resize
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(activeMenu);
        }
    }, [screenSize, activeMenu, setActiveMenu]);

    // Handle mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (activeMenu) return; // Exit if activeMenu is true

            const rightEdge = window.innerWidth - window.innerWidth * 0.01;
            if (e.clientX >= rightEdge) {
                setActiveMenuHover(true);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [activeMenu, setActiveMenuHover]);
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                activeMenuHover,
                setActiveMenuHover,
                openSubmenus,
                setOpenSubmenus,
                toggleSubmenu,
                screenSize,
                setScreenSize,
                setUser,
                token,
                user,
                logout,
                setToken,
                showTooltip,
                setShowTooltip,
                addFiltter,
                setAddFiltter
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)