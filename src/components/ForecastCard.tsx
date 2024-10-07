import React, { useState } from 'react';
import { Forecast } from '../types/Forecast';
import { ChevronDown, ChevronUp, Sun, Cloud, Wind } from 'lucide-react';

interface ForecastCardProps {
    forecast: Forecast[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
    // State to manage which days are expanded
    const [expandedDays, setExpandedDays] = useState<{ [date: string]: boolean }>({});

    // Function to toggle the expanded state of a day
    const toggleExpand = (date: string) => {
        setExpandedDays((prev) =>  // callback function to update the state based on the previous state
        ({
            // The function creates a new object, copying all properties from the previous state.
            // It then adds or updates the "" property, setting its value to the opposite of what it was before
            ...prev, [date]: !prev[date],
        })
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">5 Day Forecast</h2>
            <div className="space-y-4">

                {/* Map through each day's forecast */}
                {forecast.map((dayForecast, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">

                        {/* Day summary */}
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(dayForecast.dateTime)}>
                            <div className="flex items-center space-x-4">
                                {/* Date display */}
                                <span className="text-lg font-semibold">
                                    {new Date(dayForecast.dateTime).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                </span>
                                {/* High and low temperature display */}
                                <div className="flex items-center space-x-2">
                                    <Sun size={20} className="text-yellow-500" />
                                    <span>{dayForecast.highTemp}°C</span>
                                    <span className="text-gray-500">/</span>
                                    <Cloud size={20} className="text-gray-400" />
                                    <span>{dayForecast.lowTemp}°C</span>
                                </div>
                            </div>

                            {/* Expand/collapse indicator */}
                            {expandedDays[dayForecast.dateTime] ? (<ChevronUp size={20} className="text-gray-500" />) : (<ChevronDown size={20} className="text-gray-500" />)}
                        </div>

                        {/* Detailed hourly forecast (visible when expanded) */}
                        {expandedDays[dayForecast.dateTime] && (
                            <div className="mt-4 space-y-2">
                                {dayForecast.hourlyForecast.map((hourly, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-2 items-center bg-gray-50 p-2 rounded">
                                        {/* Time */}
                                        <span className="text-sm font-medium">
                                            {new Date(hourly.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {/* Temperature */}
                                        <div className="flex items-center space-x-2">
                                            <Sun size={16} className="text-yellow-500" />
                                            <span>{hourly.temperature}°C</span>
                                        </div>
                                        {/* Weather description */}
                                        <div className="flex items-center space-x-2">
                                            <Cloud size={16} className="text-gray-400" />
                                            <span className="text-sm">{hourly.description}</span>
                                        </div>
                                        {/* Wind speed */}
                                        <div className="flex items-center space-x-2">
                                            <Wind size={16} className="text-blue-300" />
                                            <span className="text-sm">{hourly.windSpeed} m/s</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard;