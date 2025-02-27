import React from 'react'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Tooltip from '@mui/material/Tooltip'

// Custom styled switch with modern design
const ModernSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 16,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(16px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#4ade80' : '#10b981',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? '#52525b' : '#e2e8f0',
    boxSizing: 'border-box',
  },
}))

export default function VisibilityToggle({ isVisible, handleVisibility, tier, theme }) {
  
  
  const getTooltipText = () => {
    if (tier !== 'premium') {
      return "This content is private. Switch to the Premium plan to make it publicly accessible."
    }
    
    return isVisible
      ? "Toggle the visibility of this content. Switching to private makes it accessible only by you."
      : "Toggle the visibility of this content. Switching to public makes it accessible by all."
  }

  return (
    <Tooltip 
      title={getTooltipText()}
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: theme === 'dark' ? '#27272a' : '#ffffff',
            color: theme === 'dark' ? '#e4e4e7' : '#3f3f46',
            border: theme === 'dark' ? '1px solid #3f3f46' : '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '0.375rem',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 500,
            maxWidth: 220,
          }
        },
        arrow: {
          sx: {
            color: theme === 'dark' ? '#27272a' : '#ffffff',
          }
        }
      }}
    >
      <div className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200">
        <div className="flex items-center justify-center w-6 h-6">
          {isVisible ? (
            <VisibilityIcon 
              className="text-emerald-500 dark:text-emerald-400" 
              fontSize="small" 
            />
          ) : (
            <VisibilityOffIcon 
              className="text-slate-500 dark:text-zinc-400" 
              fontSize="small" 
            />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
            {isVisible ? 'Public' : 'Private'}
          </span>
          
          <ModernSwitch
            checked={isVisible}
            onChange={handleVisibility}
            disabled={tier !== 'premium'}
            inputProps={{ 'aria-label': 'Toggle content visibility' }}
          />
        </div>
      </div>
    </Tooltip>
  )
}