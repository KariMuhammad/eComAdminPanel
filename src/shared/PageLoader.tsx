import React from "react";

export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex items-center justify-center w-24 h-24">
                <div className="absolute w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute w-16 h-16 border-4 border-pink-500 border-b-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute w-8 h-8 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                </div>
            </div>
            <span className="mt-8 text-xl font-semibold text-blue-700 tracking-wide animate-pulse">Ecommerce Admin Loading...</span>
        </div>
    );
}

// Custom slow spin animation
// Add to your global CSS if not present:
// .animate-spin-slow { animation: spin 2s linear infinite; }