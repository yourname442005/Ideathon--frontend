export const APP_CONFIG = {
  name: 'Semantic Workspace',
  description: 'Academic Research Platform — Discover, collaborate, and publish research papers',
  version: '0.1.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  endpoints: {
    search: '/api/search',
    summarize: '/api/summarize',
    generateInsights: '/api/generate-insights',
    analyzeDraft: '/api/analyze-draft',
    chatAssistant: '/api/chat-assistant',
  },
  timeout: 30000,
} as const;

export const UI_CONFIG = {
  sidebarWidth: 256,
  rightSidebarWidth: 320,
  headerHeight: 64,
  maxContentWidth: 1200,
  animationDuration: 200,
  toastDuration: 4000,
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },
} as const;

export const STORAGE_KEYS = {
  theme: 'sw-theme',
  sidebarCollapsed: 'sw-sidebar-collapsed',
  recentSearches: 'sw-recent-searches',
  savedPapers: 'sw-saved-papers',
} as const;

export const EXTERNAL_LINKS = {
  github: 'https://github.com',
  documentation: 'https://docs.semantic-workspace.dev',
  support: 'mailto:support@semantic-workspace.dev',
} as const;
