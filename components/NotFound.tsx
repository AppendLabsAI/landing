import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';
import SEO from './SEO';

const M = motion as any;

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | AppendLabs"
        description="The page you're looking for doesn't exist. Return to AppendLabs homepage to explore our AI infrastructure services."
        canonical="https://appendlabs.com/404"
        noindex={true}
      />
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 font-sans">
      <div className="max-w-2xl w-full text-center">
        <M.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Error Code */}
          <M.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="relative"
          >
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-heading font-bold text-white/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-white/20" />
            </div>
          </M.div>

          {/* Message */}
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-brand-muted text-base md:text-lg max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </M.div>

          {/* Action Buttons */}
          <M.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/"
              className="group relative inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </a>
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
              className="group relative inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </M.div>

          {/* Additional Help */}
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-8 border-t border-white/5"
          >
            <p className="text-sm text-brand-muted">
              Need help?{' '}
              <a
                href="/#contact"
                className="text-white hover:text-white/80 underline underline-offset-4 transition-colors"
              >
                Contact us
              </a>
              {' '}or{' '}
              <a
                href="mailto:hello@appendlabs.com"
                className="text-white hover:text-white/80 underline underline-offset-4 transition-colors"
              >
                email us directly
              </a>
            </p>
          </M.div>
        </M.div>
      </div>
      </div>
    </>
  );
};

export default NotFound;

