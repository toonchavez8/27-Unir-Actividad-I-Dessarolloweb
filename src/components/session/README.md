# Dynamic Session Management System

## Overview

A comprehensive live session management system for Dungeon Masters to run real-time D&D sessions with integrated tools for notes, NPC management, combat tracking, and timeline recording.

## 🎯 Core Features

### Live Session Dashboard

- **Real-time session management** with start/pause/stop controls
- **Session timer** with formatted time display (HH:MM:SS)
- **Status indicators** (Not Started, Running, Paused)
- **Session metadata** display (campaign, date, duration)

### Dynamic Notes System

- **Timestamped notes** added during gameplay
- **Quick note input** with keyboard shortcuts (Enter to submit)
- **Auto-timestamping** with session timer integration
- **Note categorization** and filtering

### NPC Quick Access

- **Fast NPC lookup** with search functionality
- **Campaign-filtered NPCs** showing relevant characters
- **Quick interaction logging** (one-click to log NPC encounters)
- **NPC details display** (name, race, class, status)

### Initiative Tracker

- **Combat management** with initiative ordering
- **Dynamic turn tracking** with current turn highlighting
- **Add/remove combatants** during combat
- **HP tracking** (optional) for each participant
- **Next turn automation** with event logging

### Scene Manager

- **Location tracking** with current location display
- **Quick location changes** with auto-event logging
- **Location search and filtering**
- **Location descriptions** and details

### Player Actions Log (Timeline)

- **Chronological event timeline** with timestamps
- **Event categorization** (notes, combat, roleplay, location changes)
- **Search and filter** functionality
- **Recent events highlighting**
- **Event statistics** and counts
- **Rich event metadata** (NPCs involved, locations, etc.)

### Quick Actions Panel

- **Predefined action buttons** for common events
- **Dice rolling integration** (d20, d6 with visual feedback)
- **Quick event logging** (combat start, roleplay, discoveries)
- **Custom event creation** with metadata

## 🏗️ Component Architecture

### Modular Design

The system is split into focused, reusable components for easy debugging and styling:

```
src/components/session/
├── SessionRunner.tsx          # Main orchestrator component
├── SessionHeader.tsx          # Timer, controls, and session info
├── SessionSidebar.tsx         # Tabbed interface for tools
├── SessionTimeline.tsx        # Event timeline and filtering
├── SessionActions.tsx         # Quick actions and dice rolling
└── index.ts                   # Component exports
```

### Component Responsibilities

#### SessionRunner

- **Route integration** (`/campaigns/:campaignId/sessions/:sessionId/run`)
- **State orchestration** using `useSessionRunner` hook
- **Data fetching** (session, campaign, NPCs, locations)
- **Layout management** for responsive design

#### SessionHeader

- **Session controls** (start, pause, stop)
- **Real-time timer** display with formatting
- **Session metadata** (title, campaign, date)
- **Status indicators** with color coding

#### SessionSidebar

- **Tabbed interface** (Notes, NPCs, Combat, Locations, Actions)
- **Tool-specific interfaces** for each tab
- **Search functionality** across different data types
- **Action buttons** for quick interactions

#### SessionTimeline

- **Event chronology** with timestamps
- **Advanced filtering** by type and content
- **Search capabilities** across events
- **Event statistics** and visual indicators

#### SessionActions

- **Quick action buttons** for common DM tasks
- **Dice rolling** with animated feedback
- **Event creation shortcuts**
- **Quick note input** for rapid logging

## 🎨 Styling System

### BEM Methodology

All components follow BEM (Block Element Modifier) CSS architecture:

```css
.session-header                    /* Block */
.session-header__title            /* Element */
.session-header__button--start    /* Modifier */
```

### CSS Variables

Consistent theming using CSS custom properties:

```css
--primary-500    /* Primary colors */
--success-500    /* Status colors */
--text-dark      /* Typography */
--border-color   /* Borders and dividers */
```

### Responsive Design

- **Mobile-first** approach with progressive enhancement
- **Flexible layouts** that adapt to different screen sizes
- **Touch-friendly** interfaces for tablet use
- **Optimized performance** for all devices

## 🔧 State Management

### useSessionRunner Hook

Centralized state management for live sessions:

```typescript
const {
  // Session State
  isRunning, isPaused, sessionTime, sessionEvents,
  // UI State  
  activeTab, currentLocation, initiative, currentTurn,
  // Actions
  startSession, pauseSession, endSession, addEvent, formatTime
} = useSessionRunner(session, sessionId, navigate, updateSession);
```

### Event System

Type-safe event management with rich metadata:

```typescript
interface SessionEvent {
  id: string;
  timestamp: number;
  type: 'note' | 'combat' | 'roleplay' | 'event' | 'location-change';
  content: string;
  npcs?: string[];
  location?: string;
  metadata?: Record<string, unknown>;
}
```

## 📱 User Experience

### Workflow Optimization

- **One-click actions** for common DM tasks
- **Keyboard shortcuts** for rapid input
- **Auto-saving** of session progress
- **Persistent state** across page reloads

### Visual Feedback

- **Real-time updates** with smooth animations
- **Status indicators** with color coding
- **Progress tracking** with visual cues
- **Confirmation dialogs** for destructive actions

### Accessibility

- **Screen reader support** with proper ARIA labels
- **Keyboard navigation** for all interactive elements
- **High contrast** color schemes
- **Scalable typography** for readability

## 🚀 Usage

### Starting a Live Session

1. Navigate to session detail page
2. Click "Run Session" button
3. Click "Start Session" in the header
4. Begin managing your live session

### During Session

- **Add notes** using the Notes tab
- **Track combat** with the Initiative Tracker
- **Log interactions** with NPCs
- **Change locations** with auto-logging
- **Use quick actions** for common events

### Session Management

- **Pause/Resume** as needed
- **Real-time timer** tracks duration
- **Auto-save** preserves progress
- **End session** with summary generation

## 🔄 Integration

### Data Flow

- **Campaign data** (NPCs, locations) automatically loaded
- **Session events** persist to campaign session record
- **Real-time updates** across all components
- **Auto-generated summaries** on session end

### Navigation

- **Seamless routing** between session views
- **Deep linking** to specific sessions
- **Breadcrumb navigation** for context
- **Back button** integration

This dynamic session management system provides DMs with a comprehensive toolkit for running engaging, well-documented live sessions with minimal overhead and maximum functionality.
