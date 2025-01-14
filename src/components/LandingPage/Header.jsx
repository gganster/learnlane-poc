const Header = () => {
    return (
        <nav className="w-full flex justify-between p-8 px-14 items-center">
            <div className="flex items-center gap-8">
                <h1 className="font-black text-3xl">LearnLane</h1>
                <ul className="flex gap-5 text-sm">
                    <li><a className="hover:underline" href="#features">Fonctionnalitées</a></li>
                    <li><a className="hover:underline" href="#pricing">Prix</a></li>
                    <li><a className="hover:underline" href="#faq">FAQ</a></li>
                    <li><a className="hover:underline" href="#contact">Contact</a></li>
                </ul>
            </div>
            <a href="#" className="text-white bg-foreground rounded-full px-10 py-2 text-xs font-bold hover:bg-foreground_hovered">CTA</a>
        </nav>
    );
};

export default Header;