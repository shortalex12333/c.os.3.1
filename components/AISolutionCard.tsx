import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ExternalLink, Copy, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SolutionSource {
  title: string;
  page?: number;
  revision?: string;
}

interface Solution {
  id: string;
  title: string;
  confidence: 'low' | 'medium' | 'high';
  source: SolutionSource;
  steps: Array<{
    text: string;
    type?: 'warning' | 'tip' | 'normal';
    isBold?: boolean;
  }>;
  procedureLink?: string;
}

interface AISolutionCardProps {
  solutions: Solution[];
  isMobile?: boolean;
}

export function AISolutionCard({ solutions, isMobile = false }: AISolutionCardProps) {
  // Default: Solution 1 expanded, others collapsed
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(
    new Set(solutions.length > 0 ? [solutions[0].id] : [])
  );

  // Detect reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleSolution = (solutionId: string) => {
    const newExpanded = new Set(expandedSolutions);
    if (newExpanded.has(solutionId)) {
      newExpanded.delete(solutionId);
    } else {
      newExpanded.add(solutionId);
    }
    setExpandedSolutions(newExpanded);
  };

  const copyToClipboard = (solutionId: string) => {
    const solution = solutions.find(s => s.id === solutionId);
    if (solution) {
      const text = `${solution.title}\n\n${solution.steps.map(step => `• ${step.text}`).join('\n')}`;
      navigator.clipboard.writeText(text);
    }
  };

  // Truncate source title for mobile if >20 characters
  const truncateSourceTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + '...';
  };

  const getConfidenceBadgeStyle = (confidence: string) => {
    switch (confidence) {
      case 'low':
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          border: '1px solid #e5e7eb'
        };
      case 'medium':
        return {
          backgroundColor: '#dbeafe',
          color: '#1d4ed8',
          border: '1px solid #93c5fd'
        };
      case 'high':
        return {
          backgroundColor: '#dbeafe',
          color: '#1d4ed8',
          border: '1px solid #3b82f6'
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          border: '1px solid #e5e7eb'
        };
    }
  };

  const getStepIcon = (type?: string) => {
    const iconSize = isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'; // 14px for mobile, 16px for desktop
    
    switch (type) {
      case 'warning':
        return <AlertTriangle className={`${iconSize} text-amber-500`} />;
      case 'tip':
        return <Info className={`${iconSize} text-blue-500`} />;
      default:
        return <CheckCircle className={`${iconSize} text-green-500`} />;
    }
  };

  // Motion variants for reduced motion vs full motion
  const getMotionVariants = () => {
    if (prefersReducedMotion) {
      return {
        collapsed: { height: 'auto', opacity: 1 },
        expanded: { height: 'auto', opacity: 1 }
      };
    }

    return {
      collapsed: {
        height: 'auto',
        opacity: 1
      },
      expanded: {
        height: 'auto',
        opacity: 1
      }
    };
  };

  // Content animation variants with precise timing - IDENTICAL to desktop
  const getContentVariants = () => {
    if (prefersReducedMotion) {
      return {
        collapsed: { 
          opacity: 1,
          height: 0,
          y: 0,
          transition: { duration: 0 }
        },
        expanded: { 
          opacity: 1,
          height: 'auto',
          y: 0,
          transition: { duration: 0 }
        }
      };
    }

    return {
      collapsed: {
        opacity: 0,
        height: 0,
        y: -4,
        transition: {
          duration: 0.2, // 200ms (180-220ms range) - IDENTICAL
          ease: [0.22, 0.61, 0.36, 1], // cubic-bezier(0.22,0.61,0.36,1) - IDENTICAL
          height: { duration: 0.18 },
          opacity: { duration: 0.15 }
        }
      },
      expanded: {
        opacity: 1,
        height: 'auto',
        y: 0,
        transition: {
          duration: 0.28, // 280ms (240-320ms range) - IDENTICAL
          ease: [0.22, 0.61, 0.36, 1], // cubic-bezier(0.22,0.61,0.36,1) - IDENTICAL
          height: { duration: 0.25 },
          opacity: { duration: 0.2, delay: 0.05 }
        }
      }
    };
  };

  // Chevron rotation variants - IDENTICAL timing
  const getChevronVariants = () => {
    if (prefersReducedMotion) {
      return {
        collapsed: { rotate: 0 },
        expanded: { rotate: 90 }
      };
    }

    return {
      collapsed: {
        rotate: 0,
        transition: { duration: 0.18, ease: [0.22, 0.61, 0.36, 1] } // IDENTICAL
      },
      expanded: {
        rotate: 90,
        transition: { duration: 0.18, ease: [0.22, 0.61, 0.36, 1] } // IDENTICAL
      }
    };
  };

  // Staggered bullet list variants - IDENTICAL timing
  const getStepContainerVariants = () => {
    if (prefersReducedMotion) {
      return {
        expanded: {
          transition: { staggerChildren: 0 }
        }
      };
    }

    return {
      expanded: {
        transition: {
          staggerChildren: 0.06, // 60ms delay between each - IDENTICAL
          delayChildren: 0.1 // Start after main content animation - IDENTICAL
        }
      }
    };
  };

  const getStepItemVariants = () => {
    if (prefersReducedMotion) {
      return {
        collapsed: { opacity: 1, y: 0 },
        expanded: { opacity: 1, y: 0 }
      };
    }

    return {
      collapsed: {
        opacity: 0,
        y: 8
      },
      expanded: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25, // IDENTICAL
          ease: [0.22, 0.61, 0.36, 1] // IDENTICAL
        }
      }
    };
  };

  return (
    <div 
      className="w-full space-y-0"
      style={{ padding: '12px' }} // Container padding maintained
    >
      {solutions.map((solution, index) => {
        const isExpanded = expandedSolutions.has(solution.id);
        
        return (
          <motion.div
            key={solution.id}
            className={`
              border border-gray-200 overflow-hidden
              ${index === 0 ? '' : 'border-t-0'}
              ${isExpanded ? 'bg-white/95 backdrop-blur-sm' : 'bg-white hover:bg-gray-50/50'}
            `}
            style={{
              borderRadius: '0px',
              ...(isExpanded && {
                backdropFilter: 'blur(3px)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              })
            }}
            variants={getMotionVariants()}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            {/* Header Row - Always Visible with Mobile Responsive Styling */}
            <div 
              className="cursor-pointer transition-colors duration-200"
              onClick={() => toggleSolution(solution.id)}
              style={{
                padding: isMobile ? (isExpanded ? '16px' : '12px') : '24px' // Mobile: 16px expanded, 12px collapsed
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Solution Title - Mobile Responsive Typography */}
                    <h3 
                      className="flex-1 min-w-0"
                      style={{
                        fontSize: isMobile ? '16px' : '18px', // Mobile: 16px, Desktop: 18px
                        lineHeight: isMobile ? '24px' : '26px', // Mobile: 24px, Desktop: 26px
                        fontWeight: '600',
                        color: '#1a1a1a',
                        fontFamily: 'Eloquia Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}
                    >
                      {solution.title}
                    </h3>
                    
                    {/* Confidence Badge - Mobile Scaled Down */}
                    <div 
                      className="px-3 py-1 rounded-full flex-shrink-0"
                      style={{
                        fontSize: isMobile ? '11px' : '12px', // Mobile: 11px, Desktop: 12px
                        lineHeight: isMobile ? '14px' : '16px', // Mobile: 14px, Desktop: 16px
                        fontWeight: '500',
                        fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        ...getConfidenceBadgeStyle(solution.confidence)
                      }}
                    >
                      {solution.confidence.charAt(0).toUpperCase() + solution.confidence.slice(1)} Confidence
                    </div>
                  </div>
                  
                  {/* Source Chip - Mobile Truncation */}
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md"
                    style={{
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#6b7280',
                      fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>
                      {isMobile 
                        ? truncateSourceTitle(solution.source.title, 20) // Mobile: truncate at 20 chars
                        : solution.source.title // Desktop: full title
                      }
                      {solution.source.page && ` p.${solution.source.page}`}
                      {solution.source.revision && `, Rev ${solution.source.revision}`}
                    </span>
                  </div>
                </div>

                {/* Animated Chevron Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    variants={getChevronVariants()}
                    initial="collapsed"
                    animate={isExpanded ? "expanded" : "collapsed"}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Animated Expanded Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key={`content-${solution.id}`}
                  variants={getContentVariants()}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Body - Rich Text with Steps and Mobile Responsive Bullet Indent */}
                  <div 
                    className="border-t border-gray-100"
                    style={{
                      padding: isMobile ? '16px' : '24px', // Mobile: 16px, Desktop: 24px
                      paddingTop: isMobile ? '16px' : '24px'
                    }}
                  >
                    <motion.div 
                      className="space-y-4"
                      variants={getStepContainerVariants()}
                      initial="collapsed"
                      animate="expanded"
                    >
                      {solution.steps.map((step, stepIndex) => (
                        <motion.div 
                          key={stepIndex} 
                          className="flex items-start"
                          style={{
                            gap: isMobile ? '16px' : '12px' // Mobile: 16px indent, Desktop: 12px
                          }}
                          variants={getStepItemVariants()}
                        >
                          {/* Step Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {getStepIcon(step.type)}
                          </div>
                          
                          {/* Step Text */}
                          <div 
                            className={step.isBold ? 'font-semibold' : ''}
                            style={{
                              fontSize: isMobile ? '15px' : '16px',
                              lineHeight: isMobile ? '22px' : '24px',
                              color: '#374151',
                              fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}
                          >
                            {step.text}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Footer Row - Mobile Responsive Layout */}
                  <motion.div 
                    className={`
                      border-t border-gray-100 
                      ${isMobile ? 'flex flex-col gap-3' : 'flex items-center justify-between'}
                    `}
                    style={{
                      padding: isMobile ? '16px' : '20px 24px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      delay: prefersReducedMotion ? 0 : 0.15,
                      duration: prefersReducedMotion ? 0 : 0.2 
                    }}
                  >
                    {/* View Full Procedure Link */}
                    <button 
                      className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      style={{
                        fontSize: isMobile ? '14px' : '15px',
                        lineHeight: isMobile ? '20px' : '22px',
                        fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="group-hover:underline underline-offset-2">
                        View full procedure
                      </span>
                    </button>

                    {/* Copy Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(solution.id);
                      }}
                      className={`
                        p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                        transition-all duration-200 hover:shadow-sm
                        ${isMobile ? 'self-end' : ''}
                      `}
                      title="Copy solution"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}