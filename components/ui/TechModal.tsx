import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TechItem } from '../../constants';
import { cn } from '@/lib/utils';

// Fix: Cast motion to any to avoid type errors
const M = motion as any;

interface TechModalProps {
  item: TechItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const TechModal: React.FC<TechModalProps> = ({ item, isOpen, onClose }) => {
  // Lock body scroll when modal is open
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="relative bg-brand-surface border border-white/10 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="pr-8 mb-6">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
                    {item.keyword}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-sm mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                      Powered by AppendLabs
                    </span>
                  </div>
                  <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Use Case */}
                <div className="mb-6 p-4 bg-black border border-white/10 rounded-sm">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-3">
                    Use Case
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    {item.useCase}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-4">
                    Key Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.benefits.map((benefit, index) => (
                      <M.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-black border border-white/10 rounded-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                        <span className="text-white text-sm">{benefit}</span>
                      </M.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </M.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TechModal;

