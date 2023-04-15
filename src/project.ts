import { makeProject } from "@motion-canvas/core";

import main from "./scenes/main?scene";

import "./global.css";

export default makeProject({
  scenes: [main],
  variables: { accentColor: "#FF6000", secondaryColor: "#FFA559" },
});
