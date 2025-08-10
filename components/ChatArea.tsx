import { AISolutionCard } from './AISolutionCard';

interface ChatAreaProps {
  isChatMode: boolean;
  isMobile?: boolean;
}

// Sample data for 3 solutions with different confidence levels
const sampleSolutions = [
  {
    id: 'solution-1',
    title: 'Primary Fuel System Diagnostic - Filter Inspection',
    confidence: 'high' as const,
    source: {
      title: 'MTU 2000 Series Manual',
      page: 247,
      revision: '2024.3'
    },
    steps: [
      {
        text: 'Shutdown engine and ensure all fuel lines are depressurized before beginning inspection.',
        type: 'warning' as const,
        isBold: true
      },
      {
        text: 'Remove fuel filter housing using the specialized wrench (Part #MT-4472).',
        type: 'normal' as const
      },
      {
        text: 'Inspect filter element for rust deposits, fuel contamination, or physical blockage.',
        type: 'normal' as const
      },
      {
        text: 'Check filter housing O-rings for cracking or degradation - replace if worn.',
        type: 'tip' as const
      },
      {
        text: 'If filter shows contamination, replace with OEM filter (Part #MT-FF-2000) and prime system.',
        type: 'normal' as const,
        isBold: true
      }
    ],
    procedureLink: '/procedures/mtu-fuel-filter-replacement'
  },
  {
    id: 'solution-2',
    title: 'Fuel Pressure Sensor Calibration Check',
    confidence: 'medium' as const,
    source: {
      title: 'Engine Control Module Manual',
      page: 156,
      revision: '2024.1'
    },
    steps: [
      {
        text: 'Connect diagnostic scanner to ECM port (J1939 interface).',
        type: 'normal' as const
      },
      {
        text: 'Navigate to sensor diagnostics menu and select fuel pressure sensor.',
        type: 'normal' as const
      },
      {
        text: 'Compare live sensor readings with expected values at idle (2.8-3.2 bar).',
        type: 'normal' as const,
        isBold: true
      },
      {
        text: 'If readings are outside tolerance, perform sensor recalibration procedure.',
        type: 'warning' as const
      }
    ],
    procedureLink: '/procedures/ecm-sensor-calibration'
  },
  {
    id: 'solution-3',
    title: 'Fuel Line Pressure Test - Alternative Diagnosis',
    confidence: 'low' as const,
    source: {
      title: "Adam's Maintenance Log",
      page: 23,
      revision: '2024.2'
    },
    steps: [
      {
        text: 'Install pressure gauge at fuel rail test port using adapter kit.',
        type: 'normal' as const
      },
      {
        text: 'Start engine and monitor pressure during idle and load conditions.',
        type: 'normal' as const
      },
      {
        text: 'Pressure should remain stable - fluctuations indicate potential pump issues.',
        type: 'tip' as const
      },
      {
        text: 'This method is less reliable than direct sensor testing but can provide backup diagnosis.',
        type: 'warning' as const,
        isBold: true
      }
    ],
    procedureLink: '/procedures/fuel-pressure-manual-test'
  }
];

