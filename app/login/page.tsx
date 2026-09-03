'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.error || 'Incorrect answer');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6ee] text-[#2c2825] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl tracking-wide font-light mb-4 text-[#2c2825]">
            A Private Memory
          </h1>
          <p className="text-[#7a6f65] text-sm font-sans font-light tracking-widest uppercase">
            Riya & Yash
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="What song were you dancing to?"
              className="w-full bg-transparent border-b border-[#2c2825]/20 px-4 py-4 text-center text-lg focus:outline-none focus:border-[#2c2825]/60 transition-colors placeholder:text-[#b5a898] font-serif"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
          
          <div className="h-6 flex items-center justify-center">
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400/80 text-sm font-light tracking-wide"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="mt-4 border border-[#2c2825]/20 hover:border-[#2c2825]/50 bg-[#2c2825]/5 hover:bg-[#2c2825]/10 text-[#2c2825]/80 py-4 px-8 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed font-sans tracking-widest text-xs uppercase"
          >
            {isLoading ? 'Unlocking...' : 'Enter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
