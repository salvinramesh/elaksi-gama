// components/Navbar.jsx
'use client'

import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cartCount = useSelector(state => state.cart?.total || 0);
  const drawerRef = useRef(null);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!search) return;
    router.push(`/shop?search=${encodeURIComponent(search)}`);
    setDrawerOpen(false);
  };

  // Close drawer on outside click or ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    const onClick = (e) => {
      if (!drawerRef.current) return;
      if (drawerOpen && !drawerRef.current.contains(e.target)) setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [drawerOpen]);

  return (
    <header className="bg-white border-b border-gray-200 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">

          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-md hover:bg-slate-100 md:hidden"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="2" rx="1" fill="#374151"/>
                <rect y="7" width="22" height="2" rx="1" fill="#374151"/>
                <rect y="14" width="22" height="2" rx="1" fill="#374151"/>
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-green-600">Elaksi</span>
              <span className="text-2xl sm:text-3xl font-semibold text-slate-700">Atelier</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 ml-6 text-slate-600">
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Right: Search + Cart + Profile */}
          <div className="flex items-center gap-3">

            {/* Desktop Search (off-white, no border) */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1 w-[420px]">
              <Search size={16} className="text-slate-400" />
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  type="text"
                  placeholder="Search products"
                  className="bg-transparent outline-none px-3 text-sm w-full"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
              </form>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ShoppingCart />
              <span className="hidden md:inline text-sm">Cart</span>
              <span className="absolute -top-1 left-3 text-[10px] text-white bg-slate-600 rounded-full px-1">
                {cartCount}
              </span>
            </Link>

            {/* User / Login */}
            {user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<PackageIcon size={16} />}
                    onClick={() => router.push('/orders')}
                  />
                  <UserButton.ManageAccount />
                  <UserButton.SignOut />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button onClick={openSignIn} className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-sm">
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!drawerOpen}
      >
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${drawerOpen ? 'opacity-100' : 'opacity-0'}`} />

        <aside
          ref={drawerRef}
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">Elaksi</span>
              <span className="text-xl font-semibold text-slate-700">Atelier</span>
            </div>
            <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="p-2 rounded-md hover:bg-slate-100">✕</button>
          </div>

          <div className="p-4 space-y-4">
            {/* Mobile Search (soft background, no border) */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2">
              <Search size={16} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search products"
                className="bg-transparent outline-none px-2 text-sm w-full text-slate-700"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <button type="submit" className="text-slate-500">Go</button>
            </form>

            {/* Navigation Links */}
            <nav>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" onClick={() => setDrawerOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">Home</Link></li>
                <li><Link href="/shop" onClick={() => setDrawerOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">Shop</Link></li>
                <li><Link href="/about" onClick={() => setDrawerOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">About</Link></li>
                <li><Link href="/contact" onClick={() => setDrawerOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </header>
  );
}
