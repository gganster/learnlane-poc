import StarBold from "../icons/StarBold";

const StarsEval = ({ count = '+120', text = 'Freelances nous ont rejoins' }) => {
    return (
        <>
            <div className="flex justify-center mt-2 lg:justify-start">
                <div className="flex mt-5 items-center">
                    <div className="flex w-[115px] ">
                        <img className="w-12 rounded-full border-[3px] border-white drop-shadow-xl z-10" src="/src/assets/images/user1.jpeg" alt="Person image" srcset="" />
                        <img className="w-12 rounded-full border-[3px] border-white drop-shadow-xl -translate-x-5 z-20" src="/src/assets/images/user2.jpeg" alt="Person image" srcset="" />
                        <img className="w-12 rounded-full border-[3px] border-white drop-shadow-xl -translate-x-10 z-30" src="/src/assets/images/user3.jpeg" alt="Person image" srcset="" />
                    </div>
                    <div>
                        <div className="flex">
                            <StarBold color="#ecc903" width="20"/>
                            <StarBold color="#ecc903" width="20"/>
                            <StarBold color="#ecc903" width="20"/>
                            <StarBold color="#ecc903" width="20"/>
                            <StarBold color="#ecc903" width="20"/>
                        </div>
                        <p className="text-xs"><strong>{count}</strong> {text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StarsEval;