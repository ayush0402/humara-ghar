import { motion } from "framer-motion";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const SuccessMessage = () => {
  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        File Downloaded!
      </h4>
      <p className="text-sm max-w-md text-neutral-300 md:text-base">
        Thanks for downloading the rent agreement. The agreement is provided as
        a general guidance and HumaraGhar does not take any resposibility for
        any loss or damage arising from the use of this template. User will not
        get notarized argreement copy(Soft Copy/Hard Copy) by HumaraGhar if
        needed they can notarize it from any where.
      </p>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition"></div>
      </div>
    </motion.section>
  );
};

export default SuccessMessage;
