# Source Page Rewrite Specification

## Executive Summary

This document outlines a complete rewrite of the source page (`[source_id].js`) and all its subcomponents. The goal is to eliminate redundancy, simplify data flow, reduce prop drilling, and create a maintainable, performant architecture.

---

## Table of Contents

1. [Current Problems by Component](#current-problems-by-component)
2. [New Architecture Overview](#new-architecture-overview)
3. [Component Specifications](#component-specifications)
4. [Context Design](#context-design)
5. [Data Fetching Strategy](#data-fetching-strategy)
6. [File Structure](#file-structure)

---

## Current Problems by Component

### 1. `[source_id].js` (Page)

**Current Issues:**
- Fetches data, then passes `data` and `setData` down to children
- Children can mutate parent state (anti-pattern)
- Duplicate validation logic for source_id
- Image URL logic duplicated (also in child components)
- Unnecessary Loading component import

**What it should do:**
- Route-level component only
- Delegate ALL data fetching to a context/hook
- Render single child component

---

### 2. `Source.jsx`

**Current Issues:**
- 330+ lines with mixed concerns
- Has its OWN `fetchDataUpload()` and `fetchData()` functions (duplicate!)
- Manages `isLoading`, `authorizationError`, `isVisible`, `isPublic`, `isSandbox`, `language`, `called`, `bookmarkChecked` - too many states
- 5-second polling interval defined inside component
- `checkBookmark()` function with setTimeout hack
- Contains `SideFeed` which has nothing to do with source content
- Confusing conditional rendering with `isLoading || data.length`

**What it should do:**
- Be eliminated entirely
- SideFeed should be in layout, not in source page
- Polling logic should be in a hook

---

### 3. `Content.jsx`

**Current Issues:**
- 640+ lines - way too large
- 7 custom hooks imported, creating complex dependencies
- 30+ state variables
- 8 useRef declarations
- 10+ useEffect hooks
- DUPLICATE JSX for mobile (lines 477-604) vs desktop (lines 305-468)
- Mixes UI state with business logic
- `useCallback` for simple functions that don't need memoization

**State explosion example:**
```javascript
const [isLoading, setIsLoading] = useState(...)
const [activeTab, setActiveTab] = useState(...)
const [basicDataLoaded, setBasicDataLoaded] = useState(...)
const [errorMessage, setErrorMessage] = useState(...)
const [modelName, setModelName] = useState(...)
const [languagesWanted, setLanguagesWanted] = useState(...)
const [languages, setLanguages] = useState(...)
const [askText, setAskText] = useState(...)
const [inputValue, setInputValue] = useState(...)
const [translatingLanguage, setTranslatingLanguage] = useState(...)
// ... 20 more
```

**What it should do:**
- Single responsive layout (no duplicate JSX)
- Use context for shared state
- Max 5-10 local state variables
- Delegate complex logic to hooks/utilities

---

### 4. `ReadComponent.jsx`

**Current Issues:**
- 300+ lines
- Receives 40+ props
- Has `convertTimeToSeconds` function defined inside (should be utility)
- Complex `isContentAvailable` and `needsTranslation` logic inline
- `isClient` state just for hydration

**What it should do:**
- Receive data from context
- Max 5-10 props
- Pure presentation component

---

### 5. `HeaderArea.jsx` + `HeaderMenu.jsx`

**Current Issues:**
- `HeaderArea` manages theme state that's already global
- `readTime` calculation on every render
- 35+ props passed to `HeaderMenu`
- Theme toggle logic duplicated from `_app.js`

**What it should do:**
- Use global theme from context/next-themes
- Calculate read time once in parent
- Access data from context

---

### 6. `QuestionAnswering.jsx` + Hooks

**Current Issues:**
- `useQAState.js` exports 34 state variables (!)
- `useQAHandlers.js` receives 38 parameters
- Complex URL query parsing logic
- WebSocket management mixed with UI logic
- `areaRefs` with dynamic refs is over-engineered

**useQAState exports:**
```javascript
answerData, setAnswerData, isLoadingInside, setIsLoadingInside,
answer, setAnswer, showSource, setShowSource, showBaseQA, setShowBaseQA,
baseSources, setBaseSources, baseQuestion, setBaseQuestion, isCleared,
setIsCleared, showUserQA, setShowUserQA, inputError, setInputError,
errorText, setErrorText, clicked, setClicked, triggerWs, setTriggerWs,
singleSource, setSingleSource, collapseIndex, setCollapseIndex,
highlightIndex, setHighlightIndex, question, setQuestion, openDialog, setOpenDialog
```

**What it should do:**
- Consolidate into 3-5 state objects
- WebSocket logic in separate service
- Simpler component with fewer responsibilities

---

### 7. `Sandbox.jsx` + `GenerationZone.jsx`

**Current Issues:**
- `sessionStorage` access in useEffect dependency array (anti-pattern)
- Theme loaded from localStorage in component (should use context)
- `createDopeStuff` function is 80+ lines
- WebSocket connection management inline
- `contentDetails` and `settings` state objects could be combined

**What it should do:**
- Use theme from context
- WebSocket service abstraction
- Cleaner state structure

---

### 8. Custom Hooks (Content/hooks/)

**Current Issues:**

| Hook | Problem |
|------|---------|
| `useTranscript` | Uses `await` on synchronous operations, pushes to array with await |
| `useSummary` | Same async anti-pattern, coupled to data structure |
| `useVideoNavigation` | Fine, but timestamp parsing duplicated |
| `useSelectionHandling` | DOM manipulation, scroll logic mixed |
| `useArchipelago` | API calls without error handling |
| `useContentUI` | Just useState calls - not a hook, just state |
| `useDownloadHandling` | Nested setTimeout, cleanup issues |

---

## New Architecture Overview

### Principles

1. **Single Source of Truth**: One place for data fetching, one place for state
2. **Context for Shared State**: No prop drilling beyond 2 levels
3. **Separation of Concerns**: UI, data, and business logic separated
4. **Responsive by Default**: CSS handles mobile/desktop, not duplicate JSX
5. **Colocate Related Code**: Keep state close to where it's used

### Component Hierarchy

```
[source_id].js (Page)
└── SourceProvider (Context + Data Fetching)
    └── SourceLayout
        ├── SourceHeader
        │   ├── Title
        │   ├── CreatorInfo
        │   └── HeaderMenu (Popover)
        ├── SourceContent
        │   ├── ReadPanel
        │   │   ├── TabNavigation
        │   │   ├── SummaryView
        │   │   └── TranscriptView
        │   └── InteractivePanel
        │       ├── TabNavigation
        │       ├── QAView
        │       └── PlaygroundView
        └── MediaPlayer (Portal/Fixed)
```

---

## Context Design

### SourceContext

```typescript
interface SourceContextValue {
  // Data
  source: SourceData | null
  isLoading: boolean
  error: Error | null
  
  // Derived
  transcript: TranscriptSegment[]
  summary: Summary | null
  
  // Actions
  refetch: () => void
  requestTranslation: (lang: string) => Promise<void>
  toggleBookmark: () => Promise<void>
  toggleVisibility: () => Promise<void>
}
```

### UIContext (for source page)

```typescript
interface UIContextValue {
  // Panels
  activeReadTab: 'summary' | 'transcript'
  setActiveReadTab: (tab) => void
  activeInteractiveTab: 'qa' | 'playground'
  setActiveInteractiveTab: (tab) => void
  
  // Media
  showMediaPlayer: boolean
  setShowMediaPlayer: (show) => void
  timestamp: number
  seekTo: (seconds: number) => void
  
  // Language
  language: string
  setLanguage: (lang: string) => void
}
```

---

## Data Fetching Strategy

### Initial Load

```javascript
// In SourceProvider
const { data, error, isLoading, mutate } = useSWR(
  source_id ? `/sources/${source_type}/${source_id}` : null,
  fetcher,
  {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  }
)
```

### Polling for Incomplete Content

```javascript
// Only poll if summary not complete
useSWR(
  shouldPoll ? `/sources/${source_type}/${source_id}` : null,
  fetcher,
  { refreshInterval: 5000 }
)

const shouldPoll = data && !data.summaries?.[0]?.complete
```

### Authenticated Requests (Uploads)

```javascript
const fetcher = async (url) => {
  const headers = {}
  if (source_type === 'up' && currentUser) {
    headers['id-token'] = await currentUser.getIdToken()
  }
  const res = await fetch(`${API_URL}${url}`, { headers })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}
```

---

## Component Specifications

### 1. SourcePage (New `[source_id].js`)

```jsx
export default function SourcePage() {
  const router = useRouter()
  const { source_type, source_id } = router.query
  
  if (!router.isReady) return <Loading />
  
  return (
    <SourceProvider sourceType={source_type} sourceId={source_id}>
      <SourceLayout />
    </SourceProvider>
  )
}
```

**Lines: ~15**

---

### 2. SourceProvider

**Responsibilities:**
- Fetch source data
- Handle polling
- Provide context
- Parse transcript/summary

**State:**
- `source` (from SWR)
- `isBookmarked`
- `language`

**Lines: ~100**

---

### 3. SourceLayout

**Responsibilities:**
- Layout structure
- Responsive design (CSS only)
- Error/loading states from context

```jsx
function SourceLayout() {
  const { source, isLoading, error } = useSource()
  
  if (isLoading) return <Loading />
  if (error) return <ErrorState error={error} />
  if (!source) return <NotFound />
  
  return (
    <div className="flex h-screen">
      <SideFeed /> {/* From layout, not here ideally */}
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 lg:w-3/5">
          <SourceHeader />
          <ReadPanel />
        </div>
        <div className="lg:w-2/5">
          <InteractivePanel />
        </div>
      </main>
      <MediaPlayer />
    </div>
  )
}
```

**Lines: ~50**

---

### 4. SourceHeader

**Responsibilities:**
- Display title, creator, metadata
- Settings menu trigger

```jsx
function SourceHeader() {
  const { source } = useSource()
  
  const readTime = useMemo(() => {
    // Calculate from summary
  }, [source.summaries])
  
  return (
    <header className="p-4">
      <div className="flex justify-between">
        <div>
          <h1>{source.title}</h1>
          <p>{source.creator_name}</p>
          <p>{source.source_mins} min • {readTime} min read</p>
        </div>
        <HeaderMenu />
      </div>
    </header>
  )
}
```

**Lines: ~40**

---

### 5. ReadPanel

```jsx
function ReadPanel() {
  const { activeReadTab, setActiveReadTab } = useSourceUI()
  
  return (
    <Tabs value={activeReadTab} onValueChange={setActiveReadTab}>
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <SummaryView />
      </TabsContent>
      <TabsContent value="transcript">
        <TranscriptView />
      </TabsContent>
    </Tabs>
  )
}
```

**Lines: ~30**

---

### 6. SummaryView

```jsx
function SummaryView() {
  const { summary, keyTakeaways } = useSource()
  const { seekTo } = useSourceUI()
  
  if (!summary) return <SummaryLoading />
  
  return (
    <div>
      {keyTakeaways.length > 0 && (
        <KeyTakeawaysCard takeaways={keyTakeaways} />
      )}
      <ChapteredSummary 
        chapters={summary.chapters} 
        onTimestampClick={seekTo}
      />
    </div>
  )
}
```

**Lines: ~40**

---

### 7. TranscriptView

```jsx
function TranscriptView() {
  const { transcript, source } = useSource()
  const { seekTo } = useSourceUI()
  
  return (
    <div className="space-y-4">
      {transcript.map((segment, i) => (
        <TranscriptSegment 
          key={i}
          segment={segment}
          sourceType={source.source_type}
          sourceId={source.source_id}
          onTimestampClick={seekTo}
        />
      ))}
    </div>
  )
}
```

**Lines: ~30**

---

### 8. InteractivePanel

```jsx
function InteractivePanel() {
  const { activeInteractiveTab, setActiveInteractiveTab } = useSourceUI()
  
  return (
    <Tabs value={activeInteractiveTab} onValueChange={setActiveInteractiveTab}>
      <TabsList>
        <TabsTrigger value="qa">Q&A</TabsTrigger>
        <TabsTrigger value="playground">Playground</TabsTrigger>
      </TabsList>
      <TabsContent value="qa">
        <QAView />
      </TabsContent>
      <TabsContent value="playground">
        <PlaygroundView />
      </TabsContent>
    </Tabs>
  )
}
```

**Lines: ~30**

---

### 9. QAView

**Simplified State:**
```javascript
const [input, setInput] = useState('')
const [messages, setMessages] = useState([]) // { type: 'question'|'answer', content, sources? }
const [isLoading, setIsLoading] = useState(false)
```

**Lines: ~100**

---

### 10. PlaygroundView

**Simplified State:**
```javascript
const [selectedTool, setSelectedTool] = useState(null)
const [prompt, setPrompt] = useState('')
const [output, setOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)
```

**Lines: ~100**

---

### 11. MediaPlayer

```jsx
function MediaPlayer() {
  const { source } = useSource()
  const { showMediaPlayer, timestamp } = useSourceUI()
  
  if (!showMediaPlayer) return null
  
  // Use portal to render fixed position
  return createPortal(
    <div className="fixed bottom-24 right-4 z-50">
      {source.source_type === 'yt' && (
        <YouTubeEmbed videoId={source.source_id} timestamp={timestamp} />
      )}
      {source.source_type === 'tw' && (
        <TwitchEmbed videoId={source.source_id} timestamp={timestamp} />
      )}
      {/* ... other types */}
    </div>,
    document.body
  )
}
```

**Lines: ~50**

---

## File Structure

```
src/
├── components/
│   └── source/                    # NEW - all source page components
│       ├── context/
│       │   ├── SourceContext.jsx  # Data context
│       │   └── UIContext.jsx      # UI state context
│       ├── layout/
│       │   └── SourceLayout.jsx
│       ├── header/
│       │   ├── SourceHeader.jsx
│       │   └── HeaderMenu.jsx
│       ├── read/
│       │   ├── ReadPanel.jsx
│       │   ├── SummaryView.jsx
│       │   ├── TranscriptView.jsx
│       │   └── components/
│       │       ├── KeyTakeawaysCard.jsx
│       │       ├── ChapteredSummary.jsx
│       │       └── TranscriptSegment.jsx
│       ├── interactive/
│       │   ├── InteractivePanel.jsx
│       │   ├── QAView.jsx
│       │   ├── PlaygroundView.jsx
│       │   └── components/
│       │       └── ToolSelector.jsx
│       ├── media/
│       │   ├── MediaPlayer.jsx
│       │   └── embeds/
│       │       ├── YouTubeEmbed.jsx
│       │       └── TwitchEmbed.jsx
│       ├── hooks/
│       │   ├── useSource.js       # Context consumer
│       │   ├── useSourceUI.js     # UI context consumer
│       │   └── useWebSocket.js    # WebSocket abstraction
│       └── utils/
│           ├── parseTranscript.js
│           ├── formatTimestamp.js
│           └── api.js
└── pages/
    └── [source_type]/
        └── [source_id].js          # Minimal page component
```

---

## Migration Strategy

1. Create new `/components/source/` directory
2. Build new components without touching old ones
3. Create new page that uses new components
4. Test thoroughly
5. Remove old components

---

## Metrics to Track

| Metric | Current | Target |
|--------|---------|--------|
| Total Lines (source page tree) | ~2500+ | ~800 |
| Props passed to Content | 40+ | 0 (context) |
| State variables in Content | 30+ | ~5 |
| Custom hooks in Content | 7 | 0 (use context) |
| Duplicate JSX blocks | 2 (mobile/desktop) | 0 |
| Data fetch locations | 3 | 1 |
| Loading state variables | 3+ | 1 |

---

## Key Improvements Summary

1. **Single Data Fetch**: SWR in context, not scattered fetches
2. **Context over Props**: Eliminate prop drilling
3. **Responsive CSS**: No duplicate JSX
4. **Consolidated State**: Related state grouped, fewer variables
5. **Clear Separation**: Layout, data, presentation clearly separated
6. **WebSocket Service**: Reusable for Q&A and Playground
7. **Utilities**: Parsing, formatting in pure functions
8. **Smaller Components**: Each component does one thing well

