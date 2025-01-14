import SectionTitle from "./SectionTitle"

const PricingCard = ({ PlanName, PlanDescription, Pricing, Features }) => {
    return (
        <div className="relative shadow-md border border-lightborder p-8 py-9 rounded-xl bg-white text-left lg:w-[370px] overflow-hidden" id="pricing">
            <div className="bg-[#FF7171] flex justify-center items-center py-1 px-40 -rotate-2 text-white uppercase absolute top-6 left-[50%] translate-x-[-50%] shadow-md">
                <span className="font-black text-3xl">{ PlanName }</span>
            </div>
            <p className="font-light text-foreground mt-14">{ PlanDescription }</p>
            <div className="my-2 mt-0">
                <span className="font-extrabold text-[40px]">{ Pricing }$</span>
                <small> / month</small>
            </div>
            {Features.map((feature, index) => (
                <div key={index} className="my-1">
                <div className="flex gap-3 items-center">
                    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.585 9.68002L2.755 4.85002L0.339996 7.26502L7.585 14.51L19.66 2.43502L17.245 0.0200195L7.585 9.68002Z" fill="#333333"/>
                    </svg>
                    <span className="text-[13px] lg:text-[15px]">{feature}</span>
                </div>
                </div>
            ))}
            <div className="mt-8 w-full">
                <a 
                    href="/auth/login" 
                    className="flex justify-center w-full bg-white border-2 border-foreground hover:bg-foreground_hovered hover:text-white text-foreground uppercase font-bold rounded-lg p-3">Acheter
                </a>
            </div>
        </div>
    )
}

const Pricing = () => {
    return (
        <section className="w-full flex flex-col justify-center items-center my-[10vh]">
            <SectionTitle subtitle="prix" title="rejoignez nous" />

            <div className="flex flex-col lg:flex-row gap-10 mt-10">
                <PricingCard PlanName="Starter" PlanDescription="Petite description du plan, à qui il est designé etc..." Pricing="4.99" Features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]} />
                <PricingCard PlanName="Entreprise" PlanDescription="Petite description du plan, à qui il est designé etc..." Pricing="14.99" Features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]} />
            </div>
        </section>
    );
}

export default Pricing;