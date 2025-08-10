import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { InputArea } from './components/InputArea';
import { DesktopMobileComparison } from './components/DesktopMobileComparison';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Check for comparison mode from URL hash
  useEffect(() => {
    const checkComparisonMode = () => {
      setShowComparison(window.location.hash === '#comparison');
    };
    
    checkComparisonMode();
    window.addEventListener('hashchange', checkComparisonMode);
    
    return () => window.removeEventListener('hashchange', checkComparisonMode);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleStartChat = () => {
    setIsChatMode(true);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleNewChat = () => {
    setIsChatMode(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Show comparison frame if requested
  if (showComparison) {
    return <DesktopMobileComparison />;
  }

  // Calculate sidebar width - 15% when collapsed, normal width when expanded
  const getSidebarWidth = () => {
    if (isMobile) return 'w-80';
    return isSidebarCollapsed ? 'w-[15vw] min-w-[60px]' : 'w-64';
  };

  return (
    <div className="flex h-full w-full flex-col relative overflow-hidden">
      {/* Version 32 Blue Gradient Background System - Exact Recreation */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {!isChatMode ? (
          /* Version 32 Sophisticated Blue Gradient System - Welcome State */
          <>
            {/* Base foundation layer - soft blue-white */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: '#f4f8ff'
              }}
            />
            
            {/* Primary radial gradient - blue tonal center */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'radial-gradient(ellipse 140% 120% at 35% 60%, #f0f6ff 0%, #e8f2ff 35%, #ddeeff 55%, transparent 85%)'
              }}
            />
            
            {/* Secondary radial gradient - light blue tones right side */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'radial-gradient(ellipse 100% 140% at 85% 40%, #f2f8ff 0%, #d4e8ff 30%, #b8dcf8 60%, transparent 80%)'
              }}
            />
            
            {/* Tertiary overlay - warm blue center highlight */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'radial-gradient(ellipse 60% 80% at 50% 45%, #f6f9ff 0%, #f2f6ff 25%, transparent 70%)'
              }}
            />
            
            {/* Soft accent overlay - left side */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'radial-gradient(ellipse 80% 100% at 20% 50%, #f4f7ff 0%, #f0f4ff 30%, transparent 65%)'
              }}
            />
            
            {/* Enhanced blue accent - top right */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'radial-gradient(ellipse 70% 90% at 80% 30%, #e0f0ff 0%, #7AD1FF 40%, transparent 70%)'
              }}
            />
            
            {/* Sophisticated linear overlay for depth */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 246, 255, 0.6) 0%, rgba(232, 242, 255, 0.4) 40%, rgba(122, 209, 255, 0.3) 100%)'
              }}
            />
            
            {/* Final soft blending layer */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, rgba(244, 248, 255, 0.3) 60%, rgba(244, 248, 255, 0.5) 100%)'
              }}
            />
          </>
        ) : (
          /* Clean White System - Chat State with Smooth Transition */
          <>
            {/* Base pure white with transition */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: '#ffffff'
              }}
            />
            
            {/* Optional subtle white-on-white vertical gradient with transition */}
            <div 
              className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 1) 100%)'
              }}
            />
          </>
        )}
      </div>

      {/* Mobile menu overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="relative flex h-full w-full flex-1 transition-colors z-10">
        {/* Mobile header with menu button - Enhanced Glass Effects */}
        {isMobile && (
          <div className="absolute top-4 left-0 right-0 z-30 h-14 flex items-center justify-between px-4">
            <div 
              className="backdrop-blur-[24px] bg-white/[0.12] rounded-lg p-2 transition-all duration-300"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200"
                style={{ color: '#242424' }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
            
            <div 
              className="backdrop-blur-[24px] bg-white/[0.12] rounded-lg px-3 py-2 transition-all duration-300"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span 
                style={{ 
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#242424',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'Eloquia Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                CelesteOS
              </span>
            </div>
          </div>
        )}

        <div className="relative flex h-full w-full flex-row">
          {/* Sidebar - Maintaining Full Glass Effects */}
          <div className={`
            ${isMobile 
              ? `fixed left-0 top-0 z-50 h-full transition-transform duration-300 ${
                  isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }` 
              : 'relative z-20 transition-all duration-300'
            } 
            ${getSidebarWidth()} 
            shrink-0 overflow-hidden
          `}>
            <Sidebar 
              onNewChat={handleNewChat} 
              isMobile={isMobile}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={toggleSidebarCollapse}
              onMobileMenuClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
          
          {/* Main content area */}
          <div className={`
            relative flex h-full max-w-full flex-1 flex-col transition-all duration-300
            ${isMobile ? 'w-full' : ''}
          `}>
            <main className="relative h-full w-full flex-1 overflow-auto">
              <div className="h-full w-full">
                <div className="flex h-full flex-col focus-visible:outline-0 overflow-hidden">
                  <ChatArea isChatMode={isChatMode} isMobile={isMobile} />
                  <InputArea onStartChat={handleStartChat} isMobile={isMobile} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Comparison Mode Access Button - Development Only */}
      {!isChatMode && (
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => window.location.hash = '#comparison'}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors font-text"
          >
            View Comparison
          </button>
        </div>
      )}
    </div>
  );
}