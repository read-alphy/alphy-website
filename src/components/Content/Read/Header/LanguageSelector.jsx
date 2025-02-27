import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LanguageIcon from '@mui/icons-material/Language';


export default function LanguageSelector({ handleLanguageChange, language, reorderedLanguageCodes, languages, theme }) {
 

  // Create menu props with proper theme
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 224, // 4.5 items
        backgroundColor: theme === 'dark' ? '#27272a' : '#fff',
        color: theme === 'dark' ? '#e4e4e7' : '#3f3f46',
        borderRadius: '0.5rem',
        border: theme === 'dark' ? '1px solid #3f3f46' : '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-6 h-6">
          <LanguageIcon 
            className="text-slate-700 dark:text-zinc-200" 
            fontSize="small" 
          />
        </div>
        <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
          Language
        </span>
      </div>
      
      <Box sx={{ width: '100%' }}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.375rem',
              backgroundColor: theme === 'dark' ? '#3f3f46' : '#f8fafc',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme === 'dark' ? '#71717a' : '#cbd5e1',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme === 'dark' ? '#60a5fa' : '#3b82f6',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme === 'dark' ? '#52525b' : '#e2e8f0',
              },
            },
          }}
        >
          <Select
            value={language}
            onChange={handleLanguageChange}
            displayEmpty
            MenuProps={menuProps}
            sx={{
              color: theme === 'dark' ? '#e4e4e7' : '#3f3f46',
              fontSize: '0.875rem',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 500,
              '& .MuiSelect-icon': {
                color: theme === 'dark' ? '#a1a1aa' : '#64748b',
              },
            }}
          >
            {Object.entries(reorderedLanguageCodes).map(
              ([code, name], index) => {
                // Current selected language
                if (language === code) {
                  return (
                    <MenuItem
                      key={code}
                      value={code}
                      sx={{
                        fontSize: '0.875rem',
                        fontFamily: 'Quicksand, sans-serif',
                        fontWeight: 500,
                        backgroundColor: theme === 'dark' ? '#3f3f46' : '#f1f5f9',
                        '&:hover': {
                          backgroundColor: theme === 'dark' ? '#52525b' : '#e2e8f0',
                        },
                      }}
                    >
                      {name}
                    </MenuItem>
                  );
                }
                
                // Divider
                if (index === languages.length) {
                  return (
                    <div 
                      key={`divider-${code}`} 
                      className="border-t border-gray-100 dark:border-zinc-700 my-2"
                    />
                  );
                }
                
                // Available or unavailable language
                const isAvailable = languages.includes(code);
                return (
                  <MenuItem
                    key={code}
                    value={code}
                    
                    sx={{
                      fontSize: '0.875rem',
                      fontFamily: 'Quicksand, sans-serif',
                      fontWeight: 500,
                      color: !isAvailable 
                        ? (theme === 'dark' ? '#71717a' : '#cbd5e1') 
                        : (theme === 'dark' ? '#e4e4e7' : '#3f3f46'),
                      '&:hover': {
                        backgroundColor: theme === 'dark' ? '#52525b' : '#e2e8f0',
                      },
                    }}
                  >
                    {name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}