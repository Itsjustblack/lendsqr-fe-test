import { useState } from "react";
import { motion } from "motion/react";
import "../styles/components/AnimatedTabs.scss";

const tabs = [
	"General Details",
	"Documents",
	"Bank Details",
	"Loans",
	"Savings",
	"App and System",
];

const AnimatedTabs = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="animated-tabs">
			{tabs.map((tab, index) => (
				<button
					key={tab}
					className={`animated-tab ${
						activeTab === index ? "animated-tab--active" : ""
					}`}
					onClick={() => setActiveTab(index)}
				>
					{tab}
					{activeTab === index && (
						<motion.div
							className="animated-tab-indicator"
							layoutId="activeTabIndicator"
							transition={{ type: "spring", stiffness: 340, damping: 30 }}
						/>
					)}
				</button>
			))}
		</div>
	);
};

export default AnimatedTabs;
