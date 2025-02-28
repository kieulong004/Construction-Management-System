import { createContext, ReactNode, useEffect, useState, useMemo } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    darkMode: false,
    toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('light-mode', !darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const bars = document.querySelector('.bars');
        const modeSwitch = document.querySelector('.toggle-switch');
        const downs = document.querySelector('.down');

        const handleToggleClick = () => document.querySelector('.sidebar')?.classList.toggle('close');
        const handleModeSwitchClick = () => setDarkMode(prev => !prev);
        const handleDownClick = () => document.querySelector('.submenu')?.classList.toggle('active');
        
        bars?.addEventListener('click', handleToggleClick);
        modeSwitch?.addEventListener('click', handleModeSwitchClick);
        downs?.addEventListener('click', handleDownClick);

        return () => {
            bars?.removeEventListener('click', handleToggleClick);
            modeSwitch?.removeEventListener('click', handleModeSwitchClick);
            downs?.removeEventListener('click', handleDownClick);
        };
    }, []);

    const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

    const value = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
