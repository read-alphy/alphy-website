// File: AuthComponents.jsx
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useFormContext } from "react-hook-form"

// Reusable Form Input
const FormInput = ({ name, type, label, onChange, value, icon, required }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { register } = useFormContext()
  
  return (
    <div className="w-full mb-4">
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
            {icon}
          </div>
        )}
        <Input
          {...register(name, { required })}
          type={type}
          id={`input_${name}`}
          className={`${icon ? 'pl-10' : 'pl-3'} border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all shadow-sm hover:border-blue-400 dark:hover:border-blue-500`}
          placeholder={isFocused ? "" : label}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
        />
      </div>
    </div>
  )
}

// Submit Button
const SubmitButton = ({ isSubmitting, label, icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 quicksand font-medium flex items-center justify-center shadow-md hover:shadow-lg"
    >
      {isSubmitting ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Loader2 className="h-5 w-5" />
        </motion.div>
      ) : (
        <>
          {icon && <span className="">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </Button>
  </motion.div>
)

// Error Message
const ErrorMessage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center space-x-2 text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900/30 rounded-lg mt-4 mb-2 border border-red-100 dark:border-red-800"
  >
    <AlertCircle className="h-5 w-5 flex-shrink-0" />
    <p className="quicksand font-medium">{message}</p>
  </motion.div>
)

export {
  FormInput,
  SubmitButton,
  ErrorMessage
}