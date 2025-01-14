const SectionTitle = ( { subtitle, title }) => {
    return (
        <div className="w-full flex flex-col items-center text-center">
            <h3 className="font-bold text-[#FF7171] uppercase text-sm">{subtitle}</h3>
            <h2 className="font-black uppercase text-xl">{title}</h2>
        </div>
    )
}

export default SectionTitle;