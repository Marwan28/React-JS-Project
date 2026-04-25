import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <section className="flex flex-col items-center justify-center gap-6 pt-20 pb-12">
        <div className="relative">
          <img src={heroImg} className="w-44 h-auto" alt="" />
          <img
            src={reactLogo}
            className="absolute top-2 right-0 w-10 h-10 animate-spin"
            style={{ animationDuration: '10s' }}
            alt="React logo"
          />
          <img
            src={viteLogo}
            className="absolute top-2 left-0 w-10 h-10"
            alt="Vite logo"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">src/App.jsx</code> and save to test{' '}
            <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg font-semibold transition-colors cursor-pointer"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <hr className="border-gray-800 mx-auto w-3/4" />

      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12">
        <div className="bg-gray-800/50 rounded-2xl p-6">
          <svg className="w-8 h-8 text-indigo-400 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-bold mb-1">Documentation</h2>
          <p className="text-gray-400 mb-4">Your questions, answered</p>
          <ul className="space-y-2">
            <li>
              <a
                href="https://vite.dev/"
                target="_blank"
                className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                <img className="w-5 h-5" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                <img className="w-5 h-5" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6">
          <svg className="w-8 h-8 text-indigo-400 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-bold mb-1">Connect with us</h2>
          <p className="text-gray-400 mb-4">Join the Vite community</p>
          <ul className="space-y-2">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors">
                <svg className="w-5 h-5" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors">
                <svg className="w-5 h-5" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors">
                <svg className="w-5 h-5" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors">
                <svg className="w-5 h-5" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <hr className="border-gray-800 mx-auto w-3/4" />
      <div className="h-16"></div>
    </div>
  )
}

export default App
