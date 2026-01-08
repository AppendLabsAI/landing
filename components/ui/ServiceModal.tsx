import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ServiceItem } from '../../constants';
import { cn } from '@/lib/utils';

// Fix: Cast motion to any to avoid type errors
const M = motion as any;

interface ServiceModalProps {
  item: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ item, isOpen, onClose }) => {
  // Lock body scroll and hide navbar when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!item) return null;

  const Icon = item.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <M.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-start md:items-center justify-center p-0 sm:p-3 md:p-4 pointer-events-none overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="relative bg-brand-surface border border-white/10 rounded-none sm:rounded-sm max-w-3xl w-full min-h-full sm:min-h-0 max-h-screen md:max-h-[90vh] my-0 sm:my-auto overflow-y-auto pointer-events-auto overscroll-contain">
              {/* Sticky Close Button */}
              <div className="sticky top-0 bg-brand-surface border-b border-white/10 z-20 flex justify-end p-3 sm:p-4">
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 text-white/60 hover:text-white active:text-white transition-colors touch-manipulation"
                  aria-label="Close"
                >
                  <X size={20} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-3 md:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-1 sm:p-1.5 md:p-2 bg-white/5 rounded-sm border border-white/10 text-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-1.5 sm:mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-1.5 py-0.5 md:px-2 md:py-1 bg-white/5 border border-white/10 rounded-sm text-[8px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-brand-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-brand-muted text-xs sm:text-sm md:text-base leading-relaxed mb-2.5 sm:mb-3 md:mb-4">
                    {item.description}
                  </p>
                  
                  {item.detailedDescription && (
                    <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                      {item.detailedDescription}
                    </p>
                  )}
                </div>

                {/* Use Cases */}
                {item.useCases && item.useCases.length > 0 && (
                  <div className="mb-4 md:mb-6 p-3 sm:p-4 md:p-6 bg-black border border-white/10 rounded-sm">
                    <h4 className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-brand-muted mb-2.5 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0"></span>
                      Use Cases
                    </h4>
                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      {item.useCases.map((useCase, index) => (
                        <M.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-2 sm:gap-2.5 md:gap-3"
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5 sm:mt-1.5 md:mt-2"></div>
                          <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed flex-1">
                            {useCase}
                          </p>
                        </M.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {item.keyFeatures && item.keyFeatures.length > 0 && (
                  <div>
                    <h4 className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-brand-muted mb-2.5 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0"></span>
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                      {item.keyFeatures.map((feature, index) => (
                        <M.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (item.useCases?.length || 0) * 0.05 + index * 0.05 }}
                          className="flex items-center gap-2 sm:gap-2.5 md:gap-3 p-2 sm:p-2.5 md:p-3 bg-black border border-white/10 rounded-sm"
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                          <span className="text-white text-xs sm:text-sm leading-snug">{feature}</span>
                        </M.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </M.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;

