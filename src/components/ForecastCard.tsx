import React, { useState } from 'react';
import { DailyForecast } from '../types/ForecastData';

interface ForecastCardProps {
    forecast: DailyForecast[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
    const [expandedDays, setExpandedDays] = useState<{ [date: string]: boolean }>({});

    const toggleExpand = (date: string) => {
        setExpandedDays((prev) => ({
            ...prev,
            [date]: !prev[date],
        }));
    };

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">5 Day Forecast</h3>

            <div className='flex justify-between items-center mb-2 mr-2'>
                <h3 className="text-lg font-semibold">Day</h3>
                <h3 className="text-lg font-semibold">Max/Min Temp</h3>
                <h3 className="text-lg font-semibold">Hour by Hour</h3>

            </div>

            {/* List of daily forecasts */}
            <div className="space-y-2">
                {forecast.map((dayForecast, index) => (

                    // Card for each day
                    <div key={index} className="bg-gray-100 p-2 rounded-lg">
                        <div className="flex justify-between items-center">

                            {/* Day and temperature */}
                            <p className="font-medium">{dayForecast.day}</p>
                            <p>{dayForecast.highTemp}°C / {dayForecast.lowTemp}°C</p>

                            {/* Expand button */}
                            <button
                                className="text-blue-500"
                                onClick={() => toggleExpand(dayForecast.date)}
                            >
                                {expandedDays[dayForecast.date] ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>

                        {/* Expanded Hourly forecast */}
                        {expandedDays[dayForecast.date] && (
                            <div className="mt-2 space-y-1">
                                {dayForecast.entries.map((entry, index) => (
                                    
                                    // Hourly forecast entry
                                    <div key={index} className="pl-4 flex justify-between">
                                        <p>{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{entry.temperature}°C</p>
                                        <p>{entry.weatherDescription}</p>
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
