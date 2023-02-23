import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { useState } from "react";



function ParallaxSlider({ children, baseVelocity = 1 }) {
  const [mouseEnter, setMouseEnter] = useState(false)

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    moveBy += moveBy;
    mouseEnter ? baseX.set(baseX.get()) : baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="parallax"
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <motion.div className="scroller" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default ParallaxSlider;

