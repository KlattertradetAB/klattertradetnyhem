import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <Link href="/">
          <Logo className="w-[100px] md:w-[120px]" />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          <Link
            className="inline-block font-sans text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
            href="#vision"
          >
            Vision
          </Link>
          <Link
            className="inline-block font-sans text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
            href="#medlemsvillkor"
          >
            Medlemsvillkor
          </Link>
          <Link
            className="inline-block font-sans text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
            href="#bli-medlem"
          >
            Bli medlem idag
          </Link>
        </nav>
        <Link className="max-lg:hidden transition-colors ease-out duration-150 font-sans text-primary hover:text-primary/80" href="/login">
          Logga in
        </Link>
        <MobileMenu />
      </header>
    </div>
  );
};
