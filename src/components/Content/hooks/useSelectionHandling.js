import { useState } from 'react'

export const useSelectionHandling = (
  setAskText,
  setInputValue,
  setShowScrollBackButton,
  setIsSandbox,
  buttonRef,
  inputRef
) => {
  const [highlightClass, setHighlightClass] = useState('')

  const handleAskAlphy = type => {
    let askInput

    if (type === 'sandbox') {
      setIsSandbox(true)
      return
    }

    const selection = window.getSelection()

    setShowScrollBackButton(true)
    if (!selection.rangeCount) return
    if (document.getElementById('selection-span') !== null) {
      const previousSpanSelection = document.getElementById('selection-span')
      previousSpanSelection.outerHTML = previousSpanSelection.innerHTML
      previousSpanSelection.className = ''
      previousSpanSelection.id = ''
    }
    const range = selection.getRangeAt(0)

    const span = document.createElement('span')
    span.id = 'selection-span'
    let lastChild = range.commonAncestorContainer.lastChild
    if (lastChild == null) {
      lastChild = range.commonAncestorContainer
    }

    const newRange = document.createRange()
    newRange.selectNode(lastChild)
    newRange.surroundContents(span)

    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    } else if (document.selection) {
      document.selection.empty()
    }

    const selectedText = window.getSelection().toString()

    if (type === 'default') {
      askInput = 'Explain the following:' + selectedText + "?'"
    } else if (type === 'ELI5') {
      askInput = "Explain the following like I'm 5:" + "'" + selectedText + "'"
    }

    setInputValue(askInput)

    if (inputRef.current) {
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.click()
        }
      }, 1000)
    }

    handleScroll()
  }

  const scrollToSavedDepth = () => {
    setShowScrollBackButton(false)

    if (document.getElementById('selection-span')) {
      const selectionSpan = document.getElementById('selection-span')

      if (selectionSpan) {
        selectionSpan.scrollIntoView({ behavior: 'smooth' })
        selectionSpan.className = 'flash-effect'
      }
    }
  }

  const handleScroll = () => {
    const contentElement = document.getElementById('processing-tier')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    highlightClass,
    setHighlightClass,
    handleAskAlphy,
    scrollToSavedDepth
  }
}