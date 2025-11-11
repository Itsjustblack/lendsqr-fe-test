import { useEffect } from "react";
import { motion } from "motion/react";

interface PageTransitionProps {
	children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};

export default PageTransition;
