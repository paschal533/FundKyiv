import Link from "next/link";
import { useRouter } from "next/router";

const NavMenu = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const links = [
    {
      name: "Explore",
      href: "/",
    },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <ul className="flex flex-row justify-center list-none sm:flex-col sm:h-full">
      {links.map((link) => (
        <li
          key={link.name}
          onClick={() => {
            // setActive(item);
            // if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 sm:my-5 sm:text-xl
            ${
              currentRoute === link.href
                ? "dark:text-white text-nft-black-1"
                : "dark:text-nft-gray-3 text-nft-gray-2"
            } 
            `}
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
