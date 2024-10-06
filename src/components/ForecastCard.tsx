import React, { useState } from 'react';
import { Forecast } from '../types/Forecast';

interface ForecastCardProps {
    forecast: Forecast[];
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
                <h3 className="text-start">Day</h3>
                <h3 className="text-center">Max/Min Temp</h3>
                <h3 className="text-end">Hour by Hour</h3>
            </div>

            <div className="space-y-2">
                {forecast.map((dayForecast, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-lg">
                        <div className="grid grid-cols-3 items-center">
                            <p className="font-medium">{new Date(dayForecast.dateTime).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                            <p className='text-center'>{dayForecast.highTemp}°C / {dayForecast.lowTemp}°C</p>
                            <button
                                className="text-blue-500 text-end"
                                onClick={() => toggleExpand(dayForecast.dateTime)}
                            >
                                {expandedDays[dayForecast.dateTime] ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>

                        {expandedDays[dayForecast.dateTime] && (
                            <div className="mt-2">
                                <div className="grid grid-cols-3 gap-4">
                                    {dayForecast.hourlyForecast.map((hourly, index) => (
                                        <React.Fragment key={index}>
                                            <p>{new Date(hourly.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className="text-center">{hourly.temperature}°C</p>
                                            <p className="text-end">{hourly.description}</p>
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