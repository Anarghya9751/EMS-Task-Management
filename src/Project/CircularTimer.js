import React from 'react';
import './CircularTimer.css';

const CircularTimer = ({ progress }) => {
    const strokeWidth = 7; // Width of the circle's stroke
    const radius = 30 - strokeWidth / 2; // Radius of the circle
    const circumference = 2*Math.PI*radius; // Circumference of the circle

    const normalizedProgress = Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0 and 100
    const dashOffset = circumference * (1 - normalizedProgress / 100); // Calculate dash offset

    let color = '#00ff00'; // Default color is green
    let meaning = 'On Track'; // Default meaning

    if (normalizedProgress > 75) {
        color = '#ffa500'; // Change color to orange if progress is more than 75%
        meaning = 'Attention'; // Change meaning to attention if progress is more than 75%
    }
    if (normalizedProgress > 90) {
        color = '#ff0000'; // Change color to red if progress is more than 90%
        meaning = 'Critical'; // Change meaning to critical if progress is more than 90%
    }

    // Calculate text position
    const textX = 50; // Center X coordinate
    const textY = 55; // Adjusted Y coordinate for horizontal alignment

    return (
        <div className="circular-timer-container">
          
            {normalizedProgress !== 100 && (
                <div>
                    <div className="circular-timer-wrapper">
                        <svg className="circular-progress" width="100" height="100" style={{ transform: 'rotate(1deg)' }}>
                            <circle className="circular-progress-background" cx="50" cy="50" r={radius} strokeWidth={strokeWidth} />
                            <circle
                                className="circular-progress-bar"
                                cx="50"
                                cy="50"
                                r={radius}
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                                style={{ stroke: color }}
                            />
                            <text x={textX} y={textY} textAnchor="middle" className="progress-label">
                                {`${Math.round(normalizedProgress)}%`}
                            </text>
                        </svg>
                    </div>
                    <div className="color-meanings">
                        <p><span style={{ color: '#00ff00' }}>Green:</span> On Track</p>
                        <p><span style={{ color: '#ffa500' }}>Orange:</span> Attention</p>
                        <p><span style={{ color: '#ff0000' }}>Red:</span> Critical</p>
                    </div>
                </div>
            )}

            {normalizedProgress === 100 && (
                <div className="time-completed-message" style={{ color: '#ff0000' }}>
                    Time Completed
                </div>
            )}
        </div>
    );
};

export default CircularTimer;
