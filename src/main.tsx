import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router";
import "./styles/main.scss";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactQueryClientProvider>
			<RouterProvider router={router} />
		</ReactQueryClientProvider>
	</StrictMode>
);
