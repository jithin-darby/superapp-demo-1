'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Map, Settings } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="glass px-6 py-3 flex gap-4">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              pathname === '/'
                ? 'bg-emerald-500/30 text-emerald-300 font-semibold'
                : 'hover:bg-white/10 text-gray-300'
            }`}
          >
            <Map size={20} />
            Map
          </motion.button>
        </Link>
        <Link href="/admin">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              pathname === '/admin'
                ? 'bg-emerald-500/30 text-emerald-300 font-semibold'
                : 'hover:bg-white/10 text-gray-300'
            }`}
          >
            <Settings size={20} />
            Admin
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  )
}
