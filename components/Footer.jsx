import Link from "next/link";

const Footer = () => {
  /* --- header icons --- */
  const ProductsHeaderIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <rect x="2" y="3" width="14" height="10" rx="2" stroke="#475569" strokeWidth="1.2" />
      <path d="M2 7h14" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
  const WebsiteHeaderIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <path d="M2 9h14" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 4v10" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13 4v10" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
  const ContactHeaderIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <path d="M3 4h12v10H3z" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 7l6 4 6-4" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  /* --- product-specific icons (stroke uses currentColor) --- */
  const NecklaceIcon = ({ className = "w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11c1.5-4 6-6 8-6s6.5 2 8 6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="11.5" r="1.3" strokeWidth="1.2" />
    </svg>
  );
  const EarringsIcon = ({ className = "w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="2" strokeWidth="1.2" />
      <path d="M12 10v6" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="10" y="16" width="4" height="2" rx="0.8" strokeWidth="1.2"/>
    </svg>
  );
  const BraceletIcon = ({ className = "w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="7" strokeWidth="1.2" />
      <path d="M5 12h2" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M17 12h2" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
  const AnkletIcon = ({ className = "w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12c2-6 10-6 14 0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="12" r="0.9" strokeWidth="1.2" />
      <circle cx="12" cy="14" r="0.9" strokeWidth="1.2" />
    </svg>
  );
  const KeychainIcon = ({ className = "w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="2" strokeWidth="1.2" />
      <path d="M11 11l6 6" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18.5" cy="18.5" r="1.2" strokeWidth="1.2" />
    </svg>
  );

  /* --- other small icons (kept small and using currentColor) --- */
  const HomeIcon = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 7.5L8 2l6.5 5.5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 8v5h10V8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const PolicyIcon = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2h8v12H4z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6h4" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6 9h4" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  const RefundIcon = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8a6 6 0 101.6-4.2L2 5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 5v3l2 1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const ShippingIcon = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="4.5" width="9" height="5" rx="1" strokeWidth="1.3" />
      <path d="M10.5 6.5h3l1 2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="11.2" r="0.9" strokeWidth="1.3" />
      <circle cx="12" cy="11.2" r="0.9" strokeWidth="1.3" />
    </svg>
  );

  /* contact entry icons */
  const PhoneSmall = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.22 11.045c.137.063.292.077.439.04.147-.037.277-.123.369-.244l.237-.31c.124-.166.285-.3.47-.392.185-.092.389-.14.596-.14h2c.354 0 .693.14.943.39.25.25.391.589.391.943v2c0 .354-.14.693-.391.943-.25.25-.589.391-.943.391-3.183 0-6.235-1.264-8.486-3.515C1.596 11.901.332 8.848.332 5.666  .332 5.312.472 4.973.722 4.723.972 4.472 1.311 4.332 1.665 4.332H3.665c.354 0 .693.14.943.39.25.25.391.589.391.943v2c0 .207-.048.411-.141.596-.092.185-.226.346-.392.47l-.312.237c-.139.095-.157.253-.122.403.067.875.928 2.371 2.78 3.279z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const MailSmall = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.665 4.667L8.671 8.485C8.468 8.603 8.237 8.665 8.002 8.665c-.235 0-.466-.062-.669-.18L1.332 4.667M2.665 2.667h10.667C14.068 2.667 14.665 3.264 14.665 4V12c0 .737-.597 1.334-1.333 1.334H2.665C1.929 13.333 1.332 12.736 1.332 12V4c0-.737.597-1.333 1.333-1.333z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const MapSmall = ({ className="w-4 h-4 text-slate-500" }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3346 6.6663C13.3346 9.995 9.642 13.462 8.402 14.532c-.116.087-.256.134-.401.134-.145 0-.286-.047-.401-.134C6.36 13.462 2.668 9.995 2.668 6.6663 2.668 5.252 3.23 3.895 4.23 2.895 5.23 1.895 6.587 1.333 8.001 1.333c1.415 0 2.772.562 3.772 1.562 1 1 1.562 2.357 1.562 3.771z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.001 8.666c1.105 0 2.001-.896 2.001-2 0-1.105-.896-2.001-2.001-2.001-1.104 0-2 0.896-2 2.001 0 1.105.896 2 2 2z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  /* --- footer link data --- */
  const linkSections = [
    {
      title: "PRODUCTS",
      links: [
        { text: "Necklace", path: '/shop', icon: NecklaceIcon },
        { text: "Earrings", path: '/shop', icon: EarringsIcon },
        { text: "Bracelets", path: '/shop', icon: BraceletIcon },
        { text: "Anklets", path: '/shop', icon: AnkletIcon },
        { text: "Keychains", path: '/shop', icon: KeychainIcon },
      ],
    },
    {
      title: "WEBSITE?",
      links: [
        { text: "Home", path: '/', icon: HomeIcon },
        { text: "Privacy Policy", path: '/privacy', icon: PolicyIcon },
        { text: "Refund & Cancellation", path: '/refund', icon: RefundIcon },
        { text: "Terms & Conditions", path: '/terms', icon: PolicyIcon },
        { text: "Shipping Policy", path: '/shipping', icon: ShippingIcon },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { text: "+91 7994366361", path: '/', icon: PhoneSmall },
        { text: "elaksiatelier777@gmail.com", path: '/', icon: MailSmall },
        { text: "Kozhikode, Kerala", path: '/', icon: MapSmall },
        { text: "Contact Policy", path: '/contact', icon: PolicyIcon },
      ],
    },
  ];

  /* social icons kept same as before */
  const socialIcons = [
    { icon: (props) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.999 1.667h-2.5C11.394 1.667 10.334 2.106 9.552 2.887 8.771 3.669 8.332 4.729 8.332 5.834v2.5H5.832v3.334h2.5V18.334h3.333V11.834h2.5l.833-3.334h-3.333V5.834c0-.221.087-.434.243-.59.156-.156.368-.244.589-.244h2.5V1.667z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>), link: "https://www.facebook.com" },
    { icon: (props) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.585 5.417h-.009M5.835 1.667h8.333C16.637 1.667 18.503 3.532 18.503 5.833v8.334C18.503 16.468 16.637 18.333 14.168 18.333H5.835C3.534 18.333 1.668 16.468 1.668 14.167V5.833C1.668 3.532 3.534 1.667 5.835 1.667zM13.335 9.475c.103.694-.015 1.403-.337 2.025-.323.623-.834 1.128-1.46 1.443-.626.316-1.335.426-2.028.314C8.816 13.144 8.176 12.818 7.68 12.322 7.184 11.826 6.858 11.186 6.746 10.494 6.635 9.802 6.744 9.092 7.06 8.466 7.375 7.839 7.88 7.328 8.502 7.005c.623-.323 1.332-.442 2.025-.34.708.104 1.363.434 1.869.94.505.505.835 1.16.94 1.868z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>), link: "https://www.instagram.com/elaksi_atelier/" },
    { icon: (props) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.335 3.334s-.584 1.75-1.667 2.834C18.669 14.501 8.502 20.584 1.335 15.834c1.833.083 3.667-.5 5 1.666C2.502 12.917.419 8 2.502 4.167 4.336 6.334 7.169 7.584 10.002 7.5 9.252 4 13.335 2 15.835 4.334c.917 0 2.5-1 2.5-1z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>), link: "https://twitter.com" },
    { icon: (props) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 6.2C23.3 5.3 22.6 4.6 21.7 4.4 20 4 12 4 12 4S4 4 2.3 4.4 0.7 5.3 0.5 6.2C0 8 0 12 0 12s0 4 0.5 5.8c0.2.9 0.9 1.6 1.8 1.8 1.7.4 9.7.4 9.7.4s8 0 9.7-.4c0.5-.1 1-.4 1.5-1 0.7-.7 0.9-2.4 0.9-2.4s0-1.6 0-3.6c0-2-0.2-4-0.7-5.8zM9.6 15.5V8.5L15.8 12 9.6 15.5z" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>), link: "https://www.youtube.com/@elaksiatelier" },
  ];

  return (
    <footer className="mx-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-500/30 text-slate-500">
          {/* Left: Brand + social + Become Plus Member */}
          <div className="min-w-[260px]">
            <Link href="/" className="text-4xl font-semibold text-slate-700 block">
              <span className="text-green-600">elaksi</span>atelier
            </Link>
            <p className="max-w-[410px] mt-6 text-sm">
              Elaksi Atelier, where elegance meets affordability. We believe that every woman deserves to shine — not just on special occasions, but every day.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map((item, i) => (
                <Link
                  href={item.link}
                  key={i}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:scale-105 hover:border border-slate-300 transition rounded-full"
                >
                  <item.icon />
                </Link>
              ))}
            </div>

            {/* Become Plus Member placed under social icons */}
            <div className="mt-4">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2" stroke="white" strokeWidth="1.2"/><path d="M3.5 13c.8-2 3-3 4.5-3s3.7 1 4.5 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Become Plus Member</span>
              </Link>
            </div>
          </div>

          {/* Right: columns */}
          <div className="flex flex-wrap justify-between w-full md:w-[65%] gap-8 text-sm">
            {linkSections.map((section, index) => (
              <div key={index} className="min-w-[140px]">
                <h3 className="font-medium text-slate-700 md:mb-5 mb-3 flex items-center">
                  {index === 0 && <ProductsHeaderIcon />}
                  {index === 1 && <WebsiteHeaderIcon />}
                  {index === 2 && <ContactHeaderIcon />}
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i} className="flex items-center gap-2 group">
                      <span className="w-4 h-4 flex items-center justify-center">
                        {/* icon uses currentColor and will change on hover via group-hover */}
                        <link.icon className="w-4 h-4 text-slate-500 group-hover:text-green-600" />
                      </span>
                      <Link href={link.path} className="hover:underline transition text-slate-600">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-sm text-slate-500">
          Copyright 2025 © Elaksi All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
