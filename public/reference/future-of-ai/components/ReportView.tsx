import React, { useState } from 'react';
import { REPORT_DATA } from '../data';
import { GlassCard } from './GlassCard';
import { GoogleGenAI } from "@google/genai";

export const ReportView: React.FC = () => {
    const [images, setImages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const handleGenerateImage = async (id: string, title: string, content: string) => {
        if (loading[id] || images[id]) return;

        setLoading(prev => ({ ...prev, [id]: true }));

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Create a high-quality, abstract, futuristic 3D educational illustration representing the concept: "${title}". 
            Context: "${content}". 
            Style: Minimalist, geometric, sci-fi interface aesthetic. 
            Colors: Deep red (#7d0100), dark brown (#513430), cream (#fff8f6). 
            Do not include text in the image.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: prompt }]
                }
            });

            // Iterate through parts to find the image
            let imageUrl = '';
            if (response.candidates?.[0]?.content?.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const base64EncodeString = part.inlineData.data;
                        imageUrl = `data:image/png;base64,${base64EncodeString}`;
                        break;
                    }
                }
            }

            if (imageUrl) {
                setImages(prev => ({ ...prev, [id]: imageUrl }));
            }
        } catch (error) {
            console.error("Failed to generate image", error);
        } finally {
            setLoading(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="animate-slide-up">
            <div className="text-center mb-10">
                <h2 className="font-outfit text-3xl font-bold text-primary-light">Mission Briefing</h2>
                <p className="text-primary-light/60 mt-2">Study the data before entering the simulation. Generate visuals to enhance retention.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REPORT_DATA.map((section, index) => (
                    <div 
                        key={section.id} 
                        className={`
                            ${section.colSpan === 3 ? 'md:col-span-3' : ''}
                            ${section.colSpan === 2 ? 'md:col-span-2' : ''}
                            ${section.colSpan === 1 ? 'md:col-span-1' : ''}
                        `}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <GlassCard className="p-6 h-full animate-fade-in flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-outfit text-xl font-bold text-background flex items-center gap-2">
                                    {section.id === 'main-topic' && (
                                        <span className="inline-block w-2 h-2 rounded-full bg-primary-dark animate-pulse"/>
                                    )}
                                    {section.title}
                                </h3>
                                
                                {!images[section.id] && (
                                    <button
                                        onClick={() => handleGenerateImage(section.id, section.title, section.content)}
                                        disabled={loading[section.id]}
                                        className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-dark/20 hover:bg-primary-dark/40 text-primary-light/70 hover:text-primary-light transition-all border border-white/5"
                                        title="Generate Visual Visualization"
                                    >
                                        {loading[section.id] ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Generating...
                                            </span>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                                Visualize
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            {images[section.id] && (
                                <div className="mb-4 rounded-xl overflow-hidden border border-white/10 shadow-lg animate-fade-in">
                                    <img 
                                        src={images[section.id]} 
                                        alt={`Visual for ${section.title}`} 
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            
                            {section.isList ? (
                                <ul className="space-y-3 mt-auto">
                                    {section.content.split('|').map((item, i) => {
                                        const [bold, rest] = item.split(':');
                                        return (
                                            <li key={i} className="flex items-start gap-2 text-primary-light/90 text-sm md:text-base">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary-light/50 flex-shrink-0" />
                                                <span>
                                                    {rest ? (
                                                        <>
                                                            <strong className="text-secondary-light">{bold}:</strong> {rest}
                                                        </>
                                                    ) : (
                                                        item
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-primary-light/90 leading-relaxed text-sm md:text-base mt-auto">
                                    {section.content}
                                </p>
                            )}
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>
    );
};