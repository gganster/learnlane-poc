import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-FSCDB4JBDP");
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
