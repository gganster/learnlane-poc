import StarsEval from "./StarsEval";

const HeroSection = () => {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center py-20 relative">
                <div className="border border-dashed border-foreground opacity-70 rounded-full px-5 w-fit">
                    <span className="text-xs font-medium">bla bla bla bla</span>
                </div>

                <h3 className="font-black text-6xl text-center relative w-[700px] mt-5 mb-2 z-10 leading-[65px]">
                    Suivez 
                    <span className="relative hero-highlight text-white px-4">
                        l’évolution
                        <svg className="hero-svg" width="400" height="131" style={{ zIndex: '-10', position: 'absolute', top: '50%', left: '54%', transform: 'translate(-50%, -50%)' }}>
                            <g clip-path="url(#clip0_6_19)">
                                <path d="M352.352 96.8174C347.524 94.9764 342.438 94.516 337.602 94.0337C334.809 93.8254 332.161 93.8307 329.387 93.8471C325.467 93.7373 321.567 93.8522 317.562 94.2027C310.031 94.6351 302.626 95.0567 295.115 95.7138C280.219 97.017 265.303 98.0956 250.164 98.0621C234.524 98.0724 219.009 98.0717 203.369 98.082C188.605 98.0156 173.842 97.9492 158.992 98.3431C144.248 98.5013 129.398 98.8951 114.615 98.6041C99.4361 98.1214 84.3361 98.5371 69.2557 99.1774C62.0813 99.3524 54.9068 99.5274 47.6537 98.8039C43.8394 98.4586 40.1306 97.8777 36.2966 97.3078C32.5879 96.7269 28.9184 96.5953 25.2293 96.239C21.7905 95.8608 18.5556 96.3702 15.215 97.1151C12.7973 96.874 10.7232 94.792 9.1373 91.083C8.29523 88.6669 7.34764 86.4864 6.50557 84.0704C4.70354 77.8905 3.50776 71.4312 3.04337 64.6816C2.45381 57.943 2.38462 51.3852 3.08615 44.9863C3.49589 42.4607 4.05044 40.1488 4.46017 37.6232C5.37787 33.6951 6.9535 31.5202 9.3981 30.6273C11.2954 30.6876 13.0872 30.9836 14.9845 31.0439C16.6315 31.1261 18.384 30.9728 20.0113 30.8305C23.6415 30.5129 27.1662 30.4308 30.816 30.3378C38.366 30.13 45.8301 30.3823 53.3801 30.1745C67.9597 29.5779 82.5001 28.5322 97.0331 28.8451C104.873 29.0645 112.712 29.284 120.532 29.2789C127.601 29.3395 134.776 29.1645 141.825 29.0004C156.925 28.5847 172.064 28.6182 187.204 28.6517C202.093 28.7072 217.107 28.7516 231.996 28.8071C240.191 28.7691 248.532 28.9447 256.727 28.9067C264.172 28.9345 271.432 28.2993 278.837 27.8777C293.878 26.7882 308.919 25.6986 324.078 25.9567C327.873 26.0774 331.542 26.2091 335.251 26.7899C338.314 27.201 341.397 27.8366 344.375 28.7078C346.707 29.4092 349.078 30.5598 351.324 31.7213C352.634 32.2857 354.004 33.5239 355.249 34.773C357.777 37.7206 359.633 41.6324 360.941 46.4974C363.77 55.7562 365.003 66.9654 364.991 76.9254C365.001 82.8093 364.366 88.5234 363.046 93.6184C362.307 95.2674 361.568 96.9164 360.83 98.5654C359.023 100.987 357.02 101.162 354.946 99.0802C354.367 98.2255 353.287 97.4146 352.352 96.8174Z" fill="#FF7171"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_6_19">
                                    <rect width="360" height="100" fill="white" transform="matrix(-0.996195 0.0871557 0.0871557 0.996195 359.469 0)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                     de vos élèves !
                </h3>
                <h4 className="text-xs">bla bla bla, description optionnel</h4>

                <StarsEval count="+199" text="Formateurs utilisent LearnLane" />
            </div>

            <div className="flex justify-center mb-20 relative">
                <div className="border border-lightborder overflow-hidden w-[90%] lg:w-[70%] rounded-xl">
                    <img className="object-cover shadow-lg" src="/src/assets/images/dashboard_preview.png" alt="" />
                    <div className="absolute w-[100%] h-[100%] top-0 left-0 bg-gradient-to-b from-transparent to-background"></div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
