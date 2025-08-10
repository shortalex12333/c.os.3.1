import React from 'react';
import { Plus, MessageSquare, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  onNewChat: () => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onMobileMenuClose?: () => void;
}

export function Sidebar({ 
  onNewChat, 
  isMobile = false, 
  isCollapsed = false, 
  onToggleCollapse,
  onMobileMenuClose 
}: SidebarProps) {
  const handleNewChat = () => {
    onNewChat();
    if (isMobile && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Glass morphism background */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      />
      
      <div className="relative z-10 flex h-full flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <div 
              className="text-lg font-medium text-gray-900"
              style={{
                fontFamily: 'Eloquia Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              CelesteOS
            </div>
          )}
          
          {!isMobile && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="flex items-center gap-3 w-full p-3 mb-4 text-gray-700 bg-white/50 hover:bg-white/70 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-200"
          style={{
            fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && "New chat"}
        </button>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {!isCollapsed && (
            <div 
              className="text-xs font-medium text-gray-600 mb-2 px-2"
              style={{
                fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Recent
            </div>
          )}
          
          <div className="space-y-1">
            {[
              "Engine Error Code E-047 Analysis",
              "Fuel System Diagnostics",
              "Maintenance Schedule Review",
              "Component Replacement Guide"
            ].map((chat, index) => (
              <button
                key={index}
                className="flex items-center gap-3 w-full p-2 text-left text-gray-600 hover:text-gray-900 hover:bg-white/30 rounded-md transition-all duration-200"
                style={{
                  fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '13px'
                }}
              >
                <MessageSquare className="w-3 h-3 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="truncate">{chat}</span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Bottom Menu */}
        <div className="border-t border-white/30 pt-4 mt-4">
          <div className="space-y-1">
            <button
              className="flex items-center gap-3 w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-white/30 rounded-md transition-all duration-200"
              style={{
                fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '13px'
              }}
            >
              <Settings className="w-4 h-4" />
              {!isCollapsed && "Settings"}
            </button>
            
            <button
              className="flex items-center gap-3 w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-white/30 rounded-md transition-all duration-200"
              style={{
                fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '13px'
              }}
            >
              <User className="w-4 h-4" />
              {!isCollapsed && "Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}