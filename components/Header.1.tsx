import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";


export const Header = () => {
    return (
        <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
            <header className="flex items-center justify-between container">
                <a href="/">
                    <Logo className="w-[100px] md:w-[120px]" />
                </a>
                <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
                    <a
                        className="inline-block font-sans text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                        href="#vision"
                    >
                        Vision
                    </a>
                    <a
                        className="inline-block font-sans text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                        href="#medlemsvillkor"
                    >
                        Medlemsvillkor
                    </a>
                    <a
                        className="inline-block font-sans text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                        href="#bli-medlem"
                    >
                        Bli medlem idag
                    </a>
                </nav>
                <a className="max-lg:hidden transition-colors ease-out duration-150 font-sans text-primary hover:text-primary/80" href="/login">
                    Logga in
                </a>
                <MobileMenu />
            </header>
        </div>
    );
};