export function ChatArea({ isChatMode, isMobile = false }: ChatAreaProps) {
  if (isChatMode) {
    return (
      <div className="relative flex h-full w-full flex-1 flex-col">
        {/* Header space - Adjusted for mobile header */}
        <div className={`${isMobile ? 'h-20' : 'h-14'} top-0 z-10 flex items-center justify-center border-transparent`} />

        {/* Chat messages area - Mobile Optimized Layout */}
        <div className="relative flex-1 overflow-y-auto">
          {/* Center column container with mobile-optimized max widths */}
          <div 
            className={`mx-auto ${isMobile ? 'max-w-[390px]' : 'max-w-[760px]'}`} // Mobile: 390px max width
            style={{
              paddingLeft: isMobile ? '16px' : '24px', // Mobile: 16px horizontal padding
              paddingRight: isMobile ? '16px' : '24px'
            }}
          >
            {/* Messages container with proper spacing */}
            <div 
              className="flex flex-col"
              style={{
                gap: isMobile ? '16px' : '20px',
                paddingTop: isMobile ? '16px' : '24px',
                paddingBottom: isMobile ? '16px' : '24px'
              }}
            >
              {/* User message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-gray-600 mb-1"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    You
                  </div>
                  <div 
                    className="bg-white border rounded-xl shadow-sm"
                    style={{
                      padding: isMobile ? '16px' : '24px', // Mobile: 16px padding
                      borderRadius: '12px',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div 
                      className="text-gray-800"
                      style={{
                        fontSize: isMobile ? '15px' : '16px', // Mobile: 15px
                        lineHeight: isMobile ? '22px' : '24px', // Mobile: 22px
                        letterSpacing: '-0.32px',
                        fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}
                    >
                      I'm getting Error Code E-047 on the starboard main engine. What should I do?
                    </div>
                  </div>
                </div>
              </div>

              {/* AI response with multi-solution card */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-gray-600 mb-1"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    CelesteOS
                  </div>
                  
                  {/* AI response introduction */}
                  <div 
                    className="bg-white border rounded-xl shadow-sm mb-4"
                    style={{
                      padding: isMobile ? '16px' : '24px', // Mobile: 16px padding
                      borderRadius: '12px',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div 
                      className="text-gray-800"
                      style={{
                        fontSize: isMobile ? '15px' : '16px', // Mobile: 15px
                        lineHeight: isMobile ? '22px' : '24px', // Mobile: 22px
                        letterSpacing: '-0.32px',
                        fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif'
                      }}
                    >
                      I found 3 potential solutions for Error Code E-047 in your maintenance documentation. The first solution has the highest confidence based on similar cases. Each solution is ranked by confidence level and includes step-by-step procedures:
                    </div>
                  </div>

                  {/* Multi-Solution AI Card with Mobile Variants */}
                  <AISolutionCard
                    solutions={sampleSolutions}
                    isMobile={isMobile}
                  />
                </div>
              </div>

              {/* Additional AI message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-gray-600 mb-1"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif'
                    }}
                  >
                    CelesteOS
                  </div>
                  <div 
                    className="bg-white border rounded-xl shadow-sm"
                    style={{
                      padding: isMobile ? '16px' : '24px', // Mobile: 16px padding
                      borderRadius: '12px',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div 
                      className="text-gray-800"
                      style={{
                        fontSize: isMobile ? '15px' : '16px', // Mobile: 15px
                        lineHeight: isMobile ? '22px' : '24px', // Mobile: 22px
                        letterSpacing: '-0.32px',
                        fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif'
                      }}
                    >
                      I recommend starting with the high-confidence solution (fuel filter inspection) as it addresses the most common cause of this error code. If that doesn't resolve the issue, proceed to the sensor calibration check. The manual pressure test should be used only as a backup diagnostic method.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      {/* Header space - Adjusted for mobile header */}
      <div className={`${isMobile ? 'h-20' : 'h-14'} top-0 z-10 flex items-center justify-center border-transparent`} />

      {/* Welcome state content - Mobile Optimized */}
      <div className="relative flex basis-auto flex-col justify-end flex-1">
        {/* Center column for welcome content with mobile constraints */}
        <div 
          className={`mx-auto ${isMobile ? 'max-w-[390px]' : 'max-w-[760px]'}`} // Mobile: 390px max width
          style={{
            paddingLeft: isMobile ? '16px' : '24px', // Mobile: 16px horizontal padding
            paddingRight: isMobile ? '16px' : '24px'
          }}
        >
          <div className="flex items-center justify-center min-h-[35vh]">
            <div className={`${isMobile ? 'mb-4' : 'mb-7'} text-center`}>
              <div className="relative inline-flex justify-center text-center">
                <div className={`flex flex-col items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <h1 
                    style={{
                      fontSize: isMobile ? '24px' : '28px',
                      lineHeight: isMobile ? '30px' : '34px',
                      letterSpacing: isMobile ? '0.2px' : '0.38px',
                      fontWeight: '400',
                      color: '#181818',
                      fontFamily: 'Eloquia Display, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif'
                    }}
                  >
                    Introducing GPT-5
                  </h1>
                  <div 
                    className={`${isMobile ? 'max-w-sm' : 'max-w-md'} text-center text-balance ${isMobile ? 'px-2' : ''}`}
                    style={{
                      fontSize: isMobile ? '14px' : '16px',
                      lineHeight: isMobile ? '20px' : '24px',
                      letterSpacing: isMobile ? '-0.1px' : '-0.32px',
                      fontWeight: '400',
                      color: '#95979E',
                      fontFamily: 'Eloquia Text, -apple-system, BlinkMacSystemFont, "Segma UI", Roboto, sans-serif'
                    }}
                  >
                    CelesteOS now has our smartest, fastest, most useful model yet, with thinking built in — so you get the best answer, every time.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}