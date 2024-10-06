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
        <div className="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto border">
            <h3 className="text-xl font-bold mb-4">5 Day Forecast</h3>

            <div className='grid grid-cols-3 mb-2 mr-1 text-lg font-semibold'>
                <h3 className="text-start ">Day</h3>
                <h3 className="text-center ">Max/Min Temp</h3>
                <h3 className="text-end">Hour by Hour</h3>

            </div>

            {/* List of daily forecasts */}
            <div className="space-y-2 ">
                {forecast.map((dayForecast, index) => (
                    // Card for each day
                    <div key={index} className="bg-gray-100 p-2 rounded-lg">
                        <div className="grid grid-cols-3 items-center">

                            {/* Day and temperature */}
                            <p className="font-medium">{dayForecast.day}</p>
                            <p className='text-center'>{dayForecast.highTemp}°C / {dayForecast.lowTemp}°C</p>

                            {/* Expand button */}
                            <button
                                className="text-blue-500 text-end"
                                onClick={() => toggleExpand(dayForecast.date)}
                            >
                                {expandedDays[dayForecast.date] ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>

                        {/* Expanded Hourly forecast */}
                        {expandedDays[dayForecast.date] && (
                            <div className="mt-2">
                                <div className="grid grid-cols-3 gap-4">
                                    {dayForecast.entries.map((entry, index) => (
                                        <React.Fragment key={index}>
                                            <p>{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className="text-center">{entry.temperature}°C</p>
                                            <p className="text-end">{entry.weatherDescription}</p>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                ))}

            </div>
        </div>
    );
};

export default ForecastCard;
