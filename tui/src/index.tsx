#!/usr/bin/env bun
import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./components/App";
import { initJarPath } from "./hooks/useSpark";

await initJarPath();
createRoot(await createCliRenderer()).render(<App />);
